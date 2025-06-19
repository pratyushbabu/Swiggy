import { use, useState } from "react"
import Body from "./components/Body"
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
  // const [count, setCount] = useState(0)

  const [foodName,setFoodName]=useState("")

  const [restaurant,setRestaurant]=useState("")

  const [restaurantId,setRestaurantId]=useState()

  const [cartLength,setCartLength]=useState()

  const [quantity,setQuantity]=useState(0)

  const location = useLocation();

  const hideFooterPaths = ['/restaurant','/checkout']; // Add more paths if needed
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);



  console.log(quantity)

  return (
    
    <div>
      <Head quantity={quantity}/>
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
                // restaurant={restaurant}
                setRestaurant={setRestaurant}
                name={foodName}
                setFoodName={setFoodName}
                setRestaurantId={setRestaurantId}
              />
            </>
          }
        />
        <Route
          path="/restaurant"
          element={<Cart restaurantId={restaurantId}  name={foodName} restuName={restaurant} setQuantity={setQuantity}/>}
        />

        <Route path="/checkout" element={<Checkout name={foodName} restuName={restaurant} quantity={quantity} setQuantity={setQuantity}/>}/>
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App




