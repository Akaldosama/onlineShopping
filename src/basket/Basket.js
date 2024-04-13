import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Basket() {
    const [basket, setBasket] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/basket')
        .then((res) => {
            setBasket(res.data)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='container'>
        {
            basket?.map((item, index) => {
                return <div className="child" key={index}>
                    <p>{item.nameProduct}</p>
                    <p>{item.id}</p>
                    <img src={item.image} alt='' /> 
                    <p>{item.count}</p>
                </div>
            })
        }
    </div>
  )
}
