import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [method, setMethod] = useState("");

  const scrape = async (useJS) => {
    if (!url) return alert("Enter a URL");
    try {
      const res = await fetch(`http://localhost:8000/scrape/`, {  // <=== Fix endpoint here
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, use_js: useJS }),
      });
      const data = await res.json();
      if (data.error) {
        setResult(`Error: ${data.error}`);
        setMethod("");
      } else {
        setResult(data.scraped_content);
        setMethod(useJS ? "JS Rendered" : "Normal");
      }
    } catch (e) {
      setResult("Fetch error");
      setMethod("");
    }
  };

  return (
    <div className="container">
      <header>
        <h1>📈 Web Scraper Dashboard</h1>
        <nav>
          <a href="http://localhost:8000/admin" target="_blank" rel="noreferrer">
            Admin
          </a>
        </nav>
      </header>

      <main>
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={() => scrape(false)}>Scrape Normal</button>
        <button onClick={() => scrape(true)}>Scrape JS</button>

        {method && (
          <p>
            <strong>Method:</strong> {method}
          </p>
        )}

        <pre>{result || "No content yet. Enter URL and click Scrape."}</pre>
      </main>

      <footer>
        <p>&copy; 2025 WebScraper Inc.</p>
      </footer>
    </div>
  );
}
