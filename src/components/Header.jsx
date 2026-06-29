import React, { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Header() {
  const [isLight, setIsLight] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isLightTheme =
      document.documentElement.classList.contains("light") ||
      localStorage.getItem("theme") === "light";
    if (isLightTheme) {
      document.documentElement.classList.add("light");
      setIsLight(true);
    } else {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("light")) {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-container">
          <a href="#" className="logo-wrapper" aria-label="WebHub главная">
            <Logo className="logo-icon" />
            <span>WebHub</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="header-nav-desktop">
            <a href="#services" className="nav-link">
              Услуги
            </a>
            <a href="#ecosystem" className="nav-link">
              Стандарты
            </a>
            <a href="#git-activity-section" className="nav-link">
              Активность
            </a>
            <a href="#terminal-section" className="nav-link">
              Консоль
            </a>
            <a href="#contact" className="nav-link">
              Связаться
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isLight ? "Включить ночную тему" : "Включить дневную тему"
              }
              style={{
                background: "transparent",
                border: "1px solid var(--border-primary)",
                borderRadius: "4px",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px",
                transition: "all 0.15s ease",
                width: "30px",
                height: "30px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--text-secondary)";
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-primary)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {isLight ? (
                // Moon Icon
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                // Sun Icon
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>

            <div className="status-badge">
              <span className="pulse-indicator pulse-animation" />
              <span>HQ Online</span>
            </div>

            {/* Burger Button */}
            <button
              type="button"
              className={`burger-btn ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <nav className={`header-nav-mobile ${isMenuOpen ? "open" : ""}`}>
        <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Услуги
        </a>
        <a href="#ecosystem" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Стандарты
        </a>
        <a href="#git-activity-section" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Активность
        </a>
        <a href="#terminal-section" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Консоль
        </a>
        <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Связаться
        </a>
      </nav>
    </>
  );
}
