
import { 
    Body, 
    Observer, 
    MakeTime,
    Equator,
    SiderealTime,
    e_tilt
} from 'astronomy-engine';
import { BirthChart, HouseCusp, PlanetName, PlanetPosition, ZodiacSign } from './types';

const ZODIAC_SIGNS: ZodiacSign[] = [
  'aries', 'taurus', 'gemini', 'cancer',
  'leo', 'virgo', 'libra', 'scorpio',
  'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const BODY_MAP: Record<PlanetName, Body | string> = {
  'Sun': Body.Sun,
  'Moon': Body.Moon,
  'Mercury': Body.Mercury,
  'Venus': Body.Venus,
  'Mars': Body.Mars,
  'Jupiter': Body.Jupiter,
  'Saturn': Body.Saturn,
  'Uranus': Body.Uranus,
  'Neptune': Body.Neptune,
  'Pluto': Body.Pluto,
  'North Node': 'North Node', 
  'South Node': 'South Node',
  'Chiron': 'Chiron',
  'Lilith': 'Lilith',
  'Ascendant': 'Ascendant',
  'Midheaven': 'Midheaven',
  'Vertex': 'Vertex',
  'Part of Fortune': 'Part of Fortune'
};

function normalizeDegrees(d: number): number {
    let nd = d % 360;
    if (nd < 0) nd += 360;
    return nd;
}

function getZodiacInfo(lon: number): { sign: ZodiacSign; degree: number } {
  const normalizedLon = normalizeDegrees(lon);
  const signIndex = Math.floor(normalizedLon / 30);
  const degree = normalizedLon % 30;
  
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: degree
  };
}

// Convert Equatorial (RA in hours, Dec in degrees) to Ecliptic (Lon, Lat in degrees)
// All inputs/outputs relative to Date (Tropical)
function equatorialToEcliptic(raHours: number, decDeg: number, oblDeg: number): { lon: number, lat: number } {
    const raRad = raHours * 15 * Math.PI / 180;
    const decRad = decDeg * Math.PI / 180;
    const oblRad = oblDeg * Math.PI / 180;

    const sinLat = Math.sin(decRad) * Math.cos(oblRad) - Math.cos(decRad) * Math.sin(oblRad) * Math.sin(raRad);
    const latRad = Math.asin(sinLat);

    const y = Math.sin(raRad) * Math.cos(oblRad) + Math.tan(decRad) * Math.sin(oblRad);
    const x = Math.cos(raRad);
    const lonRad = Math.atan2(y, x);

    return {
        lon: normalizeDegrees(lonRad * 180 / Math.PI),
        lat: latRad * 180 / Math.PI
    };
}

function calculateAscMc(date: Date, lat: number, lon: number): { asc: number, mc: number } {
    const time = MakeTime(date);
    const gast = SiderealTime(time); // Greenwich Apparent Sidereal Time in hours
    const lst = (gast + lon / 15) % 24; // Local Sidereal Time in hours
    const ramc = lst * 15; // RAMC in degrees
    
    const oblInfo = e_tilt(time);
    const obl = oblInfo.tobl; // True Obliquity
    const oblRad = obl * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const ramcRad = ramc * Math.PI / 180;

    // MC Calculation
    // tan(MC) = tan(RAMC) / cos(obl)
    // MC is usually in same quadrant as RAMC, or RAMC+180? 
    // Actually: MC = atan2(y, x) where y = tan(RAMC), x = cos(obl)? No.
    // MC is the intersection of Meridian and Ecliptic. 
    // Formula: tan(MC) = tan(RAMC)/cos(eps)
    // Map to 0-360.
    let mc = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(oblRad)) * 180 / Math.PI;
    mc = normalizeDegrees(mc);

    // Ascendant Calculation
    // tan(ASC) = cos(RAMC) / - (sin(RAMC)*sin(eps) + tan(lat)*cos(eps))
    const top = Math.cos(ramcRad);
    const bottom = - (Math.sin(ramcRad) * Math.sin(oblRad) + Math.tan(latRad) * Math.cos(oblRad));
    let asc = Math.atan2(top, bottom) * 180 / Math.PI;
    asc = normalizeDegrees(asc);

    return { asc, mc };
}

export async function calculateChart(dateString: string, timeString: string, lat: number, lon: number): Promise<BirthChart> {
    const dateTime = new Date(`${dateString}T${timeString}:00Z`);
    const time = MakeTime(dateTime);
    const observer = new Observer(lat, lon, 0);
    const oblInfo = e_tilt(time);
    const obl = oblInfo.tobl;

    const planets: Record<string, PlanetPosition> = {};
    const { asc, mc } = calculateAscMc(dateTime, lat, lon);

    // Calculate Planets
    for (const key in BODY_MAP) {
        const bodyName = key as PlanetName;
        const bodyKey = BODY_MAP[bodyName];
        
        if (typeof bodyKey === 'string') {
            // Placeholder for points not in Body enum
            if (bodyName === 'North Node') {
                 // Astronomy Engine doesn't have Nodes built-in easily. 
                 // Skip for MVP or use simple approx if found.
                 continue;
            }
             if (bodyName === 'Ascendant') {
                 const z = getZodiacInfo(asc);
                 planets['Ascendant'] = { name: 'Ascendant', lon: asc, lat: 0, speed: 0, sign: z.sign, signDegree: z.degree, isRetro: false, house: 1 };
                 continue;
             }
             if (bodyName === 'Midheaven') {
                 const z = getZodiacInfo(mc);
                 planets['Midheaven'] = { name: 'Midheaven', lon: mc, lat: 0, speed: 0, sign: z.sign, signDegree: z.degree, isRetro: false, house: 10 };
                 continue;
             }
            continue;
        }

        const eq = Equator(bodyKey, time, observer, true, true); // ofdate=true, aberration=true
        const ecl = equatorialToEcliptic(eq.ra, eq.dec, obl);
        
        // Very basic speed calculation (compare with t - 1 hour)
        // Check retro: if longitude decreases. 
        // NOTE: This checks apparent speed, which is fine.
        const timePrev = time.AddDays(-1/24);
        const eqPrev = Equator(bodyKey, timePrev, observer, true, true);
        const eclPrev = equatorialToEcliptic(eqPrev.ra, eqPrev.dec, obl);
        let speed = ecl.lon - eclPrev.lon;
        if (speed > 180) speed -= 360;
        if (speed < -180) speed += 360;
        
        const zInfo = getZodiacInfo(ecl.lon);

        planets[bodyName] = {
            name: bodyName,
            lon: ecl.lon,
            lat: ecl.lat,
            speed: speed,
            sign: zInfo.sign,
            signDegree: zInfo.degree,
            isRetro: speed < 0,
            house: 0 
        };
    }

    // Calculate Houses (Equal House System for MVP)
    // House 1 starts at ASC. Each house is 30 degrees.
    const houses: HouseCusp[] = [];
    for (let i = 0; i < 12; i++) {
        const cuspLon = normalizeDegrees(asc + i * 30);
        const z = getZodiacInfo(cuspLon);
        houses.push({
            house: i + 1,
            lon: cuspLon,
            sign: z.sign,
            signDegree: z.degree
        });
    }

    // Assign Planets to Houses
    for (const pKey in planets) {
        const p = planets[pKey];
        // Simple logic for Equal houses:
        // House = floor((PlanetLon - AscLon) / 30) + 1
        let diff = p.lon - asc;
        if (diff < 0) diff += 360;
        const houseNum = Math.floor(diff / 30) + 1;
        p.house = houseNum;
    }

    return {
        date: dateTime.toISOString(),
        planets,
        houses,
        ascendant: asc,
        mc: mc
    };
}
