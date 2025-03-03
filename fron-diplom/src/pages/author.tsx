import "../styles/page_author.scss";
import { useState } from "react";
import AuthorHomepage from "../components/author_homepage";
import AuthorPublications from "../components/author_publications";

type AuthorProps = {
  header_image?: string;
  fio_author?: string;
  desc_author?: string;
  image_author?: string;
};

const AuthorPage = ({
  header_image,
  fio_author,
  desc_author,
  image_author,
}: AuthorProps) => {
  const [isHomepageOpen, setIsHomepageOpen] = useState(true);
  return (
    <div className="page">
      <div className="header_image_author">
        <div className="header_author_text_cont">
          <div>{fio_author}</div>
          <div>{desc_author}</div>
        </div>
        <img src={header_image} alt={fio_author} />
      </div>

      <div className="page_container">
        <div className="image_author">
          <img src={image_author} alt={fio_author} />
        </div>
        <div className="author_navigation_cont">
          <a className="nav_item" href="#">
            Профиль
          </a>
          <a className="nav_item" href="#">
            Публикации
          </a>
        </div>
      </div>

      {isHomepageOpen ? (
        <AuthorHomepage
          collab_name="Ильдар З. Батыршин"
          popular_topic="Анализ настроений"
          popular_word="Агенты"
          avr_cit="2"
          num_cit="92"
          num_public="37"
          years_public_one="1998"
          years_public_two="2024"
        />
      ) : (
        <AuthorPublications />
      )}
    </div>
  );
};

export default AuthorPage;
