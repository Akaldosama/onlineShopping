import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../../ForAllComponents.css'

export default function Cheap({ searchQuery }) {
  const [cheap, setCheap] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/cheap")
      .then((res) => {
        setCheap(res.data); // Set cheap data
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
            alert('Element added successfully', res.data);
        })
    .catch(err => console.log(err));
}


  return (
    <div>
      <div className="wrapper">
        <div className="title">Cheap</div>
        <div className="parent">
          {cheap?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_cheap/${item.id}`}>
                    <img src={item.image} alt="Image" />
                  </Link>
                </div>
                <div className="box">
                  <p>{item.model}</p>
                  <span>
                    <h4>{item.price}$</h4>
                    <button className="btn" onClick={() => sendBasket(item)}>
                    <i className="fa-solid fa-basket-shopping"></i>
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* <center>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {currentPage} / {Math.ceil(filteredCheap.length / cheapPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredCheap.length / cheapPerPage)
              }>
              Next
            </button>
          </div>
        </center> */}
      </div>
    </div>
  );
}
