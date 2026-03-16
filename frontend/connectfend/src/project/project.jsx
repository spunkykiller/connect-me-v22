import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./project.css";
import projectData from "../data/ongoingProjects";

import projects from "../data/projectsData";
import KeyCustomersImg from "../assets/Key Customers_1.jpeg";
import EndUsersImg from "../assets/Ends Users_1.jpeg";
import IntegratorsImg from "../assets/Integrators_1.jpeg";

import SEO from "../components/SEO";

export default function OngoingProjects() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('our-projects');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        document.getElementById(tabId).scrollIntoView({ behavior: 'smooth' });
    };

    // Show all projects for "Our Projects"
    const allProjects = projects;

    return (
        <div className="projects-container">
            <SEO
                title="Our Work & Projects - ConnectME"
                description="Explore our portfolio of successful smart metering and IoT deployments across the GCC. See our ongoing and completed projects."
            />

            {/* TABS NAVIGATION */}
            <div className="work-tabs">
                <button className={`work-tab ${activeTab === 'our-projects' ? 'active' : ''}`} onClick={() => handleTabClick('our-projects')}>
                    Our Projects
                </button>
                <button className={`work-tab ${activeTab === 'our-clients' ? 'active' : ''}`} onClick={() => handleTabClick('our-clients')}>
                    Our Clients
                </button>

                <button className={`work-tab ${activeTab === 'ongoing-projects' ? 'active' : ''}`} onClick={() => handleTabClick('ongoing-projects')}>
                    Ongoing Projects
                </button>
            </div>

            {/* 1. OUR PROJECTS */}
            <div id="our-projects" className="projects-section">
                <h2 className="projects-title">Our Projects</h2>

                <div className="projects-grid">
                    {allProjects.map((proj) => (
                        <div
                            className="project-card ongoing-clickable"
                            key={proj.id}
                            onClick={() => navigate(`/work/${proj.id}`)}
                        >
                            <img src={proj.image} className="project-img" alt={proj.title}  loading="lazy" />

                            <div className="project-info">
                                <div className="project-header-row">
                                    <h3 className="project-title">{proj.title}</h3>
                                    <p className="project-location">{proj.location}</p>
                                </div>
                                <p className="project-desc">{proj.desc}</p>
                                <button className="view-more-btn">View Project Details →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 2. OUR CLIENTS */}
            <div id="our-clients" className="clients-section">
                <h2 className="clients-title">Our Clients</h2>

                <div className="client-category">
                    <h3 className="category-title">Key Customers</h3>
                    <div className="category-content">
                        <img
                            src={KeyCustomersImg}
                            alt="Key Customers"
                            className="client-category-image"
                         loading="lazy" />
                    </div>
                </div>

                <div className="client-category">
                    <h3 className="category-title">Key End Users</h3>
                    <div className="category-content">
                        <img
                            src={EndUsersImg}
                            alt="Key End Users"
                            className="client-category-image"
                         loading="lazy" />
                    </div>
                </div>

                <div className="client-category">
                    <h3 className="category-title">Integrators</h3>
                    <div className="category-content">
                        <img
                            src={IntegratorsImg}
                            alt="Integrators"
                            className="client-category-image"
                         loading="lazy" />
                    </div>
                </div>
            </div>

            {/* 3. ONGOING PROJECTS */}
            <div id="ongoing-projects" className="projects-section">
                <h2 className="projects-title">Ongoing Projects</h2>

                <div className="projects-grid">
                    {projectData.map((proj) => (
                        <div
                            className="project-card ongoing-clickable"
                            key={proj.id}
                            onClick={() => navigate(`/work/${proj.id}`)}
                        >
                            <img src={proj.image} className="project-img" alt={proj.title}  loading="lazy" />

                            <div className="project-info">
                                <div className="project-header-row">
                                    <h3 className="project-title">{proj.title}</h3>
                                    <p className="project-location">{proj.location}</p>
                                </div>
                                <p className="project-desc">{proj.shortDesc || proj.desc}</p>
                                <button className="view-more-btn">View Full Project Details →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
