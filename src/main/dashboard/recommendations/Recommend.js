import React , { useEffect, useState }  from "react";
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
import '../../../ForAllComponents.css'

export default function Recommend({searchQuery}) {
  const [recommendations, setRecommendations] = useState([]);
  

  // search
  const filteredRecommendations = recommendations?.filter(
    (recommend) =>
      recommend?.brand?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      recommend?.model?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recommendationsPerPage = 28;

  const indexOfLastRecommend = currentPage * recommendationsPerPage;
  const indexOfFirstRecommend = indexOfLastRecommend - recommendationsPerPage;
  const currentRecommendations = filteredRecommendations?.slice(
    indexOfFirstRecommend,
    indexOfLastRecommend
  );

  const fetchData = () => {
    axios
      .get("http://localhost:8000/recommendations")
      .then((res) => {
        console.log(res.data);
        setRecommendations(res.data);
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
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={35}
          totalSlides={3}
          isPlaying={true}
          className="carousel"
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
          {currentRecommendations?.map((item, index) => {
            return (
              <div className="child" key={index}>
                <div className="box">
                  <Link to={`/single_recommendation/${item.id 
                  }`}>
                    <img src={item.image} alt="" />
                  </Link>
                </div>
                <div className="box">
                  <p>{item.brand}</p>
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
              {Math.ceil(filteredRecommendations?.length / recommendationsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredRecommendations?.length / recommendationsPerPage)
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
