import axios from 'axios';
import { API_URL } from '../context/AuthContext';

const RAZORPAY_CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_CHECKOUT_SCRIPT}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Razorpay checkout script.')));
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_SCRIPT;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout script.'));

    document.body.appendChild(script);
  });
};

export const createBackendRazorpayOrder = async (payload) => {
  const response = await axios.post(`${API_URL}/orders/create-payment-order`, payload);
  return response.data;
};

export const verifyRazorpayPayment = async (payload) => {
  const response = await axios.post(`${API_URL}/orders/verify-payment`, payload);
  return response.data;
};

export const openRazorpayCheckout = async ({
  orderId,
  amount,
  currency,
  keyId,
  customerName,
  email,
  phone,
  onSuccess,
  onFailure,
  onCancel,
}) => {
  await loadRazorpayScript();

  if (!window.Razorpay) {
    throw new Error('Razorpay Checkout library is not available.');
  }

  const options = {
    key: keyId,
    amount,
    currency,
    name: 'OneWinq',
    description: 'OneWinq Payment',
    order_id: orderId,
    handler: async function (response) {
      if (onSuccess) {
        await onSuccess(response);
      }
    },
    prefill: {
      name: customerName || '',
      contact: phone || '',
      email: email || '',
    },
    notes: {
      source: 'onewinq-pricing',
    },
    theme: {
      color: '#7c3aed',
    },
  };

  const razorpayInstance = new window.Razorpay(options);

  razorpayInstance.on('payment.failed', (error) => {
    if (onFailure) {
      onFailure(error);
    }
  });

  razorpayInstance.on('payment.cancelled', () => {
    if (onCancel) {
      onCancel();
    }
  });

  razorpayInstance.open();
};
