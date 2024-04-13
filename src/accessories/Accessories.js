import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../ForAllComponents.css'

export default function Accessories({ searchQuery }) {
  const [accessories, setAccessories] = useState([]);

  // search
  const filteredAccessories = accessories?.filter(
    (accessory) =>
      accessory?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      accessory?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const accessoriesPerPage = 28;

  const indexOfLastAccessory = currentPage * accessoriesPerPage;
  const indexOfFirstAccessory = indexOfLastAccessory - accessoriesPerPage;
  const currentAccessories = filteredAccessories?.slice(indexOfFirstAccessory,indexOfLastAccessory);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/accessories")
      .then((res) => {
        console.log(res.data);
        setAccessories(res.data);
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
        <div className="title">Accessories</div>
        <div className="parent">
          {currentAccessories?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_accessory/${item.id 
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
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {currentPage} /{" "}
              {Math.ceil(filteredAccessories?.length / accessoriesPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredAccessories?.length / accessoriesPerPage)
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

