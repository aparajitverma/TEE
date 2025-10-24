'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Tawk.to configuration
    const Tawk_API = (window as any).Tawk_API || {};
    const Tawk_LoadStart = new Date();

    // Configure Tawk.to settings
    Tawk_API.onLoad = function() {
      // Set business hours (9 AM - 6 PM IST)
      // Tawk.to will automatically show offline message outside these hours
      console.log('Tawk.to chat loaded successfully');
    };

    // Auto-response configuration
    Tawk_API.onChatStarted = function() {
      console.log('Chat started');
    };

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Store Tawk configuration on window
    (window as any).Tawk_API = Tawk_API;
    (window as any).Tawk_LoadStart = Tawk_LoadStart;

    // Cleanup function
    return () => {
      // Remove Tawk.to widget on component unmount
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
      const tawkWidget = document.getElementById('tawk-bubble');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}
