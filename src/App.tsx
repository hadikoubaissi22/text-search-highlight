import React, { useState, useMemo, useCallback } from "react";
import { articles } from "./data";
import "./index.css";

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


function useDebouncedValue<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}



export default function App() {
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );
    });
  }, [debouncedSearch]);

  const highlight = useCallback(
    (text: string): string => {
      const q = debouncedSearch.trim();
      if (!q) return text;
      const safeQuery = escapeRegex(q);
      const regex = new RegExp(`(${safeQuery})`, "gi");
      return text.replace(regex, `<mark>$1</mark>`);
    },
    [debouncedSearch]
  );

  
  return (
    <div className="container">
      <h1 className="title">Search</h1>

      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder="Type to search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button className="clear-btn" onClick={() => setSearch("")}>
            ×
          </button>
        )}
      </div>

      <p className="count">
        <strong>{filtered.length}</strong> posts were found.
      </p>

      <div className="results">
        {filtered.map((article) => (
          <article key={article.id} className="card">
            <h2
              className="article-title"
              dangerouslySetInnerHTML={{ __html: highlight(article.title) }}
            />
            <div className="date">{article.date}</div>
            <p
              className="article-content"
              dangerouslySetInnerHTML={{ __html: highlight(article.content) }}
            />
            <hr />
          </article>
        ))}
      </div>
    </div>
  );
}
