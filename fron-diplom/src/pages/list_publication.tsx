import { useEffect, useState } from "react";
import publicationsData from "../datatest/publications.json";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/list_publications.scss";

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

const ITEMS_PER_PAGE = 6;

const ListPublications = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [keyword, setKeyword] = useState("");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          !publicationsData ||
          !publicationsData.publications ||
          publicationsData.publications.length === 0
        ) {
          return;
        }
        setPublications(publicationsData.publications);
        setAllPublications(publicationsData.publications);
      } catch (error) {
        console.error("Ошибка при загрузке публикаций:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      onChange(q);
    }
  }, [searchParams, allPublications]);

  const categories = [
    { id: 1, name: "Категория 1" },
    { id: 2, name: "Категория 2" },
    { id: 3, name: "Категория 3" },
    { id: 4, name: "Категория 4" },
  ];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  useEffect(() => {
    if (allPublications.length > 0) {
      filterPublications();
    }
  }, [selectedCategories]);

  const filterPublications = () => {
    let filteredPublications = allPublications;

    // Фильтрация по категориям
    if (selectedCategories.length > 0) {
      filteredPublications = filteredPublications.filter((publish) => {
        return publish.categories.some((category) =>
          selectedCategories.includes(category.id)
        );
      });
    }

    setCurrentPage(1);
    setPublications(filteredPublications);
  };

  // поиск
  const stripHTML = (html: string) => html.replace(/<[^>]*>/g, "");

  const onChange = (keyword_props: string) => {
    const keyword = keyword_props.toLowerCase();

    const filtered = allPublications.filter((publish) => {
      const title = publish.title?.toLowerCase() || "";
      const desc = publish.desc?.toLowerCase() || "";

      const text = Array.isArray(publish.text)
        ? stripHTML(publish.text.join(" ")).toLowerCase()
        : "";

      return (
        title.includes(keyword) ||
        desc.includes(keyword) ||
        text.includes(keyword)
      );
    });

    setCurrentPage(1);
    setKeyword(keyword_props);
    setPublications(filtered);
  };

  // пагинация
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return publications.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedPublications = getCurrentPageData();

  const totalPages = Math.ceil(publications.length / ITEMS_PER_PAGE);

  function formatDate(dateStr: string) {
    const [day, month, year] = dateStr.split(".");
    const months = [
      "янв",
      "февр",
      "марта",
      "апр",
      "мая",
      "июня",
      "июля",
      "авг",
      "сен",
      "окт",
      "нояб",
      "дек",
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }

  return (
    <div className="page">
      <div className="page_container list_authors">
        <div className="filters_container">
          <div className="item_filter">
            <div className="diagramm_cont_title">
              <div className="rect_title"></div>
              <div className="text">Поиск</div>
            </div>
            <input
              className="search_bar author_publications"
              key="search-bar"
              value={keyword}
              placeholder={"Поиск..."}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>

          <div className="item_filter">
            <div className="diagramm_cont_title">
              <div className="rect_title"></div>
              <div className="text">Категории</div>
            </div>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      value={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={handleCategoryChange}
                      sx={{
                        "&.Mui-checked": {
                          color: "#262626",
                        },
                      }}
                    />
                  }
                  label={category.name}
                />
              ))}
            </FormGroup>
          </div>
        </div>

        <div className="cards_container">
          <div
            className="cards_authors_container"
            style={{ flexDirection: "column", justifyContent: "flex-start" }}
          >
            {displayedPublications.map((publish) => (
              <Link
                to={`/publication/${publish.id}`}
                style={{ textDecoration: "none" }}
                color="black"
              >
                <div key={publish.id} className="card_publish">
                  <img className="img_publish" src={publish.image} alt=""></img>
                  <div className="card_overlay">
                    <div>{formatDate(publish.publication_date)}</div>
                  </div>
                  <div className="card_content_publish">
                    <div className="item_card">{publish.title}</div>
                    <div className="item_card">{publish.desc}</div>
                    <div className="categ_cont">
                      {publish.categories.map((category) => (
                        <div key={category.id} className="categ_name">
                          «{category.name}»
                        </div>
                      ))}
                    </div>
                    <div className="authors_cont2">
                      {publish.authors.map((author, index_author) => (
                        <Link
                          to={`/author/${author.id}`}
                          style={{ textDecoration: "none" }}
                          color="black"
                        >
                          <div key={index_author} className="card_author_cont">
                            <div className="image_author">
                              <img
                                src={author.image_author}
                                alt={author.fio_author}
                              />
                            </div>
                            <div className="fio_author">
                              {author.fio_author}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="pagination"
            style={{
              fontFamily: '"Montserrat", serif',
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="swiper-button-prev2"
            ></button>
            <span style={{ marginLeft: "15px", marginRight: "15px" }}>
              Страница {currentPage} из {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="swiper-button-next2"
            ></button>
          </div>
        </div>
      </div>

      <div className="fon"></div>
    </div>
  );
};

export default ListPublications;
