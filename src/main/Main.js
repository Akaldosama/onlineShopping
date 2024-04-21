import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Clothes from "../clothes/Clothes";
import SingleClothe from "../clothes/Single";
import Electronics from "../electronics/Electronics";
import SingleElectronic from "../electronics/Single";
import Accessories from "../accessories/Accessories";
import SingleAccessory from "../accessories/Single";
import Recommend from "./dashboard/recommendations/Recommend";
import SingleRecommendations from "./dashboard/recommendations/Single";
import Dashboard from "./dashboard/Dashboard";
import Cheap from "./dashboard/cheap/Cheap";
import SingleCheap from "./dashboard/cheap/Single";
import Beauty from "../beauty/Beauty";
import SingleBeauty from "../beauty/Single";
import SingleSport from "../sport/Single";
import Sport from "../sport/Sport";
import Jewelry from "../jewelry/Jewelry";
import SingleJewelry from "../jewelry/Single";
import Basket from "../basket/Basket";

import "./Main.css";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(null)

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="main_header">
        <ul>
          <li><i class="fa-solid fa-location-dot"></i> Tashkent</li>
          <li><i class="fa-solid fa-truck"></i> Free delivery service to your home in 1 day</li>
        </ul>
      </div>
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
              <Link to='basket'>
                <i class="fa-solid fa-basket-shopping"></i> Basket
              </Link>
            </span>
          </li>
        </ul>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="electronics"
                  className={active === "electronics" ? 'active' : ''}
                  onClick={() => setActive("electronics")}
            >Electronics</Link>
          </li>
          <li>
            <Link to="clothes"
                  className={active === "clothes" ? 'active' : ''}
                  onClick={() => setActive("clothes")}
            >Clothes</Link>
          </li>
          <li>
            <Link to="accessories"
                  className={active === "accessories" ? 'active' : ''}
                  onClick={() => setActive("accessories")}
            >Accessories</Link>
          </li>
          <li>
            <Link to="beauty"
                  className={active === "beauty" ? 'active' : ''}
                  onClick={() => setActive("beauty")}
            >Beauty Products</Link>
          </li>
          <li>
            <Link to="sport" 
                  className={active === "sport" ? 'active' : ''} 
                  onClick={() => setActive("sport")}
            >Sport</Link>
          </li>
          <li>
            <Link to="jewelry"
                  className={active === "jewelry" ? 'active' : ''} 
                  onClick={() => setActive("jewelry")}
            >Jewelry</Link>
          </li>
        </ul>
      </nav>
      
      <div className="none">
        <div className="child">
          <Link to='/' className="navbar-logo text-decoration-none">
            Akaldosama
          </Link>
          <div className="two_links">
          <Link to='basket' className="navbar-toggle">
            <i class="fa-solid fa-basket-shopping"></i>
          </Link>
          <button className="navbar-toggle" onClick={toggleNav}>
            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
          </div>
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
              <Link to="beauty" className="navbar-link">
                Beauty Products
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="sport" className="navbar-link">
                Sport
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="jewelry" className="navbar-link">
                Jewelry
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
        <Route path="basket" element={<Basket />}></Route>
        <Route
         path='/' 
         element={<Dashboard />}
        ></Route>
        <Route
          path="recommend"
          element={<Recommend searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_recommendation/:id"
          element={<SingleRecommendations />}
        ></Route>
        <Route
          path="cheap"
          element={<Cheap searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_cheap/:id"
          element={<SingleCheap />}
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
        <Route
          path="beauty"
          element={<Beauty searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_beauty/:id"
          element={<SingleBeauty />}
        ></Route>
        <Route
          path="sport"
          element={<Sport searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_sport/:id"
          element={<SingleSport />}
        ></Route>
        <Route
          path="jewelry"
          element={<Jewelry searchQuery={searchQuery} />}
        ></Route>
        <Route
          path="single_jewelry/:id"
          element={<SingleJewelry />}
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
