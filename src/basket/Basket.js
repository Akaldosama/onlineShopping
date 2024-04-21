import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Basket.css'

export default function Basket() {
    const [basket, setBasket] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/basket')
        .then((res) => {
            setBasket(res.data.map(item => ({ ...item, count: 1, originalPrice: item.price }))); // Add count and originalPrice properties to each item in the basket
        })
        .catch(err => console.log(err))
    }, [])

    const changeCount = (index, newCount) => {
        const updatedBasket = [...basket];
        updatedBasket[index] = { ...updatedBasket[index], count: newCount };
        updatedBasket[index].price = updatedBasket[index].originalPrice * newCount; // Update price based on original price and new count
        setBasket(updatedBasket);
    };    
    
    const delFunc = (id) => {
        axios.delete(`http://localhost:8000/basket/${id}`).then(res => { 
            setBasket(basket.filter(item => item.id !== id)); // Update basket state after deletion
        }).catch(err => {
            console.log(err)
        })
    }

    
    // Calculate total price of all items in the basket
    const totalPrice = basket.reduce((acc, item) => acc + +item.price, 0);

    // Calculate total number of items in the basket
    const totalItems = basket.length;

    return (
    <div className='basket'>
        <div className="parent">
        {
            basket?.map((item, index) => {
                return (
                    <div className="child" key={index}>
                        <div className="box">
                            <img src={item.image} alt="Image" />
                        </div>
                        <div className="box">
                            <p>{item.model}</p>
                            <p>Price: ${item.price}</p>
                            <div className="count">
                                <p>Amount:</p>
                                <span>
                                <button onClick={() => changeCount(index, item.count - 1)} className={`btn ${item.count <= 1 ? 'disabled' : ''}`} disabled={item.count <= 1}><i className="fa-solid fa-minus"></i></button> 
                                    {item.count}
                                <button onClick={() => changeCount(index, item.count + 1)} className='btn'><i className="fa-solid fa-plus"></i></button>
                                </span> 
                            </div>
                        </div>
                        <div className='box'>
                                <button className='delete btn' onClick={() => delFunc(item.id)}><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                );
            })
        }
        </div>
        <aside>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Items: {totalItems}</p>
        </aside>
    </div>
  )
}
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import './Basket.css'

// export default function Basket() {
//     const [basket, setBasket] = useState([])
//     const [count, setCount] = useState(1)
//     useEffect(() => {
//         axios.get('http://localhost:8000/basket')
//         .then((res) => {
//             setBasket(res.data)
//         })
//         .catch(err => console.log(err))
//     }, [])

//     const changeCount = (index, newCount) => {
//         const updatedBasket = [...basket];
//         updatedBasket[index] = { ...updatedBasket[index], count: newCount };
//         setBasket(updatedBasket);
//     };    
    
//     const delFunc = (id) => {
//         axios.delete(`http://localhost:8000/basket/${id}`).then(res => { 
//             basket.filter(item => id !== item.id)
//             setBasket([...basket])
//             window.location.reload()
//         }).catch(err => {
//             console.log(err)
//         })
//     }

//   return (
//     <div className='basket'>
//         <div className="parent">
//         {
//             basket?.map((item, index) => {
//                 return (
//                     <div className="child" key={index}>
//                         <div className="box">
//                             <img src={item.image} alt="Image" />
//                         </div>
//                         <div className="box">
//                             <p>{item.model}</p>
//                             <div className="count">
//                                 <p>Amount:</p>
//                             <span>
//                                 <button onClick={() => changeCount(index, item.count - 1)} className='btn border mx-3'><i className="fa-solid fa-minus"></i></button>
//                                 {item.count}
//                                 <button onClick={() => changeCount(index, item.count + 1)} className='btn border mx-3'><i className="fa-solid fa-plus"></i></button>
//                             </span> 
//                         </div>
//                         <button className='btn border' onClick={() => delFunc(item.id)}>Delete</button>
//                         </div>
//                     </div>
//                 );
//             })
//         }
//         </div>
//         <aside>
//             ;aksd;lasdalsdamlmd;lmasa da sda sdaksdsa d als d as d sa dla sd asl dl
//         </aside>
//     </div>
//   )
// }