// src/servicespage/servicesPage2.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import "./services.css";
import "./servicesPage2_new.css";
import capture from "../assets/Utility Meter Maintenance.jpeg";
import bill from "../assets/Billing Managed Service.jpeg";
import amc from "../assets/AMC and Training.jpeg";
import consult from "../assets/Technical Consultancy.jpeg";
import plc from "../assets/PLC & SCADA Services.jpeg";
import dev from "../assets/Development & Services_1.webp";

export default function ServicesPage2() {

    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const targetId = hash.substring(1);
        const smoothScroll = () => {
            const el = document.getElementById(targetId);
            if (el) {
                const headerOffset = 90;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            } else {
                setTimeout(smoothScroll, 100);
            }
        };

        setTimeout(smoothScroll, 0);
    }, [hash]);


    const ServiceCard = ({ id, title, subtitle, shortDesc, highlights, imageSrc, imageRight }) => (
        <section id={id} className="service-section-v2">
            <div className="service-container-v2">
                <div className={`service-row-v2 ${imageRight ? '' : 'reverse'}`}>
                    <div className="service-text-v2">
                        <span className="service-eyebrow">{subtitle}</span>
                        <h2 className="service-title-v2">{title}</h2>
                        <p className="service-desc-v2">{shortDesc}</p>
                        {highlights && (
                            <ul className="service-highlights">
                                {highlights.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="highlight-icon">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <a href="/contact" className="service-cta-btn">Get Started →</a>
                    </div>
                    <div className="service-image-v2">
                        <img src={imageSrc} alt={title} loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    );

    const services = [
        { id: "utility-maintenance", title: "Utility Maintenance" },
        { id: "billing", title: "Billing" },
        { id: "amc", title: "AMC & Training" },
        { id: "consultancy", title: "Consultancy" },
        { id: "plc", title: "PLC & SCADA" },
        { id: "development", title: "Development" },
    ];

    return (
        <div className="services-page-v2">
            <SEO
                title="Services - ConnectME"
                description="ConnectME delivers end-to-end IoT services including utility meter maintenance, billing management, AMC & training, technical consultancy, PLC & SCADA, and custom development."
            />

            {/* HERO SECTION */}
            <section className="services-hero">
                <div className="services-hero-inner">
                    <span className="hero-label">Our Services</span>
                    <h1 className="services-hero-title">End-to-End IoT Solutions,<br />Engineered for Performance</h1>
                    <p className="services-hero-subtitle">From precision metering to intelligent billing, our services power smarter infrastructure across the GCC and beyond.</p>
                </div>
                <div className="services-stats-bar">
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Meters Maintained</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Projects Delivered</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">12+</span>
                        <span className="stat-label">Years Experience</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">6</span>
                        <span className="stat-label">Countries Served</span>
                    </div>
                </div>
            </section>

            {/* STICKY SECTION NAV */}
            <div className="services-nav-wrapper">
                <div className="services-nav-container">
                    {services.map((s) => (
                        <button
                            key={s.id}
                            className={`service-nav-btn ${hash === `#${s.id}` ? "active" : ""}`}
                            onClick={() => {
                                window.location.hash = s.id;
                            }}
                        >
                            {s.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* SERVICE SECTIONS */}
            <ServiceCard
                id="utility-maintenance"
                title="Utility Meter Maintenance"
                subtitle="Preventive & Corrective"
                shortDesc="Keep your metering infrastructure accurate and reliable with AI-powered validation, automated error reporting, and proactive fault resolution — ensuring every reading counts."
                highlights={[
                    "AI-enabled AMR validation on every meter poll",
                    "Automated faulty meter detection & replacement",
                    "Preventive maintenance scheduling",
                    "Real-time meter health dashboards"
                ]}
                imageSrc={capture}
                imageRight={true}
            />

            <ServiceCard
                id="billing"
                title="Billing Managed Service"
                subtitle="Revenue Assurance"
                shortDesc="From invoice generation to payment collection, our fully managed billing platform handles multi-utility tariffs, automated dispatching, and integrated payment gateways — so you never miss revenue."
                highlights={[
                    "Multi-utility tariff management (water, energy, gas)",
                    "Automated invoice generation & dispatch",
                    "Payment portal for residents & tenants",
                    "Overdue collection workflows & notifications"
                ]}
                imageSrc={bill}
                imageRight={false}
            />

            <ServiceCard
                id="amc"
                title="AMC & Training"
                subtitle="Ongoing Support"
                shortDesc="Maximize uptime and team capability with our Annual Maintenance Contracts and structured training programs — covering metering, billing, PLC, SCADA, and full automation stacks."
                highlights={[
                    "Preventive maintenance & rapid fault resolution",
                    "Software updates & system health monitoring",
                    "Hands-on operator & engineer training",
                    "Custom training modules for your tech stack"
                ]}
                imageSrc={amc}
                imageRight={true}
            />

            <ServiceCard
                id="consultancy"
                title="Technical Consultancy"
                subtitle="Strategy & Architecture"
                shortDesc="Navigate the complexities of IoT architecture with our domain experts. From protocol selection to network security audits, we help you design systems that scale."
                highlights={[
                    "IoT architecture design & protocol advisory",
                    "Plant optimization & network security audits",
                    "SCADA/BMS integration strategy",
                    "Regulatory compliance consulting"
                ]}
                imageSrc={consult}
                imageRight={false}
            />

            <ServiceCard
                id="plc"
                title="PLC & SCADA Services"
                subtitle="Industrial Automation"
                shortDesc="Modernize your industrial control systems with our engineering teams. We handle upgrades, retrofits, and maintenance contracts for PLC, SCADA, and HMI installations."
                highlights={[
                    "Plant & machine upgrade retrofits",
                    "PLC / SCADA / HMI modifications",
                    "Maintenance contracts (AMC / SLA)",
                    "On-site engineer & project manager deployment"
                ]}
                imageSrc={plc}
                imageRight={true}
            />

            <ServiceCard
                id="development"
                title="Development & Services"
                subtitle="Custom Software"
                shortDesc="Build powerful web, mobile, and desktop applications tailored to your business. Our full-stack teams deliver from concept to deployment, with ongoing security audits and infrastructure support."
                highlights={[
                    "Web, mobile & hybrid app development",
                    "Application modernization & scaling",
                    "Security audits & threat assessments",
                    "IT infrastructure support & help desk"
                ]}
                imageSrc={dev}
                imageRight={false}
            />
        </div>
    );
}
