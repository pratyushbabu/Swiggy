import React, { useEffect, useState } from 'react';
import '../index.css';
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

export default function Resturent({ name, setFoodName }) {
  const [restaurants, setRestaurants] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  // Fetch and filter restaurants by cuisine name
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch("http://localhost:3000/restaurants");
        const data = await response.json();

        const filtered = data.filter(el =>
          el.cuisine.some(cuisine =>
            cuisine.toLowerCase().includes(name.toLowerCase())
          )
        );
        setRestaurants(filtered);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurantData();
  }, [name, showButton]);

  // Clear search filter
  const handleClearSelection = async () => {
    try {
      setShowButton(false);
      setFoodName("");
    } catch (error) {
      console.error("Error clearing selection:", error);
    }
  };

  // Navigate to restaurant cart and store name in localStorage
  const handleCardClick = async (id, restaurantName) => {
    try {
      localStorage.setItem("restaurantName", restaurantName); // store for Cart.jsx
      navigate(`/restaurant/${id}`);
    } catch (error) {
      console.error("Error navigating to restaurant:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6 px-4">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          Top restaurant chains:
          <i className="text-orange-600 ml-1">{name}</i>
          {name && !showButton && (
            <button onClick={handleClearSelection} className="p-1 rounded">
              <RxCrossCircled className="text-center" />
            </button>
          )}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{ height: "240px", width: "275px" }}
              className="mb-6 p-2 transform scale-105 transition duration-300 hover:scale-100"
              onClick={() => handleCardClick(restaurant.id, restaurant.name)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-[450px] h-[170px] object-cover rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent rounded-b-2xl"></div>
                <p className="absolute bottom-0 left-0 text-white font-bold p-2 text-2xl">
                  {restaurant.offer}
                </p>
              </div>

              <h5 className="font-bold text-md">{restaurant.name}</h5>
              <div className="flex justify-start items-center">
                <b className="flex items-center text-sm text-gray-700">
                  <i className="fi fi-ss-circle-star text-green-500"></i>
                  <i className="ml-1">{restaurant.rating}</i>
                  <i className="fi fi-ss-bullet text-gray-500"></i>
                  {restaurant.deliveryTime}
                </b>
              </div>
              <p className="text-base font-sm text-gray-600">
                {restaurant.cuisine.join(", ")}
              </p>
              <p className="text-base font-sm text-gray-500">{restaurant.location}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-gray-300 my-6 w-full"></div>
      </div>
    </div>
  );
}
