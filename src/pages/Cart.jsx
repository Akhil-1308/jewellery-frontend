import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const checkout = () => {
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }
        alert("Order placed successfully!");
        setCart([]);
        localStorage.removeItem("cart");
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="section">
            <div style={{
                maxWidth: '900px',
                margin: '40px auto',
                background: 'white',
                padding: '30px',
                borderRadius: '14px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ color: 'var(--gold)', marginBottom: '20px' }}>My Cart</h2>
                
                <div id="cartItems">
                    {cart.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '15px 0' }}>
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                            <span onClick={() => removeFromCart(index)} style={{ cursor: 'pointer', color: 'red' }}>Remove</span>
                        </div>
                    ))}
                </div>

                <div className="total" style={{ textAlign: 'right', marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                    Total: ₹{total}
                </div>
                
                <button 
                    onClick={checkout}
                    style={{
                        background: 'var(--gold)',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        float: 'right',
                        cursor: 'pointer',
                        marginTop: '15px',
                        fontWeight: 'bold'
                    }}
                >
                    Checkout
                </button>
            </div>

            <footer style={{ background: 'var(--dark)', color: 'white', textAlign: 'center', padding: '25px', fontSize: '13px', marginTop: '50px' }}>
                © 2026 Gold Jewelry Store | Secure Checkout
            </footer>
        </div>
    );
};

export default Cart;
