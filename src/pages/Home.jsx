import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/images/valentine_ring_banner_1769840032218.png',
    title: "Valentine's Special",
    text: "Express your love with our Custom Masterpiece.",
    link: "/products/rings",
    cta: "View Special Gift"
  },
  {
    image: '/images/valentine_necklace_banner_1769840048823.png',
    title: "Timeless Elegance",
    text: "Gift a moment that lasts forever.",
    link: "/products/necklaces",
    cta: "Shop Necklaces"
  },
  {
    image: '/images/valentine_gift_banner_1769840065096.png',
    title: "Promises for Eternity",
    text: "Find the perfect couple bands for your perfect match.",
    link: "/products/bangles",
    cta: "Shop Sets"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* HERO / CAROUSEL */}
      <div className="carousel" id="homeCarousel">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1 }}></div>
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
              <Link 
                to={slide.link} 
                style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  padding: '12px 30px',
                  background: 'var(--gold)',
                  color: 'var(--dark)',
                  textDecoration: 'none',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ABOUT SECTION */}
      <div className="about-section">
        <div className="about-header">
          <h2>About Our Legacy</h2>
          <p>Crafting memories in gold since 2026</p>
        </div>
        
        <div className="about-grid">
          <div className="about-image">
            {/* Image set via CSS in index.css */}
          </div>
          <div className="about-text">
            <h3>Who We Are</h3>
            <p>
              At Gold Jewelry Store, we believe that every piece of jewelry tells a story. 
              Founded with a passion for purity and design, we bring you the finest collection 
              of hallmark gold jewelry that blends traditional artistry with contemporary aesthetics.
            </p>
            <p>
              Our artisans meticulously craft each item, ensuring that you receive not just 
              a product, but a masterpiece that can be cherished for generations. From 
              intricate wedding necklaces to minimal daily wear, our designs are timeless.
            </p>
            <p>
              Experience trust, transparency, and true luxury with every purchase.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <h4>LOGO</h4>
            <p style={{ fontSize: '13px', color: '#ccc' }}>
              Premium gold jewelry crafted with elegance and purity.
            </p>
          </div>

          <div>
            <h4>Use Cases</h4>
            <Link to="#">Wedding</Link>
            <Link to="#">Daily Wear</Link>
            <Link to="#">Gifting</Link>
            <Link to="#">Investments</Link>
          </div>

          <div>
            <h4>Explore</h4>
            <Link to="#">Designs</Link>
            <Link to="#">Collections</Link>
            <Link to="#">Custom Orders</Link>
            <Link to="#">Craftsmanship</Link>
          </div>

          <div>
            <h4>Resources</h4>
            <Link to="#">Blog</Link>
            <Link to="#">Support</Link>
            <Link to="#">Gold Rate</Link>
            <Link to="#">Store Locator</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Gold Jewelry Store — All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default Home;
