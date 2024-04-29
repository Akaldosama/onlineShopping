import React, { useEffect, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../ForAllComponents.css";

export default function Recommend({ searchQuery }) {
  const [recommend, setRecommend] = useState([]);

  // search
  const filteredRec = recommend?.filter(
    (singleRecommend) =>
    singleRecommend?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    singleRecommend?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
    );



  const fetchData = () => {
    axios
      .get("http://localhost:8000/recommendations")
      .then((res) => {
        setRecommend(res.data);
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
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={45}
          totalSlides={3}
          isPlaying={true}
        >
          <Slider>
            <Slide index={0}>
              <img
                src="https://www.skechers.com/dw/image/v2/BDCN_PRD/on/demandware.static/-/Library-Sites-SkechersSharedLibrary/default/dw3096b1c2/images/2023-Images/Q3/Sept/SKX60097-Q3-23-SEP-WK3-SnoopRestock-Desktop-3000x1200.jpg"
                className="w-100"
                alt=""
              />
            </Slide>
            <Slide index={1}>
              <img
                src="https://www.skechers.com/dw/image/v2/BDCN_PRD/on/demandware.static/-/Library-Sites-SkechersSharedLibrary/default/dw70169e52/images/Landing/Mark%20Nason/SKX53443_Mark_Nason_Landing_Page_May_30_2022_3000X1200_V2.jpg"
                className="w-100"
                alt=""
              />
            </Slide>
            <Slide index={2}>
              <img
                src="https://www.skechers.com/dw/image/v2/BDCN_PRD/on/demandware.static/-/Library-Sites-SkechersSharedLibrary/default/dwda01dcb0/images/2023-Images/Q2/June/SKX58468-Rolling-Stones-Web-Assets-5-15-23_Hero_Desktop_3000x1200FINAL.jpg"
                className="w-100"
                alt=""
              />
            </Slide>
          </Slider>
          <center>
            <ButtonBack className="btn">
              <i class="fa-solid fa-arrow-left"></i>
            </ButtonBack>
            <ButtonNext className="btn">
              <i class="fa-solid fa-arrow-right"></i>
            </ButtonNext>
          </center>
        </CarouselProvider>
      </div>

      <div className="wrapper">
        <div className="title">Recommendations</div>
        <div className="parent">
          <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={30}
          totalSlides={recommend.length}
          isPlaying={false}
          className="h-100">
            <Slider className="d-flex h-25">
              {recommend?.map((item, index) => {
                return (
                  <Slide index={0} key={index} style={{width: 230}} className="mx-2">
                    <div className="card h-100">
                      <Link to={`/single_recommend/${item.id}`}>
                        <img className="card-img-top" src={item.image} alt="Card image cap" />
                      </Link>
                      <div className="card-body">
                        <p className="card-title">{item.model}</p>
                        <span className="d-flex justify-content-between align-items-center position-absolute fixed-bottom">
                          <b>${item.price}</b>
                          <button onClick={() => sendBasket(item)} className="btn btn-primary"><i className="fa-solid fa-cart-shopping"></i></button>
                        </span>
                      </div>
                    </div>
                  </Slide>
                );
              })}
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
}
