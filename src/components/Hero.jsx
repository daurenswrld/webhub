import React, { useState } from 'react';

export default function Hero() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePos, setMousePos] = useState(null);

  // Generate grid points for the SVG tech decoration
  const columns = 5;
  const rows = 5;
  const size = 300;
  const padding = 20;
  const stepX = (size - padding * 2) / (columns - 1);
  const stepY = (size - padding * 2) / (rows - 1);

  const staticPoints = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      staticPoints.push({
        id: `${r}-${c}`,
        x: padding + c * stepX,
        y: padding + r * stepY,
        r: r,
        c: c
      });
    }
  }

  // Calculate dynamic point positions based on mouse coordinate
  const dynamicPoints = staticPoints.map((pt) => {
    if (!mousePos) return { ...pt, dx: pt.x, dy: pt.y, dist: Infinity };
    const dx = mousePos.x - pt.x;
    const dy = mousePos.y - pt.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Magnetic repulsion range (pushes nodes slightly away from cursor)
    const maxRadius = 90;
    if (dist < maxRadius) {
      const force = (1 - dist / maxRadius) * 12; // shift up to 12px
      const angle = Math.atan2(dy, dx);
      return {
        ...pt,
        dx: pt.x - Math.cos(angle) * force,
        dy: pt.y - Math.sin(angle) * force,
        dist
      };
    }
    return { ...pt, dx: pt.x, dy: pt.y, dist };
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * size;
    const y = ((e.clientY - rect.top) / rect.height) * size;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredPoint(null);
  };

  // Find 3 closest points to draw connection lines
  const activeConnections = mousePos
    ? [...dynamicPoints]
        .filter((pt) => pt.dist < 75)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3)
    : [];

  return (
    <section className="hero-section">
      <div className="container hero-layout">
        <div className="hero-content animate-fade-in">
          <div className="hero-tagline">
            <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--text-primary)', borderRadius: '50%' }}></span>
            <span>SYSTEM // STAGE 01: DEVELOPMENT STUDIO</span>
          </div>
          <h1 className="hero-title">
            Инженерия <br />
            высокого разрешения
          </h1>
          <p className="hero-description">
            Мы проектируем и разрабатываем надежные веб-приложения, распределенные системы и структурированные интерфейсы. Прямо сейчас мы работаем как закрытая студия разработки; следующий этап — запуск открытой экосистемы технологических проектов.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Оставить заявку</a>
            <a href="#services" className="btn btn-secondary">Наши услуги</a>
          </div>
        </div>

        <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <svg 
            className="tech-grid-art" 
            viewBox={`0 0 ${size} ${size}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'none' }}
          >
            {/* Draw dynamic grid lines */}
            {Array.from({ length: rows }).map((_, r) => (
              Array.from({ length: columns - 1 }).map((_, c) => {
                const p1 = dynamicPoints[r * columns + c];
                const p2 = dynamicPoints[r * columns + (c + 1)];
                return (
                  <line
                    key={`h-${r}-${c}`}
                    x1={p1.dx}
                    y1={p1.dy}
                    x2={p2.dx}
                    y2={p2.dy}
                    stroke="var(--hero-grid-line)"
                    strokeWidth="1"
                    style={{ transition: mousePos ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                );
              })
            ))}
            {Array.from({ length: columns }).map((_, c) => (
              Array.from({ length: rows - 1 }).map((_, r) => {
                const p1 = dynamicPoints[r * columns + c];
                const p2 = dynamicPoints[(r + 1) * columns + c];
                return (
                  <line
                    key={`v-${r}-${c}`}
                    x1={p1.dx}
                    y1={p1.dy}
                    x2={p2.dx}
                    y2={p2.dy}
                    stroke="var(--hero-grid-line)"
                    strokeWidth="1"
                    style={{ transition: mousePos ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                );
              })
            ))}

            {/* Dynamic decorative vector shape */}
            {(() => {
              const p1 = dynamicPoints[1 * columns + 1];
              const p2 = dynamicPoints[2 * columns + 3];
              const p3 = dynamicPoints[4 * columns + 2];
              return (
                <path
                  d={`M ${p1.dx} ${p1.dy} L ${p2.dx} ${p2.dy} L ${p3.dx} ${p3.dy}`}
                  fill="none"
                  stroke="var(--hero-grid-dashed)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  style={{ transition: mousePos ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              );
            })()}

            {/* Holographic connections to cursor */}
            {mousePos && activeConnections.map((conn) => (
              <line
                key={`conn-${conn.id}`}
                x1={mousePos.x}
                y1={mousePos.y}
                x2={conn.dx}
                y2={conn.dy}
                stroke="var(--success)"
                strokeWidth="0.75"
                strokeDasharray="2 2"
                opacity={1 - conn.dist / 75}
                style={{ transition: 'none' }}
              />
            ))}

            {/* Grid nodes */}
            {dynamicPoints.map((pt) => {
              const isHovered = hoveredPoint === pt.id;
              const isNearby = mousePos && pt.dist < 50;
              let radius = 2;
              if (isHovered) radius = 5;
              else if (isNearby) radius = 3.5;

              return (
                <circle
                  key={pt.id}
                  cx={pt.dx}
                  cy={pt.dy}
                  r={radius}
                  fill={isHovered ? 'var(--text-primary)' : isNearby ? 'var(--success)' : 'var(--hero-grid-node)'}
                  style={{
                    transition: mousePos ? 'r 0.15s ease-out, fill 0.15s ease-out' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={() => setHoveredPoint(pt.id)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}

            {/* Simulated cursor dot when inside visual */}
            {mousePos && (
              <circle
                cx={mousePos.x}
                cy={mousePos.y}
                r="3"
                fill="var(--success)"
                style={{ transition: 'none' }}
              />
            )}

            {/* Interactive metadata display */}
            {mousePos ? (
              <g transform={`translate(${padding + 5}, ${size - padding + 10})`}>
                <rect
                  x="0"
                  y="-16"
                  width="135"
                  height="20"
                  fill="var(--bg-secondary)"
                  stroke="var(--border-primary)"
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x="6"
                  y="-2"
                  fill="var(--text-secondary)"
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                >
                  X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)} // SYS_ACTIVE
                </text>
              </g>
            ) : hoveredPoint ? (
              <g transform={`translate(${padding + 5}, ${size - padding + 10})`}>
                <rect
                  x="0"
                  y="-16"
                  width="120"
                  height="20"
                  fill="var(--bg-secondary)"
                  stroke="var(--border-primary)"
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x="6"
                  y="-2"
                  fill="var(--text-secondary)"
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                >
                  NODE_ID: {hoveredPoint} // C:{hoveredPoint.split('-')[1]} R:{hoveredPoint.split('-')[0]}
                </text>
              </g>
            ) : null}
          </svg>
        </div>
      </div>
    </section>
  );
}
