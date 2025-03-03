import { MdOutlineArrowForwardIos } from "react-icons/md";
import WordCloud from "react-wordcloud";
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
import { useEffect, useRef } from "react";

type AuthorHomepageProps = {
  collab_name?: string;
  popular_topic?: string;
  popular_word?: string;
  avr_cit?: string;
  num_cit?: string;
  num_public?: string;
  years_public_one?: string;
  years_public_two?: string;
};

const AuthorHomepage = ({
  collab_name,
  popular_topic,
  popular_word,
  avr_cit,
  num_cit,
  num_public,
  years_public_one,
  years_public_two,
}: AuthorHomepageProps) => {
  const words = [
    { text: "Машинное обучение", value: 50 },
    { text: "Кибербезопасность", value: 40 },
    { text: "Веб-разработка", value: 35 },
    { text: "Бэкенд-разработка", value: 30 },
    { text: "Мобильная разработка", value: 25 },
    { text: "Облачные технологии", value: 20 },
    { text: "Разработка игр", value: 25 },
    { text: "Блокчейн", value: 20 },
    { text: "Интернет вещей", value: 20 },
    { text: "Анализ данных", value: 20 },
  ];

  const options = {
    rotations: 1,
    rotationAngles: [-90, 0] as [number, number],
    fontSizes: [30, 70] as [number, number],
  };

  const data = [
    { year: 2015, count: 30 },
    { year: 2016, count: 45 },
    { year: 2017, count: 60 },
    { year: 2018, count: 50 },
    { year: 2019, count: 70 },
    { year: 2020, count: 30 },
    { year: 2021, count: 45 },
    { year: 2022, count: 60 },
    { year: 2023, count: 50 },
    { year: 2024, count: 70 },
  ];

  const words2 = [
    { text: "Алгоритмы", value: 50 },
    { text: "Машинное обучение", value: 40 },
    { text: "Веб-разработка", value: 35 },
    { text: "Бэкенд-разработка", value: 30 },
    { text: "Фронтенд-разработка", value: 25 },
    { text: "Облачные технологии", value: 20 },
    { text: "Разработка игр", value: 25 },
    { text: "Блокчейн", value: 20 },
    { text: "Интернет вещей", value: 20 },
    { text: "Анализ данных", value: 20 },
  ];

  const options2 = {
    rotations: 1,
    rotationAngles: [0, 0] as [number, number],
    fontSizes: [30, 70] as [number, number],
  };

  const cards = [
    {
      image: "https://modenov.ru/blog/pictures/recursosprogramadores.png.jpg",
      title: "Карточка 1",
      description: "Описание карточки 1",
      data: "10 сентября 2024",
    },
    {
      image: "https://modenov.ru/blog/pictures/recursosprogramadores.png.jpg",
      title: "Карточка 2",
      description: "Описание карточки 2",
      data: "10 сентября 2024",
    },
    {
      image: "https://modenov.ru/blog/pictures/recursosprogramadores.png.jpg",
      title: "Карточка 3",
      description: "Описание карточки 3",
      data: "10 сентября 2024",
    },
    {
      image: "https://modenov.ru/blog/pictures/recursosprogramadores.png.jpg",
      title: "Карточка 4",
      description: "Описание карточки 4",
      data: "10 сентября 2024",
    },
    {
      image: "https://modenov.ru/blog/pictures/recursosprogramadores.png.jpg",
      title: "Карточка 5",
      description: "Описание карточки 5",
      data: "10 сентября 2024",
    },
    {
      image: "https://modenov.ru/blog/pictures/recursosprogramadores.png.jpg",
      title: "Карточка 6",
      description: "Описание карточки 6",
      data: "10 сентября 2024",
    },
  ];

  return (
    <div className="page">
      <div className="page_container">
        <div className="author_info1">
          <div className="info1_rect">
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
                <div className="info1_subtitle_dop">род деятельности</div>
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
          <div style={{ width: "100%", height: "600px" }}>
            <WordCloud words={words} options={options} />
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
          <div style={{ width: "100%", height: "300px" }}>
            <WordCloud words={words2} options={options2} />
          </div>
        </div>
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
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="card">
                <img src={card.image} alt={card.title} />
                <div className="desc">
                  <div className="title">{card.title}</div>
                  <div className="desc_pub">{card.description}</div>
                  <div className="data">{card.data}</div>
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
          <button className="learn-more">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Все статьи</span>
          </button>
        </div>
      </div>

      <div className="page_container bio" style={{ marginTop: "100px", marginBottom: "100px" }}>
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

      <div className="fon"></div>
    </div>
  );
};

export default AuthorHomepage;
