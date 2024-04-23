import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../ForAllComponents.css'

export default function Beauty({ searchQuery }) {
  const [beauty, setBeauty] = useState([]);

  // search
  const filteredBeauty = beauty?.filter(
    (singleBeauty) =>
    singleBeauty?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    singleBeauty?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const beautyPerPage = 24;

  const indexOfLastBeauty = currentPage * beautyPerPage;
  const indexOfFirstBeauty = indexOfLastBeauty - beautyPerPage;
  const currentBeauty = filteredBeauty?.slice(indexOfFirstBeauty,indexOfLastBeauty);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/beauty")
      .then((res) => {
        console.log(res.data);
        setBeauty(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const sendBasket = (item) => {
    axios.post('http://localhost:8000/basket', item)
        .then((res) => {
            console.log('Element added successfully', res.data);
            // setSingle([]); // Clear the single state after successful submission
        })
    .catch(err => console.log(err));
}


  return (
    <div>
      <div className="wrapper">
        <div className="title">Accessories</div>
        <p>{beauty.length} products</p>
        <div className="parent">
          {currentBeauty?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_beauty/${item.id 
                  }`}>
                    <img src={item.image} alt="" />
                  </Link>
                </div>
                <div className="box">
                  <p>
                    {item.model.split(" ").slice(0, 5).join(" ")}
                    {item.model.split(" ").length > 5 && '...'}
                  </p>
                  <span>
                    <h4>{item.price}$</h4>
                    <button onClick={() => sendBasket(item)} className='btn'>
                      <i className="fa-solid fa-basket-shopping"></i>
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <center>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {currentPage} /{" "}
              {Math.ceil(filteredBeauty?.length / beautyPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredBeauty?.length / beautyPerPage)
              }
            >
              Next
            </button>
          </div>
        </center>
      </div>
    </div>
  );
}

