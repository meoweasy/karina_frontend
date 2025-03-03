import { useState } from "react";
import logoimage from "../assets/main/LOGO.svg";
import "../styles/header.scss";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className="header_component">
        <div className="header_container">
          <div className="header_logo">
            <img src={logoimage} alt="logo" />
          </div>
          <div className="header_nav_container">
            <a className="nav_item" href="#">
              Главная
            </a>
            <a className="nav_item" href="#">
              Авторы
            </a>
            <a className="nav_item" href="#">
              Статьи
            </a>
          </div>
          <button className="login_btn">Вход</button>
          <button
            className={`burger_menu ${isNavOpen ? "open" : ""}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            className="mobile_nav"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <a
              className="nav_item"
              href="#"
              onClick={() => setIsNavOpen(false)}
            >
              Главная
            </a>
            <a
              className="nav_item"
              href="#"
              onClick={() => setIsNavOpen(false)}
            >
              Авторы
            </a>
            <a
              className="nav_item"
              href="#"
              onClick={() => setIsNavOpen(false)}
            >
              Статьи
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
