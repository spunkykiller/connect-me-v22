import React, { useRef, useEffect } from "react";
import "./products1.css";
import productsData from "../data/productData";
import { Link } from "react-router-dom";


export default function Products() {
  // Flatten products from the new structured data, including category and subcategory info for links
  const products = productsData.flatMap(category =>
    category.subcategories.flatMap(subcategory =>
      subcategory.products.map(product => ({
        ...product,
        title: product.name,
        subtitle: product.tags?.[0] || "Product",
        // Construct proper link path: /products/{category}/{subcategory}/{productId}
        link: `/products/${category.slug}/${subcategory.slug}/${product.id}`
      }))
    )
  );

  const marqueeRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    let animationId;

    const scroll = () => {
      if (marqueeRef.current && !isPaused.current) {
        marqueeRef.current.scrollLeft += 1;

        // When we scrolled exactly half of the total duplicated track length
        if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
          marqueeRef.current.scrollLeft -= marqueeRef.current.scrollWidth / 2;
        } else if (marqueeRef.current.scrollLeft <= 0) {
          // If manually scrolled too far left
          marqueeRef.current.scrollLeft += marqueeRef.current.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handlePause = () => { isPaused.current = true; };
  const handleResume = () => { isPaused.current = false; };

  const handleScroll = () => {
    if (marqueeRef.current) {
      if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
        marqueeRef.current.scrollLeft -= marqueeRef.current.scrollWidth / 2;
      } else if (marqueeRef.current.scrollLeft <= 0) {
        marqueeRef.current.scrollLeft += marqueeRef.current.scrollWidth / 2;
      }
    }
  };

  return (
    <div className="products-section">
      <h1 className="products-title">Our Products</h1>

      <div
        className="marquee"
        ref={marqueeRef}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
        onScroll={handleScroll}
      >
        <div className="marquee-track">

          {/* Duplicate items 2x for seamless infinite loop (sufficient for most screens) */}
          {Array(2).fill(products).flat().map((p, index) => (
            <Link key={index} to={p.link} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-image-wrapper">
                <img
                  src={p.image}
                  className="product-image"
                  alt={p.title}
                  loading="lazy"
                  width="300"
                  height="300"
                />
              </div>

              <div className="product-details">
                <p className="product-subtitle">{p.subtitle}</p>
                <h2 className="product-title">{p.title}</h2>
                <span className="view-more-link">
                  View More &rarr;
                </span>
              </div>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}
