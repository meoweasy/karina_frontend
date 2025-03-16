import { useEffect, useState } from "react";
import banner_image from "../assets/main/home_fon.svg";
import logoimage from "../assets/main/LOGO.svg";
import "../styles/home.scss";
import kbot from "../assets/main/kbot.svg";
import ktop from "../assets/main//ktop.svg";
import publicationsData from "../datatest/publications.json";
import authorsData from "../datatest/authors.json";
import { Link } from "react-router-dom";

interface Author {
  id: number;
  fio_author: string;
  desc_author: string;
  image_author: string;
}

interface Publication {
  id: number;
  image: string;
  title: string;
  desc: string;
  authors: Author[];
  publication_date: string;
}

const HomePage = () => {
  const [keyword, setKeyword] = useState("");
  const [popPublications, setPopPublications] = useState<Publication[]>([]);
  const [popAuthors, setPopAuthors] = useState<Author[]>([]);

  useEffect(() => {
    setPopPublications(publicationsData.publications.slice(0, 4));
    setPopAuthors(authorsData.authors.slice(0, 3));
  }, []);

  return (
    <div className="page">
      <div className="main_banner_container">
        <img className="image_banner" src={banner_image} alt="" />
        <div className="content_banner">
          <img src={logoimage} alt="logo" />
          <div className="text-block">
            Ваш путеводитель в мире знаний: работы и <br /> биографии
            преподавателей в удобном формате
          </div>
          <input
            className="search_bar"
            key="search-bar"
            value={keyword}
            placeholder={"Поиск по статьям ..."}
            // onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="arrows"></div>
      </div>

      <div
        className="page_container home"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <div className="author_title_cont">
          <div className="rect_title"></div>
          <div className="text">Последние опубликованные статьи</div>
        </div>

        <div className="polarity_publication">
          {popPublications.map((publication, index) => (
            <div key={index} className="card_pol_pub">
              <Link
                to={`/publication/${publication.id}`}
                style={{ textDecoration: "none" }}
                color="black"
              >
                <div className="text_container">
                  <div className="name">{publication.title}</div>
                  <div
                    className="text"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <div>{publication.authors[0].fio_author}</div>
                    <div className="categ_circle"></div>
                    <div className="desc">{publication.publication_date}</div>
                  </div>
                </div>
                <div className="image-container">
                  <img src={publication.image} alt="" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button className="learn-more">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Все статьи</span>
          </button>
        </div>
      </div>

      <div className="page_container home" style={{ marginBottom: "100px" }}>
        <div className="author_title_cont">
          <div className="rect_title"></div>
          <div className="text">Популярные авторы</div>
        </div>

        <div className="polarity_author">
          {popAuthors.map((author, index) => (
            <Link
              to={`/author/${author.id}`}
              style={{ textDecoration: "none" }}
              color="black"
            >
              <div key={author.id} className={`card_pol_author ${index === 1 ? 'link_pop_author' : ''}`}>
                <img
                  className="author_img"
                  src={author.image_author}
                  alt=""
                ></img>
                <img
                  className="img_k_top"
                  src={ktop}
                  alt=""
                  width={"100px"}
                ></img>
                <div className="text">
                  {author.desc_author}
                  <div className="text2">— {author.fio_author}</div>
                </div>
                <img
                  className="img_k_bot"
                  src={kbot}
                  alt=""
                  width={"100px"}
                ></img>
              </div>
            </Link>
          ))}
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <button className="learn-more" onClick={() => (window.location.href = "/list_authors")}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Все авторы</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
