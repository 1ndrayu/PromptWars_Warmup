import React from 'react';

const Map = ({ levels, currentLevel, onSelectLevel }) => {
  return (
    <div className="fadeIn" style={{ padding: 'clamp(24px, 4vh, 48px) clamp(16px, 4vw, 32px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(24px, 4vh, 40px)', flex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
        <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.4rem)', marginBottom: '1vh' }}>Your Financial Journey</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)' }}>Follow the path to master your money!</p>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 6vh, 48px)', alignItems: 'center' }}>
        <div style={{
          position: 'absolute',
          top: '2vh',
          bottom: '2vh',
          width: '6px',
          backgroundColor: 'var(--color-surface-dim)',
          zIndex: 0,
          borderRadius: '4px'
        }}></div>

        {levels.map((level, index) => {
          const isUnlocked = level.id <= currentLevel;
          const isCurrent = level.id === currentLevel;
          const isCompleted = level.id < currentLevel;
          
          let offset = 0;
          if (index % 3 === 1) offset = -50;
          else if (index % 3 === 2) offset = 50;

          // Determine icon scale and style based on section (Learn, Quiz, Case)
          const nodeSize = isCurrent ? 84 : 76;
          let emoji = '📖';
          if (level.type === 'quiz') emoji = '❓';
          if (level.type === 'case') emoji = '🧠';

          return (
            <div 
              key={level.id}
              style={{
                zIndex: 1,
                transform: `translateX(${offset}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                opacity: isUnlocked ? 1 : 0.6,
                pointerEvents: isUnlocked ? 'auto' : 'none',
                transition: 'opacity 0.4s ease'
              }}
            >
              <button
                onClick={() => onSelectLevel(level)}
                disabled={!isUnlocked}
                style={{
                  width: `${nodeSize}px`,
                  height: `${nodeSize}px`,
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: isCompleted ? 'var(--color-secondary)' : (isCurrent ? 'var(--color-primary)' : 'var(--color-surface-dim)'),
                  color: isUnlocked ? 'white' : 'var(--color-text-secondary)',
                  fontSize: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: isCompleted ? '0 6px 0 var(--color-secondary-dark)' : (isCurrent ? '0 6px 0 var(--color-primary-dark)' : '0 6px 0 #E8EAED'),
                  cursor: isUnlocked ? 'pointer' : 'default',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease, background-color 0.3s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  if(isUnlocked) e.currentTarget.style.transform = 'translateY(2px)';
                  if(isUnlocked) e.currentTarget.style.boxShadow = isCompleted ? '0 4px 0 var(--color-secondary-dark)' : '0 4px 0 var(--color-primary-dark)';
                }}
                onMouseOut={(e) => {
                  if(isUnlocked) e.currentTarget.style.transform = 'translateY(0)';
                  if(isUnlocked) e.currentTarget.style.boxShadow = isCompleted ? '0 6px 0 var(--color-secondary-dark)' : '0 6px 0 var(--color-primary-dark)';
                }}
                onMouseDown={(e) => {
                  if(isUnlocked) e.currentTarget.style.transform = 'translateY(6px)';
                  if(isUnlocked) e.currentTarget.style.boxShadow = '0 0px 0 transparent';
                }}
                onMouseUp={(e) => {
                  if(isUnlocked) e.currentTarget.style.transform = 'translateY(2px)';
                  if(isUnlocked) e.currentTarget.style.boxShadow = isCompleted ? '0 4px 0 var(--color-secondary-dark)' : '0 4px 0 var(--color-primary-dark)';
                }}
              >
                {isCompleted ? '⭐' : emoji}
              </button>
              
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '4px 12px',
                borderRadius: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                fontSize: '0.85rem',
                fontWeight: '600',
                opacity: isCurrent || isCompleted ? 1 : 0.7
              }}>
                {level.topic}: {level.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;
