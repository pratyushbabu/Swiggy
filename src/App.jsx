import { useState } from "react"
import Body from "./components/Body"
import Categories from "./components/Categories"
import Footer from "./components/Footer"
import Head from "./components/Head"
import Resturent from "./components/Resturent"
import './index.css'
import { BrowserRouter } from 'react-router-dom';


function App() {
  // const [count, setCount] = useState(0)
  const [foodName,setFoodName]=useState("")

  return (
      <div>
        <Head/>
        <Categories foodName={foodName} setFoodName={setFoodName}/>
   
        <Resturent name={foodName} setFoodName={setFoodName}/>
        <Footer/>
        {/* <Body/> */}
      </div>
  )
}

export default App




