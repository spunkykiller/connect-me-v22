import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const CookieConsent = () => {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowConsent(true);
        } else if (consent === 'accepted') {
            initializeAnalytics();
        }

        // Event listener to reopen settings from footer
        const handleReopen = () => {
            setShowConsent(true);
        };
        window.addEventListener('openCookieConsent', handleReopen);

        return () => window.removeEventListener('openCookieConsent', handleReopen);
    }, []);

    const initializeAnalytics = () => {
        console.log("Analytics tracking initialized.");

        // Lazy load Google Analytics 4
        if (!document.getElementById('ga4-script')) {
            const gaScript = document.createElement('script');
            gaScript.id = 'ga4-script';
            gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
            gaScript.async = true;
            document.head.appendChild(gaScript);

            const gaConfig = document.createElement('script');
            gaConfig.id = 'ga4-config';
            gaConfig.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
            `;
            document.head.appendChild(gaConfig);
        }

        // Lazy load Microsoft Clarity
        if (!document.getElementById('clarity-script')) {
            const clarityScript = document.createElement('script');
            clarityScript.id = 'clarity-script';
            clarityScript.innerHTML = `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "abcdefghij");
            `;
            document.head.appendChild(clarityScript);
        }
    };

    const removeAnalyticsScripts = () => {
        const scriptsToRemove = ['ga4-script', 'ga4-config', 'clarity-script'];
        scriptsToRemove.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });
        console.log("Analytics scripts blocked/removed.");
    };

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowConsent(false);
        initializeAnalytics();
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setShowConsent(false);
        removeAnalyticsScripts();
    };

    if (!showConsent) return null;

    return (
        <div className="cookie-consent-overlay">
            <div className="cookie-consent-box">
                <h3>We value your privacy</h3>
                <p>
                    We use cookies to improve your experience on our site, personalize content,
                    and analyze web traffic using Google Analytics and MS Clarity. Read our <Link to="/privacy-policy" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Privacy Policy</Link> to learn more.
                </p>
                <div className="cookie-consent-actions">
                    <button className="btn-decline" onClick={handleDecline}>Decline All</button>
                    <button className="btn-accept" onClick={handleAccept}>Accept All</button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
