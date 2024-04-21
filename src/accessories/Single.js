// import React, {useState} from 'react'
// import axios from 'axios'
// import { useEffect } from 'react'
// import ModalComponent from '../modal/Modal'
// import '../ForAllSingleComponents.css'


// export default function SingleAccessory() {

//     const [modal, setModal] = useState(false)
    
//     const toggle = () => {
//         setModal(!modal)
//     }
    
//     const [count , setCount] = useState(1)


//     const [single, setSingle] = useState({})

//     const id = +window.location.href.split("/")[4];
//     console.log(id)

//     const fetchData = () => {
//         axios
//         .get('http://localhost:8000/accessories')
//         .then((res) => {
//             setSingle(res.data.filter(item => item.id == id))
//         }).catch(err => console.log(err))
//     }

//     useEffect(() => {
//         fetchData()
//     }, [])

//     const calculatePrice = () => {
//         return count * single[0]?.price; // Assuming single[0] contains the item data
//     }

//     const sendBasket = () => {
//         axios.post('http://localhost:8000/basket', single).then((res) => {
//             console.log('Element added successfully', res.data)
//         }).catch(err => console.log(err))
//     }



//   return (
//     <div className='container'>
//         <ModalComponent open={modal} toggle={toggle} itemModel={single[0]?.model} itemPrice={calculatePrice()} itemCount={count}/>     

//         {
//             single?.map((item, index) => {
//                 return <div key={index} className='parent'>
//                     <div className="child">
//                         <img src={item.image} alt="" />
//                     </div>
//                     <div className="child">
//                         <h3>{item.brand}</h3>
//                         <p>Amount:</p>
//                         <span>
//                             <button onClick={() => setCount((prev) => count <= 1 ? 1 : prev - 1)} className='btn'><i class="fa-solid fa-minus"></i></button>
//                             {count}
//                             <button onClick={() => setCount((prev) => prev + 1)} className='btn'><i class="fa-solid fa-plus"></i></button>
//                         </span> 
//                         <p>Price:</p>
//                         <h3 className='price'>{calculatePrice()}$</h3>
//                         <p className='desc'>{item.description}</p>
//                         <div className='box'>
//                             <button onClick={() => toggle(true)} className='btn btn-primary'>BUY NOW</button>
//                             <button onClick={sendBasket()} className='btn btn-light border-primary'><i class="fa-solid fa-basket-shopping"></i> ADD TO CART</button>
//                         </div>
//                     </div>
//                 </div>
//             })
//         }
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from '../modal/Modal';
import '../ForAllSingleComponents.css';

export default function SingleAccessory() {
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    
    const [count , setCount] = useState(1);
    const [single, setSingle] = useState([]);

    const id = +window.location.href.split("/")[4];
    console.log(id);

    const fetchData = () => {
        axios
        .get('http://localhost:8000/accessories')
        .then((res) => {
            setSingle(res.data.filter(item => item.id == id));
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const calculatePrice = () => {
        return count * single[0]?.price; // Assuming single[0] contains the item data
    }

    const sendBasket = (item) => {
        axios.post('http://localhost:8000/basket', item)
            .then((res) => {
                console.log('Element added successfully', res.data);
                // setSingle([]); // Clear the single state after successful submission
            })
        .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <ModalComponent open={modal} toggle={toggle} itemModel={single[0]?.model} itemPrice={calculatePrice()} itemCount={count}/>

            {
                single?.map((item, index) => {
                    return <div key={index} className='parent'>
                        <div className="child">
                            <img src={item.image} alt="" />
                        </div>
                        <div className="child">
                            <h3>{item.brand}</h3>
                            <p>Amount:</p>
                            <span>
                                <button onClick={() => setCount((prev) => count <= 1 ? 1 : prev - 1)} className='btn'><i className="fa-solid fa-minus"></i></button>
                                {count}
                                <button onClick={() => setCount((prev) => prev + 1)} className='btn'><i className="fa-solid fa-plus"></i></button>
                            </span> 
                            <p>Price:</p>
                            <h3 className='price'>{calculatePrice()}$</h3>
                            <p className='desc'>{item.description}</p>
                            <div className='box'>
                                <button onClick={() => toggle(true)} className='btn btn-primary'>BUY NOW</button>
                                <button onClick={() => sendBasket(item)} className='btn btn-light border-primary'>
                                    <i className="fa-solid fa-basket-shopping"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}
