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
const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
const Index = () => {
  return (
    <Layout pageClassName={"home"}>
      {/* Section - Hero Started */}
      <section
        className="lui-section lui-section-hero lui-gradient-top"
        id="started-section"
      >
      </section>
      {/* Section - Foundation */}
      <section
       className="lui-section lui-gradient-bottom"
        id="services-section"
      >
       
        {/* Get To Know Me Content */}
        <div className="v-line v-line-left">
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
                      SueLyn Empowered Living <b>Foundation</b>
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
                      Planting Seeds of Hope, One Dream at a Time
                    </h4>
                  </div>
                </div>
                <div className="description">
                  <div>
                    <p>
                      The SueLyn Empowered Living Foundation was born from a quiet nudge that became a divine calling. The Lord laid it on Suzanna's heart to give back, to reach the children who carry big dreams but face real financial challenges.
                    </p>
                    <p>
                      With a heart anchored in faith and compassion, Suzanna launched the foundation to support hardworking, purpose-driven children who excel academically or creatively, but simply need a helping hand to move forward.
                    </p>
                    <p>
                      Through scholarships, mentorship, and practical support, the Foundation exists to remind these children that their dreams are valid, their future is bright, and they are not forgotten.
                    </p>
                    <p>
                      This mission goes beyond academics - it's about restoring hope, sparking purpose, and building bridges to brighter tomorrows. Whether a child dreams of becoming a doctor, a teacher, a creator, or a leader, we want to be part of the village that helps get them there.
                    </p>
                    <p>
                      At SueLyn Empowered Living Foundation, we believe in sowing into the next generation and watching God do the growing.
                    </p>
                    <p>
                      Together, let's give. Let's empower. Let's transform.
                    </p>
                  </div>
                </div>
                <div className="bts">
                  <a
                    href="/#contact-section"
                    className="btn"
                  >
                    <span>Get Involved</span>
                  </a>
                  <a href="/#events-section" className="btn-lnk">
                    {" "}
                    Learn More{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Foundation </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Index;
