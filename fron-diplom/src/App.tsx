import "./styles/main.scss";
import Header from "./components/header";
import AuthorPage from "./pages/author";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Header />
      <AuthorPage
        header_image="https://avatars.mds.yandex.net/i?id=4cd0cb13f46031bc22e9be6bcd199074_l-7761368-images-thumbs&n=13"
        fio_author="Гордеева Анна Евгеньевна"
        desc_author="Краткое описание чем занимается автор, что ему интересно и с чем работает. Что-то еще можно сюда же написать. Необходимо придумать"
        image_author="https://cdn.forbes.ru/forbes-static/c/1824x1026/new/2023/10/1-GettyImages-755650739-6529480935f2d.jpg"
      />
      <Footer />
    </>
  );
}

export default App;
