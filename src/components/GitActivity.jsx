import React, { useState, useEffect } from 'react';
import { GitCommit, GitBranch, GitPullRequest, Award, Activity } from 'lucide-react';

export default function GitActivity() {
  const [livePushes, setLivePushes] = useState([
    { id: 1, dev: 'alex_dev', repo: 'webhub-core/api-gateway', branch: 'main', msg: 'opt: cache lookup speedup via Redis pipelines', time: '2 мин назад' },
    { id: 2, dev: 'dmitry_qa', repo: 'webhub-core/erp-ledger', branch: 'staging', msg: 'test: added integration coverage for wire transfers', time: '12 мин назад' },
    { id: 3, dev: 'sergey_arch', repo: 'webhub-core/k8s-infra', branch: 'main', msg: 'deploy: cluster autoscaler limit adjustments', time: '40 мин назад' }
  ]);

  // Generate mock contribution grid data (53 weeks * 7 days)
  const generateGrid = () => {
    const grid = [];
    const seed = [0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 5, 8, 12]; // activity density seed
    
    // 53 columns (weeks), 7 rows (days)
    for (let day = 0; day < 7; day++) {
      const row = [];
      for (let week = 0; week < 50; week++) {
        // Randomly choose activity count from seed
        const commits = seed[Math.floor(Math.random() * seed.length)];
        row.push(commits);
      }
      grid.push(row);
    }
    return grid;
  };

  const [gridData] = useState(generateGrid());
  const [hoveredCell, setHoveredCell] = useState(null);

  // Simulate incoming Git Push notifications in real-time
  useEffect(() => {
    const developers = ['alex_dev', 'dmitry_qa', 'sergey_arch', 'mikhail_frontend', 'anna_ux'];
    const repos = ['webhub-core/api-gateway', 'webhub-core/erp-ledger', 'webhub-core/k8s-infra', 'webhub-core/next-portal', 'webhub-core/crm-websockets'];
    const commits = [
      'fix: memory leak in socket connection pool',
      'refactor: extracted shared pricing math to core utils',
      'docs: api endpoint schema contract updates',
      'feat: analytics export to CSV/JSON format',
      'opt: lazy loading for offscreen 3D models',
      'security: token validation logic refinement'
    ];

    const pushInterval = setInterval(() => {
      const dev = developers[Math.floor(Math.random() * developers.length)];
      const repo = repos[Math.floor(Math.random() * repos.length)];
      const msg = commits[Math.floor(Math.random() * commits.length)];
      
      const newPush = {
        id: Date.now(),
        dev,
        repo,
        branch: Math.random() > 0.3 ? 'main' : 'dev-feature',
        msg,
        time: 'только что'
      };

      setLivePushes(prev => [newPush, ...prev.slice(0, 2)]);
    }, 4500);

    return () => clearInterval(pushInterval);
  }, []);

  // Determine cell color based on commit count
  const getCellColor = (count) => {
    if (count === 0) return 'var(--border-primary)';
    if (count <= 2) return 'rgba(46, 160, 67, 0.3)';   // light green
    if (count <= 5) return 'rgba(46, 160, 67, 0.6)';   // medium green
    if (count <= 9) return 'rgba(46, 160, 67, 0.85)';  // green
    return '#39d353';                                  // bright neon green
  };

  return (
    <section id="git-activity-section" style={{
      paddingTop: 'var(--space-6)',
      paddingBottom: 'var(--space-6)',
      borderBottom: '1px solid var(--border-dim)'
    }}>
      <div className="container">
        
        {/* Title */}
        <div className="section-header animate-fade-in" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          <span className="mono-label">ИНЖЕНЕРНАЯ АКТИВНОСТЬ // LIVE METRICS</span>
          <h2 className="section-subtitle" style={{ fontSize: '2rem', marginTop: '8px' }}>
            Наш пульс разработки
          </h2>
          <p style={{ maxWidth: '550px', fontSize: '0.9rem', margin: '8px auto 0 auto' }}>
            Мы пишем чистый, поддерживаемый код каждый божий день. Никакой лени и просроченных релизов.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="git-activity-layout">
          
          {/* Left panel - GitHub Heatmap */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            
            {/* Header info */}
            <div className="git-panel-header">
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                  <GitCommit size={16} style={{ color: 'var(--success)' }} />
                  График коммитов в ядро WebHub
                </h3>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  4,912 коммитов за последние 12 месяцев
                </span>
              </div>
              <div className="git-badge">
                ACTIVE COMMITTERS: 5
              </div>
            </div>

            {/* Heatmap Grid container */}
            <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
              <div style={{
                display: 'grid',
                gridTemplateRows: 'repeat(7, 10px)',
                gridAutoFlow: 'column',
                gap: '3px',
                justifyContent: 'start',
                minWidth: '580px'
              }}>
                {gridData.map((row, rIdx) => 
                  row.map((val, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      onMouseEnter={() => setHoveredCell({ val, week: cIdx + 1, day: rIdx + 1 })}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: getCellColor(val),
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'transform 0.1s ease',
                        transform: hoveredCell?.week === cIdx + 1 && hoveredCell?.day === rIdx + 1 ? 'scale(1.3)' : 'scale(1)'
                      }}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Legend / Tooltip */}
            <div className="git-panel-legend">
              <div>
                {hoveredCell ? (
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)', fontWeight: 'bold' }}>
                    Неделя {hoveredCell.week}, День {hoveredCell.day}: {hoveredCell.val === 0 ? 'нет коммитов' : `${hoveredCell.val} коммитов`}
                  </span>
                ) : (
                  <span>Наведите курсор на ячейку для просмотра деталей</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>Less</span>
                <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--border-primary)', borderRadius: '1px' }} />
                <div style={{ width: '8px', height: '8px', backgroundColor: 'rgba(46, 160, 67, 0.3)', borderRadius: '1px' }} />
                <div style={{ width: '8px', height: '8px', backgroundColor: 'rgba(46, 160, 67, 0.6)', borderRadius: '1px' }} />
                <div style={{ width: '8px', height: '8px', backgroundColor: 'rgba(46, 160, 67, 0.85)', borderRadius: '1px' }} />
                <div style={{ width: '8px', height: '8px', backgroundColor: '#39d353', borderRadius: '1px' }} />
                <span>More</span>
              </div>
            </div>

          </div>

          {/* Right panel - Live Git Activity Log Ticker */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            
            {/* Header info */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Activity size={16} style={{ color: 'var(--success)' }} />
                Real-time Git Activity Log
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Прямая трансляция коммитов нашей команды из приватного GitLab/GitHub окружения.
              </p>
            </div>

            {/* List of events */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              flexGrow: 1,
              justifyContent: 'start'
            }}>
              {livePushes.map((push) => (
                <div key={push.id} style={{
                  borderLeft: '2px solid var(--success)',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '8px 10px',
                  borderRadius: '0 4px 4px 0',
                  animation: 'fadeIn 0.4s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{push.dev}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{push.time}</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)', marginBottom: '2px' }}>
                    push to <span style={{ color: 'var(--text-secondary)' }}>{push.repo}</span> on <span style={{ color: 'var(--text-muted)' }}>[{push.branch}]</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{push.msg}"
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics Footer */}
            <div className="git-metrics-footer" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              borderTop: '1px solid var(--border-dim)',
              paddingTop: '12px',
              marginTop: '12px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>99.98%</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>CI/CD BUILD SUCCESS</div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>14.2</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>AVG COMMITS / DAY</div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>0</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>LEGACY BUGS IN MAIN</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
