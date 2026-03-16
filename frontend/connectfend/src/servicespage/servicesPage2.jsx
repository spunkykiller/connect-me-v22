// src/servicespage/servicesPage2.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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


    const ServiceCard = ({ id, title, shortDesc, fullDesc, imageSrc, listItems }) => (
        <section id={id} className="service-section">
            <div className="service-container">
                <div className="service-row align-start">
                    <div className="service-text-top">
                        <h2 className="service-title" style={{ marginTop: 0 }}>{title}</h2>
                        <p className="service-short-desc">{shortDesc}</p>
                        <a href="/contact" className="request-consultation-btn">Request Consultation</a>
                    </div>
                    <div className="service-image-wrapper">
                        <img src={imageSrc} alt={title} className="service-img-new" loading="lazy" />
                    </div>
                </div>
                <div className="service-text-bottom">
                    {fullDesc.map((text, idx) => <p key={idx}>{text}</p>)}
                    {listItems && (
                        <ul className="service-list">
                            {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                    )}
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
        <div className="services-page">
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

            <ServiceCard
                id="utility-maintenance"
                title="Utility Meter Maintenance"
                shortDesc="Ensuring meters stay healthy for accurate billing. Includes AI-enabled AMR validation and faulty meter replacements."
                fullDesc={[
                    "A tenant metering provides the overview and insights needed for accurate billing of water and energy consumption in residential and/or commercial buildings. Highly accurate and reliable meters combined with intuitive meter reading, correct billing platform and proper validation of Meter data.",
                    "ConnectME offers meter maintenance service, to ensure meters stay healthy, critical for correct billing. Our services cover AI enabled AMR application, which validates the meter data on each meter polling and automated meter error reports. We do maintenance service on faulty meters replacements."
                ]}
                imageSrc={capture}
            />

            <ServiceCard
                id="billing"
                title="Billing Managed Service"
                shortDesc="Our payment portal allows residents to download bills and check their account from the comfort of their own home or anywhere in the world."
                fullDesc={[
                    "Billing system is a combination of software and hardware that receives service usage information, groups this information for specific accounts or customers, produces invoices, creates reports for management, and records (posts) payments made to customer accounts.",
                    "After an invoice is generated and dispatched to the customer, ideally, all customers will receive their bills and pay promptly. However, there may be some customers, who do not pay their bills and there may be an unacceptable delay in paying the bill and hence the service providers must take some action needed to remedy the situation and collect the outstanding balance due.",
                    "Collection is the process of chasing past due receivables on customer account. This usually involves sending notifications to the customer and taking appropriate actions in absence of due payments after the due date."
                ]}
                imageSrc={bill}
            />

            <ServiceCard
                id="amc"
                title="AMC & Training"
                shortDesc="ConnectME provides comprehensive Annual Maintenance Contract (AMC) and professional training services for metering, billing, PLC, SCADA, and automation systems."
                fullDesc={[
                    "Our AMC services ensure continuous system performance through preventive maintenance, regular inspections, software updates, and rapid fault resolution. We support both hardware and software platforms to maximize system reliability and operational uptime.",
                    "In addition, ConnectME delivers structured technical training programs for operators, engineers, and maintenance teams, enabling effective system operation and troubleshooting. Our hands-on training covers system configuration, monitoring, reporting, and best practices. With dedicated support teams and domain expertise, we help clients achieve long-term efficiency, compliance, and return on investment from their automation and monitoring solutions."
                ]}
                imageSrc={amc}
            />

            <ServiceCard
                id="consultancy"
                title="Technical Consultancy"
                shortDesc="Specialized focusing on everything from market research and strategy consulting to hardware and software specialists to help navigate the minefield of IoT protocols and technical hurdles."
                fullDesc={[
                    "We offer: Plant Optimization Networking & security Audit trails – Plant / SCADA networks IoT enablement."
                ]}
                imageSrc={consult}
            />

            <ServiceCard
                id="plc"
                title="PLC & SCADA Services"
                shortDesc="Usage of control systems, such as computers or robots, and information technologies for handling different processes and machineries in an industry to replace a human being."
                fullDesc={[
                    "It is the second step beyond mechanization in the scope of industrialization.",
                    "We offer:"
                ]}
                listItems={[
                    "Plant / machine upgrade – retrofits",
                    "PLC / SCADA / HMI – modifications",
                    "Maintenance contracts – AMC / SLA",
                    "Engineering Services",
                    "Manpower deployment – Engineers / Project Manager"
                ]}
                imageSrc={plc}
            />

            <ServiceCard
                id="development"
                title="Development & Services"
                shortDesc="Application development services allow you to build consumer-facing apps for a range of digital platforms like mobile App, web, desktop."
                fullDesc={[
                    "Web development services imply designing, building, integrating, scaling and maintaining dynamic software solutions that work via intranet or internet.",
                    "We rely on our technological expertise and specialized industry experience to develop any type of web, mobile App, desktop, and hybrid app per your business requirements. Our application maintenance and modernization services are designed to ensure the scalability, performance, and sustainability of your entire software infrastructure as your business grows.",
                    "Our thorough threat audits help us identify your software infrastructure’s most pressing vulnerabilities, allowing us to integrate the encryptions, security services and access protocols you require. Our implementation specialists will work with your IT team to establish detailed software deployment objectives and timelines, covering configuration, testing, project governance, troubleshooting and more. We provide holistic IT Infrastructure support, including help desk management, custom messaging and collaboration, network management and system administration services."
                ]}
                imageSrc={dev}
            />

        </div>
    );
}
