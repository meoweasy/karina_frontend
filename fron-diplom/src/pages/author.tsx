import "../styles/page_author.scss";
import { useState, useEffect } from "react";
import AuthorHomepage from "../components/author_homepage";
import AuthorPublications from "../components/author_publications";
import authorsData from "../datatest/authors.json";
import { useParams } from "react-router-dom";
import { Word } from "../components/word_cloud";

interface Quote{
  year: string;
  href_publication: string;
  name_publication: string;
  href_quote: string;
  name_quote: string
  city_quote: string;
}

interface Author {
  id: number;
  fio_author: string;
  image_author: string;
  header_image: string;
  desc_author: string;
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
  collab_name: string;
  collab_id: number;
  categories: {
    id: number;
    name: string;
  }[];
  num_public: number;
  years_public_one: string;
  years_public_two: string;
  words: Word[];
  words2: Word[];
  bio: string[];
  grants: string[];
  quotes: Quote[];
}

const AuthorPage = () => {
  const [isHomepageOpen, setIsHomepageOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    if (id) {
      const selectedAuthor = authorsData.authors.find(
        (author) => author.id === Number(id)
      );
      if (selectedAuthor) {
        setAuthor({
          ...selectedAuthor,
          bio: selectedAuthor.bio ?? [],
          grants: selectedAuthor.grants ?? [],
          quotes: Array.isArray(selectedAuthor.quotes)
            ? selectedAuthor.quotes
            : selectedAuthor.quotes
            ? [selectedAuthor.quotes]
            : [
                {
                  year: "",
                  href_publication: "",
                  name_publication: "",
                  href_quote: "",
                  name_quote: "",
                  city_quote: ""
                }
              ],
        });
      } else {
        setAuthor(null);
      }
      setIsHomepageOpen(true);
    }
  }, [id]);

  if (!author) {
    return <div>Автор не найден</div>;
  }

  return (
    <div className="page">
      <div className="header_image_author">
        <div className="header_author_text_cont">
          <div>{author.fio_author}</div>
          <div>{author.desc_author}</div>
        </div>
        <img src={author.header_image} alt={author.fio_author} />
      </div>

      <div className="page_container">
        <div className="image_author">
          <img src={author.image_author} alt={author.fio_author} />
        </div>
        <div className="author_navigation_cont">
          <button className="nav_item" onClick={() => setIsHomepageOpen(true)}>
            Профиль
          </button>
          <button className="nav_item" onClick={() => setIsHomepageOpen(false)}>
            Публикации
          </button>
        </div>
      </div>

      {isHomepageOpen ? (
        <AuthorHomepage
          id={author.id} 
          collab_name={author.collab_name}
          popular_topic={author.categories[2]?.name ?? ""}
          popular_word="Классификация"
          avr_cit="2"
          num_cit="92"
          num_public={author.num_public}
          years_public_one={author.years_public_one}
          years_public_two={author.years_public_two}
          email={author.email}
          tg={author.tg}
          spinid={author.spinid}
          orcid={author.orcid}
          resercherid={author.resercherid}
          scopusid={author.scopusid}
          scienceid={author.scienceid}
          tg_src={author.tg_src}
          spinid_src={author.spinid_src}
          orcid_src={author.orcid_src}
          resercherid_src={author.resercherid_src}
          scopusid_src={author.scopusid_src}
          scienceid_src={author.scienceid_src}
          collab_id = {author.collab_id}
          words={author.words}
          words2={author.words2}
          setIsHomepageOpen={setIsHomepageOpen}
          bio={author.bio}
          grants={author.grants}
          quotes={author.quotes}
        />
      ) : (
        <AuthorPublications authorId={Number(id)} />
      )}
    </div>
  );
};

export default AuthorPage;
