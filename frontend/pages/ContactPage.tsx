
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl serif italic">Contact Us</h1>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md">
              Our concierge team is available to assist you with styling advice, sizing inquiries, or order details.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Flagship Boutique</h3>
              <p className="text-sm text-stone-500 italic">No. 45, Alfred House Gardens, Colombo 00300, Sri Lanka</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Inquiries</h3>
              <p className="text-sm text-stone-500 italic">concierge@elysianmen.lk</p>
              <p className="text-sm text-stone-500 italic">+94 11 234 5678</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Operating Hours</h3>
              <p className="text-sm text-stone-500 italic">Monday – Saturday: 10:00 AM – 7:00 PM</p>
              <p className="text-sm text-stone-500 italic">Sunday: 11:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 rounded-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Full Name</label>
              <input type="text" className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Subject</label>
              <select className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm">
                <option>General Inquiry</option>
                <option>Order Support</option>
                <option>Style Advice</option>
                <option>Wholesale</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm resize-none" />
            </div>
            <button className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
