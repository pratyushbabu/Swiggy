import React from 'react'

function Head() {
  return (
    <div className='w-full shadow-md h-20 flex justify-center items-center'>
      <div className='w-full flex justify-around '>
        {/* <p>fdg</p> */}
        <div className='flex mr-48'>
            <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />
            {/* <div className='felx items-center gap-2'> */}
              <p className='font-bold underline underline-offset-8 border-black mt-2 '>Other</p>
              <i className="fi text-2xl mt-2 text-orange-500 fi-rs-angle-small-down"></i>
              {/* <p className='font-bold underline underline-offset-8 border-black mt-2 '>others</p> */}
              {/* <i className="fi text-2xl mt-2 text-orange-500 fi-rs-angle-small-down"></i> */}
            {/* </div> */}
            
        </div>

        <div className='flex items-center gap-6'>
          {/* <div className='flex'>
            <i className="fi fi-rr-shopping-bag"></i>
            &nbsp;
            <p>Swiggy corporate</p>
          </div> */}
          <div className='flex'>
            <i className="fi fi-rs-search"></i>
            &nbsp;
            <p>Search</p>
          </div>
          {/* <div className='flex'>
            <i className="fi fi-rr-badge-percent"></i>
            &nbsp;
            <p>Offers</p>
          </div> */}
          {/* <div className='flex'>
            <i className="fi fi-rr-life-ring"></i>
            &nbsp;
            <p>Help</p>
          </div> */}
          {/* <div className='flex'>
            <i className="fi fi-rs-user"></i>
            &nbsp;
            <p>Sign in</p>
          </div> */}
          <div className='flex'>
            <i className="fi fi-rr-square-0"></i>
            &nbsp;
            <p>Cart</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Head
