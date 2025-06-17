import { useState } from "react"
import Body from "./components/Body"
import Categories from "./components/Categories"
import Footer from "./components/Footer"
import Head from "./components/Head"
import Resturent from "./components/Resturent"
import './index.css'
import {Routes,Route} from "react-router-dom"

import Cart from "./pages/Cart"
import { useLocation } from 'react-router-dom';



function App() {
  // const [count, setCount] = useState(0)
  const [foodName,setFoodName]=useState("")

  const [restaurantId,setRestaurantId]=useState()

  const location = useLocation();

  const hideFooterPaths = ['/cart']; // Add more paths if needed
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div>
      <Head />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Categories
                foodName={foodName}
                setFoodName={setFoodName}
              />
              <Resturent
                name={foodName}
                setFoodName={setFoodName}
                setRestaurantId={setRestaurantId}
              />
            </>
          }
        />
        <Route
          path="/cart"
          element={<Cart restaurantId={restaurantId} />}
        />
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App




