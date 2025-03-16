import { useEffect, useState } from "react";
import publicationsData from "../datatest/publications.json";
import { useParams } from "react-router-dom";
import "../styles/publication.scss";
import calendarimage from "../assets/main/calendar.png";
import { Link } from "react-router-dom";

interface Categories {
  id: number;
  name: string;
}

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
  categories: Categories[];
  text: string[];
}

const PublicationPage = () => {
  const { publicationid } = useParams<{ publicationid: string }>();
  const [publication, setPublication] = useState<Publication>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          !publicationsData ||
          !publicationsData.publications ||
          publicationsData.publications.length === 0
        ) {
          console.warn("Публикации пусты или не загружены");
          return;
        }

        const filteredPublication = publicationsData.publications.find(
          (publication: Publication) => publication.id === Number(publicationid)
        );

        if (filteredPublication) {
          setPublication(filteredPublication);
        } else {
          console.warn("Публикация не найдена");
        }
      } catch (error) {
        console.error("Ошибка при загрузке публикации:", error);
      }
    };

    fetchData();
  }, [publicationid]);

  return (
    <div className="page publication">
      <div className="header_image_author">
        <div className="header_author_text_cont">
          <div>{publication?.title}</div>
          <div className="truncated-text">{publication?.desc}</div>
        </div>
        <img src={publication?.image} alt={publication?.title} />
      </div>

      <div
        className="page_container"
        style={{
          marginTop: "50px",
          marginBottom: "100px",
          height: "fit-content",
        }}
      >
        <div className="list_author_container">
          {publication?.authors.map((author) => (
            <Link
              to={`/author/${author.id}`}
              style={{ textDecoration: "none" }}
              color="black"
            >
              <div key={author.id} className="card_author_cont">
                <div className="image_author">
                  <img src={author.image_author} alt={author.fio_author} />
                </div>
                <div className="fio_author">{author.fio_author}</div>
                <div className="categ_circle"></div>
              </div>
            </Link>
          ))}
          <img
            src={calendarimage}
            alt="calendarimage"
            width={"15px"}
            style={{ marginRight: "0px", marginLeft: "auto" }}
          />
          <div className="date">{publication?.publication_date}</div>
        </div>

        <div className="text_publication">
          {publication?.text.map((block, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: block }} />
          ))}
        </div>

        <div className="category_list_cont">
          {publication?.categories.map((category) => (
            <div key={category.id} className="card_category">
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div className="fon"></div>
    </div>
  );
};

export default PublicationPage;
