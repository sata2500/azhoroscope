export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio' 
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type PlanetName = 
  | 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' 
  | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto'
  | 'North Node' | 'South Node' | 'Chiron' | 'Lilith'
  | 'Ascendant' | 'Midheaven' | 'Vertex' | 'Part of Fortune';

export interface PlanetPosition {
  name: PlanetName;
  lon: number; // Longitude (0-360)
  lat: number; // Latitude
  speed: number; // Speed in longitude (negative means retro)
  sign: ZodiacSign;
  signDegree: number; // 0-30 in the sign
  isRetro: boolean;
  house: number; // 1-12
}

export interface HouseCusp {
  house: number; // 1-12
  lon: number; // 0-360
  sign: ZodiacSign;
  signDegree: number;
}

export interface BirthChart {
  date: string;
  planets: Record<string, PlanetPosition>;
  houses: HouseCusp[];
  ascendant: number;
  mc: number;
}
