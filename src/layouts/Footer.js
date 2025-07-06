const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__builder">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="social-links scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <a target="_blank" rel="nofollow" href="https://www.facebook.com/suelyn.empoweredliving">
                  <i aria-hidden="true" className="fab fa-facebook" />
                </a>
                <a target="_blank" rel="nofollow" href="https://www.instagram.com/suelyn.empoweredliving/">
                  <i aria-hidden="true" className="fab fa-instagram" />
                </a>
                <a target="_blank" rel="nofollow" href="https://www.linkedin.com/in/suzanna-griffiths-761b1b260/">
                  <i aria-hidden="true" className="fab fa-linkedin" />
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="copyright-text align-center scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                © 2025 <strong>SueLyn Empowered Living</strong>. All rights reserved
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="copyright-text align-right scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                Designed by <strong onClick={() => window.open("https://corporate.thenarro.com/welcome", "_blank")}>Narro: Web Services</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
