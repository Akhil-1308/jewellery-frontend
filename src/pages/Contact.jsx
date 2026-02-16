import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://jewellery-backend-3.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Message sent successfully");
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Failed to send");
      }
    } catch (e) {
      alert("Server error");
    }
  };

  return (
    <div className="section">
      <div style={{
        maxWidth: '700px',
        margin: '50px auto',
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 30px 30px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: 'var(--gold)', marginBottom: '20px', textAlign: 'center' }}>Contact Us</h2>
        <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '30px' }}>We’d love to hear from you</p>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid var(--border)' }}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid var(--border)' }}
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid var(--border)', resize: 'none', height: '120px' }}
          ></textarea>

          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginTop: '15px', 
              borderRadius: '8px', 
              border: 'none', 
              background: 'var(--gold)', 
              color: 'var(--dark)', 
              fontWeight: '600', 
              cursor: 'pointer' 
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      <footer style={{ background: 'var(--dark)', color: 'white', textAlign: 'center', padding: '25px', fontSize: '13px' }}>
        © 2026 Gold Jewelry Store | Contact Support
      </footer>
    </div>
  );
};

export default Contact;
