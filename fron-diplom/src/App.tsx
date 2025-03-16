import "./styles/main.scss";
import Header from "./components/header";
import HomePage from "./pages/home";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorPage from "./pages/author";
import PublicationPage from "./pages/publication";
import ListAuthor from "./pages/list_author";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/publication/:publicationid" element={<PublicationPage />} />
        <Route path="/list_authors" element={<ListAuthor />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
