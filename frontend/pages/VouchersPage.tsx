
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const VouchersPage: React.FC = () => {
  const voucherProducts = PRODUCTS.filter(p => p.category === 'Vouchers');

  return (
    <div className="pb-24">
      {/* Vouchers Hero Section */}
      <section className="relative h-[50vh] min-h-[450px] flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://stripesandchecksinc.com/cdn/shop/collections/Gift_Voucher.png?v=1759075426&width=1100" 
            alt="Gift Vouchers Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
        
        <div className="relative z-10 text-center space-y-4 px-4 bg-white/20 backdrop-blur-md p-10 md:p-16 border border-white/30 shadow-2xl max-w-xl mx-auto">
          <span className="text-[10px] text-stone-900 uppercase tracking-[0.5em] font-bold">The Perfect Present</span>
          <h1 className="text-4xl md:text-5xl text-stone-900 serif italic font-light">Gift Vouchers</h1>
          <p className="max-w-xs mx-auto text-[11px] text-stone-800 opacity-90 leading-relaxed font-light tracking-widest uppercase">
            Excellence, by their own choice.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Description & Feature Image */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-3xl serif italic">Gift Vouchers</h2>
              <p className="text-stone-600 text-sm leading-relaxed italic">
                Struggling to find the perfect gift? Our gift vouchers are the answer! Let your loved ones pick their own presents from our wide range of products. With our gift vouchers, you're giving the gift of choice and ensuring they get exactly what they want. It's the ideal way to make any occasion special.
              </p>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-sm shadow-lg">
                <img 
                  src="https://stripesandchecksinc.com/cdn/shop/files/2_423eaefe-3f49-4c8b-970e-5a4817c52a4d_1880x.png?v=1702027225" 
                  alt="Gift Selection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Voucher Selection List */}
          <div className="space-y-8">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Available Denominations</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {voucherProducts.map(voucher => (
                <Link 
                  key={voucher.id} 
                  to={`/product/${voucher.id}`} 
                  className="border border-stone-200 p-8 text-center hover:border-stone-900 hover:shadow-xl transition-all group rounded-sm bg-white"
                >
                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-stone-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-900 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-sm serif mb-2 uppercase tracking-tight">{voucher.name}</h3>
                  <p className="text-[11px] font-bold text-stone-400">Rs. {voucher.price.toLocaleString()}</p>
                  <div className="mt-6 text-[9px] font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                    Select Amount
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="bg-stone-50 p-6 rounded-sm border border-stone-100">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3">Instant Delivery</h4>
              <p className="text-[11px] text-stone-500 italic leading-relaxed">
                Our digital gift vouchers are sent directly via email to the recipient or your own inbox, making them the perfect last-minute gesture of sophistication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VouchersPage;
