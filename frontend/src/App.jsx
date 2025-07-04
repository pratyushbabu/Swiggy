import { use, useState } from "react"

import Categories from "./components/Categories"
import Footer from "./components/Footer"
import Head from "./components/Head"
import Resturent from "./components/Resturent"
import './index.css'
import {Routes,Route} from "react-router-dom"

import Cart from "./pages/Cart"
import { useLocation } from 'react-router-dom';
import Checkout from "./pages/Checkout"



function App() {
  const [foodName, setFoodName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [restaurantId, setRestaurantId] = useState();
  const [quantity, setQuantity] = useState(localStorage.getItem("totalQuantity"));
  const location = useLocation();

  const hideFooter = location.pathname.startsWith('/restaurant') || location.pathname === '/checkout';

  return (
    <div>
      <Head quantity={quantity} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Categories foodName={foodName} setFoodName={setFoodName} />
              <Resturent
                setRestaurant={setRestaurant}
                name={foodName}
                setFoodName={setFoodName}
                setRestaurantId={setRestaurantId}
              />
            </>
          }
        />
        <Route
          path="/restaurant/:id"
          element={
            <Cart
              restaurantId={restaurantId}
              name={foodName}
              restuName={restaurant}
              setQuantity={setQuantity}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              name={foodName}
              restuName={restaurant}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </div>
  );
}


export default App




