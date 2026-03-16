import React from "react";
import "./privacyPolicy.css";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
    return (
        <div className="privacy-wrapper">
            <SEO
                title="Privacy Policy - ConnectME Manufacturing"
                description="Our Privacy Policy outlines how we collect, use, and protect your data at ConnectME."
            />

            <div className="privacy-header">
                <h1>Privacy Policy</h1>
                <p>Last Updated: March 2026</p>
            </div>

            <div className="privacy-content">
                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to ConnectME Manufacturing LLC. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
                </section>

                <section>
                    <h2>2. The Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                    <ul>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                        <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Data</h2>
                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal obligation.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Cookies & Tracking</h2>
                    <p>Our website uses cookies to distinguish you from other users. This helps us provide you with a good experience when you browse our website and allows us to improve our site.</p>
                    <p>We use third-party analytics services like Google Analytics and Microsoft Clarity to understand how users interact with our site. These services may collect usage data and technical data. You can choose to accept or decline cookies through our cookie consent banner.</p>
                </section>

                <section>
                    <h2>5. Data Security</h2>
                    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.</p>
                </section>

                <section>
                    <h2>6. Your Legal Rights</h2>
                    <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data, and (where the lawful ground of processing is consent) to withdraw consent.</p>
                </section>

                <section>
                    <h2>7. Contact Us</h2>
                    <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                    <p><strong>ConnectME Manufacturing LLC</strong><br />
                        Dubai, UAE<br />
                        Email: info@connectme.biz</p>
                </section>
            </div>
        </div>
    );
}
