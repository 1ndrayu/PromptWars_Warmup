export const topicsData = {
  savings: {
    id: 'savings',
    title: 'Savings & Liquidity Strategy',
    description: 'Establishing financial resilience through targeted capital allocation.',
    matrix: [
      { id: 'liq', title: 'Liquidity Standard', content: 'Savings is not just leftover money; it is capital designed to absorb shocks and preserve value.', icon: '💧' },
      { id: 'heur', title: 'Buffer Heuristics', content: 'Divert cash flow to a defense buffer before any discretionary consumption occurs.', icon: '🛡️' },
      { id: 'drag', title: 'Inflation Erosion', content: 'Balance cash for safety without losing purchasing power to systemic inflation.', icon: '🔥' },
      { id: 'opp', title: 'Opportunity Cost', content: 'Excessive savings without a goal may drag your growth. Aim for a 3-6 month margin.', icon: '⚖️' }
    ],
    assessment: {
      type: 'case',
      title: 'Global Allocation Challenge',
      scenario: 'Alex has a $1,500 surplus. He has $3,000 debt at 22% APR, but ZERO emergency reserves. A car repair is looming.',
      question: 'What is the most optimal immediate deployment of capital?',
      options: [
        'Pay off $1,500 of the 22% APR debt.',
        'Deposit $1,500 into a liquid Savings account.',
        'Down payment on a newer car.',
        'Split 50/50 between debt and stocks.'
      ],
      correctAnswer: 'Deposit $1,500 into a liquid Savings account.',
      feedback: { reasoning: 'Without a liquid buffer, the car repair will force Alex into more debt. Stability precedes growth.' }
    }
  },
  budgeting: {
    id: 'budgeting',
    title: 'Budgeting & Optimization',
    description: 'Microeconomic alignment of cash outflows with long-term utility.',
    matrix: [
      { id: 'fore', title: 'Proactive Forecast', content: 'Budgeting assigns a purpose to every dollar before it is spent. It is control, not restriction.', icon: '📊' },
      { id: 'h60', title: 'The 50/30/20 Rule', content: '50% Needs, 30% Wants, 20% Wealth. Breaching the 50% Needs ceiling risks fragility.', icon: '🍰' },
      { id: 'util', title: 'Marginal Utility', content: 'Weigh every expense against its utility. Subscription leaks often drain long-term wealth.', icon: '🔍' },
      { id: 'acc', title: 'Behavioral Accounting', content: 'Segment money into buckets to prevent capital meant for liabilities from being consumed.', icon: '🧠' }
    ],
    assessment: {
      type: 'case',
      title: 'The Margin Squeeze',
      scenario: 'Sarah earns $4,000. Overhead is $2,600 (65%). She saves $800. She wants a $600/mo club membership.',
      question: 'How does the $600 membership impact her stability?',
      options: [
        'It is perfectly affordable within "Wants".',
        'It is a high-yield investment in herself.',
        'It collapses her margin for error to zero.',
        'Halve the rent to make it fit.'
      ],
      correctAnswer: 'It collapses her margin for error to zero.',
      feedback: { reasoning: "Her overhead is already 65%. Adding $600 in spending leaves zero surplus for emergencies." }
    }
  },
  investing: {
    id: 'investing',
    title: 'Investing & Allocation',
    description: 'Expanding purchasing power against macroeconomic inflation.',
    matrix: [
      { id: 'comp', title: 'The Yield Engine', content: 'Compound interest generates subsequent returns. Time in the market is your primary driver.', icon: '⚙️' },
      { id: 'alloc', title: 'Asset Allocation', content: 'The mix of Equities, Bonds, and Cash determines your risk. It drives ~90% of performance.', icon: '🥧' },
      { id: 'hedge', title: 'Inflation Hedge', content: 'Convert depreciating currency into appreciating assets to combat systemic buy-power loss.', icon: '🛡️' },
      { id: 'time', title: 'Time Horizons', content: 'Short-term needs stay in cash; long-term wealth stays in equities for growth.', icon: '⏳' }
    ],
    assessment: {
      type: 'case',
      title: 'Portfolio Time Horizons',
      scenario: 'A 60-year old needs $50k in 2 years. A 25-year old has $10k for retirement in 40 years.',
      question: 'What is the optimal allocation for both?',
      options: [
        'Both should invest in the S&P 500.',
        '60-year old in cash; 25-year old in equities.',
        '25-year old in bonds; 60-year old in equities.',
        'Strict 60/40 split for both.'
      ],
      correctAnswer: '60-year old in cash; 25-year old in equities.',
      feedback: { reasoning: 'Short-term needs cannot tolerate volatility. Long-term goals require equity exposure.' }
    }
  },
  challenges: {
    id: 'challenges',
    title: 'Mastery Challenges',
    description: 'Synthesizing knowledge to navigate high-stakes financial life events.',
    steps: [
      {
        id: 'c1',
        type: 'challenge',
        profile: { name: 'Leo', initials: 'LZ', age: 21, role: 'CS Student', income: '$1,200', savings: '$400', debt: '$12k', goal: 'Debt-Neutral' },
        scenario: 'Leo wins a $2,000 grant. No emergency fund. Debt interest is deferred, but his laptop just died.',
        question: 'What is the most balanced strategic move?',
        options: [
          { 
            label: 'The Foundation', 
            content: 'Buy an $800 laptop, save the $1,200 as an emergency buffer.', 
            stats: { stability: 50, growth: 5, efficiency: 15 }, 
            explanation: 'Prioritizes immediate technical needs while establishing a baseline safety net.' 
          },
          { 
            label: 'The Acceleration', 
            content: 'Buy an $800 laptop, invest $1,200 in an index fund for early growth.', 
            stats: { stability: 10, growth: 40, efficiency: 5 }, 
            explanation: 'Aggressive growth strategy that leaves Leo vulnerable to the next crisis.' 
          },
          { 
            label: 'The Debt-Crusher', 
            content: 'Repair old laptop for $300, put $1,700 toward student loan principal.', 
            stats: { stability: 5, growth: 20, efficiency: 30 }, 
            explanation: 'Noble but risky. A repair failure would leave him with zero capital and no tool.' 
          }
        ]
      },
      {
        id: 'c2',
        type: 'challenge',
        profile: { name: 'Maya', initials: 'MY', age: 29, role: 'Senior Designer', income: '$7,500', savings: '$25k', debt: '$0', goal: 'Early Retirement' },
        scenario: 'Maya receives a $40,000 bonus. Maxing retirement. Living costs are $4,000/mo.',
        question: 'How should Maya deploy this $40k windfall for FIRE?',
        options: [
          { 
            label: 'Liquidity Sabbatical', 
            content: 'Keep $40k in cash to extend career runway to 12 months for agency work.', 
            stats: { stability: 80, growth: 10, efficiency: 20 }, 
            explanation: 'Maximizes career mobility and defensive buffer at the cost of market growth.' 
          },
          { 
            label: 'Compound Maximus', 
            content: 'Invest $40k into a taxable brokerage account for long-term compounding.', 
            stats: { stability: 15, growth: 75, efficiency: 10 }, 
            explanation: 'The mathematically superior route for compounding toward early retirement.' 
          },
          { 
            label: 'Real Estate Pivot', 
            content: 'Use $40k as a down payment on a rental property to build cash flow.', 
            stats: { stability: 30, growth: 45, efficiency: 55 }, 
            explanation: 'Balances growth with tangible cash flow, adding income diversification.' 
          }
        ]
      },
      {
        id: 'c3',
        type: 'challenge',
        profile: { name: 'The Chens', initials: 'TC', age: 42, role: 'Dual-Income', income: '$12k', savings: '$50k', debt: 'Mortgage', goal: 'College Funds' },
        scenario: 'A health emergency cost $15,000. Child is 4 years from college. Monthly surplus is $2,000.',
        question: 'How should the family realign after the $15k hit?',
        options: [
          { 
            label: 'Defensive Pillar', 
            content: 'Dedicate full $2,000 monthly surplus to savings for 8 months.', 
            stats: { stability: 90, growth: 5, efficiency: 15 }, 
            explanation: 'Restoring the buffer is non-negotiable for family security.' 
          },
          { 
            label: 'Pragmatic Split', 
            content: 'Allocate $1,000 to savings, $500 to College 529, $500 to debt.', 
            stats: { stability: 45, growth: 30, efficiency: 50 }, 
            explanation: 'Diversified approach that maintains forward momentum on all goals.' 
          },
          { 
            label: 'Growth Gamble', 
            content: 'Invest full $2,000 into tech stocks to "earn back" the $15k loss.', 
            stats: { stability: 5, growth: 80, efficiency: 0 }, 
            explanation: 'A psychological trap that risks the family savings in market volatility.' 
          }
        ]
      },
      {
        id: 'c4',
        type: 'challenge',
        profile: { name: 'Robert', initials: 'RB', age: 58, role: 'Store Manager', income: '$5,500', savings: '$200k', debt: '$20k Loan', goal: 'Retire in 7y' },
        scenario: 'Market is down 15%. Robert has $20k high-interest debt and is near retirement.',
        question: 'How should Robert adjust his strategy?',
        options: [
          { 
            label: 'Debt De-Leverage', 
            content: 'Stop new investing. Pay off the $20k debt for a "guaranteed ROI".', 
            stats: { stability: 60, growth: 10, efficiency: 85 }, 
            explanation: 'Eliminating fixed liabilities is superior to chasing volatile returns near retirement.' 
          },
          { 
            label: 'Stay the Course', 
            content: 'Maintain contributions. Buy stocks while they are "on sale" in the downturn.', 
            stats: { stability: 20, growth: 70, efficiency: 40 }, 
            explanation: 'Leverages market recovery potential, assuming his 7-year horizon is sufficient.' 
          },
          { 
            label: 'Conservative Pivot', 
            content: 'Sell risky stocks and move 70% of portfolio into bonds for safety.', 
            stats: { stability: 85, growth: 5, efficiency: 10 }, 
            explanation: 'Prevents further loss but risks inflation erosion over the next 30 years.' 
          }
        ]
      },
      {
        id: 'c5',
        type: 'challenge',
        profile: { name: 'Evelyn', initials: 'EV', age: 72, role: 'Retired', income: '$3,800', savings: '$650k', debt: '$0', goal: 'Legacy' },
        scenario: 'Evelyn has surplus income. She wants a legacy but fears future medical costs.',
        question: 'What is the most effective legacy plan that protects Evelyn?',
        options: [
          { 
            label: 'Laddered Gift', 
            content: 'Keep $150k liquid for medical. Gift $10k annually to each grandchild.', 
            stats: { stability: 70, growth: 30, efficiency: 60 }, 
            explanation: 'Balanced strategy that provides security while seeding future generations.' 
          },
          { 
            label: 'Trust Strategy', 
            content: 'Move $300k into an irrevocable trust for grandkids.', 
            stats: { stability: 40, growth: 50, efficiency: 80 }, 
            explanation: 'Optimal asset protection and tax efficiency at the cost of personal access.' 
          },
          { 
            label: 'Index Inheritance', 
            content: 'Keep everything in equity funds. Assume growth offsets taxes.', 
            stats: { stability: 15, growth: 85, efficiency: 5 }, 
            explanation: 'High potential for wealth creation but vulnerable to a crash during her care years.' 
          }
        ]
      }
    ]
  }
};
