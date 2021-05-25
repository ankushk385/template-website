import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import austin from "../images/austin.webp";
import beijing from "../images/beijing.webp";
import dallas from "../images/dallas.webp";
import newyork from "../images/newyork.webp";
import sanfrancisco from "../images/sanfrancisco.webp";
const Hamburger = ({ state }) => {
  //cities and thier images array

  const cities = [
    { name: "austin", image: austin },
    { name: "beijing", image: beijing },
    { name: "dallas", image: dallas },
    { name: "new york", image: newyork },
    { name: "sanfrancisco", image: sanfrancisco },
  ];
  //defined refs
  let menu = useRef(null);
  let revealMenuBackground = useRef(null);
  let revealMenu = useRef(null);
  let revealCityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
      gsap.to([revealMenu, revealMenuBackground], {
        height: 0,
        ease: "power3.inOut",
        duration: 0.8,
        stagger: {
          amount: 0.07,
        },
      });
      gsap.to(menu, { css: { display: "none" }, duration: 1 });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.to(menu, { css: { display: "block" }, duration: 0 });
      gsap.to([revealMenuBackground, revealMenu], {
        height: "100%",
        duration: 0,
        opacity: 1,
      });
      staggerReveal(revealMenuBackground, revealMenu);
      listReveal(line1, line2, line3);
      infoReveal(info);
    }
  }, [state]);

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      height: 0,
      duration: 0.8,
      ease: "power3.inOut",
      transformOrigin: "right top",
      skewY: 2,

      stagger: {
        amount: 0.1,
      },
    });
  };

  const infoReveal = (node) => {
    gsap.from(node, {
      y: "60",
      duration: 1,
      opacity: 0,
      ease: "power3.inOut",
      delay: 0.2,
    });
  };

  const listReveal = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      y: "100",
      duration: 0.8,
      delay: 0.1,
      ease: "power3.inOut",
      opacity: 0,
      stagger: {
        amount: 0.3,
      },
    });
  };

  const cityBackground = (city) => {
    gsap.to(revealCityBackground, {
      duration: 0,
      background: `url(${city}) center center`,
    });
    gsap.to(revealCityBackground, {
      duration: 0.4,
      ease: "power3.inOut",
      opacity: 1,
    });
    gsap.from(revealCityBackground, {
      duration: 0.4,
      ease: "power3.inOut",

      transformOrigin: "right top",
    });
  };

  const cityBackgroundReturn = (city) => {
    gsap.to(revealCityBackground, {
      duration: 0.4,
      ease: "power3.inOut",
      opacity: 0,
    });
  };

  const onHover = (e) => {
    gsap.to(line1, {
      duration: 0.4,
      ease: "power3.inOut",
      y: -5,
    });
  };

  const onHoverLeave = (e) => {
    gsap.to(line1, {
      duration: 0.4,
      ease: "power3.inOut",
      y: 5,
    });
  };

  return (
    <div ref={(el) => (menu = el)} className="hamburger-menu">
      <div
        ref={(el) => (revealMenuBackground = el)}
        className="secondary-background-color"
      ></div>
      <div ref={(el) => (revealMenu = el)} className="menu-layer">
        <div
          ref={(el) => (revealCityBackground = el)}
          className="menu-city-background"
        ></div>

        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li ref={(el) => (line1 = el)}>
                    <Link
                      onMouseEnter={(e) => onHover(e)}
                      onMouseOut={(e) => onHoverLeave(e)}
                      to="/opportunities"
                    >
                      Oppertunities
                    </Link>
                  </li>
                  <li ref={(el) => (line2 = el)}>
                    <Link to="/solutions">Solutions</Link>
                  </li>
                  <li ref={(el) => (line3 = el)}>
                    <Link to="/contact-us">Contact US</Link>
                  </li>
                </ul>
              </nav>
              <div ref={(el) => (info = el)} className="info">
                <h3>Our Promises</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  provident perspiciatis officiis nostrum, itaque facilis
                  deleniti reprehenderit nihil totam quas eligendi nesciunt,
                  earum ipsa sapiente illum ipsam? Ut, accusamus voluptatum.
                </p>
              </div>
              <div className="locations">
                Locations :
                {cities.map((city) => (
                  <span
                    key={city.name}
                    onMouseEnter={() => {
                      cityBackground(city.image);
                    }}
                    onMouseOut={cityBackgroundReturn}
                  >
                    {city.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
