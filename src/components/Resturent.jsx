import React, { useEffect, useState } from 'react'
import '../index.css'
export default function Resturent({name}) {

    
    const [ndata, setNdata] = useState([])
    useEffect(()=>{

        const fetchResturantData= async()=>{
            try{
                const nres = await fetch("http://localhost:3000/restaurants")
                const result = await nres.json();
                console.log("This is the result",result)
                const res = result.filter(el=>el.cuisine.some(c => c.toLowerCase().includes(name.toLowerCase())))
                // const res = result.filter(el =>el.cuisine.some(c => c.toLowerCase().includes(name.toLowerCase()))
                    

                console.log(res)
                setNdata(res)
            }
            catch(error){
                console.error("Error fetching categories:", error);
            }

        }

        
       fetchResturantData()

    },[name])
    
    return (
        
        <div className='flex flex-col justify-center items-center mt-6 px-4'>
            
            <div >
                <div>
                    <h3 className="text-xl font-bold mb-4">Top restaurant chains: <i className='text-orange-600'>{name}</i> </h3>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 '>

                    {
                        ndata.map((ele) =>
                        (<div key={ele.id} style={{ height: "240px", width: "275px" }} className='mb-6 p-2  transform scale-105 transition duration-300 hover:scale-100' >
                    
                            <div className="relative overflow-hidden  ">
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
                            <p className="text-base font-sm text-gray-600">{ele.cuisine.join(", ")}</p>
                            <p className="text-base font-sm text-gray-500">{ele.location}</p>

                        </div>))
                    }
                </div>
                <br />
                <br />
                <br />
                <div className=" h-px bg-gray-300 my-6 w-full"></div>
            </div>


        </div>

    )
}
