import React, { useState } from 'react'
import '../index.css'
export default function Resturent() {
    const [ndata, setNdata] = useState([])
    const nres = fetch("http://localhost:3000/restaurants").then(rest => { return rest.json() }).then(ndata => setNdata(ndata))
    return (
        <div className='flex flex-col justify-center items-center mt-6 px-4'>
            <div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Top restaurant chains</h3>

                </div>
                <div className='flex gap-5 justify-center items-center ' >
                    {
                        ndata.map((ele) =>
                        (<div key={ele.id} style={{ height: "240px", width: "275px" }} className='p-2'>
                            <div className="relative overflow-hidden">
                                <img src={ele.image} className="w-[450px] h-[170px] object-cover rounded-2xl border-radius  " />
                                {/* <div className="absolute inset-0  rounded-2xl bottom-0 left-0  bg-black bg-opacity-50 text-white text-center p-2"></div> */}
                                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent rounded-b-2xl"></div>
                                <p className="absolute bottom-0 left-0  text-white font-bold p-2 text-2xl">
                                    {ele.offer}
                                </p>
                            </div>

                            <h5 className="font-bold text-md">{ele.name}</h5>
                            <div className='flex justify-start items-center '>
                                <b className="flex items-center text-sm text-gray-700">
                                    <i className="fi fi-ss-circle-star text-green-500"></i>
                                    <i className="ml-1">{ele.rating}</i>
                                    <i className="fi fi-ss-bullet text-gray-500"></i>
                                    {ele.deliveryTime}
                                </b>

                            </div>
                            <p className="text-sm text-gray-600">{ele.cuisine.join(", ")}</p>
                            <p className="text-sm text-gray-500">{ele.location}</p>

                        </div>))
                    }
                </div>
                <br />
                <br />
                <br />
                <div className="h-px bg-gray-300 my-6 w-full"></div>
            </div>


        </div>

    )
}
