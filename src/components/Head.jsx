import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Head(props) {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const storedQty = localStorage.getItem("totalQuantity");
    if (storedQty !== null) {
      setTotalQuantity(parseInt(storedQty, 10));
    }
  }, []);

  return (
    <div className='w-full shadow-md h-20 flex justify-c items-center'>
      <div className='w-full flex justify-between sticky'>
        <div className='ml-32 w-30 h-30'>
          <Link to="/">
            <img
              src="https://www.creativefabrica.com/wp-content/uploads/2018/10/Fast-Delivery-food-logo-by-DEEMKA-STUDIO-580x406.jpg"
              alt="Swiggy Logo"
              className="w-20 h-25 "
            />
          </Link>
        </div>

        <div className='flex items-center gap-8 mr-48'>
          {/* <div className='flex'>
            <i className="fi fi-rs-search"></i>
            &nbsp;
            <p>Search</p>
          </div> */}

          <Link to="/checkout">
            <div className='flex'>
              <i className="fi fi-rr-shopping-cart"></i>
              &nbsp;
              <b>Cart <span className='text-green-400'>({props.quantity})</span></b>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Head;
