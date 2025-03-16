import { useState } from "react";
import logoimage from "../assets/main/LOGO.svg";
import "../styles/header.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="header_component">
        <div className="header_container">
          <div className="header_logo">
            <Link to="/">
              <img src={logoimage} alt="logo" />
            </Link>
          </div>
          <div className="header_nav_container">
            <Link
              className="nav_item"
              to="/"
              onClick={() => setIsNavOpen(false)}
            >
              Главная
            </Link>
            <Link
              className="nav_item"
              to="/list_authors"
              onClick={() => setIsNavOpen(false)}
            >
              Авторы
            </Link>
            <Link
              className="nav_item"
              to="/articles"
              onClick={() => setIsNavOpen(false)}
            >
              Статьи
            </Link>
          </div>
          <button className="login_btn" onClick={() => setIsModalOpen(true)}>
            Вход
          </button>
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
            <Link
              className="nav_item"
              to="/"
              onClick={() => setIsNavOpen(false)}
            >
              Главная
            </Link>
            <Link
              className="nav_item"
              to="/authors"
              onClick={() => setIsNavOpen(false)}
            >
              Авторы
            </Link>
            <Link
              className="nav_item"
              to="/articles"
              onClick={() => setIsNavOpen(false)}
            >
              Статьи
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      <div
        className={`modal ${isModalOpen ? "open" : ""}`}
      >
        <div className="modal_content">
          <button
            className="close_btn"
            onClick={() => setIsModalOpen(false)}
          ></button>

          <div className="modal_title">Авторизация</div>
          <div className="input_wrapper">
            <FaUser className="input_icon" />
            <input type="text" placeholder="Логин" className="input_field" />
          </div>
          <div className="input_wrapper">
            <FaLock className="input_icon" />
            <input type="text" placeholder="Пароль" className="input_field" />
          </div>

          <button className="modal_btn">вход</button>
          <div className="modal_subtitle">Еще нет аккаунта? <button>Зарегистрироваться</button></div>
        </div>
      </div>
    </>
  );
};

export default Header;
