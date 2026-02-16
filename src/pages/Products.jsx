import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Configuration for each category to match original HTML
const CATEGORY_CONFIG = {
  rings: {
    title: "Rings",
    gradient: "linear-gradient(rgba(212,175,55,0.2), rgba(212,175,55,0.05))",
    image: "/images/ringscover.jpg",
    priceFilters: [
      { label: "Below ₹10,000", min: 0, max: 10000 },
      { label: "₹10,000 - ₹25,000", min: 10000, max: 25000 },
      { label: "Above ₹25,000", min: 25000, max: Infinity }
    ],
    weightFilters: [
      { label: "Below 3g", min: 0, max: 3 },
      { label: "3g - 6g", min: 3, max: 6 },
      { label: "Above 6g", min: 6, max: Infinity }
    ]
  },
  necklaces: {
    title: "Necklaces",
    gradient: "linear-gradient(rgba(212,175,55,0.25), rgba(212,175,55,0.05))",
    image: "/images/necklacecovers.jpg",
    priceFilters: [
      { label: "Below ₹20,000", min: 0, max: 20000 },
      { label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
      { label: "Above ₹50,000", min: 50000, max: Infinity }
    ],
    weightFilters: [
      { label: "Below 10g", min: 0, max: 10 },
      { label: "10g - 20g", min: 10, max: 20 },
      { label: "Above 20g", min: 20, max: Infinity }
    ]
  },
  bangles: {
    title: "Bangles",
    gradient: "linear-gradient(rgba(212,175,55,0.25), rgba(212,175,55,0.05))",
    image: "/images/Banglescover.jpg",
    priceFilters: [
        { label: "Below ₹15,000", min: 0, max: 15000 },
        { label: "₹15,000 - ₹40,000", min: 15000, max: 40000 },
        { label: "Above ₹40,000", min: 40000, max: Infinity }
    ],
    weightFilters: [
      { label: "Below 10g", min: 0, max: 10 },
      { label: "10g - 20g", min: 10, max: 20 },
      { label: "Above 20g", min: 20, max: Infinity }
    ] 
  },
  bracelets: {
    title: "Bracelets",
    gradient: "linear-gradient(rgba(212,175,55,0.25), rgba(212,175,55,0.05))",
    image: "/images/bracletecover.jpg",
    priceFilters: [
      { label: "Below ₹8,000", min: 0, max: 8000 },
      { label: "₹8,000 - ₹20,000", min: 8000, max: 20000 },
      { label: "Above ₹20,000", min: 20000, max: Infinity }
    ],
    weightFilters: [
      { label: "Below 5g", min: 0, max: 5 },
      { label: "5g - 10g", min: 5, max: 10 },
      { label: "Above 10g", min: 10, max: Infinity }
    ]
  },
  chains: {
    title: "Gold Chains",
    gradient: "linear-gradient(rgba(212,175,55,0.25), rgba(212,175,55,0.05))",
    image: "/images/chaincover.jpg",
    priceFilters: [
      { label: "Below ₹15,000", min: 0, max: 15000 },
      { label: "₹15,000 - ₹35,000", min: 15000, max: 35000 },
      { label: "Above ₹35,000", min: 35000, max: Infinity }
    ],
    weightFilters: [
      { label: "Below 8g", min: 0, max: 8 },
      { label: "8g - 15g", min: 8, max: 15 },
      { label: "Above 15g", min: 15, max: Infinity }
    ]
  },
  earrings: {
    title: "Earrings",
    gradient: "linear-gradient(rgba(212,175,55,0.25), rgba(212,175,55,0.05))",
    image: "/images/earringscover.jpg",
    priceFilters: [
      { label: "Below ₹5,000", min: 0, max: 5000 },
      { label: "₹5,000 - ₹15,000", min: 5000, max: 15000 },
      { label: "Above ₹15,000", min: 15000, max: Infinity }
    ],
    weightFilters: [
      { label: "Below 2g", min: 0, max: 2 },
      { label: "2g - 5g", min: 2, max: 5 },
      { label: "Above 5g", min: 5, max: Infinity }
    ]
  },
  // Default fallback
  default: {
    title: "Products",
    gradient: "#f9f9f9",
    priceFilters: [],
    weightFilters: []
  }
};

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState("all");

  const config = CATEGORY_CONFIG[category?.toLowerCase()] || CATEGORY_CONFIG.default;

  // Map URL category to backend category name (if needed)
  // e.g. 'chains' in URL might need 'Gold Chains' for backend query if backend is strict
  // But our previous implementation just passed the param. 
  // Based on seed.js: "Gold Chains" is the category name. URL is /chains.
  // We might need a mapper.
  const getBackendCategory = (cat) => {
    const map = {
      'chains': 'Gold Chains',
      'rings': 'Rings',
      'necklaces': 'Necklace', // Note: singular in seed.js
      'bangles': 'Bangles',
      'bracelets': 'Bracelets',
      'earrings': 'Earrings'
    };
    return map[cat?.toLowerCase()] || cat || '';
  };

  useEffect(() => {
    setLoading(true);
    const backendCategory = getBackendCategory(category);
    console.log("Fetching for:", category, "Backend:", backendCategory);
    fetch(`/api/products?category=${encodeURIComponent(backendCategory)}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Data:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [category]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      let passPrice = true;
      let passWeight = true;

      // Price Filter
      if (selectedPrice !== "all") {
        const pf = config.priceFilters.find(f => f.label === selectedPrice);
        if (pf) {
          if (product.price < pf.min || product.price > pf.max) passPrice = false;
        }
      }

      // Weight Filter
      if (selectedWeight !== "all") {
        const wf = config.weightFilters.find(f => f.label === selectedWeight);
        if (wf) {
          const w = product.weight || 0;
          if (w < wf.min || w > wf.max) passWeight = false;
        }
      }

      return passPrice && passWeight;
    });
  }, [products, selectedPrice, selectedWeight, config]);

  const addToCart = (product) => {
    // Basic cart logic matching original
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: product.name, price: product.price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(product.name + " added to cart!");
  };

  return (
    <div>
       {/* HERO SECTION */}
      <div style={{
        background: config.image ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${config.image}) center/cover no-repeat` : config.gradient,
        height: '220px',
        margin: '30px',
        borderRadius: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '42px', letterSpacing: '2px', color: config.image ? '#fff' : 'var(--gold-dark, #B5952F)', textShadow: config.image ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none' }}>
          {config.title}
        </h1>
      </div>

      {/* FILTER SECTION */}
      <div style={{
        maxWidth: '1200px',
        margin: 'auto',
        padding: '0 40px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <select 
          value={selectedPrice} 
          onChange={(e) => setSelectedPrice(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border, #E5E7EB)' }}
        >
          <option value="all">All Prices</option>
          {config.priceFilters.map((f, i) => (
            <option key={i} value={f.label}>{f.label}</option>
          ))}
        </select>

        <select 
          value={selectedWeight} 
          onChange={(e) => setSelectedWeight(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border, #E5E7EB)' }}
        >
          <option value="all">All Weights</option>
          {config.weightFilters.map((f, i) => (
            <option key={i} value={f.label}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="section">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product._id} className="card">
                  <div className="img-box">
                    {product.image === 'IMG' || !product.image ? 'IMG' : 
                      <img 
                        src={product.image.startsWith('http') ? product.image : `/images/${product.image}`} 
                        alt={product.name} 
                        style={{width:'100%', height:'100%', objectFit:'cover'}} 
                        onError={(e)=>e.target.style.display='none'} 
                      />
                    }
                  </div>
                  <h3>{product.name}</h3>
                  <div style={{ color: '#f59e0b', fontSize: '14px', margin: '4px 0' }}>★★★★★</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gold)' }}>₹{product.price.toLocaleString()}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{product.weight || 'N/A'}g</div>
                  </div>
                  <button onClick={() => addToCart(product)} 
                    style={{
                        width: '100%', marginTop: '10px', padding: '8px', borderRadius: '8px', border: 'none',
                        background: 'var(--gold)', color: 'var(--dark)', fontWeight: '600', cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
