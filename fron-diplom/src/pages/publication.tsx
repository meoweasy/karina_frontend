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

interface Quote {
  id: number;
  text: string;
  name_publication: string;
  ref: string;
  city_name: string;
}

interface Publication {
  id: number;
  image: string;
  title: string;
  desc: string;
  authors: Author[];
  publication_date: string;
  categories: Categories[];
  text: string;
  quotes?: Quote[];
}

const parseTextWithCitations = (html: string, quotes: Quote[] = []) => {
  return html.replace(/\[cite:(\d+)\]/g, (_, id) => {
    const quote = quotes.find((q) => q.id === Number(id));
    if (!quote) return "";

    const tooltipContent = `${quote.text} ${quote.name_publication}, ${quote.city_name}`;

    return `
      <span class="custom-tooltip-wrapper">
        <span class="citation-circle">${quote.id}</span>
        <span class="custom-tooltip">${tooltipContent}</span>
      </span>
    `;
  });
};

const PublicationPage = () => {
  const { publicationid } = useParams<{ publicationid: string }>();
  const [publication, setPublication] = useState<Publication>();

  useEffect(() => {
    const fetchData = async () => {
      const filtered = publicationsData.publications.find(
        (p: Publication) => p.id === Number(publicationid)
      );
      if (filtered) setPublication(filtered);
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

      <div className="page_container" style={{ marginTop: "50px", marginBottom: "100px" }}>
        <div className="list_author_container">
          {publication?.authors.map((author) => (
            <Link to={`/author/${author.id}`} key={author.id} style={{ textDecoration: "none" }}>
              <div className="card_author_cont">
                <div className="image_author">
                  <img src={author.image_author} alt={author.fio_author} />
                </div>
                <div className="fio_author">{author.fio_author}</div>
                <div className="categ_circle"></div>
              </div>
            </Link>
          ))}
          <img src={calendarimage} alt="calendar" width="15px" style={{ marginLeft: "auto" }} />
          <div className="date">{publication?.publication_date}</div>
        </div>

        <div className="text_publication">
          <div
            dangerouslySetInnerHTML={{
              __html: parseTextWithCitations(publication?.text ?? "", publication?.quotes),
            }}
          />
        </div>


        <div className="category_list_cont">
          {publication?.categories.map((category) => (
            <div key={category.id} className="card_category">
              {category.name}
            </div>
          ))}
        </div>

        {publication?.quotes && publication.quotes.length > 0 && (
          <div className="sources_section" style={{ marginTop: "50px" }}>
            <div className="author_title_cont">
              <div className="rect_title"></div>
              <div className="text">Источники и цитирования</div>
            </div>
            <ol>
              {publication.quotes.map((quote) => (
                <li key={quote.id}>
                  <a target="_blank" rel="noopener noreferrer">
                    {quote.name_publication} — {quote.city_name}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="fon"></div>
    </div>
  );
};

export default PublicationPage;
