import React, { useState, useEffect } from 'react';

function Checkout() {
  const [cartData, setCartData] = useState([]);

  const fetchCartData = () => {
    fetch("http://localhost:3000/checkout")
      .then(res => res.json())
      .then(setCartData)
      .catch(err => console.error("Error fetching cart data:", err));
  };

  useEffect(fetchCartData, []);

  const updateQuantity = async (id, newQty) => {
    try {
      if (newQty < 1) {
        await fetch(`http://localhost:3000/checkout/${id}`, { method: 'DELETE' });
        fetchCartData();
        return;
      }

      await fetch(`http://localhost:3000/checkout/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty })
      });
      fetchCartData();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const totalPrice = () => cartData.reduce((a, i) => a + i.price * i.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartData.map(item => (
            <div key={item.id} className="border p-4 rounded-md shadow-md flex items-center justify-between">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img src={item.image} alt={item.foodName} className="w-20 h-20 object-cover rounded-md" />
                )}
                <div>
                  <h2 className="font-semibold text-lg">{item.foodName}</h2>
                  <p className="text-sm text-gray-500">{item.restaurant}</p>
                  <p className="text-sm text-gray-700">₹{item.price} each</p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >-</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >+</button>
                </div>
                <p className="text-right mt-1 font-semibold text-green-600">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-bold">Total: ₹{totalPrice()}</div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
