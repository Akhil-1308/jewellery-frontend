import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/signup';
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
  };

  return (
    <div className="section" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {!isLogin && (
            <>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name} 
                  onChange={handleChange}
                  required 
                  style={{ padding: '10px' }}
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  required 
                  style={{ padding: '10px' }}
                />
            </>
        )}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange}
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange}
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'var(--gold)', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center', cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
      </p>
    </div>
  );
};

export default Auth;
