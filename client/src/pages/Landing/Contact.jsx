import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-light border border-brand/20 px-3.5 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider">
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl leading-tight">
            Get In <span className="text-brand">Touch</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-550 font-medium">
            Have questions about physical card delivery or bulk orders? We're here to help.
          </p>
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
          
          {/* Info Side */}
          <div className="md:col-span-1 space-y-6 text-left">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-4">
              <div className="bg-brand-light text-brand p-2.5 rounded-lg border border-brand/10 shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">Email Us</h4>
                <p className="text-xs sm:text-sm text-slate-550 font-medium">support@onewinq.com</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Response in 24 hours</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-4">
              <div className="bg-brand-light text-brand p-2.5 rounded-lg border border-brand/10 shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">Call Support</h4>
                <p className="text-xs sm:text-sm text-slate-550 font-medium">+91 78699 18736</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Mon-Sat, 9AM - 6PM</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-4">
              <div className="bg-brand-light text-brand p-2.5 rounded-lg border border-brand/10 shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">Office Address</h4>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-medium">NX Group HQ, Indore, Madhya Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2 text-left">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6 font-medium">
                    Thank you for contacting us. Our team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-brand hover:bg-brand-hover text-white font-bold px-6 py-2.5 rounded-lg transition-all shadow-xs cursor-pointer text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-550 uppercase tracking-wider mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-brand focus:bg-white text-sm transition-all"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-brand focus:bg-white text-sm transition-all"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-550 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-brand focus:bg-white text-sm transition-all"
                      placeholder="Bulk RFID cards inquiry"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-550 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      required
                      rows="4"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-brand focus:bg-white text-sm transition-all"
                      placeholder="Type your message here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-brand hover:bg-brand-hover text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer text-xs"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
