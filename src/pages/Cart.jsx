import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Cart(props) {
  const { id: restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [checkoutData, setCheckoutData] = useState([]);
  const [restaurantName, setRestaurantName] = useState("Loading...");
  const [selected, setSelected] = useState(null); // "veg", "nonveg", or null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restRes = await fetch("http://localhost:3000/restaurants");
        const allRestaurants = await restRes.json();
        const matched = allRestaurants.find(r => r.id.toString() === restaurantId);
        setRestaurantName(matched?.name || "Restaurant");

        const menuRes = await fetch(`http://localhost:3000/menuItems/?restaurantId=${restaurantId}`);
        const menuData = await menuRes.json();
        setMenu(menuData);

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
    props.setQuantity(totalQuantity);
  }, [checkoutData]);

  const handleAdd = async (item) => {
    try {
      const existing = checkoutData.find(ci => ci.foodName === item.name);
      const otherRestaurantItem = checkoutData.find(ci => ci.restaurant !== restaurantName);

      if (otherRestaurantItem) {
        const confirmReplace = window.confirm(
          "Your cart contains items from another restaurant. Do you want to replace them?"
        );
        if (!confirmReplace) return;

        for (const ci of checkoutData) {
          await fetch(`http://localhost:3000/checkout/${ci.id}`, { method: "DELETE" });
        }
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

  // Filter menu based on selected category
  const filteredMenu = selected
    ? menu.filter((item) => item.category.toLowerCase() === selected)
    : menu;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header and Toggle Buttons */}
      <div className="flex items-center gap-6 mb-6">
        <b className="text-2xl text-orange-500">{restaurantName}</b>

  {/* Veg Toggle */}
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={selected === "veg"}
      onChange={() => setSelected(selected === "veg" ? null : "veg")}
    />
    <div className="relative w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900">Veg</span>
  </label>

  {/* Non-Veg Toggle */}
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={selected === "nonveg"}
      onChange={() => setSelected(selected === "nonveg" ? null : "nonveg")}
    />
    <div className="relative w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900">Non-Veg</span>
  </label>

  {/* All Toggle */}
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={selected === null}
      onChange={() => setSelected(selected === null ? "all-disabled" : null)} // Forces deselection if clicked again
    />
    <div className="relative w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900">All</span>
  </label>
</div>


      <div className="text-center mb-6">
        <b>🍕🍔🍟🌭🍿~ 🧑‍🍳MENU🧑‍🍳~ 🥪🌮🍗🥠🍜</b>
      </div>

      {/* Menu Items */}
      {filteredMenu.map((el) => {
        const existing = checkoutData.find(item => item.foodName === el.name);
        return (
          <div key={el.id} className="flex justify-between items-start border-b py-6 gap-4">
            <div className="w-2/3">
              {el.category=="veg"?(<div className='flex justify-center items-center h-8 w-8 rounded-lg border-2 border-green-800'><div className='h-5 w-5 border-2 border-green-600  bg-green-800 rounded-full'></div></div>):(<div className='flex justify-center items-center h-8 w-8 rounded-lg border-2 border-red-800'><div className='h-5 w-5 border-2 border-red-600  bg-red-800 rounded-full'></div></div>)}
              <p className="font-semibold text-lg mb-1">{el.name}</p>
              <p className="text-sm font-medium">₹{el.price}</p>
              <p className="text-sm text-green-600">★ {el.rating}</p>
              <br />
              <p className="text-sm text-gray-600">{el.description}</p>
            </div>

            <div className="relative w-[160px] h-[110px]">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent rounded-b-xl z-10"></div>

              <img
                src={el.image}
                alt={el.name}
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Quantity Controls or Add Button */}
              {existing ? (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 flex items-center gap-2 bg-white p-1 rounded shadow">
                  <button
                    onClick={() => updateQuantity(existing.id, existing.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold text-green-600"
                  >
                    -
                  </button>
                  <span className="text-black font-bold">{existing.quantity}</span>
                  <button
                    onClick={() => updateQuantity(existing.id, existing.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold text-green-600"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAdd(el)}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 px-4 py-1 border text-green-600 font-semibold text-sm border-gray-400 bg-white shadow-md rounded-md hover:shadow-lg z-20"
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





















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function Cart(props) {
//   const { id: restaurantId } = useParams();
//   const [menu, setMenu] = useState([]);
//   const [checkoutData, setCheckoutData] = useState([]);
//   const [restaurantName, setRestaurantName] = useState("Loading...");


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch all restaurants and find the current one by ID
//         const restRes = await fetch("http://localhost:3000/restaurants");
//         const allRestaurants = await restRes.json();
//         const matched = allRestaurants.find(r => r.id.toString() === restaurantId);
        
//         setRestaurantName(matched?.name || "Restaurant");

//         // Fetch menu for the restaurant
//         const menuRes = await fetch(`http://localhost:3000/menuItems/?restaurantId=${restaurantId}`);
//         const menuData = await menuRes.json();
//         console.log("Menudata~~~~~->",menuData)
//         setMenu(menuData);

//         // Fetch checkout data
//         const checkoutRes = await fetch("http://localhost:3000/checkout");
//         const checkoutData = await checkoutRes.json();
//         setCheckoutData(checkoutData);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, [restaurantId]);


//   useEffect(() => {
//     const totalQuantity = checkoutData.reduce((sum, item) => sum + item.quantity, 0);
//     localStorage.setItem("totalQuantity", totalQuantity);
//     props.setQuantity(totalQuantity)
//   }, [checkoutData]);

//   const handleAdd = async (item) => {
//     try {
//       const existing = checkoutData.find(ci => ci.foodName === item.name);

//       // Check if cart has items from a different restaurant
//       const otherRestaurantItem = checkoutData.find(ci => ci.restaurant !== restaurantName);

//       if (otherRestaurantItem) {
//         const confirmReplace = window.confirm(
//           "Your cart contains items from another restaurant. Do you want to replace them with items from this one?"
//         );

//         if (!confirmReplace) return;

//         // Clear existing cart
//         for (const ci of checkoutData) {
//           await fetch(`http://localhost:3000/checkout/${ci.id}`, {
//             method: "DELETE",
//           });
//         }

//         // Reset checkoutData after clearing
//         setCheckoutData([]);
//       }

//       if (existing) {

//         await fetch(`http://localhost:3000/checkout/${existing.id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ quantity: existing.quantity + 1 }),
//         });
//       } else {


//         await fetch("http://localhost:3000/checkout", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             foodName: item.name,
//             image: item.image,
//             price: Number(item.price),
//             quantity: 1,
//             description: item.description,
//             restaurant: restaurantName,
//           }),
//         });
//       }

//       const updated = await fetch("http://localhost:3000/checkout");
//       const updatedData = await updated.json();
//       setCheckoutData(updatedData);

//     } catch (error) {
//       console.error("Error handling add to cart:", error);
//     }
//   };


//   const updateQuantity = async (id, qty) => {
//     try {
//       if (qty <= 0) {
//         await fetch(`http://localhost:3000/checkout/${id}`, { method: "DELETE" });
//       } else {
//         await fetch(`http://localhost:3000/checkout/${id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ quantity: qty }),
//         });
//       }

//       const updated = await fetch("http://localhost:3000/checkout");
//       const updatedData = await updated.json();
//       setCheckoutData(updatedData);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       <h2 className="text-xl font-bold mb-4">{restaurantName}</h2>
//       <div className='text-center'>
//           <b>🍕🍔🍟🌭🍿~ 🧑‍🍳MENU🧑‍🍳~ 🥪🌮🍗🥠🍜</b>
//       </div>
      

//       {menu.map((el) => {
//         const existing = checkoutData.find(item => item.foodName === el.name);
//         return (
//           <div key={el.id} className="flex justify-between items-start border-b py-6 gap-4">
//             <div className="w-2/3">
//               <p className="font-semibold text-lg mb-1">{el.name}</p>
//               <p className="text-sm font-medium">₹{el.price}</p>
//               <p className="text-sm text-green-600">★ {el.rating}</p>
//               <br />
//               <p className="text-sm text-gray-600">{el.description}</p>
//             </div>

//             <div className="relative w-[160px] h-[110px]">
//               {/* Gradient overlay */}
//               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent rounded-b-xl z-10"></div>

//               {/* Image */}
//               <img
//                 src={el.image}
//                 alt={el.name}
//                 className="w-full h-full object-cover rounded-xl"
//               />

//               {/* Quantity controls */}
//               {existing ? (
//                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 flex items-center gap-2 bg-white p-1 rounded shadow">
//                   <button
//                     onClick={() => updateQuantity(existing.id, existing.quantity - 1)}
//                     className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold text-green-600"
//                   >
//                     -
//                   </button>
//                   <span className="text-black font-bold">{existing.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(existing.id, existing.quantity + 1)}
//                     className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold text-green-600 "
//                   >
//                     +
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => handleAdd(el)}
//                   className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 px-4 py-1 border text-green-600 font-semibold text-sm border-gray-400 bg-white shadow-md rounded-md hover:shadow-lg z-20"
//                 >
//                   Add
//                 </button>
//               )}
//             </div>

//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Cart;
