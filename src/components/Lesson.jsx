import React, { useState } from 'react';
import Mascot from './Mascot';

const Lesson = ({ lesson, onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const content = lesson.content;
  const currentStep = content[step];
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      onComplete(10);
    }
  };

  const handleSelectOption = (index) => {
    if (isCorrect !== null) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === currentStep.correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const renderTeachContent = () => (
    <div className="fadeIn" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '400px', width: '100%' }}>
      <Mascot size="medium" emotion={currentStep.emotion} />
      <div style={{ 
        backgroundColor: 'var(--color-surface-dim)', 
        padding: '16px', 
        borderRadius: '16px', 
        borderTopLeftRadius: '0',
        boxShadow: 'var(--shadow-sm)',
        fontSize: '1.1rem',
        color: 'var(--color-text)'
      }}>
        {currentStep.text}
      </div>
    </div>
  );

  const renderQuizContent = () => (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <h2 style={{ fontSize: '1.3rem', textAlign: 'center', lineHeight: '1.4' }}>{currentStep.question}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {currentStep.options.map((option, idx) => {
          let bgColor = 'var(--color-bg)';
          let borderColor = 'var(--color-surface-dim)';
          let textColor = 'var(--color-text)';
          let shadow = '0 2px 0 var(--color-surface-dim)';
          
          if (selectedOption === idx) {
            if (isCorrect === true) {
              bgColor = '#E6F4EA';
              borderColor = 'var(--color-secondary)';
              textColor = 'var(--color-secondary-dark)';
              shadow = '0 2px 0 var(--color-secondary)';
            } else if (isCorrect === false) {
              bgColor = '#FCE8E6';
              borderColor = 'var(--color-danger)';
              textColor = 'var(--color-danger)';
              shadow = '0 2px 0 var(--color-danger)';
            } else {
              bgColor = '#E8F0FE';
              borderColor = 'var(--color-primary)';
              textColor = 'var(--color-primary-dark)';
              shadow = '0 2px 0 var(--color-primary)';
            }
          }

          return (
            <button 
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isCorrect !== null}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                color: textColor,
                fontSize: '1rem',
                fontWeight: '500',
                cursor: isCorrect === null ? 'pointer' : 'default',
                boxShadow: shadow,
                transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
                textAlign: 'left'
              }}
            >
              {option}
            </button>
          )
        })}
      </div>

      <div style={{ minHeight: '32px', transition: 'opacity 0.3s', opacity: isCorrect !== null ? 1 : 0 }}>
        {isCorrect === true && (
          <div className="fadeIn" style={{ color: 'var(--color-secondary-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mascot size="small" emotion="celebrate" />
            Correct! Great job.
          </div>
        )}
        {isCorrect === false && (
          <div className="fadeIn" style={{ backgroundColor: '#FFF3E0', border: '1px solid #FFE0B2', borderRadius: '12px', padding: '16px', color: '#E65100', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mascot size="small" emotion="thinking" />
              Not quite! Here's a hint:
            </div>
            <div style={{ fontSize: '0.95rem', fontStyle: 'italic', opacity: 0.9 }}>
              {currentStep.hint}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'var(--color-bg)' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(16px, 4vh, 32px)' }}>
        <button 
          onClick={onCancel}
          style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
        >
          ✖
        </button>
        <div style={{ flex: 1, margin: '0 4vw', height: '10px', backgroundColor: 'var(--color-surface-dim)', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((step + 1) / content.length) * 100}%`, backgroundColor: 'var(--color-secondary)', transition: 'width 0.4s ease' }}></div>
        </div>
        <span style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>{lesson.topic}</span>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px, 5vh, 40px)' }}>
        {currentStep.text ? renderTeachContent() : renderQuizContent()}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '2px solid var(--color-surface-dim)', paddingTop: '24px', display: 'flex', justifyContent: 'center' }}>
        {!currentStep.text ? (
          isCorrect === null ? (
            <button 
              className="btn" 
              style={{ width: '100%', maxWidth: '400px' }}
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
            >
              Check Answer
            </button>
          ) : isCorrect === true ? (
            <button 
              className="btn btn-success" 
              style={{ width: '100%', maxWidth: '400px' }}
              onClick={handleNext}
            >
              Continue
            </button>
          ) : (
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--color-warning)', color: 'white', border: 'none', boxShadow: '0 4px 0 #E65100' }}
              onClick={() => { setIsCorrect(null); setSelectedOption(null); }}
            >
              Try Again
            </button>
          )
        ) : (
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', maxWidth: '400px' }}
            onClick={handleNext}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Lesson;
