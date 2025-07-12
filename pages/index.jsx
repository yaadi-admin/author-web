import dynamic from "next/dynamic";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Resume from "../src/components/Resume";
import ContactForm from "../src/components/ContactForm";
import Layout from "../src/layouts/Layout";
import {
  servicesSliderProps,
  testimonialsSliderProps,
} from "../src/sliderProps";

// Add CSS for hover effects
const galleryStyles = `
  .gallery-item:hover .hover-overlay {
    opacity: 1 !important;
  }
  .gallery-item:hover img {
    transform: scale(1.1) !important;
  }
`;

const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
const Index = () => {
  return (
    <Layout pageClassName={"home"}>
      <style jsx>{galleryStyles}</style>
      {/* Section - Hero Started */}
      <section
        className="lui-section lui-section-hero lui-gradient-top"
        id="started-section"
      >
        <div className="container">
          {/* Hero Started */}
          <div className="lui-started v-line v-line-left">
            <div className="section hero-started" style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
              <div
                className="slide scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{ 
                  position: 'relative', 
                  left: '0', 
                  right: 'auto', 
                  marginTop: '0',
                  width: '700px',
                  height: '800px',
                  flexShrink: 0
                }}
              >
                <img
                  decoding="async"
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-06-30%20at%2012.26.26.jpeg?alt=media&token=ebeb7337-d062-437a-9224-e782611d7404"
                  alt="Suzanna Griffiths"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
                />
              </div>
              <div
                className="content scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{ flex: 1, paddingLeft: '0' }}
              >
                <div className="titles">
                  <div className="lui-subtitle">
                    <span>
                      {" "}
                    </span>
                  </div>
                  <h3
                    className="title splitting-text-anim-1 scroll-animate"
                    data-splitting="chars"
                    data-animate="active"
                  >
                    <span>
                      <b>Faith. Healing. </b>Identity. Purpose.{" "}
                    </span>
                  </h3>
                  {/* <span>Planting Seeds of Hope, </span> */}
                  {/* <div className="label lui-subtitle">
                    {" "}
                    <strong>
                      {Array.from("One Dream at a Time").map((char, index) => (
                        <span key={index + 25}>{char}</span>
                      ))}
                    </strong>
                  </div> */}
                </div>
                <div className="description">
                  <div>
                    <p>
                    Suzanna Griffiths is a woman of faith on a mission to help others
heal, grow, and rediscover their God-given identity. Her life and
voice are a testament that restoration is possible and purpose is real,
no matter your story.
                    </p>
                  </div>
                  <div className="social-links">
                    <a target="_blank" rel="nofollow" href="http://www.instagram.com/suelyn.empoweredliving">
                      <i aria-hidden="true" className="fab fa-instagram" />
                    </a>
                    <a target="_blank" rel="nofollow" href="https://www.facebook.com/suzanna.johnson.75">
                      <i aria-hidden="true" className="fab fa-facebook" />
                    </a>
                    <a target="_blank" rel="nofollow" href="https://www.linkedin.com/in/suzanna-griffiths/">
                      <i aria-hidden="true" className="fab fa-linkedin" />
                    </a>
                  </div>
                </div>
                <div className="bts">
                  <a
                    target="_blank"
                    href="#books-section"
                    className="btn"
                  >
                    <span>Work With Suzanna</span>
                  </a>
                  <a href="#skills-section" className="btn-lnk" style={{ marginTop: '10px' }}>
                    {" "}
                    Explore My Journey{" "}
                  </a>
                  <a
                    target="_blank"
                    href="#books-section"
                    className="btn"
                  >
                    <span>Watch My Story</span>
                  </a>
                  <a href="#skills-section" className="btn-lnk">
                    {" "}
                    Book a Session{" "}
                  </a>
                  
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Author </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Image Gallery */}
      <section
        className="lui-section lui-gradient-center"
        id="gallery-section"
        style={{
          padding: "60px 0",
          maxHeight: "400px",
          overflow: "hidden"
        }}
      >
        <div className="container">
          <div className="row" style={{ margin: 0 }}>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" style={{ padding: 0 }}>
              <div
                className="gallery-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{
                  position: "relative",
                  height: "400px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
                  alt="Faith & Healing"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
                <div
                  className="hover-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(116, 28, 130, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    padding: "20px",
                    textAlign: "center"
                  }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
                    Faith & Healing
                  </h3>
                  <p style={{ color: "#fff", fontSize: "16px", lineHeight: "1.4" }}>
                    Discovering God's love and finding healing through faith
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" style={{ padding: 0 }}>
              <div
                className="gallery-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{
                  position: "relative",
                  height: "400px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/5c3969c6-62f0-4a9c-a6dd-b6e72ea77815_removalai_preview.png?alt=media&token=84095b7d-1715-4ae9-b197-39fb4dff39ad"
                  alt="Identity & Purpose"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
                <div
                  className="hover-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(248, 73, 136, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    padding: "20px",
                    textAlign: "center"
                  }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
                    Identity & Purpose
                  </h3>
                  <p style={{ color: "#fff", fontSize: "16px", lineHeight: "1.4" }}>
                    Embracing your God-given identity and living with purpose
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" style={{ padding: 0 }}>
              <div
                className="gallery-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{
                  position: "relative",
                  height: "400px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-06-30%20at%2012.26.26.jpeg?alt=media&token=ebeb7337-d062-437a-9224-e782611d7404"
                  alt="Empowered Living"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
                <div
                  className="hover-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(116, 28, 130, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    padding: "20px",
                    textAlign: "center"
                  }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
                    Empowered Living
                  </h3>
                  <p style={{ color: "#fff", fontSize: "16px", lineHeight: "1.4" }}>
                    Breaking free from shame and stepping into your power
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" style={{ padding: 0 }}>
              <div
                className="gallery-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{
                  position: "relative",
                  height: "400px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
                  alt="Transformation"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
                <div
                  className="hover-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(248, 73, 136, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    padding: "20px",
                    textAlign: "center"
                  }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
                    Transformation
                  </h3>
                  <p style={{ color: "#fff", fontSize: "16px", lineHeight: "1.4" }}>
                    Real change through God's grace and authentic connection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Foundation */}
      <section
       className="lui-section lui-gradient-bottom"
        id="services-section"
        style={{
          position: "relative",
          backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/5c3969c6-62f0-4a9c-a6dd-b6e72ea77815_removalai_preview.png?alt=media&token=84095b7d-1715-4ae9-b197-39fb4dff39ad)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Background Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 1
        }}></div>
        
        {/* Get To Know Me Content */}
        <div className="v-line v-line-left" style={{ position: "relative", zIndex: 2 }}>
          <div className="container">
            <div className="section hero-started" style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
              <div
                className="slide scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{ 
                  position: 'relative', 
                  left: '0', 
                  right: 'auto', 
                  marginTop: '0',
                  width: '400px',
                  height: '500px',
                  flexShrink: 0
                }}
              >
                <img
                  decoding="async"
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/5c3969c6-62f0-4a9c-a6dd-b6e72ea77815_removalai_preview.png?alt=media&token=84095b7d-1715-4ae9-b197-39fb4dff39ad"
                  alt="Suzanna Griffiths"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '200px' }}
                />
                <span className="circle circle-1" style={{ display: 'none' }} />
                <span
                  className="circle img-1"
                  style={{
                    backgroundImage: "url(assets/images/pat-1.png)",
                    display: 'none'
                  }}
                />
                <span
                  className="circle img-2"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)",
                    display: 'none'
                  }}
                />
                <span
                  className="circle img-3"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)",
                    display: 'none'
                  }}
                />
                <div className="info-list" style={{ display: 'none' }}>
                  <ul>
                    <li>
                      <span className="num">
                        Faith <strong>+</strong>
                      </span>
                      <span className="value">
                        Based <strong>Living</strong>
                      </span>
                    </li>
                    <li>
                      <span className="num">Purpose</span>
                      <span className="value">
                        Driven <strong>Life</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="content scrolla-element-anim-1 scroll-animate"
                data-animate="active"
                style={{ flex: 1, paddingLeft: '0' }}
              >
                <div className="titles">
                  <div className="lui-subtitle">
                    <span>
                      {" "}
                      Get To Know <b>Me</b>
                    </span>
                  </div>
                  <div className="lui-text">
                    <h4 style={{ 
                      fontSize: '28px', 
                      lineHeight: '1.4', 
                      marginBottom: '30px',
                      fontWeight: '600',
                      color: '#000'
                    }}>
                      Suzanna Griffiths is the heart behind SueLyn Empowered Living - a faith-based space where healing, purpose, and identity come alive.
                    </h4>
                  </div>
                </div>
                <div className="description">
                  <div>
                    <p>
                      As a personal development facilitator with a passion for helping people discover their God-given worth, Suzanna walks alongside others with compassion, truth, and unshakable hope.
                    </p>
                    <p>
                      Though she grew up in church and always sensed God's presence, Suzanna kept Him at a distance, disheartened by the masks she saw religion sometimes wear. But when life brought her to a breaking point, she met Jesus in the most real and redeeming way. That moment of raw encounter didn't just change her - it launched her mission.
                    </p>
                    <p>
                      With a strong foundation in psychology, sociology, and human sexuality, Suzanna brings a unique, holistic perspective to her work. She empowers people to break free from shame, embrace their story, and step boldly into who they were created to be.
                    </p>
                    <p>
                      Known for her authenticity, infectious joy, and deep faith, Suzanna is also a loving wife and proud mom of two. Her family life fuels her message of grace, restoration, and unshakable purpose.
                    </p>
                    <p>
                      At SueLyn Empowered Living, Suzanna isn't just offering tools - she's offering transformation. And she's here to remind you: You are seen, you are loved, and your life has purpose.
                    </p>
                  </div>
                </div>
                <div className="bts">
                  <a
                    href="#contact-section"
                    className="btn"
                  >
                    <span>Connect With Me</span>
                  </a>
                  <a href="#events-section" className="btn-lnk">
                    {" "}
                    Upcoming Events{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> About Me </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Services */}
      <section
        className="lui-section lui-gradient-center"
        id="events-section"
      >
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Upcoming Events </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                {/* <span>
                  {" "}
                  by <b>SueLyn</b>{" "}
                </span> */}
              </div>
            </div>
          </div>
        </div>
        {/* Services */}
        <div className="v-line v-line-right">
          <div className="container">
            <PortfolioIsotope />
            <div className="lui-bgtitle">
              <span> Events </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Experience */}
      <section
        className="lui-section lui-gradient-center"
        id="experience-section"
        style={{
          position: "relative",
          backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Background Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1
        }}></div>
        
        {/* Heading */}
        <div className="lui-heading" style={{ position: "relative", zIndex: 2 }}>
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
                style={{ color: "#fff" }}
              >
                <span> My Journey of Impact </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
                style={{ color: "#fff" }}
              >
                <span>
                  {" "}
                  Over a decade of <b>Faith-Driven Ministry</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Experience */}
        <div className="v-line v-line-left" style={{ position: "relative", zIndex: 2 }}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <div
                  className="experience-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                  style={{
                    backgroundColor: "#741C82",
                    padding: "40px 20px",
                    borderRadius: "20px",
                    textAlign: "center",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div className="icon" style={{ marginBottom: "20px" }}>
                    <i aria-hidden="true" className="fas fa-star" style={{ fontSize: "48px", color: "#fff" }} />
                  </div>
                  <div className="number" style={{ fontSize: "48px", fontWeight: "bold", color: "#fff", marginBottom: "10px" }}>
                    12+
                  </div>
                  <div className="label" style={{ fontSize: "18px", color: "#fff", fontWeight: "500" }}>
                    Years of Ministry
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "100px",
                      height: "100px",
                      opacity: "0.1"
                    }}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <div
                  className="experience-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                  style={{
                    backgroundColor: "#F84988",
                    padding: "40px 20px",
                    borderRadius: "20px",
                    textAlign: "center",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div className="icon" style={{ marginBottom: "20px" }}>
                    <i aria-hidden="true" className="fas fa-globe" style={{ fontSize: "48px", color: "#fff" }} />
                  </div>
                  <div className="number" style={{ fontSize: "48px", fontWeight: "bold", color: "#fff", marginBottom: "10px" }}>
                    4
                  </div>
                  <div className="label" style={{ fontSize: "18px", color: "#fff", fontWeight: "500" }}>
                    Continents Reached
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-1.png)",
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "100px",
                      height: "100px",
                      opacity: "0.1"
                    }}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <div
                  className="experience-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                  style={{
                    backgroundColor: "#741C82",
                    padding: "40px 20px",
                    borderRadius: "20px",
                    textAlign: "center",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div className="icon" style={{ marginBottom: "20px" }}>
                    <i aria-hidden="true" className="fas fa-users" style={{ fontSize: "48px", color: "#fff" }} />
                  </div>
                  <div className="number" style={{ fontSize: "48px", fontWeight: "bold", color: "#fff", marginBottom: "10px" }}>
                    1,500+
                  </div>
                  <div className="label" style={{ fontSize: "18px", color: "#fff", fontWeight: "500" }}>
                    Lives Transformed
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "100px",
                      height: "100px",
                      opacity: "0.1"
                    }}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <div
                  className="experience-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                  style={{
                    backgroundColor: "#F84988",
                    padding: "40px 20px",
                    borderRadius: "20px",
                    textAlign: "center",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div className="icon" style={{ marginBottom: "20px" }}>
                    <i aria-hidden="true" className="fas fa-heart" style={{ fontSize: "48px", color: "#fff" }} />
                  </div>
                  <div className="number" style={{ fontSize: "48px", fontWeight: "bold", color: "#fff", marginBottom: "10px" }}>
                    100%
                  </div>
                  <div className="label" style={{ fontSize: "18px", color: "#fff", fontWeight: "500" }}>
                    Faith-Driven
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-1.png)",
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "100px",
                      height: "100px",
                      opacity: "0.1"
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Experience </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Testimonials */}
      <section
        className="lui-section lui-gradient-center"
        id="testimonials-section"
      >
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Reviews </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  what <b>Readers Say</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="v-line v-line-right">
          <div className="container">
            <Swiper
              {...testimonialsSliderProps}
              className="swiper-container js-testimonials scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <SwiperSlide className="swiper-slide">
                <div style={{
                backgroundColor: "#F84988",
              }} className="testimonials-item">
                  <div className="image">
                    <img
                      decoding="async"
                      src="assets/images/testi4-2.jpg"
                      alt="Barbara Wilson"
                    />
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="44px"
                        height="34px"
                      >
                        <path
                          fillRule="evenodd"
                          strokeWidth="2px"
                          stroke="rgb(0, 0, 0)"
                          fill="rgb(41, 165, 135)"
                          d="M17.360,8.325 C15.490,5.563 11.616,4.762 8.705,6.536 C6.901,7.635 5.815,9.533 5.826,11.567 C5.828,14.854 8.637,17.516 12.101,17.515 C13.290,17.513 14.456,17.192 15.460,16.587 C14.967,17.975 14.049,19.457 12.537,20.942 C11.934,21.533 11.951,22.476 12.574,23.048 C13.198,23.619 14.192,23.604 14.794,23.012 C20.384,17.515 19.658,11.539 17.360,8.333 L17.360,8.325 ZM32.407,8.325 C30.538,5.563 26.663,4.762 23.752,6.536 C21.949,7.635 20.863,9.533 20.873,11.567 C20.875,14.854 23.685,17.516 27.148,17.515 C28.338,17.513 29.503,17.192 30.508,16.587 C30.015,17.975 29.097,19.457 27.585,20.942 C26.982,21.533 26.999,22.476 27.622,23.048 C28.245,23.619 29.239,23.604 29.842,23.012 C35.432,17.515 34.706,11.539 32.407,8.333 L32.407,8.325 Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text lui-text">
                    <div>
                      <p style={{color: "#fff"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                  <div className="info">
                    <h6 className="name">
                      <span style={{color: "#fff"}}>Barbara Wilson</span>
                    </h6>
                    <div className="author">
                      <span style={{color: "#fff"}}>CEO Company</span>
                    </div>
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div style={{
                backgroundColor: "#F84988",
              }} className="testimonials-item">
                  <div className="image">
                    <img
                      decoding="async"
                      src="assets/images/testi4-1.jpg"
                      alt="Charlie Smith"
                    />
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="44px"
                        height="34px"
                      >
                        <path
                          fillRule="evenodd"
                          strokeWidth="2px"
                          stroke="rgb(0, 0, 0)"
                          fill="rgb(41, 165, 135)"
                          d="M17.360,8.325 C15.490,5.563 11.616,4.762 8.705,6.536 C6.901,7.635 5.815,9.533 5.826,11.567 C5.828,14.854 8.637,17.516 12.101,17.515 C13.290,17.513 14.456,17.192 15.460,16.587 C14.967,17.975 14.049,19.457 12.537,20.942 C11.934,21.533 11.951,22.476 12.574,23.048 C13.198,23.619 14.192,23.604 14.794,23.012 C20.384,17.515 19.658,11.539 17.360,8.333 L17.360,8.325 ZM32.407,8.325 C30.538,5.563 26.663,4.762 23.752,6.536 C21.949,7.635 20.863,9.533 20.873,11.567 C20.875,14.854 23.685,17.516 27.148,17.515 C28.338,17.513 29.503,17.192 30.508,16.587 C30.015,17.975 29.097,19.457 27.585,20.942 C26.982,21.533 26.999,22.476 27.622,23.048 C28.245,23.619 29.239,23.604 29.842,23.012 C35.432,17.515 34.706,11.539 32.407,8.333 L32.407,8.325 Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text lui-text">
                    <div>
                      <p style={{color: "#fff"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                  <div className="info">
                    <h6 className="name">
                      <span style={{color: "#fff"}}>Charlie Smith</span>
                    </h6>
                    <div className="author">
                      <span style={{color: "#fff"}}>Designer</span>
                    </div>
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div style={{
                backgroundColor: "#F84988",
              }} className="testimonials-item">
                  <div className="image">
                    <img
                      decoding="async"
                      src="assets/images/testi4-4.jpg"
                      alt="Roy Wang"
                    />
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="44px"
                        height="34px"
                      >
                        <path
                          fillRule="evenodd"
                          strokeWidth="2px"
                          stroke="rgb(0, 0, 0)"
                          fill="rgb(41, 165, 135)"
                          d="M17.360,8.325 C15.490,5.563 11.616,4.762 8.705,6.536 C6.901,7.635 5.815,9.533 5.826,11.567 C5.828,14.854 8.637,17.516 12.101,17.515 C13.290,17.513 14.456,17.192 15.460,16.587 C14.967,17.975 14.049,19.457 12.537,20.942 C11.934,21.533 11.951,22.476 12.574,23.048 C13.198,23.619 14.192,23.604 14.794,23.012 C20.384,17.515 19.658,11.539 17.360,8.333 L17.360,8.325 ZM32.407,8.325 C30.538,5.563 26.663,4.762 23.752,6.536 C21.949,7.635 20.863,9.533 20.873,11.567 C20.875,14.854 23.685,17.516 27.148,17.515 C28.338,17.513 29.503,17.192 30.508,16.587 C30.015,17.975 29.097,19.457 27.585,20.942 C26.982,21.533 26.999,22.476 27.622,23.048 C28.245,23.619 29.239,23.604 29.842,23.012 C35.432,17.515 34.706,11.539 32.407,8.333 L32.407,8.325 Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text lui-text">
                    <div>
                      <p style={{color: "#fff"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                  <div className="info">
                    <h6 className="name">
                      <span style={{color: "#fff"}}>Roy Wang</span>
                    </h6>
                    <div className="author">
                      <span style={{color: "#fff"}}>Manager GYM</span>
                    </div>
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div style={{
                backgroundColor: "#F84988",
              }} className="testimonials-item">
                  <div className="image">
                    <img
                      decoding="async"
                      src="assets/images/testi4-3.jpg"
                      alt="Jennifer Smith"
                    />
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="44px"
                        height="34px"
                      >
                        <path
                          fillRule="evenodd"
                          strokeWidth="2px"
                          stroke="rgb(0, 0, 0)"
                          fill="rgb(41, 165, 135)"
                          d="M17.360,8.325 C15.490,5.563 11.616,4.762 8.705,6.536 C6.901,7.635 5.815,9.533 5.826,11.567 C5.828,14.854 8.637,17.516 12.101,17.515 C13.290,17.513 14.456,17.192 15.460,16.587 C14.967,17.975 14.049,19.457 12.537,20.942 C11.934,21.533 11.951,22.476 12.574,23.048 C13.198,23.619 14.192,23.604 14.794,23.012 C20.384,17.515 19.658,11.539 17.360,8.333 L17.360,8.325 ZM32.407,8.325 C30.538,5.563 26.663,4.762 23.752,6.536 C21.949,7.635 20.863,9.533 20.873,11.567 C20.875,14.854 23.685,17.516 27.148,17.515 C28.338,17.513 29.503,17.192 30.508,16.587 C30.015,17.975 29.097,19.457 27.585,20.942 C26.982,21.533 26.999,22.476 27.622,23.048 C28.245,23.619 29.239,23.604 29.842,23.012 C35.432,17.515 34.706,11.539 32.407,8.333 L32.407,8.325 Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text lui-text">
                    <div>
                      <p style={{color: "#fff"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                  <div className="info">
                    <h6 className="name">
                      <span style={{color: "#fff"}}>Jennifer Smith</span>
                    </h6>
                    <div className="author">
                      <span style={{color: "#fff"}}>CEO &amp; Founder</span>
                    </div>
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div style={{
                backgroundColor: "#F84988",
              }} className="testimonials-item">
                  <div className="image">
                    <img
                      decoding="async"
                      src="assets/images/testi4-5.jpg"
                      alt="Paul Freeman"
                    />
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="44px"
                        height="34px"
                      >
                        <path
                          fillRule="evenodd"
                          strokeWidth="2px"
                          stroke="rgb(0, 0, 0)"
                          fill="rgb(41, 165, 135)"
                          d="M17.360,8.325 C15.490,5.563 11.616,4.762 8.705,6.536 C6.901,7.635 5.815,9.533 5.826,11.567 C5.828,14.854 8.637,17.516 12.101,17.515 C13.290,17.513 14.456,17.192 15.460,16.587 C14.967,17.975 14.049,19.457 12.537,20.942 C11.934,21.533 11.951,22.476 12.574,23.048 C13.198,23.619 14.192,23.604 14.794,23.012 C20.384,17.515 19.658,11.539 17.360,8.333 L17.360,8.325 ZM32.407,8.325 C30.538,5.563 26.663,4.762 23.752,6.536 C21.949,7.635 20.863,9.533 20.873,11.567 C20.875,14.854 23.685,17.516 27.148,17.515 C28.338,17.513 29.503,17.192 30.508,16.587 C30.015,17.975 29.097,19.457 27.585,20.942 C26.982,21.533 26.999,22.476 27.622,23.048 C28.245,23.619 29.239,23.604 29.842,23.012 C35.432,17.515 34.706,11.539 32.407,8.333 L32.407,8.325 Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text lui-text">
                    <div>
                      <p style={{color: "#fff"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                  <div className="info">
                    <h6 className="name">
                      <span style={{color: "#fff"}}>Paul Freeman</span>
                    </h6>
                    <div className="author">
                      <span style={{color: "#fff"}}>Photographer</span>
                    </div>
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <div className="swiper-pagination" />
            </Swiper>
            <div className="lui-bgtitle">
              <span> Reviews </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Pricing */}
      {/* <section className="lui-section lui-gradient-center" id="pricing-section"> */}
        {/* Heading */}
        {/* <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Pricing </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Price Board</b>
                </span>
              </div>
            </div>
          </div>
        </div> */}
        {/* Pricing */}
        {/* <div className="v-line v-line-left">
          <div className="container">
            <div className="pricing-items row">
              <div className="pricing-col col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div
                  className="pricing-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="lui-subtitle">
                    <span> Hourley Basis </span>
                  </div>
                  <div className="icon" />
                  <div className="price">
                    <span>
                      {" "}
                      39 <b>$</b>
                    </span>
                    <em>Hour</em>
                  </div>
                  <div className="lui-text">
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Quis ipsum suspendisse ultrices gravida.
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div>
                      <ul>
                        <li>
                          <i className="fas fa-check" />
                          Brand Design
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Web Development
                        </li>
                        <li>
                          <em>Advertising</em>
                        </li>
                        <li>
                          <em>Photography</em>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#contact-section" className="btn btn-solid">
                    <span>Start Project</span>
                  </a>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </div>
              <div className="pricing-col center col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div className="label">
                  <span> Popular </span>
                </div>
                <div
                  className="pricing-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="lui-subtitle">
                    <span> Freelancing </span>
                  </div>
                  <div className="icon" />
                  <div className="price">
                    <span>
                      {" "}
                      259 <b>$</b>
                    </span>
                    <em>Week</em>
                  </div>
                  <div className="lui-text">
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Quis ipsum suspendisse ultrices gravida.
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div>
                      <ul>
                        <li>
                          <i className="fas fa-check" />
                          Brand Design
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Web Development
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Advertising
                        </li>
                        <li>
                          <em>Photography</em>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#contact-section" className="btn btn-solid">
                    <span>Start Project</span>
                  </a>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </div>
              <div className="pricing-col col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div
                  className="pricing-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="lui-subtitle">
                    <span> Full Time </span>
                  </div>
                  <div className="icon" />
                  <div className="price">
                    <span>
                      {" "}
                      1.249 <b>$</b>
                    </span>
                    <em>Month</em>
                  </div>
                  <div className="lui-text">
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Quis ipsum suspendisse ultrices gravida.
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div>
                      <ul>
                        <li>
                          <i className="fas fa-check" />
                          Brand Design
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Web Development
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Advertising
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Photography
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#contact-section" className="btn btn-solid">
                    <span>Start Project</span>
                  </a>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Pricing </span>
            </div>
          </div>
        </div> */}
      {/* </section> */}
      {/* Section - Blog */}
      <section className="lui-section lui-gradient-top" id="blog-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Latest Blog </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Articles and Advice</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Archive */}
        <div className="v-line v-line-right">
          <div className="container">
            <div className="blog-items row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div
                style={{
                  backgroundColor: "#741C82",
                }}
                  className="archive-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                    <Link legacyBehavior href="/blog-single">
                      <a>
                        <img
                          decoding="async"
                          src="assets/images/single7.jpg"
                          alt="The Main Thing For The Designer"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="category lui-subtitle">
                      <span style={{color: "#fff"}}>October 31, 2022</span>
                    </div>
                    <h5 className="lui-title">
                      <Link legacyBehavior href="/blog-single">
                        <a style={{color: "#fff"}}>The Main Thing For The Designer</a>
                      </Link>
                    </h5>
                    <div className="lui-text">
                      <p style={{color: "#fff"}}>
                        Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                        mattis. Aliquam vel sem vel velit efficitur malesuada.
                        Donec arcu lacus, ornare eget…{" "}
                      </p>
                      <div className="readmore">
                        <Link legacyBehavior href="/blog-single">
                          <a className="lnk" style={{color: "#fff"}}>Read more</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div
                style={{
                  backgroundColor: "#741C82",
                }}
                  className="archive-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                    <Link legacyBehavior href="/blog-single">
                      <a>
                        <img
                          decoding="async"
                          src="assets/images/blog-4-scaled-1.jpg"
                          alt="Follow Your Own Design Process"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="category lui-subtitle">
                      <span style={{color: "#fff"}}>October 31, 2022</span>
                    </div>
                    <h5 className="lui-title">
                      <Link legacyBehavior href="/blog-single">
                        <a style={{color: "#fff"}}>Follow Your Own Design Process</a>
                      </Link>
                    </h5>
                    <div className="lui-text">
                      <p style={{color: "#fff"}}>
                        Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                        mattis. Aliquam vel sem vel velit efficitur malesuada.
                        Donec arcu lacus, ornare eget…{" "}
                      </p>
                      <div className="readmore">
                        <Link legacyBehavior href="/blog-single">
                          <a className="lnk" style={{color: "#fff"}}>Read more</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div
                style={{
                  backgroundColor: "#741C82",
                }}
                  className="archive-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                    <Link legacyBehavior href="/blog-single">
                      <a>
                        <img
                          decoding="async"
                          src="assets/images/blog-2.jpg"
                          alt="Usability Secrets to Create Better Interfaces"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="category lui-subtitle">
                      <span style={{color: "#fff"}}>November 28, 2021</span>
                    </div>
                    <h5 className="lui-title">
                      <Link legacyBehavior href="/blog-single">
                        <a style={{color: "#fff"}}>Usability Secrets to Create Better Interfaces</a>
                      </Link>
                    </h5>
                    <div className="lui-text">
                      <p style={{color: "#fff"}}>
                        Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                        mattis. Aliquam vel sem vel velit efficitur malesuada.
                        Donec arcu lacus, ornare eget…{" "}
                      </p>
                      <div className="readmore">
                        <Link legacyBehavior href="/blog-single">
                          <a className="lnk" style={{color: "#fff"}}>Read more</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="load-more">
              <Link legacyBehavior href="/blog">
                <a
                  className="btn scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <span>View Blog</span>
                </a>
              </Link>
            </div>
            <div className="lui-bgtitle">
              <span> Blog </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Contacts */}
      <section className="lui-section lui-gradient-bottom" id="contact-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Contact Me </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  Let's <b>Talk About Ideas</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="lui-contacts v-line v-line-left">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                <div className="numbers-items">
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-map" />
                    </div>
                    <div className="title">
                      <span> Address </span>
                    </div>
                    <div className="lui-text">
                      <span> North York, Toronto, Canada </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-user" />
                    </div>
                    <div className="title">
                      <span> Consultation </span>
                    </div>
                    <div className="lui-text">
                      <span> Available </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-envelope" />
                    </div>
                    <div className="title">
                      <span> Email </span>
                    </div>
                    <div className="lui-text">
                      <span> info@suelynempoweredliving.com </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-address-book" />
                    </div>
                    <div className="title">
                      <span> Phone </span>
                    </div>
                    <div className="lui-text">
                      <span> +1 900 - 900 - 9000 </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                <div
                  className="contacts-form scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-1.png)",
                    }}
                  />
                  
                  <ContactForm />
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Contact Me </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Index;
