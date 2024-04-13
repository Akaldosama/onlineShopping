import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Clothes from "../clothes/Clothes";
import SingleClothe from "../clothes/singleProduct/Single";
import Electronics from "../electronics/Electronics";
import SingleElectronic from "../electronics/singleProduct/Single";
import Accessories from "../accessories/Accessories";
import SingleAccessory from "../accessories/singleProduct/Single";
import Recommend from "./dashboard/recommendations/Recommend";
import SingleRecommendations from "./dashboard/recommendations/singleProduct/Single";
import Dashboard from "./dashboard/Dashboard";
import "./Main.css";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header>
        <ul>
          <li>
            <a href="/">Akaldosama</a>
          </li>
          <li>
            <span>
              <input
                type="text"
                placeholder="Search from category name..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button>
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </span>
            <span>
              <Link>
                <i class="fa-solid fa-basket-shopping"></i> Basket
              </Link>
            </span>
          </li>
        </ul>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="electronics">Electronics</Link>
          </li>
          <li>
            <Link to="clothes">Clothes</Link>
          </li>
          <li>
            <Link to="accessories">Accessories</Link>
          </li>
          <li>
            <a href="#">Beauty Products</a>
          </li>
          <li>
            <a href="#">Sport</a>
          </li>
          <li>
            <a href="#">Construction</a>
          </li>
        </ul>
      </nav>
      
      <div className="none">
        <div className="child">
          <Link to='/' className="navbar-logo text-decoration-none">
            Akaldosama
          </Link>
          <button className="navbar-toggle" onClick={toggleNav}>
            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
          <ul className={isOpen ? 'navbar-menu active' : 'navbar-menu'}>
            <li className="navbar-item">
              <Link to="electronics" className="navbar-link">
                Electronics
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="clothes" className="navbar-link">
                Clothes
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="accessories" className="navbar-link">
                Accessories
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="#" className="navbar-link">
                Beauty Products
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="#" className="navbar-link">
                Sport
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="#" className="navbar-link">
                Construction
              </Link>
            </li>
          </ul>
        </div>
        <div className="child">
          <input
            type="text"
            placeholder="Search from category name..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={<Dashboard searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_recommendation/:id"
          element={<SingleRecommendations />}
        ></Route>
        <Route
          path="electronics"
          element={<Electronics searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_electronic/:id"
          element={<SingleElectronic />}
        ></Route>
        <Route
          path="clothes"
          element={<Clothes searchQuery={searchQuery} />}
        ></Route>
        <Route path="single_clothe/:id" element={<SingleClothe />}></Route>
        <Route
          path="accessories"
          element={<Accessories searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_accessory/:id"
          element={<SingleAccessory />}
        ></Route>
      </Routes>

      <footer>
        <div className="parent">
          <div className="child">
            <ul>
              <span>About Us</span>
              <li>When we started?</li>
              <li>Company</li>
              <li>Work</li>
              <li>Advices?</li>
            </ul>
          </div>
          <div className="child">
            <ul>
              <span>For Users</span>
              <li>Offices</li>
              <li>Employees</li>
              <li>Employers</li>
              <li>Advices?</li>
            </ul>
          </div>
          <div className="child">
            <ul>
              <span>For Business</span>
              <li>Call us at: +998991234567</li>
              <li>
                Location: Qoratosh 4d 2/4 128,
                <br /> Tashkent Uzbekistan
              </li>
            </ul>
          </div>
          <div className="child">
            <ul>
              <span>Links</span>
              <li>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-telegram"></i>
                <i class="fa-brands fa-x-twitter"></i>
                <i class="fa-brands fa-facebook"></i>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <hr />
      <div className="underFooter">
        <p>Copyright © 2024 Akaldosama. All rights reserved </p>
      </div>
    </div>
  );
}
