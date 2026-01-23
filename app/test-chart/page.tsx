
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming button exists
// If not, use standard button

export default function TestChartPage() {
  const [formData, setFormData] = useState({
    date: '2000-01-01',
    time: '12:00',
    lat: '41.0082',
    lon: '28.9784'
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/horoscope/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Birth Chart Test</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input 
              type="time" 
              value={formData.time}
              onChange={e => setFormData({...formData, time: e.target.value})}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Latitude</label>
            <input 
              type="number" step="0.0001"
              value={formData.lat}
              onChange={e => setFormData({...formData, lat: e.target.value})}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Longitude</label>
            <input 
              type="number" step="0.0001"
              value={formData.lon}
              onChange={e => setFormData({...formData, lon: e.target.value})}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Calculate Chart'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-bold">Angles</h3>
                <p>Ascendant: {result.ascendant?.toFixed(2)}</p>
                <p>MC: {result.mc?.toFixed(2)}</p>
            </div>
          </div>

          <div>
             <h3 className="font-bold mb-2">Planets</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.values(result.planets as Record<string, any>).map((p: any) => (
                    <div key={p.name} className="border p-2 rounded text-sm">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-gray-600 capitalize">
                            {p.sign} {Math.floor(p.signDegree)}° {Math.round((p.signDegree % 1)*60)}'
                        </div>
                        <div className="text-xs text-gray-500">House {p.house}</div>
                    </div>
                ))}
             </div>
          </div>

           <div>
             <h3 className="font-bold mb-2">Houses</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {result.houses.map((h: any) => (
                    <div key={h.house} className="border p-2 rounded text-sm">
                        <div className="font-medium">House {h.house}</div>
                        <div className="text-gray-600 capitalize">
                            {h.sign} {Math.floor(h.signDegree)}°
                        </div>
                    </div>
                ))}
             </div>
          </div>
          
          <pre className="bg-gray-900 text-white p-4 rounded overflow-auto h-64 text-xs mt-4">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
