import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Hamburger from "./Hamburger";

const Header = ({ history }) => {
  //defined states

  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });
  const [disabled, setDisabled] = useState(false);

  //url history funtionality

  useEffect(() => {
    history.listen(() => {
      setState({ clicked: false, menuName: "Menu" });
    });
  });

  //handling menu button funtionality

  const handleClick = () => {
    disableMenu();
    if (state.initial === false) {
      setState({ initial: null, clicked: true, menuName: "Close" });
    } else if (state.clicked === true) {
      setState({ clicked: !state.clicked, menuName: "Menu" });
    } else if (state.clicked === false) {
      setState({ clicked: !state.clicked, menuName: "Close" });
    }
  };

  //handling disabled button funtionality
  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <div className="inner-header">
            <div className="logo">
              <Link to="/">Hamburger</Link>
            </div>
            <div className="menu">
              <button disabled={disabled} onClick={handleClick}>
                Menu
              </button>
            </div>
          </div>
        </div>
      </div>
      <Hamburger state={state} />
    </header>
  );
};

export default withRouter(Header);
