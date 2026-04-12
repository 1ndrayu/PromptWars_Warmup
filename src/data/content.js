export const topicsData = {
  savings: {
    id: 'savings',
    title: 'Savings & Liquidity Strategy',
    description: 'Establishing absolute baseline financial resilience before attempting growth.',
    steps: [
      {
        id: 'def',
        type: 'info',
        title: 'Definition',
        content: 'Savings refers not simply to the residue left over after expenditure, but a targeted allocation of high-liquidity capital designed to absorb macroeconomic shocks, unexpected personal liabilities, or structured short-term goals. It necessitates capital preservation over yield optimization.'
      },
      {
        id: 'real',
        type: 'info',
        title: 'Real World Meaning',
        content: '"Pay Yourself First" is a psychological and behavioral framework. By treating future insolvency as a primary creditor, cash flow is automatically diverted to a defensive buffer before discretionary consumption options appear on your financial radar.'
      },
      {
        id: 'case',
        type: 'case',
        title: 'Case Problem: Capital Allocation',
        scenario: 'Alex experiences a sudden monthly income jump yielding a $1,500 surplus. He holds variable-interest consumer debt of $3,000 at 22% APR, but his emergency reserves stand at absolutely zero. His vehicle, necessary for his daily commute, is exhibiting signs of imminent failure requiring an estimated $1,200 repair.',
        question: 'Assuming he can only deploy this $1,500 this month, what is the most optimal immediate deployment of capital to maximize net financial stability?',
        options: [
          'Aggressively funnel the entire $1,500 into extinguishing the 22% APR consumer debt to eliminate high compounding interest drag from the balance sheet.',
          'Bypass the debt entirely this month, depositing the $1,500 into an isolated high-yield savings account purely to act as an unencumbered emergency buffer.',
          'Liquidate the vehicle immediately down to zero, using the $1,500 to secure a down payment on a reliable, newer $15,000 vehicle at 7% APR to prevent repair friction.',
          'Split the deployment proportionally based purely on liability size, assigning 50% to the high-interest debt and 50% toward standard index equities to match market returns.'
        ],
        correctAnswer: 'Bypass the debt entirely this month, depositing the $1,500 into an isolated high-yield savings account purely to act as an unencumbered emergency buffer.',
        feedback: {
          reasoning: 'Without a liquid cash buffer, Alex is one vehicle breakdown away from taking on MORE high-yield toxic debt or losing his income-generating commute entirely. Establishing a core liquidity threshold (an emergency fund) takes absolute precedence over mathematical debt-reduction optimization.'
        }
      }
    ]
  },
  budgeting: {
    id: 'budgeting',
    title: 'Budgeting & Expense Optimization',
    description: 'Microeconomic alignment of cash outflows with long-term utility.',
    steps: [
      {
        id: 'def',
        type: 'info',
        title: 'Definition',
        content: 'Budgeting is a proactive forecasting mechanism that assigns a rigorous purpose to every unit of currency before it is realized. It involves mapping fixed liabilities, variable operating expenses, and deliberate wealth-building silos to optimize overall lifestyle utility.'
      },
      {
        id: 'real',
        type: 'info',
        title: 'Real World Meaning',
        content: 'The "50/30/20" construct serves as a basic heuristic baseline: 50% for inelastic survival needs, 30% for elastic consumption (wants), and 20% dedicated strictly to net-worth accretion (debt-paydown or investment). Divergence from these ratios requires intentional deficit correction.'
      },
      {
        id: 'case',
        type: 'case',
        title: 'Case Problem: The Margin Squeeze',
        scenario: 'Sarah\'s post-tax cash inflow is $4,000. Her absolute mandatory overhead (rent, utilities, insurance, basic groceries) totals $2,600. She allocates $600 to an aggressive student loan repayment plan and saves $200 for retirement. She wishes to join a professional networking club costing $600 a month.',
        question: 'Under the rigors of standard budgeting heuristics, how does her proposed professional networking club membership impact her structural stability?',
        options: [
          'Since networking is an investment in her future earnings, it should be categorized with her student loans under the 20% wealth-building umbrella, keeping her ratios fundamentally balanced.',
          'Her mandatory overhead (65%) heavily breaches the 50% ceiling. Adding a $600 discretionary operating expense maximizes all remaining capital, collapsing her margin for error to absolute zero and risking insolvency.',
          'Because her discretionary spending equates precisely to the 30% threshold (Wait: $600 / $4000 = 15%), the networking club is highly affordable and fits perfectly into standard lifestyle expansion.',
          'She must immediately halve her mandatory rent by moving, as any fixed liability exceeding 20% of net income mathematically guarantees eventual bankruptcy according to the 50/30/20 rubric.'
        ],
        correctAnswer: 'Her mandatory overhead (65%) heavily breaches the 50% ceiling. Adding a $600 discretionary operating expense maximizes all remaining capital, collapsing her margin for error to absolute zero and risking insolvency.',
        feedback: {
          reasoning: "Sarah's inelastic needs are already operating far above the optimal 50% target ($2,600/$4,000 = 65%). Consuming her exact remaining liquidity ($600) on a discretionary 'want' entirely destroys her buffer, cementing extreme financial fragility."
        }
      }
    ]
  },
  investing: {
    id: 'investing',
    title: 'Investing & Asset Allocation',
    description: 'Protecting and expanding purchasing power against macroeconomic inflation.',
    steps: [
      {
        id: 'def',
        type: 'info',
        title: 'Definition',
        content: 'Investing is the deliberate conversion of highly liquid, depreciable currency into illiquid, appreciating assets (equities, bonds, real estate) designed to internalize yield and aggressively combat the systemic degradation of purchasing power known as inflation.'
      },
      {
        id: 'real',
        type: 'info',
        title: 'Real World Meaning',
        content: 'The underlying engine of wealth is "Compound Interest." It dictates that portfolio returns themselves generate subsequent exponential returns over decades. A delay in market entry drastically severs the compounding curve far more severely than a lack in initial starting capital.'
      },
      {
        id: 'case',
        type: 'case',
        title: 'Case Problem: Portfolio Time Horizons',
        scenario: 'A 60-year old individual holds a $50,000 cash inheritance they intend to utilize heavily for medical and living expenses starting exactly 24 months from today. Concurrently, a 25-year old has $10,000 they explicitly earmark for a retirement event roughly 40 years away.',
        question: 'Match the risk profiles to the optimal asset allocation deployment for these specifically distinct capital reserves.',
        options: [
          'Both individuals must leverage low-fee S&P 500 index funds, as broad market equities consistently outpace inflation and generate maximum historical yield regardless of timeline.',
          'The 60-year old must deploy strictly into high-grade Treasury bonds or Money Markets to guarantee principal preservation, while the 25-year old should deploy entirely into broad market equities to maximize multi-decade compounding growth despite high short-term volatility.',
          'The 25-year old should lock their capital into fixed-yield certificates of deposit to prevent youthful gambling loss, whereas the 60-year old must aggressive purchase equities to rapidly inflate their medical fund before it is depleted.',
          'Both parties must split their funds into a strict 60/40 Equity to Bond allocation modeling standard institutional retirement vehicles to perfectly hedge liquidity against inflation simultaneously.'
        ],
        correctAnswer: 'The 60-year old must deploy strictly into high-grade Treasury bonds or Money Markets to guarantee principal preservation, while the 25-year old should deploy entirely into broad market equities to maximize multi-decade compounding growth despite high short-term volatility.',
        feedback: {
          reasoning: 'Asset deployment strategy is entirely dictated by the time horizon of capital utility. Capital needed in the short term (< 3 years) cannot tolerate market volatility and must prioritize principal preservation via cash-equivalents. Capital mapped to multi-decade horizons demands high equity exposure.'
        }
      }
    ]
  },
  challenges: {
    id: 'challenges',
    title: 'Grand Financial Challenges',
    description: 'Synthesizing all knowledge to navigate high-stakes life events across different age groups.',
    steps: [
      {
        id: 'c1',
        type: 'challenge',
        profile: { name: 'Leo', initials: 'LZ', age: 21, role: 'University Sophomore', income: '$1,200/mo', savings: '$400', debt: '$12,000 (Student Loan)', goal: 'Graduate Debt-Neutral' },
        scenario: 'Leo wins a $2,000 academic grant. He has no emergency fund. His student loan interest is deferred until graduation, but his ancient laptop just died—essential for his Computer Science degree.',
        question: 'What is the most balanced strategic move for Leo\'s unique profile?',
        options: [
          { 
            label: 'The Foundation Strategy', 
            content: 'Purchase a reliable mid-range refurbished laptop for $800, and deposit the remaining $1,200 into a High-Yield Savings account to serve as his first real emergency buffer.', 
            stats: { stability: 50, growth: 5, efficiency: 15 }, 
            explanation: 'This prioritizes long-term stability by protecting him from future crises while solving the immediate academic bottleneck. By not paying down interest-deferred debt yet, he maximizes his liquidity.' 
          },
          { 
            label: 'The Acceleration Strategy', 
            content: 'Buy the $800 laptop, but put the $1,200 into a broad market index fund to begin the compounding journey early, assuming his student debt won\'t accumulate interest for 2 more years.', 
            stats: { stability: 10, growth: 40, efficiency: 5 }, 
            explanation: 'Capitalizing on time in the market is high-yield but high-risk; if another emergency hits, he lacks a liquid buffer and might be forced to sell his assets at a loss.' 
          },
          { 
            label: 'The Debt-Crusher Strategy', 
            content: 'Repair the old laptop for $300 (short-term fix) and put the full $1,700 toward his student loan principal to reduce the future compounding burden of his debt.', 
            stats: { stability: 5, growth: 20, efficiency: 30 }, 
            explanation: 'Reducing future debt burden is noble but extremely risky here. If the $300 repair fails, he has no laptop AND no money, risking his degree completion.' 
          }
        ]
      },
      {
        id: 'c2',
        type: 'challenge',
        profile: { name: 'Maya', initials: 'MY', age: 29, role: 'Senior UX Designer', income: '$7,500/mo', savings: '$25,000', debt: '$0', goal: 'Early Retirement / FIRE' },
        scenario: 'Maya\'s tech startup just went public. She receives a $40,000 post-tax bonus. She is already maxing out her retirement accounts. Her current cost of living is $4,000/mo.',
        question: 'With a focus on early retirement, how should Maya deploy this $40k windfall?',
        options: [
          { 
            label: 'The Liquidity Sabbatical', 
            content: 'Keep the full $40k in cash. This extends her "Runway" to 12+ months, giving her the mobility to quit her job and start her own agency without financial pressure.', 
            stats: { stability: 80, growth: 10, efficiency: 20 }, 
            explanation: 'Buying "Time" is the ultimate luxury for a high-earner. While Growth is lower, the Mobility stat is maximized for career pivoting.' 
          },
          { 
            label: 'The Compound Maximus', 
            content: 'Invest the full $40k into a diversified taxable brokerage account. At a 7% average return, this sum could double twice by her mid-forties.', 
            stats: { stability: 15, growth: 75, efficiency: 10 }, 
            explanation: 'This is the mathematically superior route for wealth accumulation. It leverages her existing high income to accelerate the FIRE timeline significantly.' 
          },
          { 
            label: 'The Diversified Real Estate', 
            content: 'Use the $40k as a down payment on a $200k investment property. The rental income will cover the mortgage and provide a new monthly cash flow stream.', 
            stats: { stability: 30, growth: 45, efficiency: 55 }, 
            explanation: 'Real estate adds a layer of Budgeting Efficiency (cash flow) but introduces Management Friction. It balances growth with a tangible asset.' 
          }
        ]
      },
      {
        id: 'c3',
        type: 'challenge',
        profile: { name: 'The Chen Family', initials: 'TC', age: 42, role: 'Dual-Income Household', income: '$12,000/mo', savings: '$50,000', debt: '$350k Mortgage', goal: 'College Funds & Retirement' },
        scenario: 'A family health emergency cost $15,000 (after insurance). At the same time, their eldest child is 4 years away from college. Their current monthly surplus is $2,000.',
        question: 'How should the Chens realign their surplus after the $15k hit to their savings?',
        options: [
          { 
            label: 'The Defensive Pillar', 
            content: 'Dedicate the full $2,000 monthly surplus back into their emergency fund for 8 months to restore the $50k buffer before any other goal.', 
            stats: { stability: 90, growth: 5, efficiency: 15 }, 
            explanation: 'Restoring a family-sized buffer is non-negotiable. Without it, the next emergency could threaten the family home or the college plan itself.' 
          },
          { 
            label: 'The Pragmatic Split', 
            content: 'Allocate $1,000 to refill savings, $500 to the 529 College Fund, and $500 to mortgage principal reduction to decrease future monthly overhead.', 
            stats: { stability: 45, growth: 30, efficiency: 50 }, 
            explanation: 'This covers all bases. Refilling the buffer takes longer, but progress on college and debt reduction continues simultaneously.' 
          },
          { 
            label: 'The High-Growth Gamble', 
            content: 'Invest the full $2,000 into high-growth tech stocks. The goal is to "Earn back" the $15k loss as quickly as possible through market returns.', 
            stats: { stability: 5, growth: 80, efficiency: 0 }, 
            explanation: 'This is a psychological trap. High-risk investing to recover a loss of security often leads to compounded stress and potential bankruptcy.' 
          }
        ]
      },
      {
        id: 'c4',
        type: 'challenge',
        profile: { name: 'Robert', initials: 'RB', age: 58, role: 'Pre-Retiree Store Manager', income: '$5,500/mo', savings: '$200,000', debt: '$20k Loan', goal: 'Retire in 7 Years' },
        scenario: 'The market enters a significant downturn, wiping 15% off Robert\'s portfolio. He is panicked. He has $20k in high-interest debt that he was planning to ignore until retirement.',
        question: 'How should Robert adjust his strategy in a bear market?',
        options: [
          { 
            label: 'The Debt De-Leverage', 
            content: 'Stop all NEW investments. Use his monthly surplus and a small portion of cash to aggressively pay off the $20k debt. Elimination of a fixed liability provides immediate "Guaranteed ROI".', 
            stats: { stability: 60, growth: 10, efficiency: 85 }, 
            explanation: 'At 58, reducing fixed expenses is better than chasing market returns. Paying off a 15% interest debt is equivalent to a guaranteed 15% market return.' 
          },
          { 
            label: 'The "Stay the Course"', 
            content: 'Ignore the market noise. Continue automatic contributions to his retirement fund, buying stocks while they are "on sale" during the downturn.', 
            stats: { stability: 20, growth: 70, efficiency: 40 }, 
            explanation: 'Historically, the best returns follow the worst years. If he has 7 years left, he is young enough to benefit from the eventual recovery.' 
          },
          { 
            label: 'The Conservative Pivot', 
            content: 'Sell his riskier stock holdings and move 70% of his portfolio into bonds to prevent any further loss of his hard-earned $200k.', 
            stats: { stability: 85, growth: 5, efficiency: 10 }, 
            explanation: 'This locks in the 15% loss. While it "feels" safe, inflation will now slowly erode his purchasing power over his ~30 year retirement.' 
          }
        ]
      },
      {
        id: 'c5',
        type: 'challenge',
        profile: { name: 'Evelyn', initials: 'EV', age: 72, role: 'Retired Widow', income: '$3,800/mo', savings: '$650,000', debt: '$0', goal: 'Legacy / Grandchildren' },
        scenario: 'Evelyn has more monthly income than she needs. She wants to set up a legacy for her 3 grandchildren but is worried about her own medical costs in the future.',
        question: 'What is the most effective legacy plan that protects Evelyn?',
        options: [
          { 
            label: 'The Laddered Gift', 
            content: 'Keep $150k in highly liquid bonds for medical. Gift $10k annually to each grandchild into a 529 plan to minimize future estate taxes.', 
            stats: { stability: 70, growth: 30, efficiency: 60 }, 
            explanation: 'This balances her own security with a structured giving plan. It uses tax-advantaged accounts to grow her grandkids\' wealth efficiently.' 
          },
          { 
            label: 'The Trust Strategy', 
            content: 'Move $300k into an irrevocable trust. This protects the assets from her own medical creditors while guaranteeing the funds move to the grandkids upon her passing.', 
            stats: { stability: 40, growth: 50, efficiency: 80 }, 
            explanation: 'Trusts provide extreme protection and efficiency but reduce her own access to those funds should her circumstances change.' 
          },
          { 
            label: 'The High-Yield Longevity', 
            content: 'Keep everything in her current S&P 500 index fund. Assume her portfolio will grow so large that her grandkids will inherit millions regardless of taxes.', 
            stats: { stability: 15, growth: 85, efficiency: 5 }, 
            explanation: 'High growth is great for legacy, but a market crash right when she needs long-term care could force her to sell the grandkids\' inheritance to survive.' 
          }
        ]
      }
    ]
  }
};
