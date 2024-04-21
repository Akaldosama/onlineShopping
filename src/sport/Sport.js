import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../ForAllComponents.css'

export default function Sport({ searchQuery }) {
  const [sport, setSport] = useState([]);

  // search
  const filteredSport = sport?.filter(
    (singleSport) =>
      singleSport?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      singleSport?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const sportPerPage = 24;

  const indexOfLastSport = currentPage * sportPerPage;
  const indexOfFirstSport = indexOfLastSport - sportPerPage;
  const currentSport = filteredSport?.slice(
    indexOfFirstSport,
    indexOfLastSport
  );

  const fetchData = () => {
    axios
      .get("http://localhost:8000/sport")
      .then((res) => {
        console.log(res.data);
        setSport(res.data);
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
        <div className="title">Sport</div>
        <p>{sport.length} products</p>
        <div className="parent">
          {currentSport?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_sport/${item.id 
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
                    <button onClick={() => sendBasket(item)} className='btn'><i className="fa-solid fa-basket-shopping"></i></button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            {currentPage} /{" "}
            {Math.ceil(filteredSport?.length / sportPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredSport?.length / sportPerPage)
            }>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
