import React, { useState } from "react";
import { Link } from "react-router-dom";
import serviceData from "../data/serviceData";
import "./productsDropdown.css";
import "./solutionsDropdown.css"; // New layout styles

export default function ServicesDropdown({ onClose, specificCategory }) {
    const [hoveredSolution, setHoveredSolution] = useState(0);

    // Filter data if specificCategory is provided
    const filteredData = specificCategory
        ? serviceData.filter(cat => cat.category === specificCategory)
        : serviceData;

    if (specificCategory === "Solutions" && filteredData.length > 0) {
        const solutionsData = filteredData[0];
        const activeItem = solutionsData.items[hoveredSolution] || solutionsData.items[0];

        return (
            <div className="prod-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="solutions-grid-container">
                    {/* Left Column: Links */}
                    <div className="solutions-left-col">
                        <div className="solutions-list">
                            {solutionsData.items.map((item, i) => (
                                <Link
                                    key={i}
                                    to={`/services/${solutionsData.slug}/${item.id}`}
                                    className={`solution-link-item ${hoveredSolution === i ? 'active' : ''}`}
                                    onMouseEnter={() => setHoveredSolution(i)}
                                    onClick={onClose}
                                >
                                    <span className="solution-link-label">{item.name}</span>
                                    <span className="arrow">→</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Featured Preview */}
                    <div className="solutions-right-col" key={activeItem.id}>
                        <div className="featured-solution-card">
                            <div className="featured-image-wrapper">
                                <img src={activeItem.heroImage} alt={activeItem.name} className="featured-image"  loading="lazy" />
                            </div>
                            <div className="featured-content">
                                <h3>{activeItem.name}</h3>
                                <p>{activeItem.description.length > 150 ? activeItem.description.substring(0, 150) + '...' : activeItem.description}</p>
                                <Link
                                    to={`/services/${solutionsData.slug}/${activeItem.id}`}
                                    className="featured-btn"
                                    onClick={onClose}
                                >
                                    <span>Explore Solution</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default multi-column layout for other categories (like Services)
    return (
        <div className="prod-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="prod-grid-container" style={{ gridTemplateColumns: `repeat(${filteredData.length}, 1fr)` }}>
                {filteredData.map((catBlock, idx) => (
                    <div key={idx} className="prod-col">
                        <h1 className="prod-main-title">{catBlock.category}</h1>
                        <div className="prod-list">
                            {catBlock.items.map((item, i) => (
                                <Link
                                    key={i}
                                    to={`/services/${catBlock.slug}/${item.id}`}
                                    className="prod-link"
                                    onClick={onClose}
                                >
                                    <span className="prod-link-label">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                        {idx < filteredData.length - 1 && <div className="prod-mobile-divider"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
