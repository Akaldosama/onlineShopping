import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../ForAllComponents.css'

export default function Electronics({ searchQuery }) {
  const [electronics, setElectronics] = useState([]);

  // search
  const filteredElectronics = electronics?.filter(
    (electronic) =>
      electronic?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      electronic?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const electronicsPerPage = 28;

  const indexOfLastElectronic = currentPage * electronicsPerPage;
  const indexOfFirstElectronic = indexOfLastElectronic - electronicsPerPage;
  const currentElectronics = filteredElectronics?.slice(
    indexOfFirstElectronic,
    indexOfLastElectronic
  );

  const fetchData = () => {
    axios
      .get("http://localhost:8000/electronics")
      .then((res) => {
        console.log(res.data);
        setElectronics(res.data);
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
        <div className="title">Electronics</div>
        <div className="parent">
          {currentElectronics?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_electronic/${item.id 
                  }`}>
                    <img src={item.image} alt="" />
                  </Link>
                </div>
                <div className="box">
                  <p>{item.model}</p>
                  <span>
                    <h4>{item.price}$</h4>
                    <button className="btn btn">
                      <i class="fa-solid fa-basket-shopping"></i>
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            {currentPage} /{" "}
            {Math.ceil(filteredElectronics?.length / electronicsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredElectronics?.length / electronicsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
