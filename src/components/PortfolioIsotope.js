import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
const PortfolioIsotope = ({ noViewMore }) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      //    layoutMode: "fitRows",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    return () => isotope.current.destroy();
  });
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");
  return (
    <Fragment>
      <div className="works-box">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          <a
            className={`c-pointer lui-subtitle ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All Events
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn(
              "sorting-spiritual"
            )}`}
            onClick={handleFilterKeyChange("sorting-spiritual")}
            data-href=".sorting-spiritual"
          >
            Spiritual
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn("sorting-community")}`}
            onClick={handleFilterKeyChange("sorting-community")}
            data-href=".sorting-community"
          >
            Community
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn(
              "sorting-education"
            )}`}
            onClick={handleFilterKeyChange("sorting-education")}
            data-href=".sorting-education"
          >
            Education
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn(
              "sorting-publication"
            )}`}
            onClick={handleFilterKeyChange("sorting-publication")}
            data-href=".sorting-publication"
          >
            Publication
          </a>
        </div>
        <div className="works-items works-masonry-items row">
          <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-spiritual">
            <div
              style={{
                backgroundColor: "#741C82",
              }}
              className="works-item scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <div className="image">
                <div className="img">
                  <Link legacyBehavior href="/work-single">
                    <a>
                      <img
                        decoding="async"
                        src="assets/images/work4.jpeg"
                        alt="Prayer Board"
                      />
                      <span className="overlay" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="desc">
                <span className="category" style={{color: "#fff"}}>Spiritual</span>
                <h5 className="name">
                  <Link legacyBehavior href="/work-single">
                    <a style={{color: "#fff"}}>Prayer Board</a>
                  </Link>
                </h5>
                <div className="text">
                  <p style={{color: "#fff"}}>
                    Join us for a special prayer session in December 2025. A time for reflection, 
                    community prayer, and spiritual connection.
                  </p>
                </div>
                <Link legacyBehavior href="/work-single">
                  <a className="lnk" style={{color: "#fff"}}>Learn More</a>
                </Link>
              </div>
              <div
                className="bg-img"
                style={{
                  backgroundImage: "url(assets/images/pat-2.png)",
                }}
              />
            </div>
          </div>
          <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-spiritual">
            <div
              style={{
                backgroundColor: "#741C82",
              }}
              className="works-item scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <div className="image">
                <div className="img">
                  <Link legacyBehavior href="/work-single">
                    <a>
                      <img
                        decoding="async"
                        src="assets/images/work2.jpeg"
                        alt="Couples Retreat"
                      />
                      <span className="overlay" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="desc">
                <span className="category" style={{color: "#fff"}}>Spiritual</span>
                <h5 className="name">
                  <Link legacyBehavior href="/work-single">
                    <a style={{color: "#fff"}}>Couples Retreat</a>
                  </Link>
                </h5>
                <div className="text">
                  <p style={{color: "#fff"}}>
                    A transformative couples retreat in February 2026. Strengthen your relationship 
                    through guided sessions and spiritual practices.
                  </p>
                </div>
                <Link legacyBehavior href="/work-single">
                  <a className="lnk" style={{color: "#fff"}}>Learn More</a>
                </Link>
              </div>
              <div
                className="bg-img"
                style={{
                  backgroundImage: "url(assets/images/pat-2.png)",
                }}
              />
            </div>
          </div>
          <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-education">
            <div
              style={{
                backgroundColor: "#741C82",
              }}
              className="works-item scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <div className="image">
                <div className="img">
                  <Link legacyBehavior href="/work-single">
                    <a>
                      <img
                        decoding="async"
                        src="assets/images/work7.jpg"
                        alt="Team Session: Build Your Identity"
                      />
                      <span className="overlay" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="desc">
                <span className="category" style={{color: "#fff"}}>Education</span>
                <h5 className="name">
                  <Link legacyBehavior href="/work-single">
                    <a style={{color: "#fff"}}>Team Session: Build Your Identity</a>
                  </Link>
                </h5>
                <div className="text">
                  <p style={{color: "#fff"}}>
                    Join our team session in April 2026 focused on building and strengthening 
                    your personal and professional identity.
                  </p>
                </div>
                <Link legacyBehavior href="/work-single">
                  <a className="lnk" style={{color: "#fff"}}>Learn More</a>
                </Link>
              </div>
              <div
                className="bg-img"
                style={{
                  backgroundImage: "url(assets/images/pat-2.png)",
                }}
              />
            </div>
          </div>
          <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-community">
            <div
              style={{
                backgroundColor: "#741C82",
              }}
              className="works-item scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <div className="image">
                <div className="img">
                  <Link legacyBehavior href="/work-single">
                    <a>
                      <img
                        decoding="async"
                        src="assets/images/work1.jpeg"
                        alt="Community Social"
                      />
                      <span className="overlay" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="desc">
                <span className="category" style={{color: "#fff"}}>Community</span>
                <h5 className="name">
                  <Link legacyBehavior href="/work-single">
                    <a style={{color: "#fff"}}>Community Social</a>
                  </Link>
                </h5>
                <div className="text">
                  <p style={{color: "#fff"}}>
                    A special community social event in December 2025 for the Foundation. 
                    Connect, network, and celebrate with fellow community members.
                  </p>
                </div>
                <Link legacyBehavior href="/work-single">
                  <a className="lnk" style={{color: "#fff"}}>Learn More</a>
                </Link>
              </div>
              <div
                className="bg-img"
                style={{
                  backgroundImage: "url(assets/images/pat-2.png)",
                }}
              />
            </div>
          </div>
          <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-publication">
            <div
            style={{
              backgroundColor: "#741C82",
            }}
              className="works-item scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <div className="image">
                <div className="img">
                  <Link legacyBehavior href="/work-single">
                    <a>
                      <img
                        decoding="async"
                        src="assets/images/single8.jpg"
                        alt="Book Launch"
                      />
                      <span className="overlay" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="desc">
                <span className="category" style={{color: "#fff"}}>Publication</span>
                <h5 className="name">
                  <Link legacyBehavior href="/work-single">
                    <a style={{color: "#fff"}}>Book Launch</a>
                  </Link>
                </h5>
                <div className="text">
                  <p style={{color: "#fff"}}>
                    Join us for an exciting book launch event in October 2025. 
                    Celebrate the release of new literary work with the author and community.
                  </p>
                </div>
                <Link legacyBehavior href="/work-single">
                  <a className="lnk" style={{color: "#fff"}}>Learn More</a>
                </Link>
              </div>
              <div
                className="bg-img"
                style={{
                  backgroundImage: "url(assets/images/pat-2.png)",
                }}
              />
            </div>
          </div>
        </div>
        {!noViewMore && (
          <div className="load-more-link">
            <Link legacyBehavior href="/works">
              <a
                className="btn scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>View More Events</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default PortfolioIsotope;
