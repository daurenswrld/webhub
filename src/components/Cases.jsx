import React, { useState } from 'react';
import { ExternalLink, Layers, CheckCircle2, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function Cases() {
  const [activeCategory, setActiveCategory] = useState('all');

  const caseStudies = [
    {
      id: 1,
      category: 'fintech',
      title: 'NeoBank Mobile & Web Platform',
      client: 'Финтех-экосистема',
      metrics: '+340% рост активной аудитории',
      speed: 'TTFB 14ms',
      desc: 'Разработали масштабируемую веб-платформу и мобильное приложение с онлайн-экваргингом, P2P-переводами и биометрической аутентификацией.',
      tech: ['React 19', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Kaspi Pay'],
      highlight: '99.99% Uptime при 50k RPS'
    },
    {
      id: 2,
      category: 'ecommerce',
      title: 'KazRetail E-Commerce Ecosystem',
      client: 'Маркетплейс ритейла',
      metrics: '2.4M просмотров в сутки',
      speed: 'Загрузка 0.4s',
      desc: 'Создали высоконагруженную торговую площадку с мгновенным фильтром из 450,000 товаров, интеграцией 1С и поддержкой Kaspi QR.',
      tech: ['Next.js', 'Go (Golang)', 'Elasticsearch', 'Docker', 'Kaspi API', 'Redis'],
      highlight: 'В 4 раза быстрее старого сайта'
    },
    {
      id: 3,
      category: 'enterprise',
      title: 'GlobalLogistics ERP & CRM System',
      client: 'Международная логистика',
      metrics: '-65% ручной работы диспетчеров',
      speed: 'Автоматизация 24/7',
      desc: 'Единая закрытая система управления парком автотранспорта, трекингом грузов в реальном времени и автоматической рассылкой счетов клиентам.',
      tech: ['NestJS', 'React', 'PostgreSQL', 'Telegram Bot API', 'Docker', '1C'],
      highlight: 'Интеграция 12 подразделений'
    },
    {
      id: 4,
      category: 'ai',
      title: 'AI Smart Support Assistant',
      client: 'Телеком-оператор',
      metrics: '78% авто-решений обращения',
      speed: '<1 сек отклик ИИ',
      desc: 'Внедрили нейросетевого ассистента на базе GPT-4 в WhatsApp и Telegram для автоматической консультации по тарифам и балансу.',
      tech: ['Python', 'OpenAI GPT-4', 'LangChain', 'Vector DB', 'WhatsApp API'],
      highlight: 'Экономия $14,000/мес на саппорте'
    }
  ];

  const filteredCases = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter(c => c.category === activeCategory);

  return (
    <section id="cases" className="cases-section" style={{
      paddingTop: 'var(--space-6)',
      paddingBottom: 'var(--space-6)',
      borderBottom: '1px solid var(--border-dim)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header animate-fade-in">
          <span className="mono-label">ПОРТФОЛИО // РЕАЛИЗОВАННЫЕ КЕЙСЫ</span>
          <h2 className="section-subtitle" style={{ fontSize: '2.25rem', marginTop: '8px' }}>
            Проекты, доказавшие эффективность на практике
          </h2>
          <p style={{ maxWidth: '650px', fontSize: '0.95rem', marginTop: '8px' }}>
            Посмотрите примеры наших систем, запущенных в продакшен. Нажимайте на кейсы для подробного изучения стека и достигнутых результатов.
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: 'var(--space-4)'
        }} className="animate-fade-in">
          {[
            { id: 'all', label: 'Все проекты' },
            { id: 'fintech', label: 'Финтех & Банки' },
            { id: 'ecommerce', label: 'E-commerce & Ритейл' },
            { id: 'enterprise', label: 'ERP & CRM Системы' },
            { id: 'ai', label: 'AI & ИИ Автоматизация' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveCategory(btn.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: activeCategory === btn.id ? 'var(--text-primary)' : 'var(--border-primary)',
                backgroundColor: activeCategory === btn.id ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: activeCategory === btn.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid of cases */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'var(--space-4)',
          textAlign: 'left'
        }} className="animate-fade-in">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--success)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-dim)',
                    padding: '2px 8px',
                    borderRadius: '2px'
                  }}>
                    {cs.client}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={12} style={{ color: 'var(--success)' }} /> {cs.speed}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {cs.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {cs.desc}
                </p>

                {/* Highlight banner */}
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderLeft: '3px solid var(--success)',
                  borderRadius: '2px',
                  fontSize: '0.8rem',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                  <span><strong>Результат:</strong> {cs.metrics} ({cs.highlight})</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Использованный стек:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {cs.tech.map((t) => (
                    <span key={t} style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-primary)',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-primary)',
                      padding: '2px 6px',
                      borderRadius: '2px'
                    }}>
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
