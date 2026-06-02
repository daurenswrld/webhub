import React from 'react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-wrapper" style={{ fontSize: '1.1rem' }}>
              <Logo className="logo-icon" />
              <span>WebHub</span>
            </div>
            <p className="footer-description">
              Инженерная экосистема для создания сложных веб-интерфейсов и цифровых продуктов.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-links-col">
              <span className="footer-links-title">Ресурсы</span>
              <a href="#services">Услуги студии</a>
              <a href="#talent-board">Биржа талантов</a>
              <a href="#contact">Форма связи</a>
            </div>
            
            <div className="footer-links-col">
              <span className="footer-links-title">Сообщество</span>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
              <a href="https://telegram.org" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Telegram
              </a>
            </div>
            
            <div className="footer-links-col">
              <span className="footer-links-title">Тех. данные</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>VERSION: v0.8.2-beta</div>
                <div>NODE: Webhub-Prod-01</div>
                <div>PING: 14ms (SSL SECURE)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {currentYear} WebHub. Разработано с соблюдением стандартов производительности.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              SSL Encrypted
            </span>
            <span>Политика конфиденциальности</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
