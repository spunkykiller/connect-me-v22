import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import allProjects from "../data/projectsData";
import projectData from "../data/ongoingProjects";
import SEO from "../components/SEO";
import "./projectDetail.css";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the project. Check existing projects first, then ongoing projects.
    // Ensure we parse the ID as an integer for comparison.
    const numericId = parseInt(id, 10);
    let project = allProjects.find(p => p.id === numericId) || projectData.find(p => p.id === numericId);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="pd-not-found">
                <h2>Project Not Found</h2>
                <button onClick={() => navigate("/work")} className="pd-back-btn">
                    ← Back to Work Page
                </button>
            </div>
        );
    }

    const isOngoing = project.id >= 100;
    const categoryLabel = isOngoing ? "ONGOING PROJECT" : "COMPLETED PROJECT";

    return (
        <div className="pd-section">
            <SEO
                title={`${project.title} - ConnectME Projects`}
                description={project.shortDesc || project.desc}
                type="article"
            />

            {/* Same banner style as Blog */}
            <div className="pd-banner">
                <img src={project.image} alt={project.title}  loading="lazy" />
            </div>

            <div className="pd-content">
                <Link to="/work" className="pd-back-link">
                    ← Back to Projects
                </Link>

                <h1 className="pd-title">{project.title}</h1>

                <div className="pd-meta">
                    <span className="pd-category">{categoryLabel}</span>
                    <span className="pd-dot">•</span>
                    <span className="pd-location">{project.location}</span>
                </div>

                <div className="pd-text">
                    {project.details?.content ? (
                        project.details.content.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))
                    ) : (
                        <p>{project.desc}</p>
                    )}
                </div>

                {project.details?.features && (
                    <div className="pd-features">
                        <h3>Key Features & Capabilities:</h3>
                        <ul>
                            {project.details.features.map((feature, idx) => (
                                <li key={idx}>
                                    <strong>{feature.label}:</strong> {feature.desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {project.details?.quote && (
                    <div className="pd-quote-box">
                        <div className="pd-quote-icon">
                            <FontAwesomeIcon icon={faQuoteLeft} />
                        </div>
                        <div>
                            <p className="pd-quote-text">{project.details.quote}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
