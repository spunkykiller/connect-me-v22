import React, { useState, useEffect } from "react";
import "./blogs1.css";
import { Link } from "react-router-dom";

import blogData from "../data/blogData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SEO from "../components/SEO";

export default function Blogs() {
  const blogsPerLoad = 8;
  const [count, setCount] = useState(blogsPerLoad);

  // State for the auto-rotating featured blog
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Auto-rotate the featured blog every 2.5 seconds (2500ms)
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate through the available subset of blogs (up to 'count' + 1 for featured)
      // or simply rotate through all blogData if preferred. Using blogData.length to rotate through all.
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % blogData.length);
    }, 2500);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const featured = blogData[featuredIndex];

  // Small cards should ideally exclude the current featured card so it doesn't appear twice.
  // We'll filter out the featured card and take the required number of cards.
  const allOtherCards = blogData.filter((_, index) => index !== featuredIndex);
  const smallCards = allOtherCards.slice(0, count);

  return (
    <div className="blogs-section">
      <SEO
        title="ConnectME Blog - Industry Insights & News"
        description="Stay updated with the latest trends in Industrial IoT, Smart Metering, and Utility Billing from ConnectME experts."
      />



      <div className="blogs-grid">

        {/* ⭐ FEATURED CARD CLICKABLE FULL CARD */}
        <Link to={`/blog/${featured.id}`} className="featured-card-link">
          <div className="featured-card">
            <div className="featured-img-container">
              <img src={featured.image} className="featured-img" alt=""  loading="lazy" />
            </div>

            <div className="featured-content">
              <h2>{featured.title}</h2>
              <p>{featured.category} | {featured.date}</p>

              <div className="featured-readmore">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="arrow-icon" />
                <span className="rm-text">Read More</span>
              </div>
            </div>
          </div>
        </Link>

        {/* REMAINING CARDS NATIVELY PLACED BY CSS GRID */}
        {smallCards.map((blog) => (
          <Link to={`/blog/${blog.id}`} className="blog-card-link" key={blog.id}>
            <div className="blog-card">
              <img src={blog.image} className="blog-img" alt=""  loading="lazy" />

              <div className="blog-content1">
                <h3 className="blog-title1">{blog.title}</h3>
                <p className="blog-meta1">{blog.category} | {blog.date}</p>

                <div className="blog-readmore">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="arrow-icon" />
                  <span className="rm-text">Read More</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

      </div>

      {/* LOAD MORE BUTTON */}
      {count + 1 < blogData.length && (
        <div className="loadmore-wrap">
          <button
            className="loadmore-btn"
            onClick={() => setCount(count + blogsPerLoad)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
