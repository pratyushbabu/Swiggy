// import React from 'react'
import React, { useState } from 'react';
import '../index.css'

export default function Categories() {
    const [data, setData] = useState([])

    const result = fetch("http://localhost:3000/categories").then(res => { return res.json() }).then(data => setData(data))
    // console.log(data)


    return (
        <div className='flex flex-col justify-center items-center mt-4'>
            <div className='mb-4'>
                <div className='flex flex-start ml-2'>
                    <b>What's on uour mind ?</b>
                </div>

                <div className='flex gap-6 justify-center items-center' >
                    {
                        data.map((ele) =>
                        (

                            <div key={ele.id} style={{ height: "180px", width: "144px" }}>
                                {/* <p>{ele.name}</p> */}
                                <img src={ele.image} />
                            </div>))

                    }
                </div>
            </div>
            <br/>
            <div className="h-px bg-gray-300 my-5 w-3/4 mx-auto mt-4 " />

        </div>
    )
}
