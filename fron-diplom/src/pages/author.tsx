import "../styles/page_author.scss";
import { useState, useEffect } from "react";
import AuthorHomepage from "../components/author_homepage";
import AuthorPublications from "../components/author_publications";
import authorsData from "../datatest/authors.json";
import { useParams } from "react-router-dom";

interface Author {
  id: number;
  fio_author: string;
  image_author: string;
  header_image: string;
  desc_author: string;
}

const AuthorPage = () => {
  const [isHomepageOpen, setIsHomepageOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    if (id) {
      const selectedAuthor = authorsData.authors.find(
        (author) => author.id === Number(id)
      );
      setAuthor(selectedAuthor || null);
      setIsHomepageOpen(true);
    }
  }, [id]);

  if (!author) {
    return <div>Автор не найден</div>;
  }

  return (
    <div className="page">
      <div className="header_image_author">
        <div className="header_author_text_cont">
          <div>{author.fio_author}</div>
          <div>{author.desc_author}</div>
        </div>
        <img src={author.header_image} alt={author.fio_author} />
      </div>

      <div className="page_container">
        <div className="image_author">
          <img src={author.image_author} alt={author.fio_author} />
        </div>
        <div className="author_navigation_cont">
          <button className="nav_item" onClick={() => setIsHomepageOpen(true)}>
            Профиль
          </button>
          <button className="nav_item" onClick={() => setIsHomepageOpen(false)}>
            Публикации
          </button>
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
        <AuthorPublications authorId={Number(id)} />
      )}
    </div>
  );
};

export default AuthorPage;
