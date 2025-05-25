import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Box,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import {
  ImageIcon,
  Heading2,
  Pilcrow,
  Heading1,
  Heading3,
  Heading4,
} from "lucide-react";
import "../styles/publication_edit.scss";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton } from "@mui/material";
import { Trash } from "lucide-react";
import categories from "../datatest/categories.json";
import { Cancel } from "@mui/icons-material";
import authorsData from "../datatest/authors.json";

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  fio_author: string;
}

interface Publication {
  id: number;
  title: string;
}

const PublicationsEdit = () => {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("p");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrlPublish, setImageUrlPublish] = useState("");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [quoteText, setQuoteText] = useState("");
  const [selectedArticles, setSelectedArticles] = useState<Publication[]>([]);
  const [allArticles, setAllArticles] = useState<Publication[]>([]);

  useEffect(() => {
    setAllCategories(categories);
  }, []);

  const handleDelete = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.filter((cat) => cat.id !== categoryId)
    );
  };

  const addBlock = () => {
    if (mode === "img" && imageUrl) {
      const imgTag = `<img src='${imageUrl}' alt='' style='max-width:100%; height:auto;'/>`;
      setBlocks([...blocks, imgTag]);
      setImageUrl("");
    } else if (mode === "quote" && quoteText.trim()) {
      const articleRefs = selectedArticles
        .map((a) => `<cite>${a.title}</cite>`)
        .join(", ");
      const quoteBlock = `<blockquote>${quoteText.trim()}${
        articleRefs ? `<footer>${articleRefs}</footer>` : ""
      }</blockquote>`;

      setBlocks([...blocks, quoteBlock]);
      setQuoteText("");
      setSelectedArticles([]);
    } else if (input.trim()) {
      const tag = ["h1", "h2", "h3", "h4", "p", "b", "i", "u"].includes(mode)
        ? mode
        : "p";
      setBlocks([...blocks, `<${tag}>${input.trim()}</${tag}>`]);
      setInput("");
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over?.id);
      setBlocks((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  useEffect(() => {
    fetch("/authors.json")
      .then((res) => res.json())
      .then((data) => {
        const simpleAuthors = data.authors.map((author: any) => ({
          id: author.id,
          fio_author: author.fio_author,
        }));
        setAllAuthors(simpleAuthors);
      })
      .catch((err) => console.error("Ошибка загрузки авторов:", err));
  }, []);

  const handleDeleteAuthor = (id: number) => {
    setSelectedAuthors((prev) => prev.filter((a) => a.id !== id));
  };

  useEffect(() => {
    fetch("/publications.json")
      .then((res) => res.json())
      .then((data) => {
        const publish = data.publications.map((publications: any) => ({
          id: publications.id,
          title: publications.title,
        }));
        setAllArticles(publish);
      })
      .catch((err) => console.error("Ошибка загрузки статей:", err));
  }, []);

  return (
    <div className="page publication_edit">
      <div className="page_container">
        <div className="author_title_cont">
          <div className="rect_title"></div>
          <div className="text">Создание статьи</div>
        </div>

        <TextField
          fullWidth
          label="Название"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#262626",
              },
            },
            "& label.Mui-focused": {
              color: "#262626",
              fontWeight: "bold",
            },
          }}
        />

        <TextField
          fullWidth
          label="Описание"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          multiline
          rows={3}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#262626",
              },
            },
            "& label.Mui-focused": {
              color: "#262626",
              fontWeight: "bold",
            },
          }}
          style={{ marginTop: 16 }}
        />

        <TextField
          fullWidth
          label="Ссылка на превью"
          placeholder="https://example.com/image.jpg"
          type="url"
          value={imageUrlPublish}
          onChange={(e) => setImageUrlPublish(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#262626",
              },
            },
            "& label.Mui-focused": {
              color: "#262626",
              fontWeight: "bold",
            },
          }}
          style={{ marginTop: 16 }}
        />

        <Box>
          <Autocomplete
            multiple
            style={{ marginTop: 16 }}
            options={allCategories}
            getOptionLabel={(option) => option.name}
            value={selectedCategories}
            onChange={(_e, newValue) => setSelectedCategories(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Выберите категории" />
            )}
            disableCloseOnSelect
          />

          <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
            {selectedCategories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                onDelete={() => handleDelete(cat.id)}
                deleteIcon={<Cancel />}
                color="primary"
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Autocomplete
            multiple
            options={allAuthors}
            getOptionLabel={(option) => option.fio_author}
            value={selectedAuthors}
            onChange={(_e, newValue) => setSelectedAuthors(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Выберите авторов" />
            )}
            disableCloseOnSelect
          />

          <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
            {selectedAuthors.map((author) => (
              <Chip
                key={author.id}
                label={author.fio_author}
                onDelete={() => handleDeleteAuthor(author.id)}
                deleteIcon={<Cancel />}
                color="primary"
              />
            ))}
          </Box>
        </Box>

        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, val) => setMode(val || "p")}
          style={{ margin: "16px 0" }}
        >
          <ToggleButton value="h1">
            <Heading1 style={{ width: 16, height: 16 }} />
          </ToggleButton>
          <ToggleButton value="h2">
            <Heading2 style={{ width: 16, height: 16 }} />
          </ToggleButton>
          <ToggleButton value="h3">
            <Heading3 style={{ width: 16, height: 16 }} />
          </ToggleButton>
          <ToggleButton value="h4">
            <Heading4 style={{ width: 16, height: 16 }} />
          </ToggleButton>
          <ToggleButton value="p">
            <Pilcrow style={{ width: 16, height: 16 }} />
          </ToggleButton>
          <ToggleButton value="b">
            <strong>B</strong>
          </ToggleButton>
          <ToggleButton value="i">
            <em>I</em>
          </ToggleButton>
          <ToggleButton value="u">
            <u>U</u>
          </ToggleButton>
          <ToggleButton value="img">
            <ImageIcon style={{ width: 16, height: 16 }} />
          </ToggleButton>
          <ToggleButton value="quote">❝</ToggleButton>
        </ToggleButtonGroup>

        {mode === "img" ? (
          <TextField
            fullWidth
            label="Ссылка на изображение"
            placeholder="https://example.com/image.jpg"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            sx={
              {
                /* твои стили */
              }
            }
          />
        ) : mode === "quote" ? (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Введите цитату"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              sx={
                {
                  /* стили */
                }
              }
            />

            <Autocomplete
              multiple
              options={allArticles}
              getOptionLabel={(option) => option.title}
              value={selectedArticles}
              onChange={(_e, newValue) => setSelectedArticles(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Связанные статьи" />
              )}
              disableCloseOnSelect
              style={{ marginTop: 16 }}
            />

            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {selectedArticles.map((article) => (
                <Chip
                  key={article.id}
                  label={article.title}
                  onDelete={() =>
                    setSelectedArticles((prev) =>
                      prev.filter((a) => a.id !== article.id)
                    )
                  }
                  color="primary"
                />
              ))}
            </Box>
          </>
        ) : (
          <TextField
            fullWidth
            multiline
            rows={10}
            label="Введите текст"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={
              {
                /* стили */
              }
            }
          />
        )}

        <Button
          onClick={addBlock}
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: "#262626",
            color: "white",
            fontFamily: "Montserrat, serif",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#262626d0",
            },
          }}
        >
          Добавить
        </Button>

        <div style={{ marginTop: 24 }}>
          <div className="author_title_cont">
            <div className="rect_title"></div>
            <div className="text">Превью</div>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((_, i) => i.toString())}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block, idx) => (
                <SortableItem
                  key={idx}
                  id={idx.toString()}
                  block={block}
                  onDelete={() =>
                    setBlocks((prev) => prev.filter((_, i) => i !== idx))
                  }
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <Card style={{ marginTop: 24, marginBottom: 100 }}>
          <CardContent>
            <div className="author_title_cont">
              <div className="text">Результат</div>
            </div>
            <pre
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
              }}
            >
              {JSON.stringify(blocks, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SortableItem = ({
  id,
  block,
  onDelete,
}: {
  id: string;
  block: string;
  onDelete: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    marginBottom: "4px",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          paddingRight: 8,
          userSelect: "none",
        }}
      >
        ☰
      </div>

      <div
        style={{ flexGrow: 1 }}
        dangerouslySetInnerHTML={{ __html: block }}
      />

      <IconButton
        aria-label="Удалить блок"
        color="error"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete();
        }}
      >
        <Trash size={18} />
      </IconButton>
    </div>
  );
};

export default PublicationsEdit;
