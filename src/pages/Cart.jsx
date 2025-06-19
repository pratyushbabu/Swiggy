import React, { useEffect, useState } from 'react';

function Cart(props) {
  const [menu, setMenu] = useState([]);
  const [itemsData, setItemsData] = useState([]);

  // Load menu items
  useEffect(() => {
    fetch(`http://localhost:3000/menuItems/?restaurantId=${props.restaurantId}`)
      .then(res => res.json())
      .then(setMenu)
      .catch(err => console.error("Error fetching menu items:", err));
  }, [props.restaurantId]);

  // Load current checkout items
  const fetchCheckout = () => {
    fetch("http://localhost:3000/checkout")
      .then(res => res.json())
      .then(setItemsData)
      .catch(err => console.error("Error fetching checkout:", err));
  };

  useEffect(fetchCheckout, []);

  const HandleCardData = async (name, image, price, description) => {
    try {
      // Always fetch fresh cart state
      const res = await fetch("http://localhost:3000/checkout");
      const allItems = await res.json();

      const existing = allItems.find(item => item.foodName === name);

      if (existing) {
        const newQty = Number(existing.quantity) + 1;

        await fetch(`http://localhost:3000/checkout/${existing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQty })
        });

        console.log(`Updated quantity for ${name} → ${newQty}`);
      } else {
        const newItem = {
          foodName: name,
          image,
          price: Number(price),
          quantity: 1,
          description,
          restaurant: props.restuName
        };

        await fetch("http://localhost:3000/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem)
        });

        console.log(`Added new item: ${name}`);
      }

      fetchCheckout();
    } catch (err) {
      console.error("Error in HandleCardData:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2><b>{props.restuName}</b></h2>

      <h2 className='flex justify-center items-center my-4'>
        ~~~~~<b>M E N U</b>~~~~~~
      </h2>

      {menu.map(el => (
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
            <button
              onClick={() => HandleCardData(el.name, el.image, el.price, el.description)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 border text-green-500 font-semibold text-sm border-gray-400 bg-white shadow-md rounded-md hover:shadow-lg"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
