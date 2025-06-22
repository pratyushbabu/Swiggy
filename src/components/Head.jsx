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
        <div className='ml-32'>
          <Link to="/">
            <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="Logo" />
          </Link>
        </div>

        <div className='flex items-center gap-8 mr-48'>
          <div className='flex'>
            <i className="fi fi-rs-search"></i>
            &nbsp;
            <p>Search</p>
          </div>

          <Link to="/checkout">
            <div className='flex'>
              <i className="fi fi-rr-shopping-cart"></i>
              &nbsp;
              <p>Cart ({props.quantity})</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Head;
