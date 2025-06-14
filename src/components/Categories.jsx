// import React from 'react'
import React, { useEffect, useState } from 'react';
import '../index.css'


export default function Categories() {
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/categories");
                const result = await response.json();
                setData(result)
                console.log(result);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, [data.name]);
    // console.log(data)

    const HandleClick = (el) => {
        // e.target.value=data.name
        const res=data.filter((ele)=>ele.name==el.name)
        console.log(res)



    }

    return (
        <div className='flex flex-col justify-center items-center mt-4'>
            <div className='mb-4'>
                <div className='flex flex-start ml-2'>
                    <b>What's on your mind ?</b>
                </div>

                <div className='flex gap-6 justify-center items-center' >
                    {
                        data.map((ele) =>
                        (

                            <div key={ele.id} style={{ height: "180px", width: "144px" }}>
                                {/* <p>{ele.name}</p> */}
                                <img src={ele.image} onClick={()=>HandleClick(ele.name) } />
                            </div>))

                    }
                </div>
            </div>
            <br />
            <div className="h-px bg-gray-300 my-5 w-3/4 mx-auto mt-4 " />

        </div>
    )
}
