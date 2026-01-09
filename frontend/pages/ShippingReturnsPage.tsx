
import React from 'react';

const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Client Service</span>
          <h1 className="text-4xl md:text-5xl serif italic">Shipping & Returns</h1>
        </div>

        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl serif italic">Delivery Information</h2>
            <div className="prose prose-stone text-sm text-stone-500 leading-relaxed max-w-none">
              <p>Elysian provides premium delivery services across Sri Lanka. Each order is packaged in our signature archive boxes to ensure your pieces arrive in pristine condition.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Island-wide Standard Delivery:</strong> Free on orders over Rs. 45,000. For orders below this amount, a flat rate of Rs. 750 applies.</li>
                <li><strong>Colombo Express:</strong> Same-day delivery available for orders placed before 12:00 PM (Business days only).</li>
                <li><strong>International Shipping:</strong> We currently ship to selected regions globally via DHL Express. Rates are calculated at checkout.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 border-t border-stone-100 pt-8">
            <h2 className="text-xl serif italic">Return Policy</h2>
            <div className="prose prose-stone text-sm text-stone-500 leading-relaxed max-w-none">
              <p>We want you to be completely satisfied with your purchase. If a garment doesn't meet your expectations, we offer a seamless return process.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>30-Day Window:</strong> Items can be returned within 30 days of the delivery date.</li>
                <li><strong>Condition:</strong> Items must be unworn, unwashed, and in their original packaging with all tags attached.</li>
                <li><strong>Vouchers:</strong> Gift vouchers are non-refundable.</li>
                <li><strong>Exchanges:</strong> We offer complimentary size exchanges for all domestic orders.</li>
              </ul>
            </div>
          </div>

          <div className="bg-stone-100 p-8 text-center rounded-sm">
            <p className="text-xs uppercase tracking-widest text-stone-900 font-bold mb-2">Need assistance with a return?</p>
            <p className="text-sm text-stone-500 italic mb-4">Contact our support team to initiate your request.</p>
            <a href="mailto:returns@elysianmen.lk" className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1">returns@elysianmen.lk</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
