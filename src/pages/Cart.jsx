import React, { useEffect, useState } from 'react';

function Cart(props) {
  const [menu, setMenu] = useState([]);
  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/menuItems/?restaurantId=${props.restaurantId}`)
      .then(res => res.json())
      .then(setMenu)
      .catch(console.error);

    fetch("http://localhost:3000/checkout")
      .then(res => res.json())
      .then(setCheckoutData)
      .catch(console.error);
  }, [props.restaurantId]);

  const HandleAdd = async (item) => {
    const existing = checkoutData.find(ci => ci.foodName === item.name);

    if (existing) {
      await fetch(`http://localhost:3000/checkout/${existing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existing.quantity + 1 })
      });
    } else {
      await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName: item.name,
          image: item.image,
          price: Number(item.price),
          quantity: 1,
          description: item.description,
          restaurant: props.restuName
        })
      });
    }

    const updated = await fetch("http://localhost:3000/checkout").then(res => res.json());
    setCheckoutData(updated);
  };

  const updateQuantity = async (id, qty) => {
    if (qty <= 0) {
      await fetch(`http://localhost:3000/checkout/${id}`, { method: "DELETE" });
    } else {
      await props.setQuantity(qty)
      await fetch(`http://localhost:3000/checkout/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty })
      });
    }

    const updated = await fetch("http://localhost:3000/checkout").then(res => res.json());
    setCheckoutData(updated);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">{props.restuName}</h2>

      {menu.map((el) => {
        const existing = checkoutData.find(item => item.foodName === el.name);
        return (
          <div key={el.id} className="flex justify-between items-start border-b py-6 gap-4">
            <div className="w-2/3">
              <p className="font-semibold text-lg mb-1">{el.name}</p>
              <p className="text-sm font-medium">₹{el.price}</p>
              <p className="text-sm text-green-600">★ {el.rating}</p>
              <br />
              <p className="text-sm text-gray-600">{el.description}</p>
            </div>

            <div className="relative w-[160px] h-[110px]">
              <img src={el.image} alt={el.name} className="w-full h-full object-cover rounded-xl" />
              {existing ? (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(existing.id, existing.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  >-</button>
                  <span>{existing.quantity}</span>
                  <button
                    onClick={() => updateQuantity(existing.id, existing.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  >+</button>
                </div>
              ) : (
                <button
                  onClick={() => HandleAdd(el)}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 border text-green-500 font-semibold text-sm border-gray-400 bg-white shadow-md rounded-md hover:shadow-lg"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
