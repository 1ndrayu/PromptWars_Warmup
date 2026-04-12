import React, { useState } from 'react';
import Map from './components/Map';
import Lesson from './components/Lesson';
import Mascot from './components/Mascot';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [activeLesson, setActiveLesson] = useState(null);
  const [coins, setCoins] = useState(0);
  
  const levels = [
    // Topic: Savings
    { 
      id: 1, topic: 'Savings', title: 'Learn', type: 'teach',
      content: [
        { text: "Welcome! Saving is simply putting money aside for future use and emergencies.", emotion: "happy" },
        { text: "A great strategy is 'Pay Yourself First'. This means directing a portion of your income straight into savings before you have a chance to spend it.", emotion: "thinking" }
      ]
    },
    { 
      id: 2, topic: 'Savings', title: 'Test', type: 'quiz',
      content: [
        {
          question: "What does 'Pay Yourself First' mean?",
          options: ["Buy yourself a luxury item on payday.", "Put money into savings immediately before any spending.", "Pay all your bills first, then save whatever is left."],
          correct: 1,
          hint: "Think about making your savings a priority, treating it like the very first bill you must pay."
        }
      ]
    },
    { 
      id: 3, topic: 'Savings', title: 'Case Study', type: 'case',
      content: [
        { text: "Real World Case: You received a $1,000 paycheck. You really want a new $500 smartwatch, but you currently have $0 in emergency savings.", emotion: "thinking" },
        {
          question: "What is the most financially secure approach?",
          options: ["Buy the watch, then save the remaining $500.", "Save $200 first, and wait a few paychecks to afford the watch.", "Take a loan to buy the watch and keep the $1,000."],
          correct: 1,
          hint: "Emergencies can happen anytime! It's safer to have savings building up instead of spending half your cash immediately."
        }
      ]
    },
    
    // Topic: Budgeting
    { 
      id: 4, topic: 'Budgeting', title: 'Learn', type: 'teach',
      content: [
        { text: "Budgeting is making a plan for your money. A popular method is the 50/30/20 rule.", emotion: "happy" },
        { text: "50% for Needs, 30% for Wants, and 20% for Savings or Debt repayment. It keeps things balanced!", emotion: "happy" }
      ]
    },
    { 
      id: 5, topic: 'Budgeting', title: 'Test', type: 'quiz',
      content: [
        {
          question: "According to the 50/30/20 rule, what does the 20% represent?",
          options: ["Wants", "Needs", "Savings and Debt repayment"],
          correct: 2,
          hint: "Needs takes the largest portion (50) and Wants takes the second (30)."
        }
      ]
    },
    { 
      id: 6, topic: 'Budgeting', title: 'Case Study', type: 'case',
      content: [
        { text: "Real World Case: Your monthly income is $2,000. Your rent and groceries cost $1,200. You want to spend $500 on dining out.", emotion: "thinking" },
        {
          question: "How does this fit into the 50/30/20 rule?",
          options: ["It fits perfectly.", "Needs are too high (60%), making it hard to save effectively.", "Wants are too high, they should be $200 max."],
          correct: 1,
          hint: "Calculate 50% of 2,000. That's $1,000. So $1,200 for rent and groceries exceeds the 50% Needs limit."
        }
      ]
    },
    
    // Topic: Investing
    { 
      id: 7, topic: 'Investing', title: 'Learn', type: 'teach',
      content: [
        { text: "Investing is using your money to buy assets that grow in value over time, like stocks or bonds.", emotion: "happy" },
        { text: "The key to investing is 'compound interest'—earning returns on your returns! Time is your best friend here.", emotion: "celebrate" }
      ]
    },
    { 
      id: 8, topic: 'Investing', title: 'Test', type: 'quiz',
      content: [
        {
          question: "What is the primary goal of investing?",
          options: ["To hide money under a mattress", "To let money grow over time to build wealth", "To spend it immediately on wants"],
          correct: 1,
          hint: "Think about the magic of compound interest and building something for your future."
        }
      ]
    },
    { 
      id: 9, topic: 'Investing', title: 'Case Study', type: 'case',
      content: [
        { text: "Real World Case: You have $1,000 saved securely in an emergency fund, and an extra $500. You want it to grow for your retirement in 30 years.", emotion: "thinking" },
        {
          question: "Where should you put the $500?",
          options: ["A checking account with 0% interest.", "A diversified stock market index fund.", "Spend it since retirement is far away."],
          correct: 1,
          hint: "For long-term goals like retirement (30 years!), you want an option that Historically outpaces inflation."
        }
      ]
    },

    // Topic: Advising Others
    { 
      id: 10, topic: 'Advising', title: 'Grandma Betty', type: 'case',
      content: [
        { text: "Grandma Betty wants to protect her retirement savings, but a stranger called asking for a money transfer to 'fix her computer'.", emotion: "sad" },
        {
          question: "What should she do?",
          options: ["Hang up immediately and do not send money.", "Send the money to fix the computer safely.", "Give them her bank password so they can check."],
          correct: 0,
          hint: "Never give out money or bank access to unverified callers. It's almost always a scam."
        }
      ]
    },
    { 
      id: 11, topic: 'Advising', title: 'Little Timmy', type: 'case',
      content: [
        { text: "Little Timmy gets $5 a week for allowance. He wants to buy a $20 toy, but he also loves buying $1 candy every day.", emotion: "thinking" },
        {
          question: "How can he get the toy?",
          options: ["Beg his parents for the $20.", "Skip the candy for 4 weeks and save the $5 allowance.", "Buy the candy and hope the toy gets cheaper."],
          correct: 1,
          hint: "To reach a savings goal, sometimes you have to sacrifice smaller daily wants."
        }
      ]
    },
    { 
      id: 12, topic: 'Advising', title: 'Parent Paul', type: 'case',
      content: [
        { text: "Paul just got a $2,000 bonus. He has $1,500 in credit card debt with 20% interest and wants a vacation.", emotion: "thinking" },
        {
          question: "What is his best financial move?",
          options: ["Go on a $2,000 vacation and ignore the debt.", "Pay off the $1,500 debt and use the remaining $500 for a mini-vacation.", "Put it all in a checking account and pay the minimum on the credit card."],
          correct: 1,
          hint: "High-interest debt grows very fast! It is usually the best decision to eliminate it ASAP."
        }
      ]
    }
  ];

  const handleStartLesson = (level) => {
    setActiveLesson(level);
  };

  const handleCompleteLesson = (reward) => {
    setCoins(coins + reward);
    if (activeLesson.id === currentLevel) {
      setCurrentLevel(currentLevel + 1);
    }
    setActiveLesson(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <Mascot size="small" emotion="happy" />
          <span>Cent</span>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span>⭐</span> {currentLevel - 1}
          </div>
          <div className="stat">
            <span>🪙</span> {coins}
          </div>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeLesson ? (
          <Lesson 
            lesson={activeLesson} 
            onComplete={handleCompleteLesson} 
            onCancel={() => setActiveLesson(null)} 
          />
        ) : (
          <Map 
            levels={levels} 
            currentLevel={currentLevel} 
            onSelectLevel={handleStartLesson} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
