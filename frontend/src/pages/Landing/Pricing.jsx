import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createBackendRazorpayOrder, openRazorpayCheckout, verifyRazorpayPayment } from '../../utils/razorpay';
import { 
  Sparkles, Check, ArrowRight, CreditCard, ShieldCheck, Globe, RefreshCw, 
  ShoppingCart, Briefcase, ChevronDown, ChevronUp, Star, Lock, Zap, Award, Layers, Sparkle, Loader2
} from 'lucide-react';

const Pricing = () => {
  const { user } = useAuth();
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [customNameOnCard, setCustomNameOnCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState('');
  // Selected colors for physical cards preview
  const [essentialColor, setEssentialColor] = useState('black');
  const [signatureColor, setSignatureColor] = useState('black');
  const [metalColor, setMetalColor] = useState('black');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Modal State for Ordering Card
  const [selectedCardForOrder, setSelectedCardForOrder] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToCards = () => {
    const el = document.getElementById('cards-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProPlanCheckout = async () => {
    try {
      setOrderSubmitting(true);
      const paymentOrder = await createBackendRazorpayOrder({
        productType: 'pro_plan',
        cardName: 'Pro Plan',
        customerName: user?.name || 'OneWinq Customer',
        phone: user?.phone || '+910000000000',
        shippingAddress: 'Razorpay Checkout',
        userId: user?._id || null,
      });

      await openRazorpayCheckout({
        orderId: paymentOrder.orderId,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        keyId: paymentOrder.keyId,
        customerName: user?.name || 'OneWinq Customer',
        phone: user?.phone || '',
        email: user?.email || '',
        onSuccess: async (response) => {
          const verifyPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verifyRes = await verifyRazorpayPayment(verifyPayload);
          if (verifyRes.success) {
            setOrderSuccessMsg('Pro plan payment verified successfully.');
          } else {
            setOrderSuccessMsg('Payment verification failed.');
          }
        },
        onFailure: (error) => {
          setOrderSuccessMsg(error?.description || 'Payment failed.');
        },
        onCancel: () => {
          setOrderSuccessMsg('Payment cancelled.');
        },
      });
    } catch (error) {
      console.error(error);
      setOrderSuccessMsg(error?.response?.data?.message || error?.message || 'Payment setup failed.');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Can I use OneWinq without a card?",
      a: "Yes! You can use your digital identity profile, QR code, and link-in-bio completely free without purchasing a physical card."
    },
    {
      q: "Can I order a card later?",
      a: "Absolutely. You can start with a free account and order any physical NFC card (Essential, Signature, or Metal) at any time from your dashboard or pricing page."
    },
    {
      q: "Can I update my profile anytime?",
      a: "Yes, your digital card updates in real-time. Whenever you change your info, links, or theme in the dashboard, anyone tapping your card instantly sees the updated version."
    },
    {
      q: "Can I connect multiple cards?",
      a: "Pro and Business subscribers can link multiple physical NFC cards to the same profile or manage different cards for different contexts."
    }
  ];

  return (
    <div className="bg-[#FAFBFD] text-slate-900 min-h-screen pt-8 pb-20 font-googlesans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left Column: Headline & Controls */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Choose Your <br className="hidden sm:inline" />
              <span className="text-slate-900">One</span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Winq</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal max-w-xl leading-relaxed">
              Build your digital identity and choose the perfect plan and card that fits you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md shadow-purple-500/20 inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Start Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={scrollToCards}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all inline-flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>Order Card</span>
                <CreditCard className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            {/* Social Proof Stack */}
            <div className="flex items-center space-x-3 pt-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="User 1"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="User 2"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="User 3"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                <span className="font-bold text-slate-800">Join 10,000+ professionals</span> building their identity with OneWinq
              </p>
            </div>
          </div>

          {/* Right Column: Sleek 3D Cards Graphic Preview */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6">
            {/* Ambient Background Glow */}
            <div className="absolute w-72 h-72 bg-purple-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>

            {/* 3D Stacked NFC Cards Container */}
            <div className="relative w-full max-w-md h-72 sm:h-80 flex items-center justify-center">
              
              {/* Back Card (Angled Top Right) */}
              <div className="absolute top-2 right-4 w-72 sm:w-80 h-44 sm:h-48 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-2xl transform rotate-6 border border-slate-700 flex flex-col justify-between transition-transform duration-500 hover:rotate-3">
                <div className="flex justify-between items-start">
                  <span className="font-black text-lg tracking-wider text-white">onewinq</span>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 0 1 10 10" />
                      <path d="M12 6a6 6 0 0 1 6 6" />
                      <path d="M12 10a2 2 0 0 1 2 2" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center my-auto">
                  <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center animate-ping">
                    <div className="w-8 h-8 rounded-full bg-purple-500/60 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-purple-200" />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">NFC ACTIVE</span>
                </div>
              </div>

              {/* Front Card (Angled Left Bottom) */}
              <div className="absolute bottom-2 left-2 w-72 sm:w-80 h-44 sm:h-48 bg-slate-950 rounded-2xl p-5 text-white shadow-2xl transform -rotate-3 border border-slate-800 flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-white">One Tap.</h4>
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-purple-300">Infinite Identity.</h4>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-xs text-purple-400 font-medium">onewinq.com</span>
                  <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">Pro Edition</span>
                </div>
              </div>

              {/* Small floating dot accent */}
              <div className="absolute top-12 left-6 w-3 h-3 bg-purple-400 rounded-full blur-xs"></div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VALUE PROPOSITION STATS BAR */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Item 1 */}
            <div className="flex items-center space-x-4 pt-3 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-900">No Hidden Charges</h4>
                <p className="text-xs text-slate-500 font-medium">Transparent pricing</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center space-x-4 pt-3 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-900">Works Worldwide</h4>
                <p className="text-xs text-slate-500 font-medium">Shipping to 100+ countries</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center space-x-4 pt-3 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-900">30 Day Returns</h4>
                <p className="text-xs text-slate-500 font-medium">Hassle-free returns</p>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: CHOOSE YOUR PLAN */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              1. Choose Your Plan
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Powerful features to build and grow your digital identity.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            
            {/* Free Plan Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between text-left hover:shadow-lg transition-all">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Free</h3>
                
                <div className="mt-4 mb-2 flex items-baseline space-x-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">₹0</span>
                  <span className="text-slate-500 text-xs sm:text-sm font-semibold">Forever free</span>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-6">Forever</p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    'Digital Identity',
                    '1 Card Connection',
                    'Basic Templates',
                    'Contact Sharing',
                    'QR Code',
                    'Save Contact'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 font-semibold">
                      <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 py-3 rounded-xl font-extrabold text-center text-xs sm:text-sm transition-all shadow-2xs block"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan Card (Featured) */}
            <div className="bg-white border-2 border-purple-600 rounded-3xl p-8 relative flex flex-col justify-between text-left shadow-xl shadow-purple-500/5">
              
              {/* Most Popular Badge */}
              <div className="absolute -top-3.5 right-8 bg-purple-700 text-white px-3.5 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-xs">
                MOST POPULAR
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Pro</h3>
                
                <div className="mt-4 mb-2 flex items-baseline space-x-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">₹999</span>
                  <span className="text-slate-500 text-xs sm:text-sm font-semibold">/ year</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-6">Everything you need to build your personal brand.</p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    'Everything in Free',
                    'Premium Templates',
                    'AI Profile Assistant',
                    'Multiple Cards',
                    'Identity Analytics',
                    'Lead Collection',
                    'Custom Username',
                    'Priority Support',
                    'Theme Customization'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-800 font-bold">
                      <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleProPlanCheckout}
                disabled={orderSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-extrabold text-center text-xs sm:text-sm transition-all shadow-md shadow-purple-600/20 inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{orderSubmitting ? 'Preparing...' : 'Upgrade to Pro'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: CHOOSE YOUR ONEWINQ CARD */}
        {/* ========================================================================= */}
        <div id="cards-section" className="space-y-8 pt-4">
          {/* Section Header */}
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              2. Choose Your OneWinq Card
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Premium NFC cards to share your identity instantly.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Essential */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between text-left hover:shadow-md transition-all">
              <div>
                {/* Card Preview Box */}
                <div className="h-40 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4 relative mb-4">
                  <div className={`w-36 h-22 rounded-xl shadow-md p-3 flex flex-col justify-between transition-colors duration-300 ${
                    essentialColor === 'black' ? 'bg-slate-900 text-white' : 
                    essentialColor === 'white' ? 'bg-white text-slate-900 border border-slate-200' : 
                    'bg-blue-600 text-white'
                  }`}>
                    <div className="flex justify-between items-start">
                      <span className="font-black text-xs">onewinq</span>
                      <Zap className="h-3 w-3" />
                    </div>
                    <div className="text-[9px] opacity-75 font-semibold">NFC Essential</div>
                  </div>
                </div>

                {/* Color dots */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <button 
                    onClick={() => setEssentialColor('black')}
                    className={`w-3.5 h-3.5 rounded-full bg-slate-900 ring-2 ${essentialColor === 'black' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                  <button 
                    onClick={() => setEssentialColor('white')}
                    className={`w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-400 ring-2 ${essentialColor === 'white' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                  <button 
                    onClick={() => setEssentialColor('blue')}
                    className={`w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ${essentialColor === 'blue' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">Essential</h3>
                <p className="text-xs text-slate-400 font-semibold">PVC Card</p>
                <p className="text-xs text-slate-600 mt-2 font-medium">Sleek. Minimal. Effective.</p>
                
                <div className="mt-4 mb-6">
                  <span className="text-2xl font-black text-slate-900">₹499</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCardForOrder({ name: 'Essential Card', price: '₹499', productType: 'essential_card' })}
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>Order Now</span>
                <ShoppingCart className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            {/* Card 2: Signature (Featured with Badge) */}
            <div className="bg-white border-2 border-purple-600 rounded-3xl p-6 relative flex flex-col justify-between text-left shadow-lg shadow-purple-500/5">
              
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-700 text-white px-3.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase">
                MOST POPULAR
              </div>

              <div>
                {/* Card Preview Box */}
                <div className="h-40 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-center justify-center p-4 relative mb-4">
                  <div className={`w-36 h-22 rounded-xl shadow-lg p-3 flex flex-col justify-between transition-colors duration-300 ${
                    signatureColor === 'black' ? 'bg-slate-950 text-amber-300 border border-amber-400/30' : 
                    signatureColor === 'gold' ? 'bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 text-slate-900' : 
                    'bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-900'
                  }`}>
                    <div className="flex justify-between items-start">
                      <span className="font-black text-xs">onewinq</span>
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <div className="text-[9px] font-bold">Signature Matte</div>
                  </div>
                </div>

                {/* Color dots */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <button 
                    onClick={() => setSignatureColor('black')}
                    className={`w-3.5 h-3.5 rounded-full bg-slate-950 ring-2 ${signatureColor === 'black' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                  <button 
                    onClick={() => setSignatureColor('gold')}
                    className={`w-3.5 h-3.5 rounded-full bg-amber-400 ring-2 ${signatureColor === 'gold' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                  <button 
                    onClick={() => setSignatureColor('silver')}
                    className={`w-3.5 h-3.5 rounded-full bg-slate-300 ring-2 ${signatureColor === 'silver' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">Signature</h3>
                <p className="text-xs text-slate-400 font-semibold">Premium Matte Card</p>
                <p className="text-xs text-slate-600 mt-2 font-medium">Elegant matte finish with a premium feel.</p>
                
                <div className="mt-4 mb-6">
                  <span className="text-2xl font-black text-slate-900">₹999</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCardForOrder({ name: 'Signature Card', price: '₹999', color: signatureColor })}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-purple-600/20"
              >
                <span>Order Now</span>
                <ShoppingCart className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Card 3: Metal */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between text-left hover:shadow-md transition-all">
              <div>
                {/* Card Preview Box */}
                <div className="h-40 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4 relative mb-4">
                  <div className={`w-36 h-22 rounded-xl shadow-md p-3 flex flex-col justify-between transition-colors duration-300 ${
                    metalColor === 'black' ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-100 border border-slate-700' : 
                    'bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 text-slate-900'
                  }`}>
                    <div className="flex justify-between items-start">
                      <span className="font-black text-xs">onewinq</span>
                      <Award className="h-3 w-3" />
                    </div>
                    <div className="text-[9px] font-mono tracking-wider uppercase font-bold">STAINLESS STEEL</div>
                  </div>
                </div>

                {/* Color dots */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <button 
                    onClick={() => setMetalColor('black')}
                    className={`w-3.5 h-3.5 rounded-full bg-slate-900 ring-2 ${metalColor === 'black' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                  <button 
                    onClick={() => setMetalColor('silver')}
                    className={`w-3.5 h-3.5 rounded-full bg-slate-400 ring-2 ${metalColor === 'silver' ? 'ring-purple-600 scale-110' : 'ring-transparent'}`} 
                  />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">Metal</h3>
                <p className="text-xs text-slate-400 font-semibold">Stainless Steel Card</p>
                <p className="text-xs text-slate-600 mt-2 font-medium">Luxury metal card with laser engraving.</p>
                
                <div className="mt-4 mb-6">
                  <span className="text-2xl font-black text-slate-900">₹2,999</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCardForOrder({ name: 'Metal NFC Card', price: '₹2,999', color: metalColor })}
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>Order Now</span>
                <ShoppingCart className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            {/* Card 4: Business */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between text-left hover:shadow-md transition-all">
              <div>
                {/* Card Preview Box */}
                <div className="h-40 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4 relative mb-4">
                  <div className="w-36 h-22 rounded-xl bg-slate-900 text-white shadow-md p-3 flex flex-col justify-between border border-slate-800">
                    <div className="flex justify-between items-start">
                      <span className="font-black text-xs">onewinq</span>
                      <Briefcase className="h-3 w-3 text-purple-400" />
                    </div>
                    <div className="text-[9px] text-purple-300 font-semibold">Enterprise Team</div>
                  </div>
                </div>

                <div className="h-3.5 mb-4"></div>

                <h3 className="text-xl font-extrabold text-slate-900">Business</h3>
                <p className="text-xs text-slate-400 font-semibold">Custom Cards</p>
                <p className="text-xs text-slate-600 mt-2 font-medium">Bulk orders with your brand. Perfect for teams.</p>
                
                <div className="mt-4 mb-6">
                  <span className="text-lg font-bold text-slate-800">Contact Sales</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>Contact Us</span>
                <Briefcase className="h-4 w-4 text-slate-600" />
              </Link>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: COMPARE PLANS */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          {/* Section Header */}
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              3. Compare Plans
            </h2>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="py-4 px-6 text-sm font-bold text-slate-800 w-1/3">Features</th>
                    <th className="py-4 px-6 text-sm font-bold text-slate-800 text-center w-1/3">
                      <div>Free</div>
                      <div className="text-xs font-normal text-slate-500">₹0</div>
                    </th>
                    <th className="py-4 px-6 text-sm font-bold text-slate-800 text-center w-1/3">
                      <div>Pro</div>
                      <div className="text-xs font-normal text-slate-500">₹999 / year</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <Layers className="h-4 w-4 text-slate-400" />
                      <span>Digital Identity</span>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="h-4 w-4 text-purple-600 mx-auto stroke-[3]" />
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="h-4 w-4 text-purple-600 mx-auto stroke-[3]" />
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-slate-400" />
                      <span>NFC Card Support</span>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-600 font-semibold">1 Card</td>
                    <td className="py-3.5 px-6 text-center text-slate-800 font-bold">Multiple Cards</td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-slate-400" />
                      <span>Templates</span>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-600 font-semibold">Basic</td>
                    <td className="py-3.5 px-6 text-center text-slate-800 font-bold">Premium</td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-slate-400" />
                      <span>AI Profile Assistant</span>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">—</td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="h-4 w-4 text-purple-600 mx-auto stroke-[3]" />
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <Star className="h-4 w-4 text-slate-400" />
                      <span>Identity Analytics</span>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">—</td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="h-4 w-4 text-purple-600 mx-auto stroke-[3]" />
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-slate-400" />
                      <span>Lead Collection</span>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">—</td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="h-4 w-4 text-purple-600 mx-auto stroke-[3]" />
                    </td>
                  </tr>

                  {/* Row 7 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-slate-400" />
                      <span>Custom Username</span>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">—</td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="h-4 w-4 text-purple-600 mx-auto stroke-[3]" />
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-700 flex items-center space-x-2">
                      <ShieldCheck className="h-4 w-4 text-slate-400" />
                      <span>Priority Support</span>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">—</td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="h-4 w-4 text-purple-600 mx-auto stroke-[3]" />
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION: FOUNDER EDITION & FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Left Side: Founder Edition Banner */}
          <div className="lg:col-span-7 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl">
            {/* Gold ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-0"></div>

            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Founder Edition</span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  your digital identity?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  Starvidually numbered. Built for early believers.
                </p>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="flex items-start space-x-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-300">Individually Numbered</span>
                </div>
                <div className="flex items-start space-x-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <Zap className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-300">Free Premium Upgrades</span>
                </div>
                <div className="flex items-start space-x-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <Star className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-300">Founder Badge</span>
                </div>
                <div className="flex items-start space-x-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <Sparkle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-300">Early Access to New Features</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Reserve Button & Counter */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={() => setSelectedCardForOrder({ name: 'Founder Edition Card (Limited)', price: '₹4,999', color: 'Gold Matte' })}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition-all inline-flex items-center space-x-2 cursor-pointer shadow-md"
              >
                <span>Reserve Yours Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 tracking-wider block font-semibold">Remaining</span>
                <span className="text-base font-black text-amber-400">12 / 26</span>
              </div>
            </div>
          </div>

          {/* Right Side: Frequently Asked Questions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              5. Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-4 px-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-purple-600 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* ORDER CARD MODAL */}
      {/* ========================================================================= */}
      {selectedCardForOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-left space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase text-purple-600 tracking-wider">Order NFC Physical Card</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedCardForOrder.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCardForOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Total Price:</span>
              <span className="text-2xl font-black text-purple-700">{selectedCardForOrder.price}</span>
            </div>

            {orderSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl space-y-3 text-center">
                <Check className="h-10 w-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-base">Order Placed Successfully!</h4>
                <p className="text-xs text-emerald-700">{orderSuccessMsg}</p>
                <button
                  onClick={() => {
                    setSelectedCardForOrder(null);
                    setOrderSuccessMsg('');
                  }}
                  className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!selectedCardForOrder) return;

                  setOrderSubmitting(true);
                  try {
                    const paymentOrder = await createBackendRazorpayOrder({
                      productType: selectedCardForOrder.productType,
                      cardName: selectedCardForOrder.name,
                      cardColor: selectedCardForOrder.color || 'Standard Black',
                      customNameOnCard: customNameOnCard || customerName,
                      price: selectedCardForOrder.price,
                      customerName,
                      email: email || user?.email || '',
                      phone,
                      shippingAddress,
                      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
                      paymentMethod,
                      transactionId,
                      notes,
                      userId: user?._id || null,
                    });

                    await openRazorpayCheckout({
                      orderId: paymentOrder.orderId,
                      amount: paymentOrder.amount,
                      currency: paymentOrder.currency,
                      keyId: paymentOrder.keyId,
                      customerName,
                      phone,
                      email: user?.email || '',
                      onSuccess: async (response) => {
                        const verifyResponse = await verifyRazorpayPayment({
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyResponse.success) {
                          setOrderSuccessMsg('Payment verified successfully! Admin notification sent.');
                          setCustomerName('');
                          setPhone('');
                          setShippingAddress('');
                        } else {
                          setOrderSuccessMsg('Payment verification failed.');
                        }
                      },
                      onFailure: (error) => {
                        setOrderSuccessMsg(error?.description || 'Payment failed.');
                      },
                      onCancel: () => {
                        setOrderSuccessMsg('Payment cancelled.');
                      },
                    });
                  } catch (err) {
                    alert(err.response?.data?.message || err.message || 'Failed to place order. Please try again.');
                  } finally {
                    setOrderSubmitting(false);
                  }
                }}
                className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Custom Name to Print on Card <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={customNameOnCard}
                    onChange={(e) => setCustomNameOnCard(e.target.value)}
                    placeholder={customerName || "e.g. John Doe"}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Shipping Address with Pincode *</label>
                  <textarea
                    required
                    rows="2"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="House no, Street, Landmark, City, State, Pincode"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-3">
                  <span className="text-xs font-bold uppercase text-slate-800 block">Payment Method</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {['UPI', 'QR Code', 'Card / NetBanking', 'Cash on Delivery'].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                          paymentMethod === method 
                            ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-2xs' 
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <span>{method}</span>
                        {paymentMethod === method && <Check className="h-3.5 w-3.5 text-purple-600" />}
                      </button>
                    ))}
                  </div>

                  {paymentMethod !== 'Cash on Delivery' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        UPI Ref / Transaction Reference ID <span className="text-slate-400 font-normal">(Optional/Recommended)</span>
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="e.g. UTR 4239102941 / UPI Ref 928301"
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 font-mono"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    disabled={orderSubmitting}
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-purple-600/20 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {orderSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting Order...</span>
                      </>
                    ) : (
                      <span>Confirm & Place Order</span>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Pricing;
