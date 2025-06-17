import { useState } from "react"
import Body from "./components/Body"
import Categories from "./components/Categories"
import Footer from "./components/Footer"
import Head from "./components/Head"
import Resturent from "./components/Resturent"
import './index.css'
import {Routes,Route} from "react-router-dom"

import Cart from "./pages/Cart"


function App() {
  // const [count, setCount] = useState(0)
  const [foodName,setFoodName]=useState("")

  return (
      <div>
        <Head/>
        <Routes>
          <Route path="/restaurants" element={<>
          <Categories foodName={foodName} setFoodName={setFoodName}/>
          <Resturent name={foodName} setFoodName={setFoodName}/>
          </>}/>
          
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
        
   
        <Footer/>
        {/* <Body/> */}
      </div>

  )
}

export default App




