import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [selectedService, setSelectedService] = useState('development');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitRoute, setSubmitRoute] = useState('simulation'); // 'simulation' | 'server'
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    { id: 'development', label: 'Разработка веб-приложений' },
    { id: 'architecture', label: 'Проектирование систем' },
    { id: 'design', label: 'UI/UX дизайн-системы' },
    { id: 'devops', label: 'DevOps и масштабирование' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const serviceLabel = services.find(s => s.id === selectedService)?.label || selectedService;

    // Try secure server-side backend routing
    try {
      const backendUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/contact' 
        : '/api/contact';

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
          service: serviceLabel
        }),
      });

      if (response.ok) {
        setSubmitRoute('server');
        setSubmitStatus('success');
        clearForm();
      } else {
        // If the backend exists but returned an error (e.g. no token configured in .env),
        // fallback to simulation mode and print a console warning.
        const errData = await response.json().catch(() => ({}));
        console.warn('Backend proxy error or not configured, running simulation fallback:', errData.error || 'Server error');
        runSimulation();
      }
    } catch (err) {
      // Backend server is not running (e.g. static dev build)
      console.warn('Backend server not running, falling back to client-side simulation.');
      runSimulation();
    } finally {
      setIsSubmitting(false);
    }
  };

  const runSimulation = () => {
    setSubmitRoute('simulation');
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      clearForm();
    }, 1200);
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setSelectedService('development');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-layout">
        <div className="contact-info-panel animate-fade-in">
          <span className="mono-label">СВЯЗЬ С НАМИ</span>
          <h2 style={{ marginTop: '8px', fontSize: '2.5rem' }}>Давайте создадим что-то выдающееся</h2>
          <p>
            Мы проектируем и разрабатываем цифровые интерфейсы и веб-платформы с упором на скорость, отказоустойчивость и безукоризненный минималистичный дизайн.
          </p>
          <p>
            Заполните форму, и мы свяжемся с вами в течение нескольких часов для детального обсуждения ваших задач.
          </p>

          <div style={{ marginTop: 'var(--space-3)' }}>
            <div className="contact-method">
              <div className="contact-method-details">
                <h4 style={{ color: 'var(--text-primary)' }}>Время ответа</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Обычно менее 4 часов в рабочие дни.</p>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-method-details">
                <h4 style={{ color: 'var(--text-primary)' }}>Прямой контакт</h4>
                <p style={{ color: 'var(--text-secondary)' }}>projects@webhub.tech</p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-wrapper animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {submitStatus === 'success' ? (
            <div className="form-success-card">
              <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" stroke="var(--success)" strokeWidth="2" />
                <path d="M14 27l8 8 16-16" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '500', color: 'var(--text-primary)' }}>Заявка принята</h3>
              
              {submitRoute === 'server' ? (
                <p style={{ maxWidth: '380px' }}>
                  Заявка успешно отправлена владельцу WebHub. Мы свяжемся с вами в ближайшее время!
                </p>
              ) : (
                <p style={{ maxWidth: '380px' }}>
                  Сообщение успешно отправлено (симуляция). Для реальной отправки настройте переменные в файле <code>.env</code> и запустите сервер.
                </p>
              )}

              <button className="btn btn-secondary" onClick={() => setSubmitStatus(null)} style={{ marginTop: 'var(--space-2)' }}>
                Отправить еще одно сообщение
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name">Имя *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="Алихан"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="alex@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company">Компания</label>
                <input
                  id="company"
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Название компании"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Интересующая услуга</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setSelectedService(service.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: selectedService === service.id ? 'var(--text-primary)' : 'var(--border-primary)',
                        backgroundColor: selectedService === service.id ? 'var(--text-primary)' : 'transparent',
                        color: selectedService === service.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Сообщение *</label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  disabled={isSubmitting}
                  placeholder="Расскажите о вашем проекте..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--error)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  <AlertCircle size={16} /> {errorMessage}
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%' }}>
                {isSubmitting ? (
                  <>
                    <div className="spinner" /> Отправка...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Отправить заявку
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
