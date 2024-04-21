import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../../ForAllComponents.css'

export default function Cheap({ searchQuery }) {
  const [cheap, setCheap] = useState([]);

  // search
  const filteredCheap = cheap?.filter(
    (singleCheap) =>
    singleCheap?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    singleCheap?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    console.log(filteredCheap, 'cheap')

  // pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const cheapPerPage = 24;

  // const indexOfLastCheap = currentPage * cheapPerPage;
  // const indexOfFirstCheap = indexOfLastCheap - cheapPerPage;
  // const currentCheap = cheap?.slice(
  //   indexOfFirstCheap,
  //   indexOfLastCheap
  // );
  console.log(filteredCheap, 'cheap')

  const fetchData = () => {
    axios
      .get("http://localhost:8000/cheap")
      .then((res) => {
        setCheap(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="wrapper">
        <div className="title">Cheap</div>
        <div className="parent">
          {filteredCheap?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_cheap/${item.id 
                  }`}>
                    <img src={item.image} alt="" />
                  </Link>
                </div>
                <div className="box">
                  <p>{item.model}</p>
                  <span>
                    <h4>{item.price}$</h4>
                    <i class="fa-solid fa-basket-shopping"></i>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <center>
          {/* <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {currentPage} /{" "}
              {Math.ceil(filteredCheap?.length / cheapPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredCheap?.length / cheapPerPage)
              }
            >
              Next
            </button>
          </div> */}
        </center>
      </div>
    </div>
  );
}

