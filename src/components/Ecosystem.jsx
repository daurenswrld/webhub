import React, { useState } from 'react';
import { 
  Code, 
  Server, 
  Database, 
  Settings, 
  Shield, 
  GitBranch, 
  CheckCircle2, 
  Terminal,
  Cpu
} from 'lucide-react';

export default function Ecosystem() {
  const [activeCategory, setActiveCategory] = useState('backend'); // 'frontend' | 'backend' | 'database' | 'devops'

  // Tech categories & details
  const techStack = {
    frontend: {
      title: 'Интерфейсы реального времени',
      desc: 'Создаем быстрые, отзывчивые и оптимизированные SPA/SSR приложения с адаптивной версткой.',
      items: [
        { name: 'React / Next.js', role: 'Основной фреймворк', details: 'Используем для рендеринга на стороне сервера (SSR) и построения сложных динамических интерфейсов.' },
        { name: 'TypeScript', role: 'Безопасность типов', details: 'Исключает 90% потенциальных багов интерфейса на этапе компиляции кода.' },
        { name: 'WebGL / Three.js', role: '3D & Анимации', details: 'Для создания интерактивных презентаций, 3D конфигураторов и продвинутой визуализации.' },
        { name: 'Tailwind CSS', role: 'Стилизация', details: 'Для быстрого прототипирования адаптивных UI-компонентов по дизайн-системе.' }
      ]
    },
    backend: {
      title: 'Отказоустойчивая бизнес-логика',
      desc: 'Проектируем высоконагруженные API, микросервисы и интеграционные шины для обмена данными.',
      items: [
        { name: 'Go (Golang)', role: 'Высокие нагрузки', details: 'Разрабатываем легковесные и быстрые микросервисы, обрабатывающие десятки тысяч запросов в секунду.' },
        { name: 'Node.js (NestJS)', role: 'Веб-сервисы', details: 'Используем для быстрой сборки масштабируемых корпоративных API и событийно-ориентированных платформ.' },
        { name: 'gRPC / Protocol Buffers', role: 'Межсервисный обмен', details: 'Для мгновенной и типизированной коммуникации между бэкенд-сервисами с минимальным оверхедом.' },
        { name: 'WebSockets', role: 'Real-time события', details: 'Обеспечиваем мгновенную доставку уведомлений, котировок и обновлений в браузер пользователя.' }
      ]
    },
    database: {
      title: 'Надежное хранение данных',
      desc: 'Проектируем архитектуру баз данных с учетом репликации, шардирования и оптимизации индексов.',
      items: [
        { name: 'PostgreSQL', role: 'Реляционная БД', details: 'Основное надежное хранилище с поддержкой транзакций ACID и сложных аналитических запросов.' },
        { name: 'Redis', role: 'Кэширование & Сессии', details: 'In-memory БД для кэширования ответов API, хранения сессий пользователей и очередей сообщений.' },
        { name: 'MongoDB', role: 'Документо-ориентированная БД', details: 'Для хранения неструктурированных данных, каталогов товаров с динамическими свойствами.' },
        { name: 'Elasticsearch', role: 'Полнотекстовый поиск', details: 'Быстрый поиск с автодополнением и фильтрацией по миллионам записей маркетплейсов.' }
      ]
    },
    devops: {
      title: 'Инфраструктура и автоматизация',
      desc: 'Разворачиваем проекты в отказоустойчивых кластерах с автоматическим масштабированием ресурсов.',
      items: [
        { name: 'Docker / K8s', role: 'Контейнеризация', details: 'Изолируем сервисы в контейнерах и управляем ими через Kubernetes-кластеры с автоматическим перезапуском.' },
        { name: 'GitHub Actions CI/CD', role: 'Авто-тесты & Деплой', details: 'Каждая строчка кода проходит автоматическую проверку и деплоится на продакшен без даунтайма.' },
        { name: 'AWS / Cloudflare', role: 'Облачные провайдеры', details: 'Обеспечиваем защиту от DDoS, дистрибуцию статики (CDN) и безопасный шифрованный трафик.' },
        { name: 'Prometheus & Grafana', role: 'Мониторинг', details: 'Отслеживаем загрузку процессора, памяти и сетевой latency серверов 24/7 с авто-алертами в Telegram.' }
      ]
    }
  };

  const currentStack = techStack[activeCategory];

  return (
    <section id="ecosystem" className="ecosystem-section" style={{
      paddingTop: 'var(--space-6)',
      paddingBottom: 'var(--space-6)',
      borderBottom: '1px solid var(--border-dim)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header animate-fade-in">
          <span className="mono-label">ИНЖЕНЕРНЫЕ СТАНДАРТЫ // СТЭК ТЕХНОЛОГИЙ</span>
          <h2 className="section-subtitle" style={{ fontSize: '2.25rem', marginTop: '8px' }}>
            Как мы создаем надежное ПО
          </h2>
          <p style={{ maxWidth: '600px', fontSize: '0.95rem', marginTop: '8px' }}>
            Мы придерживаемся строгих стандартов промышленной разработки, обеспечивая безопасность, масштабируемость и полное владение кодовой базой.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-5)'
        }} className="animate-fade-in">
          
          {/* Principle 1 */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'inline-flex', padding: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', marginBottom: '16px', color: 'var(--text-primary)' }}>
              <Shield size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 600 }}>100% Владение кодом</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Передаем полные права на интеллектуальную собственность и исходный код. Никаких скрытых подписок, конструкторов или закрытых систем. Все коммиты в вашем Git.
            </p>
          </div>

          {/* Principle 2 */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'inline-flex', padding: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', marginBottom: '16px', color: 'var(--text-primary)' }}>
              <GitBranch size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 600 }}>Автоматизация QA & CI/CD</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Код деплоится только после прохождения автоматизированных юнит- и интеграционных тестов. Никаких «ручных правок на сервере». Исключаем человеческий фактор.
            </p>
          </div>

          {/* Principle 3 */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'inline-flex', padding: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', marginBottom: '16px', color: 'var(--text-primary)' }}>
              <Settings size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 600 }}>Инфраструктура как код (IaC)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Все окружения (development, staging, production) описываются в конфигурационных файлах Docker и Kubernetes. Это гарантирует 100% повторяемость среды и легкий перенос систем.
            </p>
          </div>

        </div>

        {/* Interactive Ecosystem Radar & Categories */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          textAlign: 'left'
        }} className="animate-fade-in">
          
          {/* Tab buttons */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-dim)',
            paddingBottom: '12px',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'backend', label: 'BACKEND', icon: <Server size={14} /> },
              { id: 'frontend', label: 'FRONTEND', icon: <Code size={14} /> },
              { id: 'database', label: 'DATABASES', icon: <Database size={14} /> },
              { id: 'devops', label: 'DEVOPS / CI-CD', icon: <Terminal size={14} /> }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: activeCategory === cat.id ? 'var(--text-primary)' : 'transparent',
                  color: activeCategory === cat.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--text-primary)' : 'var(--border-primary)',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr',
            gap: '24px'
          }} className="ecosystem-layout">
            
            {/* Left side info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
                <span className="pulse-indicator" /> ECOSYSTEM ACTIVE
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: 600 }}>{currentStack.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {currentStack.desc}
              </p>
            </div>

            {/* Right side items */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px'
            }}>
              {currentStack.items.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.name}</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--success)', fontFamily: 'var(--font-mono)', border: '1px solid var(--border-primary)', padding: '1px 4px', borderRadius: '2px' }}>
                      {item.role}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: '4px' }}>
                    {item.details}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
