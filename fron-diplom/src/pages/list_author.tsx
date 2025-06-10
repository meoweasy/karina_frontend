import { useEffect, useState } from "react";
import "../styles/list_authors.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import authorsData from "../datatest/authors.json";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

function valuetext(value: number) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 100,
    label: "100",
  },
];

const minDistance = 10;

interface Categories {
  id: number;
  name: string;
}

interface Author {
  id: number;
  fio_author: string;
  desc_author: string;
  image_author: string;
  num_public: number;
  categories: Categories[];
}

const ListAuthor = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [keyword, setKeyword] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          !authorsData ||
          !authorsData.authors ||
          authorsData.authors.length === 0
        ) {
          return;
        }
        console.log(authorsData.authors);
        setAuthors(authorsData.authors);
        setAllAuthors(authorsData.authors);
      } catch (error) {
        console.error("Ошибка при загрузке авторов:", error);
      }
    };

    fetchData();
  }, []);

  const [numPublic, setNumPublic] = useState<number[]>([0, 100]);

  const handleChangeNumPublic = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setNumPublic([
        Math.min(newValue[0], numPublic[1] - minDistance),
        numPublic[1],
      ]);
    } else {
      setNumPublic([
        numPublic[0],
        Math.max(newValue[1], numPublic[0] + minDistance),
      ]);
    }
  };

  const categories = [
    { id: 1, name: "Инженерия знаний" },
    { id: 2, name: "Анализ естественного языка" },
    { id: 3, name: "Семантика" },
    { id: 4, name: "Онтологии" },
    { id: 5, name: "Автоматизация сложных бизнес-процессов" },
    { id: 6, name: "Кибербезопасность" },
    { id: 7, name: "Анализ данных" },
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
    if (allAuthors.length > 0) {
      filterAuthors();
    }
  }, [selectedCategories, numPublic]);

  const filterAuthors = () => {
    let filteredAuthors = allAuthors;

    // Фильтрация по категориям
    if (selectedCategories.length > 0) {
      filteredAuthors = filteredAuthors.filter((publish) => {
        return publish.categories.some((category) =>
          selectedCategories.includes(category.id)
        );
      });
    }

    // Фильтрация по кол-ву публикаций
    filteredAuthors = filteredAuthors.filter((publish) => {
      return (
        publish.num_public >= numPublic[0] && publish.num_public <= numPublic[1]
      );
    });

    setCurrentPage(1);
    setAuthors(filteredAuthors);
  };

  // поиск
  const onChange = (keyword_props: string) => {
    const filtered = allAuthors.filter((author) => {
      return `${author.fio_author.toLowerCase()} ${author.desc_author.toLowerCase()}`.includes(
        keyword_props.toLowerCase()
      );
    });
    setCurrentPage(1);
    setKeyword(keyword_props);
    setAuthors(filtered);
  };

  // пагинация
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return authors.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedAuthors = getCurrentPageData();

  const totalPages = Math.ceil(authors.length / ITEMS_PER_PAGE);

  return (
    <div className="page" style={{ minHeight: "calc(100vh - 140px)" }}>
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

          <div className="item_filter">
            <div className="diagramm_cont_title">
              <div className="rect_title"></div>
              <div className="text">Количество публикаций</div>
            </div>
            <Box>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={numPublic}
                onChange={handleChangeNumPublic}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                step={1}
                marks={marks}
                min={0}
                max={100}
                size="small"
                sx={{
                  color: "#262626",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#262626",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              />
            </Box>
          </div>
        </div>

        <div className="cards_container">
          <div className="cards_authors_container">
            {displayedAuthors.map((author) => (
              <Link
                to={`/author/${author.id}`}
                style={{ textDecoration: "none" }}
                color="black"
              >
                <div key={author.id} className="card_author">
                  <img src={author.image_author} alt=""></img>
                  <div className="card_content">
                    <div className="item_card">{author.fio_author}</div>
                    <div className="item_card">{author.desc_author}</div>
                    <div className="item_card">
                      Количество публикаций: {author.num_public}
                    </div>
                    <div className="categ_cont">
                      {author.categories.map((category) => (
                        <div key={category.id} className="categ_name">
                          {category.name}
                        </div>
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

export default ListAuthor;
