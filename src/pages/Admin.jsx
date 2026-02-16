import React, { useState, useEffect } from 'react';

// --- SEARCH/LOGIN COMPONENT ---
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://jewellery-backend-3.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("adminToken", JSON.stringify(data.admin));
        onLogin();
      } else {
        setError(data.message || "Invalid Credentials");
      }
    } catch (err) {
      setError("Server disconnected. Check backend.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#F4F6F8' }}>
      <div style={{ width: '400px', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <h2 style={{color: 'var(--gold)', marginBottom: '10px'}}>Admin Portal</h2>
        <p style={{color: '#888', marginBottom: '30px'}}>Secure Access Required</p>
        
        {error && <div style={{background:'#fee', color:'red', padding:'10px', borderRadius:'6px', marginBottom:'20px', fontSize:'13px'}}>{error}</div>}

        <div style={{ marginBottom: '20px' }}>
          <input 
            placeholder="Admin Email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
        </div>
        
        <button 
          onClick={handleLogin}
          style={{ width: '100%', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', background: 'var(--gold)', color: 'var(--dark)', fontSize: '16px' }}
        >
          ENTER DASHBOARD
        </button>
      </div>
    </div>
  );
};

// --- DASHBOARD COMPONENT ---
const Dashboard = ({ onLogout }) => {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "Rings", type: "Women", price: "", weight: "", image: "" });
  const [loading, setLoading] = useState(false);

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://jewellery-backend-3.onrender.com");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch(e) { console.error(e); }
  };

  const handleAdd = async () => {
    if(!form.name || !form.price) return alert("Please fill details");
    setLoading(true);

    try {
      const res = await fetch("https://jewellery-backend-3.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if(res.ok) {
        alert("Product Added Successfully!");
        setForm({ name: "", category: "Rings", type: "Women", price: "", weight: "", image: "" });
        fetchProducts(); // Refresh list
      }
    } catch(e) { alert("Error adding product"); }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: '#F4F6F8' }}>
      {/* SIDEBAR */}
      <div style={{ width: '260px', background: '#1E1E1E', color: 'white', padding: '30px 20px', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', boxShadow: '4px 0 20px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '50px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
           LUXE ADMIN
        </div>
        <div 
          onClick={()=>setTab('dashboard')} 
          style={{ padding: '14px 18px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', transition: '0.3s', color: tab === 'dashboard' ? 'var(--gold)' : '#aaa', background: tab === 'dashboard' ? 'rgba(212, 175, 55, 0.15)' : 'transparent', fontWeight: '500' }}
        >
           Dashboard
        </div>
        <div 
          onClick={()=>setTab('products')} 
          style={{ padding: '14px 18px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', transition: '0.3s', color: tab === 'products' ? 'var(--gold)' : '#aaa', background: tab === 'products' ? 'rgba(212, 175, 55, 0.15)' : 'transparent', fontWeight: '500' }}
        >
           Products
        </div>
        <div 
          onClick={()=>setTab('orders')} 
          style={{ padding: '14px 18px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', transition: '0.3s', color: tab === 'orders' ? 'var(--gold)' : '#aaa', background: tab === 'orders' ? 'rgba(212, 175, 55, 0.15)' : 'transparent', fontWeight: '500' }}
        >
           Orders
        </div>
        <div 
          onClick={onLogout}
          style={{ marginTop: 'auto', padding: '14px 18px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', transition: '0.3s', color: '#ff6b6b' }}
        >
           Logout
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft: '260px', flex: 1, padding: '40px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Product Management</h2>
            <p style={{ color: '#888' }}>Manage your inventory and catalog</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '8px 15px', borderRadius: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
               Admin
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          
          {/* ADD FORM */}
          <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
            <h4 style={{ marginBottom: '25px', fontFamily: "'Playfair Display', serif" }}>Add New Item</h4>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#666', textTransform: 'uppercase' }}>Product Name</label>
              <input 
                value={form.name} 
                onChange={e=>setForm({...form, name:e.target.value})} 
                placeholder="Ex: Royal Diamond Ring" 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#666', textTransform: 'uppercase' }}>Category</label>
                <select 
                  value={form.category} 
                  onChange={e=>setForm({...form, category:e.target.value})}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
                >
                  <option value="Rings">Rings</option>
                  <option value="Necklace">Necklace</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Gold Chains">Gold Chains</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Earrings">Earrings</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#666', textTransform: 'uppercase' }}>Type</label>
                <select 
                  value={form.type} 
                  onChange={e=>setForm({...form, type:e.target.value})}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
                >
                  <option value="Women">For Women</option>
                  <option value="Men">For Men</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#666', textTransform: 'uppercase' }}>Price (₹)</label>
              <input 
                type="number" 
                value={form.price} 
                onChange={e=>setForm({...form, price:e.target.value})} 
                placeholder="25000" 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#666', textTransform: 'uppercase' }}>Weight (g)</label>
              <input 
                type="number" 
                value={form.weight} 
                onChange={e=>setForm({...form, weight:e.target.value})} 
                placeholder="10.5" 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#666', textTransform: 'uppercase' }}>Image URL / Filename</label>
              <input 
                type="text" 
                value={form.image} 
                onChange={e=>setForm({...form, image:e.target.value})} 
                placeholder="IMG or http://..." 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
              />
            </div>

            <button 
                onClick={handleAdd} 
                disabled={loading}
                style={{ width: '100%', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', background: 'var(--gold)', color: 'var(--dark)', fontSize: '16px' }}
            >
              {loading ? "Saving..." : "+ Add to Catalog"}
            </button>
          </div>

          {/* TABLE */}
          <div style={{ flex: 1.5, background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Inventory</h4>
              <span style={{ background: '#e6fffa', color: '#0d9488', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{products.length} Items</span>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#888', fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Product</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#888', fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#888', fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#888', fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>No products found. Add one!</td></tr>
                ) : products.map((p, i) => (
                  <tr key={i}>
                    <td style={{ padding: '15px', borderBottom: '1px solid #f8f8f8', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: '600' }}>{p.name}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>ID: #{1000+i}</div>
                    </td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #f8f8f8', verticalAlign: 'middle' }}>{p.category}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #f8f8f8', verticalAlign: 'middle', color: 'var(--gold-dark)', fontWeight: 'bold' }}>₹{p.price}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #f8f8f8', verticalAlign: 'middle' }}><span style={{ background: '#e6fffa', color: '#0d9488', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- MAIN ADMIN SCREEN ---
const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      // Check for token on mount
      const token = localStorage.getItem("adminToken");
      if(token) setIsAdmin(true);
    }, []);
  
    const handleLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem("adminToken");
    };

    if(!isAdmin) return <AdminLogin onLogin={()=>setIsAdmin(true)} />;
    return <Dashboard onLogout={handleLogout} />;
};

export default Admin;
