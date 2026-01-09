
import React, { useState } from 'react';

const SizeGuidePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Shirts' | 'Chinos'>('Shirts');

  const shirtSizes = [
    { size: 'S', neck: '14.5"', chest: '38"', waist: '34"' },
    { size: 'M', neck: '15.5"', chest: '40"', waist: '36"' },
    { size: 'L', neck: '16.5"', chest: '42"', waist: '38"' },
    { size: 'XL', neck: '17.5"', chest: '44"', waist: '40"' },
    { size: 'XXL', neck: '18.5"', chest: '46"', waist: '42"' },
  ];

  const chinoSizes = [
    { size: '30', waist: '30"', inside: '32"', leg: '7"' },
    { size: '32', waist: '32"', inside: '32"', leg: '7.2"' },
    { size: '34', waist: '34"', inside: '33"', leg: '7.5"' },
    { size: '36', waist: '36"', inside: '33"', leg: '7.7"' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Precision</span>
          <h1 className="text-4xl md:text-5xl serif italic">Size Guide</h1>
          <p className="text-stone-500 text-sm italic max-w-lg mx-auto leading-relaxed">
            Elysian garments are tailored to a modern slim fit. Use the charts below to find your ideal proportions.
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex justify-center space-x-8 border-b border-stone-100">
            {['Shirts', 'Chinos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-stone-900">Size</th>
                  {activeTab === 'Shirts' ? (
                    <>
                      <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-stone-900">Neck</th>
                      <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-stone-900">Chest</th>
                      <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-stone-900">Waist</th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-stone-900">Waist</th>
                      <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-stone-900">Inside Leg</th>
                      <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-stone-900">Leg Opening</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {(activeTab === 'Shirts' ? shirtSizes : chinoSizes).map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="py-4 font-bold text-stone-900">{row.size}</td>
                    {activeTab === 'Shirts' ? (
                      <>
                        <td className="py-4 text-stone-500">{(row as any).neck}</td>
                        <td className="py-4 text-stone-500">{(row as any).chest}</td>
                        <td className="py-4 text-stone-500">{(row as any).waist}</td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 text-stone-500">{(row as any).waist}</td>
                        <td className="py-4 text-stone-500">{(row as any).inside}</td>
                        <td className="py-4 text-stone-500">{(row as any).leg}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-stone-50 p-10 border border-stone-100 rounded-sm">
          <h3 className="text-xl serif italic mb-6">Measuring Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-stone-500 leading-relaxed italic">
            <div className="space-y-4">
              <p><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal under your arms.</p>
              <p><strong>Waist:</strong> Measure around your natural waistline, typically the narrowest part of your torso.</p>
            </div>
            <div className="space-y-4">
              <p><strong>Neck:</strong> Measure around the base of your neck where the collar normally sits.</p>
              <p><strong>Fit Advice:</strong> If you are between sizes, we recommend selecting the larger size for a more relaxed drape.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
