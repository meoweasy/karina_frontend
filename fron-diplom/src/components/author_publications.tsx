import { useState, useEffect } from "react";
import "../styles/author_publications.scss";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface Publication {
  title: string;
  desc: string;
  author_fio: string;
  publication_date: string;
}

const AuthorPublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const onChange = (keyword_props: string) => {
    const filtered = allPublications.filter((publish) => {
      return `${publish.title.toLowerCase()} ${publish.author_fio.toLowerCase()}`.includes(
        keyword_props.toLowerCase()
      );
    });
    setKeyword(keyword_props);
    setPublications(filtered);
  };

  const filterByDate = () => {
    if (startDate && endDate) {
      const filteredByDate = allPublications.filter((publish) => {
        const publishDate = dayjs(publish.publication_date);
        return publishDate.isBetween(startDate, endDate, null, '[]');
      });
      setPublications(filteredByDate);
    }
  };

  useEffect(() => {
    filterByDate();
  }, [startDate, endDate]);

  return (
    <div className="page_container author_publications" style={{ marginTop: "100px" }}>
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <DatePicker
              label="С"
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
            />
            <DatePicker
              label="По"
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
            />
          </div>
        </div>

      </div>
      <div className="cards_container"></div>
    </div>
  );
};

export default AuthorPublications;
