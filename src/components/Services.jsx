import React, { useState, useEffect, useRef } from 'react';
import { 
  Laptop, 
  ShoppingCart, 
  Database, 
  Users, 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  DollarSign
} from 'lucide-react';

export default function Services() {
  const [activeTab, setActiveTab] = useState('websites'); // 'websites' | 'marketplaces' | 'erp' | 'crm'

  // Common interactive state for Project Estimator
  const [estimatorScale, setEstimatorScale] = useState('medium'); // 'small' | 'medium' | 'enterprise'
  const [estimatorSpeed, setEstimatorSpeed] = useState('normal'); // 'normal' | 'express'
  const [estimatorIntegrations, setEstimatorIntegrations] = useState(2); // number of integrations

  const [loadHistory, setLoadHistory] = useState(Array(15).fill(12));
  const [crmToast, setCrmToast] = useState(null);
  const crmTimeoutRef = useRef(null);

  // 1. Websites (Lighthouse) Simulator State
  const [lhTesting, setLhTesting] = useState(false);
  const [lhScores, setLhScores] = useState({ perf: 0, seo: 0, bp: 0, access: 0 });
  const [lhLogs, setLhLogs] = useState([]);

  // 2. Marketplaces (Load) Simulator State
  const [loadSimulating, setLoadSimulating] = useState(false);
  const [loadRps, setLoadRps] = useState(12);
  const [loadLatency, setLoadLatency] = useState(6);
  const [loadOrders, setLoadOrders] = useState([]);

  // 3. ERP (Ledger) Simulator State
  const [erpTransactions, setErpTransactions] = useState([
    { id: 1, title: 'Продажа SaaS лицензии', amount: 8500, type: 'income' },
    { id: 2, title: 'Аренда серверов AWS', amount: 1200, type: 'expense' },
    { id: 3, title: 'ФОТ Инженеров', amount: 4800, type: 'expense' },
  ]);
  const [erpNewName, setErpNewName] = useState('');
  const [erpNewAmount, setErpNewAmount] = useState('');
  const [erpNewType, setErpNewType] = useState('income');

  // 4. CRM (Kanban) Simulator State
  const [crmDeals, setCrmDeals] = useState([
    { id: 1, title: 'Сайт-каталог', client: 'KazOil', value: 3500, stage: 'lead' },
    { id: 2, title: 'Интеграция ERP', client: 'StroyLogistics', value: 7200, stage: 'progress' },
    { id: 3, title: 'Дизайн-система', client: 'NeoBank', value: 4800, stage: 'done' },
  ]);
  const [crmLogs, setCrmLogs] = useState(['Система CRM инициализирована. Роботы триггеров готовы.']);

  // Reset estimator choices when changing tabs
  useEffect(() => {
    setEstimatorScale('medium');
    setEstimatorSpeed('normal');
    setEstimatorIntegrations(activeTab === 'websites' ? 1 : activeTab === 'marketplaces' ? 3 : 5);
  }, [activeTab]);

  // Handle Lighthouse Simulator trigger
  const runLighthouseTest = () => {
    if (lhTesting) return;
    setLhTesting(true);
    setLhScores({ perf: 0, seo: 0, bp: 0, access: 0 });
    setLhLogs([]);

    const logSteps = [
      { t: 200, m: '[INIT] Инициализация контейнера headless-chrome...' },
      { t: 500, m: '[INFO] Анализ размера бандла (React 19, Tree-shaking)...' },
      { t: 900, m: '[INFO] Проверка серверного рендеринга (SSR TTFB: 18ms)...' },
      { t: 1300, m: '[INFO] Валидация SEO-структуры и семантики HTML5...' },
      { t: 1700, m: '[INFO] Сжатие ассетов и оптимизация WebP изображений...' },
      { t: 2000, m: '[SUCCESS] Анализ завершен. Результаты оптимальны.' }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        setLhLogs((prev) => [...prev, step.m]);
      }, step.t);
    });

    // Animate gauges
    setTimeout(() => {
      let interval = setInterval(() => {
        setLhScores((prev) => {
          const next = {
            perf: Math.min(prev.perf + 5, 99),
            seo: Math.min(prev.seo + 5, 100),
            bp: Math.min(prev.bp + 5, 100),
            access: Math.min(prev.access + 5, 100),
          };
          if (next.perf === 99 && next.seo === 100) {
            clearInterval(interval);
            setLhTesting(false);
          }
          return next;
        });
      }, 50);
    }, 200);
  };

  // Handle Marketplace Load Simulator trigger
  useEffect(() => {
    let rpsInterval;
    let orderInterval;
    let historyInterval;

    if (loadSimulating) {
      // Ramp up RPS and latency
      rpsInterval = setInterval(() => {
        setLoadRps((prev) => {
          const target = 18450 + Math.floor(Math.random() * 500);
          return Math.min(prev + Math.floor((target - prev) * 0.15), target);
        });
        setLoadLatency((prev) => {
          const target = 9 + Math.floor(Math.random() * 4);
          return Math.min(prev + Math.floor((target - prev) * 0.1), target);
        });
      }, 100);

      // Feed chart history
      historyInterval = setInterval(() => {
        setLoadHistory((prev) => {
          const base = 18000;
          const val = base + Math.floor((Math.random() - 0.5) * 3000);
          return [...prev.slice(1), val];
        });
      }, 300);

      // Generate orders
      const orderTemplates = [
        { item: 'Смартфон X Pro', price: 990, gateway: 'Kaspi Pay' },
        { item: 'Беспроводные наушники', price: 180, gateway: 'Visa/Mastercard' },
        { item: 'Ноутбук Air 15', price: 1450, gateway: 'Kaspi QR' },
        { item: 'Подписка WebHub Cloud', price: 49, gateway: 'Kaspi Pay' },
        { item: 'Кожаный чехол', price: 35, gateway: 'Apple Pay' }
      ];

      orderInterval = setInterval(() => {
        const tpl = orderTemplates[Math.floor(Math.random() * orderTemplates.length)];
        const newOrder = {
          id: Date.now() + Math.random().toString(36).substr(2, 5),
          time: new Date().toLocaleTimeString(),
          ...tpl
        };
        setLoadOrders((prev) => [newOrder, ...prev.slice(0, 4)]);
      }, 700);

    } else {
      setLoadRps(12);
      setLoadLatency(4);
      setLoadOrders([]);
      setLoadHistory(Array(15).fill(12));
    }

    return () => {
      clearInterval(rpsInterval);
      clearInterval(orderInterval);
      clearInterval(historyInterval);
    };
  }, [loadSimulating]);

  // Handle ERP transaction insertion
  const handleAddErpTransaction = (e) => {
    e.preventDefault();
    if (!erpNewName.trim() || !erpNewAmount) return;
    const newTx = {
      id: Date.now(),
      title: erpNewName.trim(),
      amount: parseFloat(erpNewAmount),
      type: erpNewType
    };
    setErpTransactions((prev) => [...prev, newTx]);
    setErpNewName('');
    setErpNewAmount('');
  };

  const handleDeleteErpTx = (id) => {
    setErpTransactions((prev) => prev.filter(tx => tx.id !== id));
  };

  // Calculate ERP Totals
  const erpIncome = erpTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const erpExpense = erpTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const erpProfit = erpIncome - erpExpense;

  // Handle CRM Drag & Drop stages
  const moveCrmDeal = (id, direction) => {
    const stages = ['lead', 'progress', 'done'];
    const stageNames = { lead: 'Входящие', progress: 'В работе', done: 'Контракт закрыт' };
    
    setCrmDeals((prevDeals) => {
      return prevDeals.map((deal) => {
        if (deal.id === id) {
          const currentIndex = stages.indexOf(deal.stage);
          const nextIndex = currentIndex + direction;
          if (nextIndex >= 0 && nextIndex < stages.length) {
            const nextStage = stages[nextIndex];
            const logMsg = `[SYSTEM] Сделка "${deal.client}" переведена на этап [${stageNames[nextStage]}]` + 
              (nextStage === 'progress' ? ' -> Назначен техлид, создан приватный Slack-канал.' : '') +
              (nextStage === 'done' ? ' -> Робот сформировал счет в 1С и отправил клиенту.' : '');
            
            setCrmLogs((prevLogs) => [logMsg, ...prevLogs.slice(0, 4)]);

            // Trigger visual CRM Toast notification
            const toastMsg = nextStage === 'progress'
              ? `Отправлено SMS клиенту ${deal.client} о старте работ.`
              : nextStage === 'done'
                ? `Робот сгенерировал счет для ${deal.client} и отправил в 1С.`
                : `Сделка ${deal.client} перемещена в ${stageNames[nextStage]}.`;
            
            setCrmToast(toastMsg);
            if (crmTimeoutRef.current) clearTimeout(crmTimeoutRef.current);
            crmTimeoutRef.current = setTimeout(() => {
              setCrmToast(null);
            }, 3000);

            return { ...deal, stage: nextStage };
          }
        }
        return deal;
      });
    });
  };

  // Pricing calculations
  const calculatePricing = () => {
    let basePrice = 0;
    let baseTime = 0;
    let scaleMultiplier = 1;
    let expressMultiplier = 1;

    switch (activeTab) {
      case 'websites':
        basePrice = 2800;
        baseTime = 20;
        break;
      case 'marketplaces':
        basePrice = 6500;
        baseTime = 40;
        break;
      case 'erp':
        basePrice = 12000;
        baseTime = 60;
        break;
      case 'crm':
        basePrice = 8500;
        baseTime = 45;
        break;
      default:
        basePrice = 3000;
        baseTime = 20;
    }

    if (estimatorScale === 'small') {
      scaleMultiplier = 0.7;
    } else if (estimatorScale === 'enterprise') {
      scaleMultiplier = 1.6;
    }

    if (estimatorSpeed === 'express') {
      expressMultiplier = 1.35; // Express charges premium
    }

    const integrationsCost = estimatorIntegrations * 600;
    const finalPrice = Math.round((basePrice * scaleMultiplier + integrationsCost) * expressMultiplier);
    
    let finalTime = Math.round((baseTime * scaleMultiplier) + (estimatorIntegrations * 2));
    if (estimatorSpeed === 'express') {
      finalTime = Math.round(finalTime * 0.65); // 35% time reduction
    }

    return { price: finalPrice, time: finalTime };
  };

  const { price: estimatedPrice, time: estimatedTime } = calculatePricing();

  const handleOrderClick = () => {
    const serviceNames = {
      websites: 'development', // 'Разработка веб-приложений'
      marketplaces: 'development',
      erp: 'architecture', // 'Проектирование систем'
      crm: 'architecture'
    };

    const serviceLabels = {
      websites: 'Сайты и Web Apps',
      marketplaces: 'Маркетплейс / E-commerce',
      erp: 'ERP система автоматизации',
      crm: 'CRM система продаж'
    };

    const messageText = `Здравствуйте! Хочу обсудить разработку проекта:\n` +
      `- Направление: ${serviceLabels[activeTab]}\n` +
      `- Масштаб: ${estimatorScale === 'small' ? 'Стартап / MVP' : estimatorScale === 'medium' ? 'Бизнес-версия' : 'Корпоративный масштаб'}\n` +
      `- Срочность: ${estimatorSpeed === 'express' ? 'Экспресс (ускоренная)' : 'Стандартный график'}\n` +
      `- Интеграции: ${estimatorIntegrations} внешних сервисов\n` +
      `- Конфигуратор сметы: ~$${estimatedPrice} (${estimatedTime} дней)`;

    // Dispatch the custom event to ContactForm
    const event = new CustomEvent('configure-project', {
      detail: {
        service: serviceNames[activeTab],
        messageText: messageText
      }
    });
    window.dispatchEvent(event);
  };

  // Content for the selected tab
  const getTabDetails = () => {
    switch (activeTab) {
      case 'websites':
        return {
          title: 'Высокотехнологичные сайты & Web Apps',
          tagline: 'Мгновенный рендеринг, выверенная семантика и максимальный SEO-скоринг.',
          longDesc: 'Мы разрабатываем посадочные страницы, корпоративные порталы и веб-сервисы, которые мгновенно открываются на любом устройстве. Оптимизируем код до последнего байта, исключаем лишние скрипты и строим безупречную структуру для поисковых систем.',
          tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'WebGL / SSR'],
          limitLabel: 'Количество страниц / секций',
          minLimit: 1,
          maxLimit: 15
        };
      case 'marketplaces':
        return {
          title: 'Отказоустойчивый E-commerce & Маркетплейсы',
          tagline: 'Архитектура, готовая к пиковым нагрузкам Черной Пятницы.',
          longDesc: 'Создаем торговые площадки, маркетплейсы и интернет-магазины с мгновенным поиском, интеграциями с платежными шлюзами (Kaspi, Stripe) и службами доставки. Код пишется с упором на кэширование и распределенную обработку транзакций.',
          tech: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Kaspi API', 'Stripe / QR'],
          limitLabel: 'Интеграции со службами и API',
          minLimit: 1,
          maxLimit: 10
        };
      case 'erp':
        return {
          title: 'ERP-системы управления предприятием',
          tagline: 'Автоматизация логистики, складов, финансов и производства.',
          longDesc: 'Проектируем закрытые внутренние системы для управления бизнес-процессами компании. Объединяем бухгалтерию, закупки, учет остатков и работу филиалов в единый интерактивный интерфейс. Забудьте о хаосе в Excel-таблицах.',
          tech: ['NestJS', 'Go (Golang)', 'PostgreSQL', 'Docker', 'Kubernetes', 'Microservices'],
          limitLabel: 'Связанные внутренние отделы/базы',
          minLimit: 2,
          maxLimit: 12
        };
      case 'crm':
        return {
          title: 'CRM-системы & Автоматизация продаж',
          tagline: 'Контроль лидов, авто-воронки и боты-помощники.',
          longDesc: 'Разрабатываем кастомные CRM под уникальный цикл продаж компании. Интеграция с мессенджерами (WhatsApp, Telegram), телефонией и отправкой авто-счетов. Ни один лид не потеряется благодаря умным триггерам.',
          tech: ['React', 'Express', 'MongoDB', 'WebSocket', 'Telegram API', 'Twilio / Asterisk'],
          limitLabel: 'Автоматические интеграции мессенджеров',
          minLimit: 1,
          maxLimit: 8
        };
      default:
        return {};
    }
  };

  const details = getTabDetails();

  return (
    <section id="services" className="services-section">
      <div className="container">
        
        {/* Header */}
        <div className="section-header animate-fade-in">
          <span className="mono-label">ИНЖЕНЕРНЫЕ РЕШЕНИЯ // НАПРАВЛЕНИЯ</span>
          <h2 className="section-subtitle" style={{ fontSize: '2.25rem', marginTop: '8px' }}>
            Разрабатываем системы любого масштаба
          </h2>
          <p style={{ maxWidth: '600px', fontSize: '0.95rem', marginTop: '8px' }}>
            Мы не пишем шаблонный код. Каждая система проектируется с нуля под бизнес-требования с гарантией быстродействия и масштабируемости.
          </p>
        </div>

        {/* Tab Switcher Tabs */}
        <div className="animate-fade-in" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginBottom: 'var(--space-4)'
        }}>
          {[
            { id: 'websites', label: 'Сайты & Web Apps', icon: <Laptop size={16} /> },
            { id: 'marketplaces', label: 'Маркетплейсы / E-com', icon: <ShoppingCart size={16} /> },
            { id: 'erp', label: 'ERP системы', icon: <Database size={16} /> },
            { id: 'crm', label: 'CRM системы', icon: <Users size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: activeTab === tab.id ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: activeTab === tab.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeTab === tab.id ? 'var(--text-primary)' : 'var(--border-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = 'var(--text-secondary)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Detailed View Workspace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 'var(--space-4)',
          alignItems: 'stretch'
        }} className="services-grid-layout">
          
          {/* LEFT: Service description & pricing tool */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'left'
          }} className="animate-fade-in">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
                <span className="pulse-indicator" /> ACTIVE VIEW // STACK READY
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{details.title}</h3>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem', marginBottom: '12px', lineHeight: 1.4 }}>
                {details.tagline}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                {details.longDesc}
              </p>

              {/* Technologies List */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                  Стек технологий:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {details.tech?.map((t) => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-primary)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-primary)',
                      padding: '4px 8px',
                      borderRadius: '2px'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Configurator Tool */}
            <div style={{
              borderTop: '1px solid var(--border-dim)',
              paddingTop: '20px',
              marginTop: '12px'
            }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                Интерактивный калькулятор бюджета
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                
                {/* Scale selection */}
                <div>
                  <label style={{ fontSize: '0.75rem', marginBottom: '6px' }}>Масштаб проекта</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                      { id: 'small', label: 'MVP / Стартап' },
                      { id: 'medium', label: 'Бизнес-версия' },
                      { id: 'enterprise', label: 'Enterprise' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEstimatorScale(opt.id)}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-sans)',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: estimatorScale === opt.id ? 'var(--text-primary)' : 'var(--border-primary)',
                          backgroundColor: estimatorScale === opt.id ? 'var(--text-primary)' : 'transparent',
                          color: estimatorScale === opt.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider for Integrations */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.75rem', margin: 0 }}>{details.limitLabel}</label>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--success)' }}>
                      {estimatorIntegrations}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={details.minLimit}
                    max={details.maxLimit}
                    value={estimatorIntegrations}
                    onChange={(e) => setEstimatorIntegrations(parseInt(e.target.value))}
                    style={{
                      height: '4px',
                      background: 'var(--border-primary)',
                      accentColor: 'var(--text-primary)',
                      outline: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  />
                </div>

                {/* Speed toggle */}
                <div>
                  <label style={{ fontSize: '0.75rem', marginBottom: '6px' }}>Сроки разработки</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                      { id: 'normal', label: 'Стандартный график' },
                      { id: 'express', label: 'Экспресс-деплой (+35% к цене)' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEstimatorSpeed(opt.id)}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-sans)',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: estimatorSpeed === opt.id ? 'var(--text-primary)' : 'var(--border-primary)',
                          backgroundColor: estimatorSpeed === opt.id ? 'var(--text-primary)' : 'transparent',
                          color: estimatorSpeed === opt.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Estimate results display */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-2)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Примерный бюджет
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    ${estimatedPrice.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Срок реализации
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    ~{estimatedTime} дней
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOrderClick}
                className="btn btn-primary"
                style={{ width: '100%', gap: '8px', fontSize: '0.85rem' }}
              >
                Оформить заявку на проект <ArrowRight size={14} />
              </button>

            </div>
          </div>

          {/* RIGHT: Live interactive simulator console */}
          <div style={{
            backgroundColor: 'var(--bg-darker)',
            border: '1px dashed var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
          }} className="animate-fade-in service-simulator-container">
            
            {/* Top Bar Decoration */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-dim)',
              paddingBottom: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
                <span style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%' }} />
                <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }} />
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)'
              }}>
                CONSOLE // {activeTab.toUpperCase()}_SIMULATOR.EXE
              </div>
            </div>

            {/* Render simulators according to tab */}
            {activeTab === 'websites' && (
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    border: '1px solid var(--border-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '20px'
                  }}>
                    <span style={{ color: 'var(--success)', marginRight: '6px' }}>HTTPS://</span>
                    <span>webhub.tech/audit/client-performance</span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'left', marginBottom: '20px' }}>
                    Запустите аудит Google Lighthouse, чтобы оценить производительность нашей кодовой базы на продакшене.
                  </p>

                  {/* Lighthouse Gauges */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                    marginBottom: '24px'
                  }}>
                    {[
                      { key: 'perf', label: 'Speed', color: 'var(--success)' },
                      { key: 'seo', label: 'SEO', color: 'var(--success)' },
                      { key: 'bp', label: 'Practices', color: 'var(--success)' },
                      { key: 'access', label: 'Access', color: 'var(--success)' }
                    ].map((gauge) => (
                      <div key={gauge.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          border: `3px solid var(--border-primary)`,
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: lhScores[gauge.key] > 0 ? gauge.color : 'var(--text-muted)',
                          boxShadow: lhScores[gauge.key] > 0 ? `0 0 10px rgba(16, 185, 129, 0.1)` : 'none',
                          transition: 'all 0.3s ease'
                        }}>
                          {lhScores[gauge.key] || 0}
                        </div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '6px', fontFamily: 'var(--font-heading)' }}>
                          {gauge.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Console Log area */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '4px',
                    height: '100px',
                    padding: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    overflowY: 'auto',
                    marginBottom: '12px'
                  }}>
                    {lhLogs.length === 0 ? (
                      <div style={{ color: 'var(--text-muted)' }}>[Стенд готов к тестированию. Нажмите кнопку ниже]</div>
                    ) : (
                      lhLogs.map((log, idx) => <div key={idx}>{log}</div>)
                    )}
                  </div>

                  <button
                    onClick={runLighthouseTest}
                    disabled={lhTesting}
                    className="btn btn-secondary"
                    style={{
                      width: '100%',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      gap: '8px'
                    }}
                  >
                    <Play size={12} /> {lhTesting ? 'Сканирование...' : 'Запустить тест скорости'}
                  </button>
                </div>
              </div>
            )}

            {/* activeTab === 'marketplaces' */}
            {activeTab === 'marketplaces' && (
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    border: '1px solid var(--border-primary)',
                    marginBottom: '16px'
                  }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SERVER STATUS</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="pulse-indicator" /> ONLINE (99.99%)
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RPS</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {loadRps.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>LATENCY</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--success)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {loadLatency}ms
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'left', marginBottom: '16px' }}>
                    Сэмулируйте пиковую нагрузку крупной распродажи, чтобы проверить масштабируемость бэкенд-кластера.
                  </p>

                  {/* RPS Load History Micro-Chart */}
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '4px',
                    padding: '8px',
                    marginBottom: '12px',
                    textAlign: 'left'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                      <span>ИСТОРИЯ НАГРУЗКИ (RPS)</span>
                      <span style={{ color: loadSimulating ? 'var(--success)' : 'var(--text-muted)' }}>
                        {loadSimulating ? 'МАСШТАБИРОВАНИЕ КЛАСТЕРА ACTIVE' : 'ОЖИДАНИЕ ТРАФИКА'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '40px', gap: '3px' }}>
                      {loadHistory.map((val, idx) => {
                        const maxVal = 20000;
                        const heightPct = Math.min((val / maxVal) * 100, 100);
                        return (
                          <div key={idx} style={{
                            flex: 1,
                            height: `${Math.max(heightPct, 8)}%`,
                            backgroundColor: loadSimulating ? 'var(--success)' : 'var(--border-primary)',
                            borderRadius: '1px',
                            transition: 'height 0.3s ease, background-color 0.3s ease'
                          }} />
                        );
                      })}
                    </div>
                  </div>

                  {/* Order feed */}
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '4px',
                    padding: '8px',
                    minHeight: '130px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ borderBottom: '1px solid var(--border-dim)', paddingBottom: '4px', marginBottom: '6px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                      Входящие транзакции:
                    </div>
                    {loadOrders.length === 0 ? (
                      <div style={{ color: 'var(--text-muted)', padding: '12px 0', textAlign: 'center' }}>
                        Ожидание трафика... Нажмите кнопку симуляции.
                      </div>
                    ) : (
                      loadOrders.map((ord) => (
                        <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', animation: 'fadeIn 0.2s ease-out' }}>
                          <span>[{ord.time}] {ord.item}</span>
                          <span style={{ color: 'var(--success)' }}>+${ord.price} ({ord.gateway})</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setLoadSimulating(!loadSimulating)}
                  className="btn"
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    backgroundColor: loadSimulating ? '#ef4444' : 'var(--success)',
                    color: 'white',
                    gap: '6px',
                    marginTop: '12px'
                  }}
                >
                  {loadSimulating ? (
                    <>
                      <RotateCcw size={12} /> Остановить симуляцию нагрузки
                    </>
                  ) : (
                    <>
                      <Activity size={12} /> Симулировать «Черную Пятницу» (18K RPS)
                    </>
                  )}
                </button>
              </div>
            )}

            {/* activeTab === 'erp' */}
            {activeTab === 'erp' && (
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  
                  {/* Finances dashboard info */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '4px',
                    padding: '8px',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ПРИХОД</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        +${erpIncome}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>РАСХОД</div>
                      <div style={{ fontSize: '0.8rem', color: '#ef4444', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        -${erpExpense}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ЧИСТАЯ ПРИБЫЛЬ</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        ${erpProfit}
                      </div>
                    </div>
                  </div>

                  {/* Financial Trend SVG Graph */}
                  {(() => {
                    const erpGraphPoints = (() => {
                      let balance = 5000;
                      const points = [balance];
                      erpTransactions.forEach((t) => {
                        balance = t.type === 'income' ? balance + t.amount : balance - t.amount;
                        points.push(balance);
                      });
                      return points;
                    })();

                    const erpMax = Math.max(...erpGraphPoints, 8000);
                    const erpMin = Math.min(...erpGraphPoints, 2000);
                    const erpRange = erpMax - erpMin || 1;
                    const erpSvgWidth = 320;
                    const erpSvgHeight = 45;
                    const erpSvgPoints = erpGraphPoints.map((val, idx) => {
                      const x = (idx / (erpGraphPoints.length - 1)) * erpSvgWidth;
                      const y = erpSvgHeight - 6 - ((val - erpMin) / erpRange) * (erpSvgHeight - 12);
                      return `${x},${y}`;
                    }).join(' ');

                    return (
                      <div style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '4px',
                        padding: '6px',
                        marginBottom: '10px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                          <span>ФИНАНСОВЫЙ ГРАФИК (ТРЕНД БАЛАНСА)</span>
                          <span style={{ color: 'var(--success)' }}>${erpGraphPoints[erpGraphPoints.length - 1].toLocaleString()}</span>
                        </div>
                        <svg width="100%" height={erpSvgHeight} viewBox={`0 0 ${erpSvgWidth} ${erpSvgHeight}`} preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="erpGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--success)" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="var(--success)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d={`M 0,${erpSvgHeight} L 0,${erpSvgHeight - 6 - ((erpGraphPoints[0] - erpMin) / erpRange) * (erpSvgHeight - 12)} ` + 
                               erpGraphPoints.map((val, idx) => {
                                 const x = (idx / (erpGraphPoints.length - 1)) * erpSvgWidth;
                                 const y = erpSvgHeight - 6 - ((val - erpMin) / erpRange) * (erpSvgHeight - 12);
                                 return `L ${x},${y}`;
                               }).join(' ') + ` L ${erpSvgWidth},${erpSvgHeight} Z`}
                            fill="url(#erpGrad)"
                          />
                          <polyline
                            fill="none"
                            stroke="var(--success)"
                            strokeWidth="1.5"
                            points={erpSvgPoints}
                          />
                          {erpGraphPoints.map((val, idx) => {
                            const x = (idx / (erpGraphPoints.length - 1)) * erpSvgWidth;
                            const y = erpSvgHeight - 6 - ((val - erpMin) / erpRange) * (erpSvgHeight - 12);
                            return (
                              <circle
                                key={idx}
                                cx={x}
                                cy={y}
                                r="2.5"
                                fill="var(--bg-primary)"
                                stroke="var(--success)"
                                strokeWidth="1"
                              />
                            );
                          })}
                        </svg>
                      </div>
                    );
                  })()}

                  {/* Interactive form to add tx */}
                  <form onSubmit={handleAddErpTransaction} style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '10px'
                  }}>
                    <input
                      type="text"
                      placeholder="Откат / Статья"
                      required
                      value={erpNewName}
                      onChange={(e) => setErpNewName(e.target.value)}
                      style={{ fontSize: '0.7rem', padding: '4px 6px', flex: 2 }}
                    />
                    <input
                      type="number"
                      placeholder="Сумма $"
                      required
                      value={erpNewAmount}
                      onChange={(e) => setErpNewAmount(e.target.value)}
                      style={{ fontSize: '0.7rem', padding: '4px 6px', flex: 1.2 }}
                    />
                    <select
                      value={erpNewType}
                      onChange={(e) => setErpNewType(e.target.value)}
                      style={{ fontSize: '0.7rem', padding: '4px 4px', flex: 1 }}
                    >
                      <option value="income">+</option>
                      <option value="expense">-</option>
                    </select>
                    <button type="submit" style={{
                      backgroundColor: 'var(--text-primary)',
                      border: 'none',
                      color: 'var(--bg-primary)',
                      padding: '0 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Plus size={12} />
                    </button>
                  </form>

                  {/* Transaction ledger list */}
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '4px',
                    maxHeight: '110px',
                    overflowY: 'auto',
                    padding: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem'
                  }}>
                    {erpTransactions.map((tx) => (
                      <div key={tx.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '4px 0',
                        borderBottom: '1px solid var(--border-dim)'
                      }}>
                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                          {tx.title}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: tx.type === 'income' ? 'var(--success)' : '#ef4444' }}>
                            {tx.type === 'income' ? '+' : '-'}${tx.amount}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteErpTx(tx.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                <div style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  marginTop: '10px',
                  textAlign: 'left',
                  borderTop: '1px solid var(--border-dim)',
                  paddingTop: '8px'
                }}>
                  * Симулятор демонстрирует мгновенную синхронизацию базы данных PostgreSQL с визуальным рендером баланса.
                </div>
              </div>
            )}

            {/* activeTab === 'crm' */}
            {activeTab === 'crm' && (
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                {crmToast && (
                  <div style={{
                    position: 'absolute',
                    top: '48px',
                    left: '12px',
                    right: '12px',
                    backgroundColor: 'var(--success)',
                    color: 'var(--bg-primary)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s ease'
                  }}>
                    <CheckCircle2 size={12} /> {crmToast}
                  </div>
                )}
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'left', marginBottom: '12px' }}>
                    Управляйте воронкой продаж. Кликайте стрелки на сделках для перевода их по этапам.
                  </p>

                  {/* Kanban Columns */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    marginBottom: '12px'
                  }}>
                    {['lead', 'progress', 'done'].map((stage) => {
                      const stageLabels = { lead: 'ЛИДЫ', progress: 'В РАБОТЕ', done: 'УСПЕШНЫЕ' };
                      const stageColors = { lead: 'var(--text-secondary)', progress: '#f59e0b', done: 'var(--success)' };
                      
                      return (
                        <div key={stage} style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: '4px',
                          padding: '6px 4px',
                          minHeight: '130px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <div style={{
                            fontSize: '0.6rem',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-heading)',
                            color: stageColors[stage],
                            borderBottom: '1px solid var(--border-dim)',
                            paddingBottom: '2px',
                            marginBottom: '2px'
                          }}>
                            {stageLabels[stage]}
                          </div>

                          {crmDeals.filter(d => d.stage === stage).map((deal) => (
                            <div key={deal.id} style={{
                              backgroundColor: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-primary)',
                              borderRadius: '3px',
                              padding: '4px 6px',
                              textAlign: 'left'
                            }}>
                              <div style={{ fontWeight: 600, fontSize: '0.65rem', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {deal.client}
                              </div>
                              <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                                {deal.title}
                              </div>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '4px'
                              }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--success)' }}>
                                  ${deal.value}
                                </span>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                  {stage !== 'lead' && (
                                    <button
                                      onClick={() => moveCrmDeal(deal.id, -1)}
                                      style={{ padding: '0 3px', fontSize: '0.55rem', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-primary)', borderRadius: '2px' }}
                                    >
                                      {"<"}
                                    </button>
                                  )}
                                  {stage !== 'done' && (
                                    <button
                                      onClick={() => moveCrmDeal(deal.id, 1)}
                                      style={{ padding: '0 3px', fontSize: '0.55rem', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-primary)', borderRadius: '2px' }}
                                    >
                                      {">"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Log Feed */}
                <div>
                  <div style={{
                    fontSize: '0.6rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    textAlign: 'left',
                    marginBottom: '4px'
                  }}>
                    ЛОГ ТРИГГЕРОВ АВТОМАТИЗАЦИИ:
                  </div>
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '4px',
                    padding: '6px',
                    height: '52px',
                    overflowY: 'auto',
                    textAlign: 'left',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {crmLogs.map((log, idx) => (
                      <div key={idx} style={{ marginBottom: '2px', color: idx === 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
