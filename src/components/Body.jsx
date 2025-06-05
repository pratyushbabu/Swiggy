import React, { use, useEffect, useState } from 'react'

function Body() {
    const [data, setData] = useState([]);
    async function fetchData() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5799017&lng=88.4465282&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const result = await data.json();
        console.log(result?.data?.cards[0]?.card?.card?.imageGridCards.info);
        setData(result?.data?.cards[0]?.card?.card?.imageGridCards.info)
    }
    useEffect(() => {
        fetchData()
    }, [])
  return (
    <div className='w-full'>
        
        <div className='w-[75%] mx-auto mt-3 overflow-hidden'>
            {/* body */}
            <div className='flex justify-between mt-5'>
                <h1 className='font-bold text-4xl'>What's in your mind?</h1>
                <div className='flex gap-3'>
                    <div className='bg-gray-200 rounded-full w-9 h-9 flex justify-center items-center'>
                        <i className="fi text-2xl mt-1 fi-rr-arrow-small-left"></i>
                    </div>
                    <div className='bg-gray-200 rounded-full w-9 h-9 flex justify-center items-center'>
                        <i className="fi text-2xl mt-1 fi-rr-arrow-small-right"></i>
                    </div>
                </div>
            </div>
            <div className='flex mt-4'>
            {
                data.map((item) => (
                    <img className='w-40' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageGridCards}`} alt='' />
                ))
            }
            </div>
        </div>
      
    </div>
  )
}

export default Body
