import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Mail, Terminal, ArrowUp, Send, Check } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show/hide "Scroll to Top" action
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTerminalScroll = () => {
    const el = document.getElementById('terminal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Find the terminal input and focus it
      setTimeout(() => {
        const input = el.querySelector('input');
        if (input) input.focus();
      }, 800);
    }
    setIsOpen(false);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleFormScroll = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000,
      fontFamily: 'var(--font-mono)'
    }}>
      {/* Expanded Quick Action Menu */}
      {isOpen && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          marginBottom: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '210px',
          animation: 'fadeIn 0.2s ease-out',
          textAlign: 'left'
        }}>
          {/* Header Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-dim)',
            paddingBottom: '6px',
            marginBottom: '4px',
            fontSize: '0.55rem',
            color: 'var(--text-muted)'
          }}>
            <span>LEAD ROUTING BOT</span>
            <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span className="pulse-indicator" style={{ width: '4px', height: '4px' }} /> ONLINE
            </span>
          </div>

          {/* Action: Telegram */}
          <a
            href="https://t.me/webhub_dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 8px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.7rem',
              borderRadius: '4px',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Send size={12} style={{ color: '#0088cc' }} />
            <span>Написать в Telegram</span>
          </a>

          {/* Action: Phone */}
          <a
            href="tel:+77777777777"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 8px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.7rem',
              borderRadius: '4px',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Phone size={12} style={{ color: 'var(--success)' }} />
            <span>Позвонить студии</span>
          </a>

          {/* Action: Request Callback (Form) */}
          <button
            onClick={handleFormScroll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 8px',
              color: 'var(--text-primary)',
              border: 'none',
              background: 'transparent',
              fontSize: '0.7rem',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Mail size={12} style={{ color: '#a855f7' }} />
            <span>Оставить заявку</span>
          </button>

          {/* Action: CLI Console */}
          <button
            onClick={handleTerminalScroll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 8px',
              color: 'var(--text-primary)',
              border: 'none',
              background: 'transparent',
              fontSize: '0.7rem',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Terminal size={12} style={{ color: 'var(--text-secondary)' }} />
            <span>Терминал управления</span>
          </button>

          {/* Action: Scroll Top */}
          {showScrollTop && (
            <button
              onClick={handleScrollTop}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                color: 'var(--text-secondary)',
                border: 'none',
                background: 'transparent',
                fontSize: '0.7rem',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                borderTop: '1px solid var(--border-dim)',
                marginTop: '4px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ArrowUp size={12} />
              <span>Наверх</span>
            </button>
          )}
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--text-primary)',
          color: 'var(--bg-primary)',
          border: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 0 12px rgba(255,255,255,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.5), 0 0 20px var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4), 0 0 12px rgba(255,255,255,0.15)';
        }}
      >
        <MessageSquare size={20} />
        {/* Subtle Pulse ring */}
        <span style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          borderRadius: '50%',
          border: '1px solid var(--text-primary)',
          opacity: 0.4,
          pointerEvents: 'none'
        }} className="pulse-animation" />
      </button>
    </div>
  );
}
