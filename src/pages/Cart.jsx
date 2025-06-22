import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Cart(props) {
  const { id: restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [checkoutData, setCheckoutData] = useState([]);
  const [restaurantName, setRestaurantName] = useState("Loading...");


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all restaurants and find the current one by ID
        const restRes = await fetch("http://localhost:3000/restaurants");
        const allRestaurants = await restRes.json();
        const matched = allRestaurants.find(r => r.id.toString() === restaurantId);
        setRestaurantName(matched?.name || "Restaurant");

        // Fetch menu for the restaurant
        const menuRes = await fetch(`http://localhost:3000/menuItems/?restaurantId=${restaurantId}`);
        const menuData = await menuRes.json();
        setMenu(menuData);

        // Fetch checkout data
        const checkoutRes = await fetch("http://localhost:3000/checkout");
        const checkoutData = await checkoutRes.json();
        setCheckoutData(checkoutData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [restaurantId]);


useEffect(() => {
    const totalQuantity = checkoutData.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("totalQuantity", totalQuantity);
    props.setQuantity(totalQuantity)
  }, [checkoutData]);

  const handleAdd = async (item) => {
  try {
    const existing = checkoutData.find(ci => ci.foodName === item.name);

    // Check if cart has items from a different restaurant
    const otherRestaurantItem = checkoutData.find(ci => ci.restaurant !== restaurantName);

    if (otherRestaurantItem) {
      const confirmReplace = window.confirm(
        "Your cart contains items from another restaurant. Do you want to replace them with items from this one?"
      );

      if (!confirmReplace) return;

      // Clear existing cart
      for (const ci of checkoutData) {
        await fetch(`http://localhost:3000/checkout/${ci.id}`, {
          method: "DELETE",
        });
      }

      // Reset checkoutData after clearing
      setCheckoutData([]);
    }

    if (existing) {
       
      await fetch(`http://localhost:3000/checkout/${existing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existing.quantity + 1 }),
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
          restaurant: restaurantName,
        }),
      });
    }

    const updated = await fetch("http://localhost:3000/checkout");
    const updatedData = await updated.json();
    setCheckoutData(updatedData);

  } catch (error) {
    console.error("Error handling add to cart:", error);
  }
};


  const updateQuantity = async (id, qty) => {
    try {
      if (qty <= 0) {
        await fetch(`http://localhost:3000/checkout/${id}`, { method: "DELETE" });
      } else {
        await fetch(`http://localhost:3000/checkout/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: qty }),
        });
      }

      const updated = await fetch("http://localhost:3000/checkout");
      const updatedData = await updated.json();
      setCheckoutData(updatedData);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">{restaurantName}</h2>

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
              <img
                src={el.image}
                alt={el.name}
                className="w-full h-full object-cover rounded-xl"
              />
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
                  onClick={() => handleAdd(el)}
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
