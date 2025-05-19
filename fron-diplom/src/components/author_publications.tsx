import { useState, useEffect } from "react";
import "../styles/author_publications.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import calendarimage from "../assets/main/calendar.png";
import publicationsData from "../datatest/publications.json";
import { Link } from "react-router-dom";

dayjs.extend(isBetween);
dayjs.locale("ru");

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

export interface Publication {
  id: number;
  image: string;
  title: string;
  desc: string;
  authors: Author[];
  publication_date: string;
  categories: Categories[];
}

interface AuthorPublicationsProps {
  authorId: number;
}

const ITEMS_PER_PAGE = 3;

const AuthorPublications = ({ authorId }: AuthorPublicationsProps) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (
          !publicationsData ||
          !publicationsData.publications ||
          publicationsData.publications.length === 0
        ) {
          console.warn("Публикации пусты или не загружены");
          setLoading(false);
          return;
        }

        const filteredPublications = await new Promise<Publication[]>(
          (resolve) => {
            const filtered = publicationsData.publications.filter(
              (publication: Publication) =>
                publication.authors.some((author) => author.id === authorId)
            );
            resolve(filtered);
          }
        );

        const sortedPublications = await new Promise<Publication[]>(
          (resolve) => {
            const sorted = [...filteredPublications].sort((a, b) => {
              const dateA = dayjs(a.publication_date, "DD.MM.YYYY");
              const dateB = dayjs(b.publication_date, "DD.MM.YYYY");

              if (dateA.isBefore(dateB)) {
                return 1;
              } else if (dateA.isAfter(dateB)) {
                return -1;
              } else {
                return 0;
              }
            });
            resolve(sorted);
          }
        );

        setPublications(sortedPublications);
        setAllPublications(sortedPublications);
      } catch (error) {
        console.error("Ошибка при загрузке публикаций:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authorId]);

  const onChange = (keyword_props: string) => {
    const filtered = allPublications.filter((publish) => {
      return `${publish.title.toLowerCase()} ${publish.desc.toLowerCase()}`.includes(
        keyword_props.toLowerCase()
      );
    });
    setCurrentPage(1);
    setKeyword(keyword_props);
    setPublications(filtered);
    setStartDate(null);
    setEndDate(null);
  };

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const categories = [
    { id: 1, name: "Категория 1" },
    { id: 2, name: "Категория 2" },
    { id: 3, name: "Категория 3" },
    { id: 4, name: "Категория 4" },
  ];

  useEffect(() => {
    filterPublications();
  }, [startDate, endDate, selectedCategories]);

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

    // Фильтрация по дате
    if (startDate || endDate) {
      filteredPublications = filteredPublications.filter((publish) => {
        const publishDate = dayjs(publish.publication_date, "DD.MM.YYYY");

        if (startDate && endDate) {
          const isInRange = publishDate.isBetween(
            startDate,
            endDate,
            null,
            "[]"
          );
          return isInRange;
        } else if (startDate) {
          const isAfterOrEqual =
            publishDate.isAfter(startDate) ||
            publishDate.isSame(startDate, "day");
          return isAfterOrEqual;
        } else if (endDate) {
          const isBeforeOrEqual =
            publishDate.isBefore(endDate) || publishDate.isSame(endDate, "day");
          return isBeforeOrEqual;
        }

        return true;
      });
    }

    filteredPublications.sort((a, b) => {
      const dateA = dayjs(a.publication_date, "DD.MM.YYYY").valueOf();
      const dateB = dayjs(b.publication_date, "DD.MM.YYYY").valueOf();
      return dateB - dateA;
    });

    setCurrentPage(1);
    setPublications(filteredPublications);
  };

  // Обработчик изменения категорий
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
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

  return (
    <div
      className="page_container author_publications"
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      <div className="filter_container">
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
            <div className="text">Дата публикации</div>
          </div>
          <div
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                  label="C"
                  sx={{
                    "& input::placeholder": {
                      color: "gray",
                      fontSize: "14px",
                    },
                  }}
                  slotProps={{
                    textField: { placeholder: "дд.мм.гггг", size: "small" },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="По"
                  value={endDate}
                  onChange={(newDate) => setEndDate(newDate)}
                  sx={{
                    "& input::placeholder": {
                      color: "gray",
                      fontSize: "14px",
                    },
                  }}
                  slotProps={{
                    textField: { placeholder: "дд.мм.гггг", size: "small" },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
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
      <div className="cards_main_container">
        <div className="cards_container">
          {loading ? (
            [...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <div key={index} className="card_publication skeleton">
                <div className="title skeleton-box"></div>
                <div className="desc skeleton-box"></div>
                <div className="authors_cont">
                  <div className="card_author_cont">
                    <div className="image_author skeleton-box"></div>
                    <div className="fio_author skeleton-box"></div>
                  </div>
                </div>
                <div className="footer_card">
                  <div className="categ_card">
                    <div className="card_categ_cont">
                      <div className="categ_name skeleton-box"></div>
                      <div className="categ_circle skeleton-box"></div>
                    </div>
                  </div>
                  <div className="card_date skeleton-box"></div>
                </div>
              </div>
            ))
          ) : displayedPublications.length > 0 ? (
            displayedPublications.map((publication, index) => (
              <Link
                to={`/publication/${publication.id}`}
                style={{ textDecoration: "none" }}
                color="black"
              >
                <div key={index} className="card_publication">
                  <div className="title">{publication.title}</div>
                  <div className="desc" style={{color: "black"}}>{publication.desc}</div>
                  <div className="authors_cont">
                    {publication.authors.map((author, index_author) => (
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
                          <div className="fio_author">{author.fio_author}</div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="footer_card">
                    <div className="categ_card">
                      {publication.categories.map((categ, index_categ) => (
                        <div key={index_categ} className="card_categ_cont">
                          <div className="categ_name">{categ.name}</div>
                          <div className="categ_circle"></div>
                        </div>
                      ))}
                    </div>
                    <div className="card_date">
                      <img
                        src={calendarimage}
                        alt="calendarimage"
                        width={"15px"}
                        style={{ marginRight: "5px" }}
                      />
                      {publication.publication_date}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Нет публикаций</p>
          )}
        </div>

        {/* Навигация по страницам */}
        <div className="pagination">
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
  );
};

export default AuthorPublications;
