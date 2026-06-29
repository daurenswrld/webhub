import React, { useState, useEffect } from "react";
import { User, Code, Briefcase, Calendar, ChevronRight } from "lucide-react";

export default function TalentBoard() {
  const [activeTab, setActiveTab] = useState("talents"); // 'talents' | 'projects'
  const [filter, setFilter] = useState("all"); // 'all' | 'frontend' | 'backend' | 'design'
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab, filter]);

  const talentsData = [
    {
      id: "t1",
      name: "Даурен Б.",
      role: "Senior React Developer / UI Architect",
      category: "frontend",
      experience: "7 лет",
      status: "active",
      statusText: "Свободен для контрактов",
      rate: "$65 / час",
      tags: ["React", "Next.js", "Tailwind", "Design Systems"],
    },
    {
      id: "t2",
      name: "Алмас Р.",
      role: "Lead Systems Engineer / Backend Developer",
      category: "backend",
      experience: "9 лет",
      status: "active",
      statusText: "Свободен для контрактов",
      rate: "$80 / час",
      tags: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      id: "t3",
      name: "Аружан С.",
      role: "Senior Product Designer",
      category: "design",
      experience: "6 лет",
      status: "pending",
      statusText: "Занята (освободится 15.06)",
      rate: "$60 / час",
      tags: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    },
    {
      id: "t4",
      name: "Бахтияр Т.",
      role: "DevOps Engineer / Infrastructure Architect",
      category: "backend",
      experience: "8 лет",
      status: "active",
      statusText: "Свободен для контрактов",
      rate: "$75 / час",
      tags: ["Kubernetes", "CI/CD", "Terraform", "Nginx"],
    },
  ];

  const projectsData = [
    {
      id: "p1",
      name: "Разработка FinTech личного кабинета",
      role: "Студийный проект WebHub",
      category: "frontend",
      experience: "Срок: 2 месяца",
      status: "active",
      statusText: "В разработке",
      rate: "Бюджет: $12,500",
      tags: ["React", "ChartJS", "REST API", "Framer Motion"],
    },
    {
      id: "p2",
      name: "Оптимизация высоконагруженной СУБД",
      role: "Заказчик: Логистический холдинг",
      category: "backend",
      experience: "Срок: 3 недели",
      status: "active",
      statusText: "В разработке",
      rate: "Бюджет: $6,000",
      tags: ["PostgreSQL", "Query Tuning", "Redis", "Node.js"],
    },
    {
      id: "p3",
      name: "Создание дизайн-системы для SaaS",
      role: "Заказчик: EdTech платформа",
      category: "design",
      experience: "Срок: 1.5 месяца",
      status: "pending",
      statusText: "Ожидает старта",
      rate: "Бюджет: $8,000",
      tags: ["Figma", "Tokens", "Components", "Documentation"],
    },
  ];

  const activeData = activeTab === "talents" ? talentsData : projectsData;
  const filteredData =
    filter === "all"
      ? activeData
      : activeData.filter((item) => item.category === filter);

  return (
    <section id="talent-board" className="talent-section">
      <div className="container">
        <div className="talent-header-flex animate-fade-in">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="mono-label">БУДУЩАЯ ПЛАТФОРМА</span>
            <h2 className="section-subtitle">WebHub Exchange</h2>
            <p
              style={{
                maxWidth: "550px",
                fontSize: "0.9rem",
                marginTop: "8px",
              }}
            >
              Прототип нашей будущей биржи технологических проектов. Сейчас это
              реестр наших штатных специалистов и текущих активностей студии,
              готовый к масштабированию.
            </p>
          </div>

          <div className="talent-tabs">
            <button
              onClick={() => setActiveTab("talents")}
              className={`talent-tab-btn ${activeTab === "talents" ? "active" : ""}`}
            >
              Специалисты
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`talent-tab-btn ${activeTab === "projects" ? "active" : ""}`}
            >
              Проекты студии
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div
          className="animate-fade-in"
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "var(--space-3)",
            flexWrap: "wrap",
            marginTop: "var(--space-2)",
          }}
        >
          {["all", "frontend", "backend", "design"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: "transparent",
                border: "1px solid",
                borderColor:
                  filter === cat ? "var(--text-primary)" : "var(--border-dim)",
                color:
                  filter === cat
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat === "all" && "Все"}
              {cat === "frontend" && "Frontend"}
              {cat === "backend" && "Backend / DevOps"}
              {cat === "design" && "Design"}
            </button>
          ))}
        </div>

        {/* Main List */}
        <div className="talent-list">
          {isLoading ? (
            // Skeleton State - clean, structured skeletons, matching shape of the actual talent items
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`sk-${i}`}
                className="talent-item"
                style={{ borderStyle: "dashed", opacity: 0.7 }}
              >
                <div className="talent-info" style={{ width: "60%" }}>
                  <div
                    className="skeleton"
                    style={{ width: "8px", height: "8px", borderRadius: "50%" }}
                  />
                  <div style={{ width: "100%" }}>
                    <div
                      className="skeleton"
                      style={{
                        width: "40%",
                        height: "16px",
                        marginBottom: "8px",
                      }}
                    />
                    <div
                      className="skeleton"
                      style={{ width: "70%", height: "12px" }}
                    />
                  </div>
                </div>
                <div
                  className="talent-meta"
                  style={{ width: "30%", justifyContent: "flex-end" }}
                >
                  <div
                    className="skeleton"
                    style={{ width: "80px", height: "16px" }}
                  />
                </div>
              </div>
            ))
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="talent-item animate-fade-in">
                <div className="talent-info">
                  <span
                    className={`talent-status ${item.status === "active" ? "status-active" : "status-pending"}`}
                  />
                  <div className="talent-details">
                    <div className="talent-title-row">
                      <span className="talent-name">{item.name}</span>
                      <span className="talent-tag">{item.category}</span>
                    </div>
                    <div
                      className="talent-desc"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.role} •{" "}
                      <span style={{ color: "var(--text-muted)" }}>
                        {item.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="talent-meta">
                  <div className="talent-budget" style={{ textAlign: "right" }}>
                    <div>{item.rate}</div>
                    <div
                      style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                    >
                      {item.statusText}
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: "var(--text-dim)" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                border: "1px dashed var(--border-primary)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <p style={{ color: "var(--text-muted)" }}>
                Нет активных позиций в данной категории.
              </p>
            </div>
          )}
        </div>

        {/* Info card footer */}
        <div
          className="animate-fade-in"
          style={{
            marginTop: "var(--space-3)",
            padding: "var(--space-3)",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            textAlign: "left",
          }}
        >
          <Briefcase
            size={20}
            style={{
              color: "var(--text-secondary)",
              marginTop: "2px",
              flexShrink: 0,
            }}
          />
          <div>
            <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
              Как нанять этих специалистов?
            </h4>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: "2px",
              }}
            >
              Все представленные профессионалы являются постоянными резидентами
              WebHub. Вы можете привлечь их к реализации вашего проекта под
              управлением нашего техлида. Опишите ваши требования в форме связи
              ниже.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
