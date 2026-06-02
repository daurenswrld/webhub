import React from 'react';
import { Layers, Cpu, Compass, HardDrive } from 'lucide-react';

export default function Services() {
  const serviceList = [
    {
      num: '01',
      icon: <Layers className="service-card-icon" />,
      title: 'Инженерные приложения',
      desc: 'Создаем производительные одностраничные и многостраничные веб-приложения на React/Next.js с чистой компонентной архитектурой, высокой производительностью и SEO оптимизацией.',
      tech: ['React', 'TypeScript', 'Next.js', 'Vite', 'State Management']
    },
    {
      num: '02',
      icon: <Cpu className="service-card-icon" />,
      title: 'Системная архитектура',
      desc: 'Проектируем архитектуру баз данных, отказоустойчивые RESTful/GraphQL API-сервисы, разрабатываем логику работы с данными и интеграцию с внешними сервисами.',
      tech: ['Node.js', 'PostgreSQL', 'Supabase', 'GraphQL', 'REST API']
    },
    {
      num: '03',
      icon: <Compass className="service-card-icon" />,
      title: 'Продуктовый UI/UX',
      desc: 'Создаем минималистичные интерфейсы с упором на пользовательский опыт. Разрабатываем дизайн-системы, компоненты и прототипы, которые затем переносим в код один-в-один.',
      tech: ['Figma', 'Design Systems', 'Vanilla CSS', 'Responsive Grid', 'Aesthetics']
    },
    {
      num: '04',
      icon: <HardDrive className="service-card-icon" />,
      title: 'DevOps и масштабирование',
      desc: 'Настраиваем автоматический деплой (CI/CD), контейнеризацию приложений, оптимизируем скорость загрузки страниц и безопасность серверов.',
      tech: ['Docker', 'CI/CD Pipelines', 'Vercel / AWS', 'Nginx', 'Performance Audit']
    }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header animate-fade-in">
          <span className="mono-label">КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ</span>
          <h2 className="section-subtitle">Что мы делаем профессионально</h2>
        </div>

        <div className="services-grid">
          {serviceList.map((service, index) => (
            <div
              key={service.num}
              className="service-card animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onMouseMove={handleMouseMove}
            >
              <div className="service-card-num">{service.num}</div>
              {service.icon}
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
              
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        padding: '2px 6px',
                        border: '1px solid var(--border-dim)',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(255, 255, 255, 0.01)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
