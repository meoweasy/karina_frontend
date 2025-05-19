import React, { useState, useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import "/node_modules/swiper/swiper-bundle.min.css";
import { Navigation, Pagination } from "swiper/modules";
import WordCloud from "./word_cloud";
import { Word } from "./word_cloud";
import MapChart from "./MapChart";
import quotesData from '../datatest/quotes.json';
import { Publication } from "./author_publications.tsx";
import publicationsData from "../datatest/publications.json";
import dayjs, { Dayjs } from "dayjs";

const quotes = quotesData.quotes;

type AuthorHomepageProps = {
  id: number;
  collab_name?: string;
  popular_topic?: string;
  popular_word?: string;
  avr_cit?: string;
  num_cit?: string;
  num_public?: number;
  years_public_one?: string;
  years_public_two?: string;
  email?: string;
  tg?: string;
  spinid?: string;
  orcid?: string;
  resercherid?: string;
  scopusid?: string;
  scienceid?: string;
  tg_src?: string;
  spinid_src?: string;
  orcid_src?: string;
  resercherid_src?: string;
  scopusid_src?: string;
  scienceid_src?: string;
  collab_id: number;
  words: Word[];
  words2: Word[];
  setIsHomepageOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthorHomepage = ({
  id,
  collab_name,
  popular_topic,
  popular_word,
  avr_cit,
  num_cit,
  num_public,
  years_public_one,
  years_public_two,
  email,
  tg,
  spinid,
  orcid,
  resercherid,
  scopusid,
  scienceid,
  tg_src,
  spinid_src,
  orcid_src,
  resercherid_src,
  scopusid_src,
  scienceid_src,
  collab_id,
  words,
  words2,
  setIsHomepageOpen
}: AuthorHomepageProps) => {

  const [allPublications, setAllPublications] = useState<Publication[]>([]);

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

        const filteredPublications = await new Promise<Publication[]>(
          (resolve) => {
            const filtered = publicationsData.publications.filter(
              (publication: Publication) =>
                publication.authors.some((author) => author.id === id)
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
        const type5publish = sortedPublications.slice(0, 5);

        setAllPublications(type5publish);
      } catch (error) {
        console.error("Ошибка при загрузке публикаций:", error);
      }
    };

    fetchData();
  }, [id]);

  const data = [
    { year: 2018, count: 9 },
    { year: 2019, count: 8 },
    { year: 2020, count: 12 },
    { year: 2021, count: 10 },
    { year: 2022, count: 14 },
    { year: 2023, count: 11 },
    { year: 2024, count: 6},
    { year: 2025, count: 6},
  ];

  return (
    <div className="page">
      <div className="page_container">
        <div className="author_info1">
          <div className="info1_rect" onClick={() => (window.location.href = `/author/${collab_id}`)}>
            <div className="info1_title">Наиболее частый соавтор</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "15px",
                alignItems: "center",
              }}
            >
              <div>
                <div className="info1_subtitle">{collab_name}</div>
                <div className="info1_subtitle_dop"></div>
              </div>
              <MdOutlineArrowForwardIos
                size={"30px"}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
          <div className="info1_rect">
            <div className="info1_title">Популярная тема</div>
            <div className="info1_subtitle" style={{ marginTop: "15px" }}>
              {popular_topic}
            </div>
          </div>
          <div className="info1_rect">
            <div className="info1_title">Ключевое слово</div>
            <div className="info1_subtitle" style={{ marginTop: "15px" }}>
              {popular_word}
            </div>
          </div>
        </div>
      </div>

      <div className="info_menu">
        <div className="info_menu_rect">
          <div className="info_menu_title">
            Среднее количество <br /> цитирований на статью
          </div>
          <div className="info_menu_subtitle">{avr_cit}</div>
        </div>
        <div className="info_menu_rect">
          <div className="info_menu_title">
            Количество <br /> цитирований
          </div>
          <div className="info_menu_subtitle">{num_cit}</div>
        </div>
        <div className="info_menu_rect">
          <div className="info_menu_title">
            Количество <br /> публикаций
          </div>
          <div className="info_menu_subtitle">{num_public}</div>
        </div>
        <div className="info_menu_rect">
          <div className="info_menu_title">
            Годы <br /> публикаций
          </div>
          <div className="info_menu_subtitle">
            {years_public_one} - {years_public_two}
          </div>
        </div>
      </div>

      <div
        className="page_container author_diagramm"
        style={{
          marginTop: "100px",
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="diagramm_cont">
          <div className="diagramm_cont_title">
            <div className="rect_title"></div>
            <div className="text">Предметные области</div>
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <WordCloud words={words} />
          </div>
        </div>

        <div className="diagramm_cont var2">
          <div className="diagramm_cont_title">
            <div className="rect_title"></div>
            <div className="text">
              Количество опубликованных материалов по годам
            </div>
          </div>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#8884d8"
                name="Количество публикаций"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="diagramm_cont var3">
          <div className="diagramm_cont_title">
            <div className="rect_title"></div>
            <div className="text">Ключевые слова</div>
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <WordCloud words={words2}/>
          </div>
        </div>
      </div>

      <div
        className="page_container slider_author"
        style={{ marginTop: "100px" }}
      >
        <MapChart quotes={quotes} />
      </div>

      <div
        className="page_container slider_author"
        style={{ marginTop: "100px" }}
      >
        <div className="author_title_cont">
          <div className="rect_title"></div>
          <div className="text">Популярные статьи</div>
        </div>
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            900: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            300: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
          }}
        >
          {allPublications.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="card">
                <img src={card.image} alt={card.title} />
                <div className="desc">
                  <div className="title">{card.title}</div>
                  <div className="desc_pub">{card.desc}</div>
                  <div className="data">{card.publication_date}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <button className="learn-more" onClick={() => setIsHomepageOpen(false)}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Все статьи</span>
          </button>
        </div>
      </div>

      <div
        className="page_container bio"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <div className="author_title_cont">
          <div className="rect_title"></div>
          <div className="text">Биография</div>
        </div>
        <div className="bio_author">
          Меня зовут Алексей Иванов, я программист с более чем десятилетним
          опытом в разработке программного обеспечения. С детства меня увлекали
          компьютеры, я разбирал старую технику, пробовал писать простые
          программы и постоянно искал способы автоматизировать рутинные задачи.
          Мое увлечение переросло в профессию: я поступил в Московский
          государственный университет на факультет вычислительной техники. Уже
          на первых курсах я начал брать небольшие заказы по разработке
          веб-приложений и программ, что помогло мне не только закрепить теорию
          на практике, но и получить первый коммерческий опыт. После окончания
          университета я устроился в одну из ведущих IT-компаний, где занимался
          оптимизацией баз данных и разработкой API. Со временем я стал ведущим
          разработчиком и начал участвовать в создании архитектуры крупных
          проектов. Но мне всегда хотелось большего — я стремился к созданию
          чего-то своего. В 2019 году я запустил стартап, связанный с
          автоматизацией бизнес-процессов. Это был непростой путь, но благодаря
          упорству и знаниям моя компания смогла привлечь инвестиции и выйти на
          международный рынок. Я продолжаю развиваться, изучая новые технологии,
          участвуя в конференциях и ведя технический блог. Верю, что
          программирование — это не просто код, а инструмент, который меняет
          мир.
        </div>
      </div>

      <div
        className="page_container bio"
        style={{ marginTop: "0px", marginBottom: "100px" }}
      >
        <div className="author_title_cont">
          <div className="rect_title"></div>
          <div className="text">Контакты</div>
        </div>
        <div className="contact_author">
          <div className="contact_item">
            <div className="contact_text">Почта:</div>
            <div className="contact_href">{email}</div>
          </div>
          <div className="contact_item">
            <div className="contact_text">Телеграм:</div>
            <a className="contact_href" href={tg_src} target="_blank">{tg}</a>
          </div>
          <div className="contact_item">
            <div className="contact_text">SPIN-код РИНЦ:</div>
            <a className="contact_href" href={spinid_src} target="_blank">{spinid}</a>
          </div>
          <div className="contact_item">
            <div className="contact_text">ORCID:</div>
            <a className="contact_href" href={orcid_src} target="_blank">{orcid}</a>
          </div>
          <div className="contact_item">
            <div className="contact_text">ResearcherID:</div>
            <a className="contact_href" href={resercherid_src} target="_blank">{resercherid}</a>
          </div>
          <div className="contact_item">
            <div className="contact_text">Scopus AuthorID:</div>
            <a className="contact_href" href={scopusid_src} target="_blank">{scopusid}</a>
          </div>
          <div className="contact_item">
            <div className="contact_text">Science ID:</div>
            <a className="contact_href" href={scienceid_src} target="_blank">{scienceid}</a>
          </div>
          <div className="contact_item">
            <div className="contact_text">ResearchGate:</div>
            <a className="contact_href" href={resercherid_src} target="_blank">{resercherid}</a>
          </div>
        </div>
      </div>

      <div className="fon"></div>
    </div>
  );
};

export default AuthorHomepage;
