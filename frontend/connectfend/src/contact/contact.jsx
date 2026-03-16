import React, { useState } from "react";
import "./contact.css";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Map from "../assets/map.webp";
import SEO from "../components/SEO";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Contact() {
    const [phone, setPhone] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        companyName: "",
        subject: "",
        message: "",
        // Honeypot field
        website_url_honey: ""
    });

    // UI states
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
            setStatus("error");
            setErrorMessage("Please fill in all required fields (*).");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        // Collect URL params
        const queryParams = new URLSearchParams(window.location.search);
        const utmSource = queryParams.get("utm_source") || "";
        const utmMedium = queryParams.get("utm_medium") || "";
        const utmCampaign = queryParams.get("utm_campaign") || "";
        const pageUrl = window.location.href;

        const payload = {
            ...formData,
            phone,
            honeypot: formData.website_url_honey,
            utmSource,
            utmMedium,
            utmCampaign,
            pageUrl
        };

        try {
            // Send to locally hosted backend (or production URL later)
            // Hardcoded to localhost:3001 for now, but should ideally use ENV
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
            console.log(`Submitting to: ${API_URL}/api/contact`);

            const res = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus("success");
                setFormData({
                    fullName: "", email: "", companyName: "", subject: "", message: "", website_url_honey: ""
                });
                setPhone("");
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMessage("Failed to connect to the server. Please try again later.");
        }
    };

    return (
        <div className="contact-section">
            <SEO
                title="Contact Us - ConnectME"
                description="Get in touch with ConnectME for smart metering and IoT inquiries. Offices in Dubai and Qatar."
            />
            <div className="contact-card-container">
                <div className="contact-card">
                    <div className="contact-header">
                        <h1 className="contact-title">Get In Touch</h1>
                        <h2 className="contact-subtitle">We've got answers.</h2>
                        <p className="contact-desc">Get in touch with us for more information on any of our products or services.</p>
                    </div>

                    {status === "success" ? (
                        <div className="contact-success-msg">
                            <h3>Thank you for reaching out!</h3>
                            <p>We have successfully received your message and will get back to you shortly.</p>
                            <button className="contact-submit-btn" onClick={() => setStatus("idle")} style={{ marginTop: "20px" }}>Send Another Message</button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {/* Honeypot Field - Hidden via inline styles to prevent spam bots */}
                            <div style={{ display: 'none' }} aria-hidden="true">
                                <label>Leave this field empty</label>
                                <input type="text" name="website_url_honey" tabIndex="-1" autoComplete="off" value={formData.website_url_honey} onChange={handleChange} />
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label>Full Name*</label>
                                    <input type="text" name="fullName" className="contact-input" value={formData.fullName} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Email Address*</label>
                                    <input type="email" name="email" className="contact-input" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label>Company Name</label>
                                    <input type="text" name="companyName" className="contact-input" value={formData.companyName} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Subject*</label>
                                    <input type="text" name="subject" className="contact-input" value={formData.subject} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-group full-width">
                                    <label>Phone Number</label>
                                    <PhoneInput
                                        country={"ae"}
                                        value={phone}
                                        onChange={setPhone}
                                        enableSearch={true}
                                        inputClass="contact-input phone-field"
                                        containerClass="phone-container"
                                        buttonClass="flag-dropdown"
                                        dropdownClass="phone-dropdown"
                                    />
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <label>Message*</label>
                                <textarea name="message" className="contact-textarea" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                            </div>

                            {status === "error" && (
                                <div className="contact-error-msg">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="submit-container">
                                <button className="contact-submit-btn" type="submit" disabled={status === "loading"}>
                                    {status === "loading" ? "Sending..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="ci-section">
                <h1 className="ci-title">Contact Information</h1>

                <div className="ci-grid">

                    {/* UAE Office */}
                    <div className="ci-card">
                        <div className="ci-bar"></div>
                        <div className="ci-content">
                            <FaMapMarkerAlt className="ci-icon" />

                            <h2 className="ci-heading">UAE Office</h2>

                            <p>
                                Warehouse-7, Al Qaseer Warehouse,<br />
                                Ras Al Khor Industrial area-2,<br />
                                Dubai - UAE.
                            </p>

                            <div className="ci-contact-info">
                                <div className="ci-info-row">
                                    <span className="ci-label">Office:</span>
                                    <span className="ci-value nowrap">+971 4 234 8480</span>
                                </div>
                                <div className="ci-info-row">
                                    <span className="ci-label"></span>
                                    <span className="ci-value nowrap">+971 4 234 9525</span>
                                </div>
                                <div className="ci-info-row">
                                    <span className="ci-label">Email:</span>
                                    <a href="mailto:info@connectme.biz" className="ci-value email">info@connectme.biz</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* International Sales */}
                    <div className="ci-card">
                        <div className="ci-bar"></div>
                        <div className="ci-content">
                            <FaPhoneAlt className="ci-icon" />

                            <h2 className="ci-heading">International<br />Sales Inquiry</h2>

                            <div className="ci-contact-info">
                                <div className="ci-info-row">
                                    <span className="ci-label">Email:</span>
                                    <a href="mailto:sales@connectme.biz" className="ci-value email">sales@connectme.biz</a>
                                </div>
                                <div className="ci-info-row">
                                    <span className="ci-label">Mobile:</span>
                                    <span className="ci-value nowrap">+971 56 2250600</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Qatar Office */}
                    <div className="ci-card">
                        <div className="ci-bar"></div>
                        <div className="ci-content">
                            <FaMapMarkerAlt className="ci-icon" />

                            <h2 className="ci-heading">Qatar Office</h2>

                            <p>
                                First Floor, Building 98, Street 220,<br />
                                B-Ring Road, Zone 15,<br />
                                Doha, Qatar.
                            </p>

                            <div className="ci-contact-info">
                                <div className="ci-info-row">
                                    <span className="ci-label">Mobile:</span>
                                    <span className="ci-value nowrap">+974 7135 2869</span>
                                </div>
                                <div className="ci-info-row">
                                    <span className="ci-label">Email:</span>
                                    <a href="mailto:sales.qat@connectme.biz" className="ci-value email">sales.qat@connectme.biz</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Saudi Arabia Office */}
                    <div className="ci-card">
                        <div className="ci-bar"></div>
                        <div className="ci-content">
                            <FaMapMarkerAlt className="ci-icon" />

                            <h2 className="ci-heading">SAUDI ARABIA</h2>

                            <p>
                                Building No: 12, Al Hawari<br />
                                Street, Al Malaz District<br />
                                Riyadh, Saudi Arabia
                            </p>

                            <div className="ci-contact-info">
                                <div className="ci-info-row">
                                    <span className="ci-label">Mobile:</span>
                                    <span className="ci-value nowrap">+966 50 916 4160</span>
                                </div>
                                <div className="ci-info-row">
                                    <span className="ci-label">Email:</span>
                                    <a href="mailto:nasim@connectme.biz" className="ci-value email">nasim@connectme.biz</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="map-section">
                <iframe
                    title="ConnectME Dubai HQ"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d461996.7057696178!2d55.1194348!3d25.2251587!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d6c3cbd8391%3A0xcb80cce10e7f7775!2sConnectME%20Manufacturing%20LLC!5e0!3m2!1sen!2sin!4v1772221520153!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="map-iframe"
                ></iframe>
            </div>
        </div>
    );
}

