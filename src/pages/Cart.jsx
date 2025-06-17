import React, { useEffect, useState } from 'react'

function Cart(props) {
    
    const [menu, setMenu] = useState([])

    useEffect(()=>{
        const fetchMenuData = async () => {
        try {
            // const id=Object.entries(props)
            // console.log("Inside try",id)
            const nres = await fetch(`http://localhost:3000/menuItems/?restaurantId=${props.restaurantId}`);
            const result = await nres.json();
            // console.log("This is nres-->",result)

            setMenu(result)
            
            
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }

    }

    fetchMenuData();
    },[props.restaurantId])

    
    return (
       <div className="max-w-5xl mx-auto px-4 py-6">
  {menu.map((el) => (
    <div
      key={el.id}
      className="flex justify-between items-start border-b py-6 gap-4"
    >
      {/* Text content */}
      <div className="w-2/3">
        <p className="font-semibold text-lg mb-1">{el.name}</p>
        <p className="text-gray-600 text-sm mb-2">₹{el.price}</p>
        {/* You can uncomment category if needed */}
        {/* <p className="text-gray-500 text-sm">{el.category}</p> */}
      </div>

      {/* Image + placeholder for add button */}
      <div className="relative w-[160px] h-[110px]">
        <img
          src={el.image}
          alt={el.name}
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Future Add Button */}
        <button
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 border text-green-500 font-semibold text-sm border-gray-400 bg-white shadow-md rounded-md hover:shadow-lg"
        >
          Add
        </button>
      </div>
    </div>
  ))}
</div>

    )
}

export default Cart