
import { calculateChart } from '../lib/astrology/engine';

console.log('Testing astronomy-engine...');

async function run() {
    try {
        const result = await calculateChart('2000-01-01', '12:00', 41.0082, 28.9784);
        console.log('Chart Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
