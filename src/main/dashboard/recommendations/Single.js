import React, {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import '../../../ForAllSingleComponents.css'
import ModalComponent from '../../../modal/Modal'


export default function SingleRecommendations() {

    const [modal, setModal] = useState(false)
    
    const toggle = () => {
        setModal(!modal)
    }
    
    const [single, setSingle] = useState([])
    const id = +window.location.href.split("/")[4];
    const [count , setCount] = useState(1)
    const [size, setSize] = useState('')
    console.log(id)

    const fetchData = () => {
        axios.get('http://localhost:8000/recommendations')
        .then((res) => {
            setSingle(res?.data?.filter(item => item.id == id))
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [])



  return (
    <div className='wrapper'>
        <ModalComponent open={modal} toggle={toggle} />     

        {
            single?.map((item, index) => {
                return <div key={index} className='parent'>
                    <div className="child">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="child">
                        <h3>{item.brand}</h3>
                        <p>Size: {size}</p>
                        <div className='sizeBtnDiv'>
                        {Object?.values(item.size)?.map((size, index) => (
                        <button key={index} className='btn btn-light border' value={size} onClick={(e) => setSize(e.target.value)}>{size}</button>
                        ))}
                        </div>
                        <p>Amount:</p>
                        <span>
                            <button onClick={() => setCount((prev) => count <= 1 ? 1 : prev - 1)}><i class="fa-solid fa-minus"></i></button>
                            {count}
                            <button onClick={() => setCount((prev) => prev + 1)}><i class="fa-solid fa-plus"></i></button>
                        </span>
                        <p>Price:</p>
                        <h3 className='price'>{count * item.price}$</h3>
                        <p className='desc'>{item.description}</p>
                        <div className='box'>
                            <button onClick={() => toggle(true)} className='btn btn-primary'>BUY NOW</button>
                            <button className='btn btn-light border-primary'><i class="fa-solid fa-basket-shopping"></i> ADD TO CART</button>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
  )
}
