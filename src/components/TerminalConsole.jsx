import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Check } from 'lucide-react';

export default function TerminalConsole() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'WebHub Core OS v2.1.0-LTS (x86_64-pc-linux-gnu)' },
    { type: 'output', text: 'Установите соединение... Состояние: БЕЗОПАСНО' },
    { type: 'output', text: 'Введите "help" для получения списка доступных команд.' },
    { type: 'output', text: '' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus terminal input when clicking the terminal body
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    // Add command to history
    const newHistory = [...history, { type: 'input', text: inputVal }];

    // Resolve command
    let reply = [];
    switch (cmd) {
      case 'help':
        reply = [
          'Доступные команды оболочки:',
          '  about       - Информация о студии WebHub',
          '  services    - Наш каталог услуг и систем разработки',
          '  standards   - Стандарты качества кодовой базы',
          '  system      - Текущее состояние серверов и API',
          '  contact     - Быстрый переход к форме заявки',
          '  clear       - Очистить экран терминала'
        ];
        break;
      case 'about':
        reply = [
          '██╗    ██╗███████╗██████╗ ██╗  ██╗██╗   ██╗██████╗ ',
          '██║    ██║██╔════╝██╔══██╗██║  ██║██║   ██║██╔══██╗',
          '██║ █╗ ██║█████╗  ██████╔╝███████║██║   ██║██████╔╝',
          '██║███╗██║██╔══╝  ██╔══██╗██╔══██║██║   ██║██╔══██╗',
          '╚███╔███╔╝███████╗██████╔╝██║  ██║╚██████╔╝██████╔╝',
          ' ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ',
          'WebHub — независимая инженерная студия разработки.',
          'Мы создаем сложные веб-приложения, маркетплейсы, ERP и CRM.',
          'Наша цель: абсолютная техническая чистота кода и максимальная производительность.'
        ];
        break;
      case 'services':
        reply = [
          'Каталог систем WebHub:',
          '  1. Web Apps     - Next.js / React, 100% Lighthouse, SSR/SSG',
          '  2. Marketplace  - Go / Redis, масштабируемые каталоги, 20K RPS',
          '  3. ERP Systems  - Node.js / PostgreSQL, учет, склад, автоматизация',
          '  4. CRM Systems  - React / WebSockets, воронка продаж, триггеры 1С'
        ];
        break;
      case 'standards':
        reply = [
          'Стандарты разработки WebHub:',
          '  [CODE]    100% передача прав и исходников клиенту',
          '  [TEST]    Обязательное покрытие авто-тестами перед релизом',
          '  [DEVOPS]  IaC (Infrastructure as Code) via Docker & Kubernetes',
          '  [SPEED]   Оптимизация бандлов и кэширование на уровне CDN (Cloudflare)'
        ];
        break;
      case 'system':
        reply = [
          'ИНФОРМАЦИЯ О СИСТЕМЕ:',
          '  [STATUS]      Серверный кластер: ONLINE',
          '  [GATEWAY]     API Gateway latency: 3.8ms',
          '  [DATABASE]    PostgreSQL primary: CONNECTED (0 active locks)',
          '  [CACHE]       Redis cluster hit rate: 99.8%',
          '  [CI/CD]       GitHub Actions runner: IDLE (last deploy: 14 min ago)'
        ];
        break;
      case 'contact':
        reply = ['Выполняю перенаправление к контактной форме...'];
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 800);
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'git status':
        reply = [
          'On branch main',
          'Your branch is up to date with \'origin/main\'.',
          'nothing to commit, working tree clean'
        ];
        break;
      case 'sudo rm -rf':
        reply = [
          'WARNING: Attempting to delete the mainframe...',
          'ACCESS DENIED. nice try, neo!'
        ];
        break;
      case 'hello':
      case 'hi':
        reply = ['Привет, разработчик! Готов заказать качественный код? Набери "contact".'];
        break;
      default:
        reply = [`Ошибка: Команда "${cmd}" не найдена. Наберите "help" для справки.`];
    }

    setHistory([...newHistory, ...reply.map(line => ({ type: 'output', text: line }))]);
    setInputVal('');
  };

  return (
    <section id="terminal-section" style={{
      paddingTop: 'var(--space-5)',
      paddingBottom: 'var(--space-6)',
      borderBottom: '1px solid var(--border-dim)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header animate-fade-in" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          <span className="mono-label">ИНТЕРАКТИВНОЕ ОКРУЖЕНИЕ</span>
          <h2 className="section-subtitle" style={{ fontSize: '2rem', marginTop: '8px' }}>
            Консоль разработчика
          </h2>
          <p style={{ maxWidth: '550px', fontSize: '0.9rem', margin: '8px auto 0 auto' }}>
            Попробуйте пообщаться с системой напрямую. Введите команды в терминал ниже для управления контентом.
          </p>
        </div>

        {/* Terminal Widget */}
        <div 
          onClick={handleTerminalClick}
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            backgroundColor: 'rgba(5, 5, 8, 0.95)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
            overflow: 'hidden',
            fontFamily: 'var(--font-mono)',
            cursor: 'text',
            textAlign: 'left'
          }}
          className="animate-fade-in"
        >
          {/* Top Bar */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-primary)',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} style={{ color: 'var(--text-secondary)' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                webhub@hq: /bin/bash
              </span>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', opacity: 0.8 }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', opacity: 0.8 }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', opacity: 0.8 }} />
            </div>
          </div>

          {/* Terminal Output history */}
          <div 
            ref={containerRef}
            style={{
              padding: '16px',
              height: '240px',
              overflowY: 'auto',
              fontSize: '0.75rem',
              lineHeight: 1.5,
              color: '#ffffff',
              whiteSpace: 'pre-wrap'
            }}
          >
            {history.map((line, idx) => {
              if (line.type === 'input') {
                return (
                  <div key={idx} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: 'var(--success)' }}>webhub@hq:~$</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{line.text}</span>
                  </div>
                );
              } else {
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      minHeight: line.text === '' ? '8px' : 'auto', 
                      color: line.text.startsWith('Ошибка') ? '#ef4444' : '#a1a1a6' 
                    }}
                  >
                    {line.text}
                  </div>
                );
              }
            })}
          </div>

          {/* Terminal Input Line */}
          <form 
            onSubmit={handleCommandSubmit}
            style={{
              borderTop: '1px solid var(--border-dim)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 'bold' }}>webhub@hq:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Введите команду..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                flexGrow: 1,
                padding: 0
              }}
            />
          </form>
        </div>

      </div>
    </section>
  );
}
