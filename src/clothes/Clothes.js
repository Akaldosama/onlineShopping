import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../ForAllComponents.css'

export default function Clothes({ searchQuery }) {
  const [clothes, setClothes] = useState([]);

  // search
  const filteredClothes = clothes?.filter(
    (clothe) =>
      clothe?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      clothe?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const clothesPerPage = 24;

  const indexOfLastClothe = currentPage * clothesPerPage;
  const indexOfFirstClothe = indexOfLastClothe - clothesPerPage;
  const currentClothes = filteredClothes?.slice(
    indexOfFirstClothe,
    indexOfLastClothe
  );

  const fetchData = () => {
    axios
      .get("http://localhost:8000/clothes")
      .then((res) => {
        console.log(res.data);
        setClothes(res.data);
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
        <div className="title">Clothes</div>
        <p>{clothes.length} products</p>
        <div className="parent">
          {currentClothes?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_clothe/${item.id 
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
              {Math.ceil(filteredClothes?.length / clothesPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredClothes?.length / clothesPerPage)
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

