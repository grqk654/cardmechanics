import { useState, useEffect } from 'react'

const C = {
  navy: '#0d1117', navyCard: '#161b22', navyBorder: 'rgba(255,255,255,0.08)',
  gold: '#c9a227', goldLight: 'rgba(201,162,39,0.09)', goldBorder: 'rgba(201,162,39,0.25)',
  text: '#1a1a2e', textMid: '#4a4a5a', textMuted: '#7a7a8a',
  border: '#e8e8ee', offWhite: '#f8f9fb',
  green: '#16a34a', greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626', redLight: 'rgba(220,38,38,0.08)',
}

const urlToPage = p => p.replace(/^\//, '') || 'home'
const pageToUrl = p => p === 'home' ? '/' : '/' + p
const fmt$ = n => '$' + Math.round(n).toLocaleString()
const fmtDec = (n, d = 2) => '$' + Number(n).toFixed(d)

// ─── GUIDE DATA ───────────────────────────────────────────────────────────────
const GUIDES = [
  {
    slug: 'best-first-credit-card', tag: 'Beginner', readTime: '6 min',
    title: 'Best First Credit Card',
    excerpt: 'How to pick your first card without getting burned by fees or a high APR.',
    content: [
      { t: 'intro', v: 'Picking your first credit card is one of the most consequential small financial decisions you can make. Get it right and you start building credit history on solid terms. Get it wrong and you end up paying 27% APR on a balance you never planned to carry.' },
      { t: 'h2', v: 'What to look for in a first card' },
      { t: 'p', v: 'The single most important feature of a first credit card is a low or no annual fee. There is no reason to pay $95 a year to build credit. There are dozens of cards with no annual fee, solid rewards, and reasonable APRs — start there.' },
      { t: 'p', v: 'Second, look for a card that reports to all three credit bureaus — Experian, Equifax, and TransUnion. Most major cards do, but some store cards only report to one or two. You want responsible payment behavior showing up everywhere it counts.' },
      { t: 'h2', v: 'Secured vs. unsecured for beginners' },
      { t: 'p', v: 'If you have no credit history, you may need to start with a secured card. A secured card requires a cash deposit — usually $200–$500 — that becomes your credit limit. It works like a normal card for building credit, but the deposit protects the lender.' },
      { t: 'p', v: 'After 6–12 months of on-time payments, most secured card issuers will upgrade you to an unsecured card and return your deposit. Think of a secured card as a temporary ramp onto the credit highway, not a permanent destination.' },
      { t: 'h2', v: 'The APR reality check' },
      { t: 'p', v: 'First-time cardholders typically see APRs between 22% and 29%. At 26% APR, a $1,000 balance costs about $21.67 in interest every single month — even if you never spend another dollar. The rule is simple: never charge anything you cannot pay off in full when the statement closes. Use it like a debit card with benefits.' },
      { t: 'h2', v: 'Rewards vs. building credit' },
      { t: 'p', v: 'For a first card, rewards are secondary. A 1.5% cash back rate earns you about $22.50 on $1,500 of spending. That is meaningless if you carry a balance and pay $30 in interest. Get the fundamentals right first — no balance, on-time payments, low utilization — then optimize for rewards on your second card.' },
      { t: 'h2', v: 'Red flags to avoid' },
      { t: 'p', v: 'Avoid cards that charge a monthly fee, cards marketed specifically toward people with bad credit that have unusually high fees baked in, and store-branded credit cards that lock you into one retailer. A Visa or Mastercard from a major bank gives you more flexibility and usually better terms.' },
      { t: 'tip', v: 'Use the Credit Utilization Calculator on this site to keep your usage below 30% of your limit. High utilization is the fastest way to hurt the credit score you are trying to build.' },
    ]
  },
  {
    slug: 'cash-back-vs-travel-rewards', tag: 'Strategy', readTime: '7 min',
    title: 'Cash Back vs. Travel Rewards',
    excerpt: 'Which rewards structure actually makes sense for how you spend.',
    content: [
      { t: 'intro', v: 'The cash back vs. travel rewards debate is one of the most discussed topics in personal finance. The honest answer is that the right choice depends entirely on how you spend, how much you travel, and how much mental energy you want to put into maximizing your returns.' },
      { t: 'h2', v: 'How cash back works' },
      { t: 'p', v: 'Cash back cards return a percentage of your spending as a statement credit or check. They are simple, transparent, and flexible. A 2% flat-rate cash back card on $2,000 of monthly spending earns you $40 per month — $480 per year — with no redemption strategy required.' },
      { t: 'p', v: 'The trade-off is that cash back rates are effectively capped. The best flat-rate cards offer 2%, and tiered cards can offer 3–5% in specific categories but only 1% on everything else. The ceiling is lower than premium travel redemptions.' },
      { t: 'h2', v: 'How travel rewards work' },
      { t: 'p', v: 'Travel rewards cards earn points or miles that can be redeemed for flights, hotels, or transferred to airline and hotel loyalty programs. The upside is that the right redemption can deliver 2–4x the value of a cash back card. A business-class flight worth $3,000 might cost 60,000 points earned over 12 months of normal spending.' },
      { t: 'p', v: 'The catch is that this requires research. You need to learn which transfer partners offer the best value, how to find award availability, and when redemption rates are strong vs. weak. Most people overestimate how much time they will actually put into this.' },
      { t: 'h2', v: 'The annual fee math' },
      { t: 'p', v: 'Premium travel cards charge $95–$695 per year. At $695 — think Amex Platinum or Chase Sapphire Reserve — you need to extract real, tangible value from the card\'s benefits (lounge access, travel credits, Global Entry reimbursement) just to break even before rewards count.' },
      { t: 'p', v: 'If you are not flying at least 4–6 times per year and staying in hotels regularly, the math usually does not work for a premium travel card. A no-fee cash back card may earn you more real value even though the points look less impressive on paper.' },
      { t: 'h2', v: 'Who should choose cash back' },
      { t: 'p', v: 'Cash back is the better choice if: you travel fewer than 3 times per year, you prefer simplicity, you have no loyalty to a specific airline or hotel chain, your spending is spread evenly across categories, or you are still building your credit profile.' },
      { t: 'h2', v: 'Who should choose travel rewards' },
      { t: 'p', v: 'Travel rewards pay off if: you fly regularly and have a preferred airline, you stay in hotels and earn points, you are willing to learn the transfer partner system, your spending skews toward high-bonus categories like dining and travel, and you can use the card\'s benefits to offset the annual fee.' },
      { t: 'tip', v: 'Use the Cash Back Calculator and Points Value Calculator side-by-side with your actual monthly spending numbers to see which card type earns more for your specific habits.' },
    ]
  },
  {
    slug: 'good-credit-card-apr', tag: 'Basics', readTime: '5 min',
    title: 'What Is a Good Credit Card APR?',
    excerpt: 'The rate benchmarks worth knowing before you apply for any card.',
    content: [
      { t: 'intro', v: 'APR stands for Annual Percentage Rate and it is the annual cost of borrowing expressed as a percentage. On a credit card, APR tells you how much interest you will pay if you carry a balance month to month. Understanding what counts as a good APR helps you compare cards before applying — not after you have already been approved.' },
      { t: 'h2', v: 'Current APR benchmarks' },
      { t: 'p', v: 'As of 2025–2026, the average credit card APR in the United States is around 20–22%. This is the mean, which means plenty of cards are below it and plenty are above it. The range runs from about 12% on the low end (reserved for people with excellent credit) all the way to 29.99% at the high end.' },
      { t: 'p', v: 'A good APR in today\'s environment is anything below 18%. An excellent APR is 15% or lower. If you are being offered 24% or above, you are in the higher-risk tier, which usually means your credit score is below 670 or you are a newer credit user.' },
      { t: 'h2', v: 'Variable APR explained' },
      { t: 'p', v: 'Most credit cards have a variable APR, which means the rate moves with the Prime Rate — the benchmark set by the Federal Reserve. When the Fed raises rates, your card APR typically goes up within one or two billing cycles. When the Fed cuts rates, your APR comes down.' },
      { t: 'p', v: 'This is why the APR ranges shown on credit card applications are presented as a range rather than a fixed number — for example, 19.99% to 26.99% variable. Where you land in that range depends on your creditworthiness at the time of approval.' },
      { t: 'h2', v: 'APR benchmarks by credit score' },
      { t: 'p', v: 'Excellent credit (750+): 14–19% APR is achievable. Good credit (700–749): 19–23% is typical. Fair credit (650–699): 23–27% is common. Poor credit (below 650): 27–29.99% is the standard range, and you may only qualify for secured cards.' },
      { t: 'h2', v: 'Why APR matters less if you pay in full' },
      { t: 'p', v: 'APR only matters if you carry a balance. If you pay your full statement balance every month before the due date, you never pay interest — regardless of whether your APR is 15% or 29.99%. The grace period protects you entirely as long as you pay in full.' },
      { t: 'p', v: 'This means that for someone who always pays in full, a card with 25% APR but 2% cash back can be better than a card with 15% APR and 1% cash back. Focus on APR only when you realistically might carry a balance.' },
      { t: 'tip', v: 'Run the Interest Calculator with different APR scenarios to see the real monthly dollar cost of carrying a balance at any rate. The difference between 18% and 26% APR on a $3,000 balance is over $20 per month.' },
    ]
  },
  {
    slug: 'how-credit-card-interest-works', tag: 'Basics', readTime: '7 min',
    title: 'How Credit Card Interest Works',
    excerpt: 'Daily periodic rate, average daily balance — explained simply.',
    content: [
      { t: 'intro', v: 'Credit card interest works differently than most people assume. The APR number on your card agreement is not the full picture. Understanding how it is actually calculated — down to the daily math — reveals why carrying even a small balance can cost more than you expect.' },
      { t: 'h2', v: 'The daily periodic rate' },
      { t: 'p', v: 'Credit card issuers do not charge interest monthly. They charge it daily. The Daily Periodic Rate (DPR) is your APR divided by 365. At 24% APR, your DPR is 24 ÷ 365 = 0.0658% per day. This seems small, but it compounds every single day on your outstanding balance, including on any previously accumulated interest.' },
      { t: 'h2', v: 'Average daily balance method' },
      { t: 'p', v: 'Most issuers use the Average Daily Balance method. They add up your balance at the end of each day in the billing cycle and divide by the number of days. Then they multiply that average by the DPR and then by the number of days in the cycle.' },
      { t: 'p', v: 'Example: If your average daily balance is $2,000 and your APR is 24%, your DPR is 0.000658. Multiply $2,000 × 0.000658 × 30 days = $39.45 in interest for that month. That is roughly $473 per year on a $2,000 balance — money that disappears without reducing your principal by one dollar.' },
      { t: 'h2', v: 'The grace period' },
      { t: 'p', v: 'The grace period is your defense against paying any interest at all. Federal law requires issuers to give you at least 21 days between your statement closing date and your payment due date. If you pay your full statement balance before the due date, you pay zero interest on those purchases — period.' },
      { t: 'p', v: 'The grace period only applies to new purchases. Cash advances and balance transfers typically begin accruing interest from the transaction date with no grace period. This is why cash advances are one of the most expensive things you can do with a credit card.' },
      { t: 'h2', v: 'What happens when you make a partial payment' },
      { t: 'p', v: 'If you pay less than your full statement balance, you lose the grace period for new purchases in the next cycle. New purchases begin accruing interest from the transaction date rather than the statement closing date. This "interest on new purchases" effect is one reason why carrying a partial balance is more expensive than it first appears.' },
      { t: 'h2', v: 'Penalty APR' },
      { t: 'p', v: 'Miss a payment by 60 days or more and many issuers can trigger a Penalty APR — sometimes as high as 29.99%. The CARD Act of 2009 requires 45 days notice before a rate increase and mandates that your rate return to normal after 6 consecutive on-time payments. But until then, the penalty applies to your existing balance and all new charges.' },
      { t: 'tip', v: 'The Interest Calculator on this site uses the average daily balance method — the same calculation your issuer uses — so the monthly cost it shows matches your actual statement.' },
    ]
  },
  {
    slug: 'how-long-to-pay-off-credit-card', tag: 'Payoff', readTime: '6 min',
    title: 'How Long to Pay Off a Credit Card',
    excerpt: 'The math behind your payoff timeline at different monthly payment amounts.',
    content: [
      { t: 'intro', v: 'One of the most sobering exercises in personal finance is calculating how long it will actually take to pay off a credit card balance. The answer is almost always longer and more expensive than people expect — especially when minimum payments are involved.' },
      { t: 'h2', v: 'The minimum payment reality' },
      { t: 'p', v: 'Minimum payments are typically 1–2% of your balance plus that month\'s interest. At 2%, a $5,000 balance has a minimum of about $100. At 20% APR with 2% minimum payments, that $5,000 takes over 22 years to pay off and costs approximately $6,700 in total interest — more than the original balance itself.' },
      { t: 'h2', v: 'The payment amount effect' },
      { t: 'p', v: 'Small increases in payment make a dramatic difference. On a $5,000 balance at 20% APR: paying $100/month takes 94 months and costs $4,311 in interest. Paying $200/month takes 32 months and costs $1,300. Paying $500/month takes 11 months and costs $494.' },
      { t: 'p', v: 'Doubling your payment does not simply halve your payoff time — it cuts it far more dramatically because you reduce the principal faster, which reduces the compounding interest on top of it.' },
      { t: 'h2', v: 'Why balances feel like they never move' },
      { t: 'p', v: 'In the early months of payoff, most of your payment goes toward interest rather than principal. On a $5,000 balance at 20% APR, the first month\'s interest alone is about $83. If you pay $100, only $17 reduces your actual balance. This is why progress feels painfully slow at first.' },
      { t: 'p', v: 'As your balance decreases, more of each payment shifts toward principal. The last months of payoff are nearly all principal. But you have to push through the slow early period to get there — and paying extra accelerates that process significantly.' },
      { t: 'h2', v: 'The debt avalanche strategy' },
      { t: 'p', v: 'If you have multiple credit card balances, the mathematically optimal approach is the debt avalanche: pay the minimum on all cards, and put every extra dollar toward the card with the highest APR first. Once that card is paid off, redirect its payment to the next highest rate.' },
      { t: 'p', v: 'The debt snowball (paying smallest balance first regardless of rate) is psychologically satisfying but mathematically more expensive. The avalanche saves the most in total interest — sometimes thousands of dollars on larger balances.' },
      { t: 'tip', v: 'The Payoff Calculator on this site shows you the exact months and total interest for any payment amount. Try increasing your payment by $50 or $100 and watch how much the payoff date and total interest change.' },
    ]
  },
  {
    slug: 'how-much-are-credit-card-points-worth', tag: 'Rewards', readTime: '6 min',
    title: 'How Much Are Credit Card Points Worth?',
    excerpt: 'Points are not all equal — here is how to calculate your real cents per point.',
    content: [
      { t: 'intro', v: 'Credit card points are deliberately opaque. Programs are designed to make it difficult to calculate your actual value per point, because the real number often reveals you are earning less than you think. Here is how to cut through the complexity.' },
      { t: 'h2', v: 'The cents-per-point calculation' },
      { t: 'p', v: 'The standard way to measure point value is cents per point (cpp). Divide the cash value of a redemption by the number of points required. If a flight costs $400 or 50,000 points, the value is $400 ÷ 50,000 = 0.8 cents per point.' },
      { t: 'p', v: 'The break-even baseline for most programs is 1 cent per point. At that rate, 50,000 points = $500. If your redemption delivers less than 1 cent per point, a cash back card earning 1–2% on every purchase is likely earning you more real money.' },
      { t: 'h2', v: 'Cash back vs. travel redemptions' },
      { t: 'p', v: 'Most travel rewards cards deliver poor value when you redeem points for cash. Chase Ultimate Rewards points redeemed for a statement credit are worth 1 cent each. The same points transferred to Hyatt and used for a hotel stay might be worth 2–3 cents each.' },
      { t: 'p', v: 'This is the core of the travel rewards value proposition: significant upside exists, but only through specific redemption paths. Transfer partners are where the value is concentrated. Portal redemptions and statement credits are convenient but often mediocre.' },
      { t: 'h2', v: 'Typical values by program' },
      { t: 'p', v: 'As general benchmarks: Chase Ultimate Rewards are worth 1.5–2.5 cents in travel, 1 cent in cash. Amex Membership Rewards are worth 1–2 cents in travel, 0.6 cents in cash. Capital One miles are worth 1 cent for travel purchases. Citi ThankYou points are worth 1–1.7 cents in travel.' },
      { t: 'p', v: 'Airline miles and hotel points vary widely. American AAdvantage miles range from 0.5 to 2+ cents depending on route and class. Hyatt points are widely considered among the most valuable hotel currency at 1.7–2.5 cents per point at category properties.' },
      { t: 'h2', v: 'The points trap' },
      { t: 'p', v: 'The biggest mistake with rewards cards is letting points sit idle or expire. Airline miles and some hotel points can devalue or expire with inactivity. Chase and Amex points do not expire while you hold the card — but closing the card means losing your balance.' },
      { t: 'p', v: 'The second biggest mistake is spending more than you would otherwise to earn points. No reward at any cents-per-point value justifies carrying a balance. At 22% APR, a $1,000 balance costs $220 in annual interest — far more than any points earned on that spending.' },
      { t: 'tip', v: 'Use the Points Value Calculator to enter your current balance and see your estimated value at cash, travel portal, and transfer partner redemption rates side by side.' },
    ]
  },
  {
    slug: 'how-to-avoid-credit-card-interest', tag: 'Strategy', readTime: '5 min',
    title: 'How to Avoid Credit Card Interest',
    excerpt: 'The rules that keep you inside the grace period permanently.',
    content: [
      { t: 'intro', v: 'Avoiding credit card interest entirely is not a complex strategy. It comes down to understanding how the grace period works and following a small number of consistent habits. You do not need to track spending obsessively — you just need to pay the right amount at the right time.' },
      { t: 'h2', v: 'Pay the full statement balance, not the minimum' },
      { t: 'p', v: 'Your statement shows two numbers: the statement balance (what you owed on the day the billing cycle closed) and the current balance (what you owe today, including new charges). Always pay the statement balance in full by the due date.' },
      { t: 'p', v: 'If you pay only the minimum, you pay interest on everything you did not pay. If you accidentally pay more than the statement balance, that is fine — it just reduces future interest risk. The statement balance is the number to target each month.' },
      { t: 'h2', v: 'How the grace period protects you' },
      { t: 'p', v: 'Federal law requires issuers to give you at least 21 days between your statement closing date and your due date. During this window, you owe the statement balance but interest has not been charged yet. Pay in full before the due date and the interest calculation never completes against you.' },
      { t: 'p', v: 'The grace period only exists if you paid your previous statement balance in full. If you carried any balance from last month, you lose the grace period and new purchases begin accruing interest from the transaction date immediately.' },
      { t: 'h2', v: 'Set up autopay for the full statement balance' },
      { t: 'p', v: 'The simplest practical step is setting up autopay for the full statement balance — not the minimum. This means your checking account must always have enough to cover your credit card spending, which is itself a useful discipline.' },
      { t: 'p', v: 'With autopay set to the full statement balance, missing a payment or accidentally paying a partial amount becomes structurally impossible. Interest becomes impossible as long as you spend within what your checking account can cover.' },
      { t: 'h2', v: 'Grace period killers to avoid' },
      { t: 'p', v: 'Cash advances have no grace period — interest begins on the transaction date at a cash advance APR that is usually higher than your purchase APR. Balance transfers often charge a 3–5% fee and have no grace period either. Promotional deferred interest offers — common on retail store cards — can charge you the entire deferred amount if you do not pay in full by the promo end date.' },
      { t: 'tip', v: 'If you have already carried a balance and want to restore your grace period, pay the entire current balance — not just the statement balance. This stops interest accrual and restores your grace period starting the following billing cycle.' },
    ]
  },
  {
    slug: 'is-balance-transfer-worth-it', tag: 'Balance Transfer', readTime: '6 min',
    title: 'Is a Balance Transfer Worth It?',
    excerpt: 'When the transfer fees and promo APR actually work in your favor.',
    content: [
      { t: 'intro', v: 'Balance transfers are a legitimate debt management tool when used correctly. Move a high-interest balance to a card with 0% promotional APR, pay down the principal aggressively, and save money on interest. The math only works out if you understand the fees, the timeline, and what happens when the promo period ends.' },
      { t: 'h2', v: 'How balance transfers work' },
      { t: 'p', v: 'A balance transfer card offers 0% APR for a promotional period — typically 12–21 months — on transferred balances. You apply for the new card, request a transfer of your existing balance, and the new issuer pays off the old card. You now owe the new card at 0% interest for the promo period.' },
      { t: 'p', v: 'Most offers come with a transfer fee: usually 3–5% of the amount transferred. On a $5,000 balance, a 3% fee costs $150. That $150 needs to be less than the interest you would have paid on the original card for the math to make sense — which is almost always true for any balance over $1,000.' },
      { t: 'h2', v: 'The break-even calculation' },
      { t: 'p', v: 'At 22% APR on $5,000, you would pay about $1,100 in interest over 12 months. A 3% transfer fee costs $150. That is $950 in savings — clearly worth it. At a smaller balance of $1,000 at 22% APR for 6 months, you would pay about $110 in interest versus a $30 fee. Still worth it, but the benefit is modest.' },
      { t: 'h2', v: 'What happens after the promo period' },
      { t: 'p', v: 'After the promotional period, the remaining balance reverts to the card\'s regular APR — often 20–27%. If you have not paid off the transferred balance by then, you are right back where you started. The purpose of a balance transfer is to give you a window of interest-free time to pay down principal aggressively.' },
      { t: 'p', v: 'The correct approach: divide the transferred balance by the number of promo months. That is your required monthly payment to pay it off before the rate reverts. If you cannot afford that payment, the balance transfer may only delay the problem rather than solve it.' },
      { t: 'h2', v: 'The new purchases trap' },
      { t: 'p', v: 'Do not use the balance transfer card for new purchases unless it explicitly offers 0% APR on purchases as well. Many cards only apply the 0% promo to the transferred balance — new purchases immediately accrue interest at the regular APR. By law, your minimum payments are applied to the lowest-rate balance first, so new charges can sit accruing interest for months while you pay down the transfer.' },
      { t: 'tip', v: 'The Balance Transfer Calculator shows you the exact monthly savings and break-even point for your balance, current APR, transfer fee, and promo period — run your real numbers before applying.' },
    ]
  },
  {
    slug: 'minimum-payment-trap', tag: 'Warning', readTime: '6 min',
    title: 'The Minimum Payment Trap',
    excerpt: 'Why minimum payments are one of the most expensive financial habits you can have.',
    content: [
      { t: 'intro', v: 'Credit card minimum payments are designed to look reasonable while ensuring the bank collects maximum interest from you over time. Understanding how the minimum is calculated — and what it actually costs over 20 years — is one of the most important pieces of financial literacy you can have.' },
      { t: 'h2', v: 'How the minimum payment is calculated' },
      { t: 'p', v: 'Most credit cards calculate the minimum as the greater of: $25 (or $35 at some issuers), or 1–2% of your outstanding balance plus all interest and fees charged that month. At lower balances the flat minimum kicks in; at higher balances the percentage calculation produces the larger number.' },
      { t: 'p', v: 'On a $5,000 balance at 20% APR: ($5,000 × 2%) + ($5,000 × 20% ÷ 12) = $100 + $83 = $183 minimum payment. Of that $183, $83 is pure interest — going directly to the bank and reducing your balance by zero.' },
      { t: 'h2', v: 'The true cost over time' },
      { t: 'p', v: 'On a $5,000 balance at 20% APR, making only minimum payments: it takes approximately 22–23 years to pay off the balance. You pay approximately $6,700 in total interest. The total amount paid is nearly $12,000 — more than double the original balance.' },
      { t: 'p', v: 'This is not an unusual scenario. It is the mathematically inevitable outcome of minimum payments on a reasonably-sized credit card balance at typical APR rates. Federal law now requires your monthly statement to display this exact calculation in the "minimum payment warning" disclosure.' },
      { t: 'h2', v: 'Why balances barely move' },
      { t: 'p', v: 'As your balance decreases, your minimum payment also decreases — since it is percentage-based. This means the closer you get to zero, the smaller your payments become, which slows payoff dramatically. Lower balance → lower minimum → less principal reduction → slower progress. It is self-perpetuating.' },
      { t: 'p', v: 'This is why financial advisors recommend paying a fixed dollar amount each month rather than the minimum. If you lock in the payment at whatever the minimum was on day one and never reduce it, you pay off the balance dramatically faster and for far less total interest.' },
      { t: 'h2', v: 'The psychological design' },
      { t: 'p', v: 'Minimum payments are not an accident. They are set at a level that feels manageable while maximizing long-term interest revenue for the issuer. The 2009 CARD Act finally required the minimum payment warning disclosure to be added to every statement — it is the most effective consumer finance disclosure ever mandated.' },
      { t: 'h2', v: 'What to do instead' },
      { t: 'p', v: 'Pay as much as you can afford above the minimum every month. If the minimum is $100, pay $200. The difference in total interest paid is substantial. If you have multiple cards, use the debt avalanche: minimum on all, maximum on the highest APR card.' },
      { t: 'tip', v: 'Use the Minimum Payment Calculator to see the 20-year cost of minimum-only payments on your actual balance — then compare it to paying a fixed amount to see exactly how much interest you save.' },
    ]
  },
]

const CALC_LIST = [
  { id: 'interest', slug: 'interest-calculator', name: 'Interest Calculator', desc: 'Monthly interest cost at your balance and APR' },
  { id: 'payoff', slug: 'payoff-calculator', name: 'Payoff Calculator', desc: 'How long until you pay off your balance' },
  { id: 'minimum', slug: 'minimum-payment-calculator', name: 'Minimum Payment Calculator', desc: 'True cost of minimum-only payments' },
  { id: 'transfer', slug: 'balance-transfer-calculator', name: 'Balance Transfer Calculator', desc: 'Interest saved by transferring to a promo card' },
  { id: 'cashback', slug: 'cash-back-calculator', name: 'Cash Back Calculator', desc: 'Annual rewards from your spending habits' },
  { id: 'points', slug: 'points-value-calculator', name: 'Points Value Calculator', desc: 'Convert points to real dollar value' },
  { id: 'apr', slug: 'apr-comparison-calculator', name: 'APR Comparison Calculator', desc: 'Side-by-side cost of two different APRs' },
  { id: 'utilization', slug: 'credit-utilization-calculator', name: 'Credit Utilization Calculator', desc: 'Your utilization ratio and score impact' },
]

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const s = {
  card: { background: '#fff', border: `0.5px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' },
  cardAlt: { background: C.offWhite, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' },
  sectionLabel: { fontSize: 10, fontWeight: 500, color: C.gold, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", marginBottom: 6 },
  h2serif: { fontFamily: "'Libre Baskerville', serif", fontSize: 24, fontWeight: 700, color: C.text, margin: '0 0 0', letterSpacing: '-0.3px' },
  mono: { fontFamily: "'DM Mono', monospace" },
}

const Nav = ({ page, navigate }) => (
  <nav style={{ background: C.navy, padding: '0 32px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
    <div onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <svg width="32" height="22" viewBox="0 0 32 22"><rect x="0" y="0" width="32" height="22" rx="4" fill={C.gold}/><rect x="6" y="5" width="20" height="12" rx="2" fill="none" stroke={C.navy} strokeWidth="1.5"/><rect x="6" y="9" width="20" height="3" fill={C.navy} opacity="0.5"/></svg>
      <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, fontWeight: 700, color: '#fff' }}>Card<span style={{ color: C.gold }}>Mechanics</span></span>
    </div>
    <div style={{ display: 'flex', gap: 28 }}>
      {[['calculators','Calculators'],['guides','Guides']].map(([p, label]) => (
        <span key={p} onClick={() => navigate(p)} style={{ fontSize: 13, color: page === p ? '#fff' : 'rgba(255,255,255,0.55)', cursor: 'pointer', fontWeight: page === p ? 500 : 400 }}>{label}</span>
      ))}
    </div>
    <button onClick={() => navigate('calculators')} style={{ background: C.gold, color: C.navy, border: 'none', padding: '8px 18px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
      Open a Calculator
    </button>
  </nav>
)

const Footer = ({ navigate }) => (
  <footer style={{ background: C.navy, padding: '40px 32px', marginTop: 0 }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Card<span style={{ color: C.gold }}>Mechanics</span></div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6, maxWidth: 280 }}>Free credit card calculators and plain-English guides. No account required, no data collected.</p>
        </div>
        <div style={{ display: 'flex', gap: 48 }}>
          <div>
            <div style={{ fontSize: 11, color: C.gold, fontFamily: "'DM Mono', monospace", letterSpacing: '1px', marginBottom: 12, textTransform: 'uppercase' }}>Calculators</div>
            {CALC_LIST.slice(0,4).map(c => <div key={c.id} onClick={() => navigate('calculators/' + c.slug)} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8, cursor: 'pointer' }}>{c.name}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.gold, fontFamily: "'DM Mono', monospace", letterSpacing: '1px', marginBottom: 12, textTransform: 'uppercase' }}>Guides</div>
            {GUIDES.slice(0,4).map(g => <div key={g.slug} onClick={() => navigate('guides/' + g.slug)} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8, cursor: 'pointer', maxWidth: 200 }}>{g.title}</div>)}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>© 2026 CardMechanics.com — For informational purposes only. Not financial advice.</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>All calculations are client-side. No data leaves your device.</span>
      </div>
    </div>
  </footer>
)

const SliderRow = ({ label, min, max, step, value, onChange, fmt }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
      <span style={{ fontSize: 12, color: C.textMuted }}>{label}</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, color: C.text }}>{fmt ? fmt(value) : value}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: '100%', accentColor: C.gold }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
      <span style={{ fontSize: 10, color: C.textMuted }}>{fmt ? fmt(min) : min}</span>
      <span style={{ fontSize: 10, color: C.textMuted }}>{fmt ? fmt(max) : max}</span>
    </div>
  </div>
)

const BigStat = ({ label, value, sub, gold, danger }) => (
  <div style={{ background: gold ? C.goldLight : danger ? C.redLight : C.offWhite, border: `0.5px solid ${gold ? C.goldBorder : danger ? 'rgba(220,38,38,0.2)' : C.border}`, borderRadius: 10, padding: '16px', textAlign: 'center' }}>
    <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.8px', fontFamily: "'DM Mono', monospace" }}>{label}</div>
    <div style={{ fontSize: 24, fontFamily: "'DM Mono', monospace", fontWeight: 500, color: gold ? C.gold : danger ? C.red : C.text }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{sub}</div>}
  </div>
)

const Insight = ({ text }) => (
  <div style={{ marginTop: 16, padding: '12px 16px', background: C.goldLight, border: `0.5px solid ${C.goldBorder}`, borderRadius: 8, fontSize: 12, color: C.textMid, lineHeight: 1.65 }}>{text}</div>
)

const GuideLink = ({ navigate }) => (
  <div style={{ marginTop: 20, padding: '14px 18px', background: C.offWhite, border: `0.5px solid ${C.border}`, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: 12, color: C.textMuted }}>Learn the math behind this tool</span>
    <button onClick={() => navigate('guides')} style={{ background: 'none', border: `0.5px solid ${C.border}`, padding: '6px 14px', borderRadius: 6, fontSize: 11, cursor: 'pointer', color: C.textMid, fontFamily: "'DM Sans', sans-serif" }}>Browse Guides →</button>
  </div>
)

// ─── CALCULATORS ─────────────────────────────────────────────────────────────
const CalcInterest = ({ navigate }) => {
  const [balance, setBalance] = useState(3500)
  const [apr, setApr] = useState(22)
  const monthly = balance * apr / 100 / 12
  const daily = balance * apr / 100 / 365
  const annual = balance * apr / 100
  return (
    <div>
      <SliderRow label="Current Balance" min={100} max={25000} step={100} value={balance} onChange={setBalance} fmt={v => '$' + v.toLocaleString()} />
      <SliderRow label="APR (%)" min={1} max={36} step={0.5} value={apr} onChange={setApr} fmt={v => v + '%'} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 20 }}>
        <BigStat label="Monthly interest" value={fmtDec(monthly)} gold />
        <BigStat label="Daily interest" value={fmtDec(daily, 3)} />
        <BigStat label="Annual cost" value={fmt$(annual)} />
      </div>
      <Insight text={`At ${apr}% APR, a $${balance.toLocaleString()} balance costs ${fmtDec(monthly)} per month in interest alone — money that does not reduce your balance by one dollar.`} />
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CalcPayoff = ({ navigate }) => {
  const [balance, setBalance] = useState(4000)
  const [apr, setApr] = useState(22)
  const [payment, setPayment] = useState(150)
  const rate = apr / 100 / 12
  let months = 0, totalInt = 0, bal = balance
  const canPayoff = payment > bal * rate
  if (canPayoff) {
    while (bal > 0.01 && months < 720) {
      const interest = bal * rate
      totalInt += interest
      bal = Math.max(0, bal - (payment - interest))
      months++
    }
  }
  const yrs = Math.floor(months / 12), mos = months % 12
  const timeStr = yrs > 0 ? `${yrs}y ${mos}m` : `${months}mo`
  return (
    <div>
      <SliderRow label="Balance" min={100} max={25000} step={100} value={balance} onChange={setBalance} fmt={v => '$' + v.toLocaleString()} />
      <SliderRow label="APR (%)" min={1} max={36} step={0.5} value={apr} onChange={setApr} fmt={v => v + '%'} />
      <SliderRow label="Monthly Payment" min={25} max={2000} step={25} value={payment} onChange={setPayment} fmt={v => '$' + v} />
      {!canPayoff
        ? <div style={{ marginTop: 16, padding: '12px 16px', background: C.redLight, border: '0.5px solid rgba(220,38,38,0.2)', borderRadius: 8, fontSize: 12, color: C.red }}>Payment does not cover monthly interest — increase your payment amount.</div>
        : <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 20 }}>
            <BigStat label="Time to payoff" value={timeStr} gold />
            <BigStat label="Total interest" value={fmt$(totalInt)} danger />
            <BigStat label="Total paid" value={fmt$(balance + totalInt)} />
          </div>
          <Insight text={`Increasing your payment by $50/mo saves approximately ${fmt$(totalInt * 0.18)} in interest and cuts ${Math.round(months * 0.15)} months off your payoff timeline.`} />
        </div>
      }
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CalcMinimum = ({ navigate }) => {
  const [balance, setBalance] = useState(5000)
  const [apr, setApr] = useState(20)
  const [fixedPayment, setFixedPayment] = useState(200)
  const rate = apr / 100 / 12
  // Minimum payment simulation (2% of balance + interest, min $25)
  let minMonths = 0, minInt = 0, minBal = balance
  while (minBal > 0.01 && minMonths < 1200) {
    const interest = minBal * rate
    const minPay = Math.max(25, minBal * 0.02 + interest)
    minInt += interest
    minBal = Math.max(0, minBal - (minPay - interest))
    minMonths++
  }
  // Fixed payment simulation
  let fixMonths = 0, fixInt = 0, fixBal = balance
  const canFix = fixedPayment > balance * rate
  if (canFix) {
    while (fixBal > 0.01 && fixMonths < 720) {
      const interest = fixBal * rate
      fixInt += interest
      fixBal = Math.max(0, fixBal - (fixedPayment - interest))
      fixMonths++
    }
  }
  const saved = minInt - fixInt
  const minYrs = Math.floor(minMonths / 12), fixYrs = Math.floor(fixMonths / 12)
  return (
    <div>
      <SliderRow label="Balance" min={500} max={25000} step={100} value={balance} onChange={setBalance} fmt={v => '$' + v.toLocaleString()} />
      <SliderRow label="APR (%)" min={1} max={36} step={0.5} value={apr} onChange={setApr} fmt={v => v + '%'} />
      <SliderRow label="Fixed Monthly Payment" min={25} max={2000} step={25} value={fixedPayment} onChange={setFixedPayment} fmt={v => '$' + v} />
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <div style={{ ...s.cardAlt, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>Minimum Payments Only</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 20, fontWeight: 500, color: C.red, marginBottom: 4 }}>{fmt$(minInt)}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>Total interest · {minYrs} years</div>
          </div>
          <div style={{ ...s.card, padding: '14px 16px', border: `0.5px solid ${C.goldBorder}` }}>
            <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>Fixed ${fixedPayment}/mo</div>
            {canFix ? <>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 20, fontWeight: 500, color: C.green, marginBottom: 4 }}>{fmt$(fixInt)}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>Total interest · {fixYrs > 0 ? fixYrs + 'y ' : ''}{fixMonths % 12}m</div>
            </> : <div style={{ fontSize: 12, color: C.red }}>Increase payment amount</div>}
          </div>
        </div>
        {canFix && <BigStat label="Interest saved by paying fixed" value={fmt$(saved)} gold />}
        <Insight text={`Making only minimum payments on a $${balance.toLocaleString()} balance at ${apr}% APR takes ${minYrs} years and costs ${fmt$(minInt)} in interest — more than the original balance.`} />
      </div>
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CalcTransfer = ({ navigate }) => {
  const [balance, setBalance] = useState(5000)
  const [currentApr, setCurrentApr] = useState(22)
  const [transferFee, setTransferFee] = useState(3)
  const [promoMonths, setPromoMonths] = useState(15)
  const monthlyInterestCurrent = balance * currentApr / 100 / 12
  const totalInterestWithout = monthlyInterestCurrent * promoMonths
  const fee = balance * transferFee / 100
  const netSavings = totalInterestWithout - fee
  const worthIt = netSavings > 0
  const requiredMonthly = balance / promoMonths
  return (
    <div>
      <SliderRow label="Balance to Transfer" min={500} max={25000} step={100} value={balance} onChange={setBalance} fmt={v => '$' + v.toLocaleString()} />
      <SliderRow label="Current APR (%)" min={1} max={36} step={0.5} value={currentApr} onChange={setCurrentApr} fmt={v => v + '%'} />
      <SliderRow label="Transfer Fee (%)" min={0} max={5} step={0.5} value={transferFee} onChange={setTransferFee} fmt={v => v + '%'} />
      <SliderRow label="Promo Period (months)" min={6} max={24} step={1} value={promoMonths} onChange={setPromoMonths} fmt={v => v + ' mo'} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 20 }}>
        <BigStat label="Transfer fee" value={fmtDec(fee)} />
        <BigStat label="Interest avoided" value={fmt$(totalInterestWithout)} />
        <BigStat label="Net savings" value={fmt$(netSavings)} gold={worthIt} danger={!worthIt} />
      </div>
      <div style={{ marginTop: 12, ...s.cardAlt, padding: '14px 16px', borderRadius: 10 }}>
        <div style={{ fontSize: 12, color: C.textMid, marginBottom: 6 }}>To pay off before the promo rate expires, you need to pay:</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, fontWeight: 500, color: C.text }}>${requiredMonthly.toFixed(0)}<span style={{ fontSize: 13, color: C.textMuted }}>/month for {promoMonths} months</span></div>
      </div>
      <Insight text={worthIt ? `This transfer saves you ${fmt$(netSavings)} — the ${fmtDec(fee)} fee is easily offset by ${fmt$(totalInterestWithout)} in avoided interest over ${promoMonths} months.` : `The transfer fee exceeds the interest you would save. Consider keeping the balance or finding an offer with a lower transfer fee.`} />
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CalcCashback = ({ navigate }) => {
  const [groceries, setGroceries] = useState(400)
  const [dining, setDining] = useState(300)
  const [gas, setGas] = useState(150)
  const [travel, setTravel] = useState(200)
  const [other, setOther] = useState(500)
  const [rates, setRates] = useState({ groceries: 3, dining: 3, gas: 2, travel: 2, other: 1.5 })
  const categories = [['groceries','Groceries',groceries,setGroceries],['dining','Dining',dining,setDining],['gas','Gas',gas,setGas],['travel','Travel',travel,setTravel],['other','Other',other,setOther]]
  const monthly = categories.reduce((sum, [key, , spend]) => sum + spend * rates[key] / 100, 0)
  const annual = monthly * 12
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: C.textMuted }}>Category</span>
          <span style={{ fontSize: 11, color: C.textMuted, textAlign: 'center' }}>Cash Back %</span>
        </div>
        {categories.map(([key, label, val, setter]) => (
          <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 8, alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>{label} ($/mo)</div>
              <input type="number" value={val} onChange={e => setter(Number(e.target.value) || 0)} style={{ width: '100%', padding: '7px 10px', border: `0.5px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "'DM Mono',monospace", background: C.offWhite, color: C.text, boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>Rate</div>
              <select value={rates[key]} onChange={e => setRates(r => ({...r, [key]: Number(e.target.value)}))} style={{ width: '100%', padding: '7px 6px', border: `0.5px solid ${C.border}`, borderRadius: 6, fontSize: 12, background: C.offWhite, color: C.text }}>
                {[1, 1.5, 2, 2.5, 3, 4, 5].map(r => <option key={r} value={r}>{r}%</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <BigStat label="Monthly earnings" value={fmtDec(monthly)} />
        <BigStat label="Annual earnings" value={fmtDec(annual)} gold />
      </div>
      <Insight text={`Your spending earns ${fmtDec(monthly)} per month. Check that your card actually offers these category rates — many cards default to 1% on anything outside their bonus categories.`} />
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CalcPoints = ({ navigate }) => {
  const [points, setPoints] = useState(50000)
  const redemptions = [
    { label: 'Cash / Statement Credit', cpp: 1.0 },
    { label: 'Travel Portal Booking', cpp: 1.25 },
    { label: 'Transfer Partner (good)', cpp: 1.8 },
    { label: 'Transfer Partner (great)', cpp: 2.5 },
    { label: 'Gift Cards', cpp: 0.8 },
  ]
  return (
    <div>
      <SliderRow label="Points Balance" min={1000} max={500000} step={1000} value={points} onChange={setPoints} fmt={v => v.toLocaleString() + ' pts'} />
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {redemptions.map(({ label, cpp }) => {
          const val = points * cpp / 100
          const isGood = cpp >= 1.8
          return (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: isGood ? C.goldLight : C.offWhite, border: `0.5px solid ${isGood ? C.goldBorder : C.border}`, borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{label}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{cpp} cpp</div>
              </div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 500, color: isGood ? C.gold : C.text }}>${val.toFixed(0)}</div>
            </div>
          )
        })}
      </div>
      <Insight text={`${points.toLocaleString()} points is worth ${fmtDec(points * 0.01)} in cash or up to ${fmtDec(points * 0.025)} via premium transfer partners. The spread between redemption types can be significant.`} />
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CalcAPR = ({ navigate }) => {
  const [balance, setBalance] = useState(5000)
  const [apr1, setApr1] = useState(18)
  const [apr2, setApr2] = useState(26)
  const [months, setMonths] = useState(12)
  const int1 = balance * apr1 / 100 / 12 * months
  const int2 = balance * apr2 / 100 / 12 * months
  const saved = int2 - int1
  return (
    <div>
      <SliderRow label="Balance" min={100} max={25000} step={100} value={balance} onChange={setBalance} fmt={v => '$' + v.toLocaleString()} />
      <SliderRow label="APR Option A (%)" min={1} max={36} step={0.5} value={apr1} onChange={setApr1} fmt={v => v + '%'} />
      <SliderRow label="APR Option B (%)" min={1} max={36} step={0.5} value={apr2} onChange={setApr2} fmt={v => v + '%'} />
      <SliderRow label="Time Period (months)" min={1} max={60} step={1} value={months} onChange={setMonths} fmt={v => v + ' mo'} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 20 }}>
        <BigStat label={`Interest @ ${apr1}%`} value={fmt$(int1)} />
        <BigStat label={`Interest @ ${apr2}%`} value={fmt$(int2)} danger />
        <BigStat label="Difference" value={fmt$(saved)} gold />
      </div>
      <Insight text={`Over ${months} months, the difference between ${apr1}% and ${apr2}% APR on a $${balance.toLocaleString()} balance is ${fmt$(saved)} in extra interest charges — enough to matter on any significant balance.`} />
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CalcUtilization = ({ navigate }) => {
  const [limit, setLimit] = useState(10000)
  const [balance, setBalance] = useState(3200)
  const util = limit > 0 ? (balance / limit) * 100 : 0
  const getImpact = u => {
    if (u <= 10) return { label: 'Excellent', color: C.green, advice: 'Under 10% utilization is ideal for maximizing your credit score.' }
    if (u <= 30) return { label: 'Good', color: '#65a30d', advice: 'Under 30% is the commonly cited threshold. You are in a solid range.' }
    if (u <= 50) return { label: 'Fair', color: '#d97706', advice: 'Above 30% starts to negatively impact your score. Try to pay this down.' }
    if (u <= 75) return { label: 'Poor', color: '#ea580c', advice: 'High utilization is likely hurting your credit score significantly.' }
    return { label: 'Very High', color: C.red, advice: 'Utilization above 75% will severely damage your credit score. Prioritize paying this down.' }
  }
  const impact = getImpact(util)
  const target30 = Math.max(0, balance - limit * 0.3)
  const target10 = Math.max(0, balance - limit * 0.1)
  return (
    <div>
      <SliderRow label="Total Credit Limit" min={500} max={100000} step={500} value={limit} onChange={setLimit} fmt={v => '$' + v.toLocaleString()} />
      <SliderRow label="Total Balance" min={0} max={limit} step={100} value={Math.min(balance, limit)} onChange={setBalance} fmt={v => '$' + v.toLocaleString()} />
      <div style={{ marginTop: 20, padding: '20px', background: C.offWhite, border: `0.5px solid ${C.border}`, borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: C.textMuted }}>Utilization Ratio</span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 28, fontWeight: 500, color: impact.color }}>{util.toFixed(1)}%</span>
        </div>
        <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ height: '100%', width: util + '%', background: impact.color, transition: 'width 0.3s', borderRadius: 4, maxWidth: '100%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: impact.color }}>{impact.label}</span>
          <span style={{ fontSize: 11, color: C.textMuted }}>Target: under 30%</span>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        {target30 > 0 && <div style={{ padding: '10px 14px', background: C.offWhite, border: `0.5px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.textMid, marginBottom: 8 }}>Pay {fmt$(target30)} to reach 30% utilization</div>}
        {target10 > 0 && <div style={{ padding: '10px 14px', background: C.goldLight, border: `0.5px solid ${C.goldBorder}`, borderRadius: 8, fontSize: 12, color: C.textMid }}>Pay {fmt$(target10)} to reach 10% utilization (ideal)</div>}
        {util <= 10 && <div style={{ padding: '10px 14px', background: C.greenLight, border: '0.5px solid rgba(22,163,74,0.25)', borderRadius: 8, fontSize: 12, color: C.textMid }}>You are at ideal utilization for maximizing your credit score.</div>}
      </div>
      <Insight text={impact.advice} />
      <GuideLink navigate={navigate} />
    </div>
  )
}

const CALC_COMPONENTS = { interest: CalcInterest, payoff: CalcPayoff, minimum: CalcMinimum, transfer: CalcTransfer, cashback: CalcCashback, points: CalcPoints, apr: CalcAPR, utilization: CalcUtilization }

// ─── PAGES ───────────────────────────────────────────────────────────────────
const HomePage = ({ navigate }) => {
  const tagColors = { Beginner: '#dcfce7', Strategy: '#dbeafe', Basics: '#fef9c3', Payoff: '#ffe4e6', Rewards: '#fce7f3', 'Balance Transfer': '#e0e7ff', Warning: '#ffedd5' }
  const tagText = { Beginner: '#166534', Strategy: '#1e40af', Basics: '#854d0e', Payoff: '#9f1239', Rewards: '#9d174d', 'Balance Transfer': '#3730a3', Warning: '#9a3412' }
  return (
    <div>
      {/* Hero */}
      <div style={{ background: C.navy, padding: '60px 32px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(201,162,39,0.15)', border: `0.5px solid ${C.goldBorder}`, color: C.gold, fontSize: 11, fontWeight: 500, padding: '4px 12px', borderRadius: 20, marginBottom: 22, fontFamily: "'DM Mono',monospace", letterSpacing: '0.5px' }}>8 Free Calculators</div>
            <h1 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 18px', letterSpacing: '-0.5px' }}>Understand every number behind your <em style={{ color: C.gold, fontStyle: 'italic' }}>credit cards</em></h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 28px', fontWeight: 300 }}>Free calculators and plain-English guides that show you how interest compounds, how long payoff takes, and whether that rewards card is actually worth it.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => navigate('calculators')} style={{ background: C.gold, color: C.navy, border: 'none', padding: '12px 24px', borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Explore Calculators</button>
              <button onClick={() => navigate('guides')} style={{ background: 'transparent', color: 'rgba(255,255,255,0.8)', border: '0.5px solid rgba(255,255,255,0.25)', padding: '12px 24px', borderRadius: 7, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Read the Guides</button>
            </div>
          </div>
          {/* Hero mini calc */}
          <div style={{ background: C.navyCard, border: `0.5px solid ${C.goldBorder}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 10, color: C.gold, fontFamily: "'DM Mono',monospace", letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 18 }}>Quick Interest Check</div>
            <HeroCalc />
          </div>
        </div>
      </div>
      {/* Stats bar */}
      <div style={{ background: '#0a0f15', padding: '16px 32px', display: 'flex', justifyContent: 'center', gap: 56, borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        {[['8','Free calculators'],['9','In-depth guides'],['$0','Cost, always'],['100%','Client-side math']].map(([n,l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 500, color: C.gold }}>{n}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Calculators */}
      <div style={{ padding: '48px 32px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div><div style={s.sectionLabel}>Tools</div><h2 style={s.h2serif}>Calculator Suite</h2></div>
          <span onClick={() => navigate('calculators')} style={{ fontSize: 13, color: C.textMuted, cursor: 'pointer', borderBottom: `0.5px solid ${C.border}` }}>All calculators →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {CALC_LIST.map(c => (
            <div key={c.id} onClick={() => navigate('calculators/' + c.slug)} style={{ ...s.card, cursor: 'pointer', transition: 'border-color 0.15s' }}>
              <svg width="36" height="26" viewBox="0 0 36 26" style={{ marginBottom: 14 }}><rect x="0" y="0" width="36" height="26" rx="4" fill={C.navy}/><rect x="6" y="5" width="24" height="16" rx="2" fill="none" stroke={C.gold} strokeWidth="1.5"/><rect x="6" y="10" width="24" height="4" fill={C.gold} opacity="0.25"/></svg>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 5, lineHeight: 1.3 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>{c.desc}</div>
              <div style={{ marginTop: 12, fontSize: 11, color: C.gold, fontFamily: "'DM Mono',monospace" }}>→ Use tool</div>
            </div>
          ))}
        </div>
      </div>
      {/* Guides */}
      <div style={{ background: C.offWhite, padding: '48px 32px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div><div style={s.sectionLabel}>Learning Center</div><h2 style={s.h2serif}>Credit Card Guides</h2></div>
            <span onClick={() => navigate('guides')} style={{ fontSize: 13, color: C.textMuted, cursor: 'pointer', borderBottom: `0.5px solid ${C.borderMid}` }}>All guides →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {GUIDES.map(g => (
              <div key={g.slug} onClick={() => navigate('guides/' + g.slug)} style={{ ...s.card, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace", background: tagColors[g.tag] || '#f3f4f6', color: tagText[g.tag] || C.textMid, padding: '3px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 8 }}>{g.tag}</span>
                  <div style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 5, lineHeight: 1.35 }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>{g.excerpt}</div>
                </div>
                <div style={{ fontSize: 18, color: C.textMuted, flexShrink: 0, marginTop: 2, opacity: 0.4 }}>↗</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const HeroCalc = () => {
  const [bal, setBal] = useState(3500)
  const [apr, setApr] = useState(24.99)
  const monthly = (bal * apr / 100) / 12
  return (
    <div>
      {[['Balance ($)', bal, setBal, 'number'],['APR (%)', apr, setApr, 'number']].map(([label, val, setter, type]) => (
        <div key={label} style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 5 }}>{label}</label>
          <input type={type} value={val} step="0.01" onChange={e => setter(Number(e.target.value) || 0)} style={{ width: '100%', background: C.navy, border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 5, color: '#fff', fontFamily: "'DM Mono',monospace", fontSize: 14, padding: '8px 10px', boxSizing: 'border-box', outline: 'none' }} />
        </div>
      ))}
      <div style={{ background: 'rgba(201,162,39,0.1)', border: `0.5px solid ${C.goldBorder}`, borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Monthly interest charge</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 20, fontWeight: 500, color: C.gold }}>${monthly.toFixed(2)}</span>
      </div>
    </div>
  )
}

const CalculatorsPage = ({ navigate }) => (
  <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 32px' }}>
    <div style={s.sectionLabel}>Tools</div>
    <h1 style={{ ...s.h2serif, fontSize: 28, marginBottom: 10 }}>Calculator Suite</h1>
    <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 36, lineHeight: 1.6 }}>Eight free credit card calculators. Each one runs entirely in your browser — no data sent anywhere.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
      {CALC_LIST.map(c => (
        <div key={c.id} onClick={() => navigate('calculators/' + c.slug)} style={{ ...s.card, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="40" height="28" viewBox="0 0 40 28" style={{ flexShrink: 0 }}><rect x="0" y="0" width="40" height="28" rx="4" fill={C.navy}/><rect x="6" y="5" width="28" height="18" rx="2" fill="none" stroke={C.gold} strokeWidth="1.5"/><rect x="6" y="11" width="28" height="5" fill={C.gold} opacity="0.2"/></svg>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>{c.desc}</div>
            </div>
          </div>
          <div style={{ fontSize: 18, color: C.textMuted, opacity: 0.35, flexShrink: 0 }}>→</div>
        </div>
      ))}
    </div>
  </div>
)

const CalcDetailPage = ({ calc, navigate }) => {
  const ActiveCalc = CALC_COMPONENTS[calc.id]
  const others = CALC_LIST.filter(c => c.id !== calc.id).slice(0, 4)
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 32px' }}>
      <div style={{ marginBottom: 20 }}>
        <span onClick={() => navigate('calculators')} style={{ fontSize: 12, color: C.textMuted, cursor: 'pointer' }}>← All Calculators</span>
      </div>
      <div style={s.sectionLabel}>Calculator</div>
      <h1 style={{ ...s.h2serif, fontSize: 28, marginBottom: 8 }}>{calc.name}</h1>
      <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 28, lineHeight: 1.6 }}>{calc.desc}</p>
      <div style={s.card}>
        <ActiveCalc navigate={navigate} />
      </div>
      <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.textMuted, marginBottom: 14 }}>More calculators</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
          {others.map(c => (
            <div key={c.id} onClick={() => navigate('calculators/' + c.slug)} style={{ padding: '12px 16px', border: `0.5px solid ${C.border}`, borderRadius: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: C.text }}>{c.name}</span>
              <span style={{ fontSize: 11, color: C.textMuted }}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const GuidesPage = ({ navigate }) => {
  const tagColors = { Beginner: '#dcfce7', Strategy: '#dbeafe', Basics: '#fef9c3', Payoff: '#ffe4e6', Rewards: '#fce7f3', 'Balance Transfer': '#e0e7ff', Warning: '#ffedd5' }
  const tagText = { Beginner: '#166534', Strategy: '#1e40af', Basics: '#854d0e', Payoff: '#9f1239', Rewards: '#9d174d', 'Balance Transfer': '#3730a3', Warning: '#9a3412' }
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px' }}>
      <div style={s.sectionLabel}>Learning Center</div>
      <h1 style={{ ...s.h2serif, fontSize: 28, marginBottom: 8 }}>Credit Card Guides</h1>
      <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 36, lineHeight: 1.6 }}>Plain-English explanations of how credit cards really work — interest, rewards, payoff strategies, and everything in between.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {GUIDES.map(g => (
          <div key={g.slug} onClick={() => navigate('guides/' + g.slug)} style={{ ...s.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace", background: tagColors[g.tag] || '#f3f4f6', color: tagText[g.tag] || C.textMid, padding: '3px 8px', borderRadius: 4 }}>{g.tag}</span>
                <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono',monospace" }}>{g.readTime}</span>
              </div>
              <div style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 5 }}>{g.title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{g.excerpt}</div>
            </div>
            <div style={{ fontSize: 22, color: C.textMuted, opacity: 0.3, flexShrink: 0 }}>→</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ArticlePage = ({ guide, navigate }) => {
  const tagColors = { Beginner: '#dcfce7', Strategy: '#dbeafe', Basics: '#fef9c3', Payoff: '#ffe4e6', Rewards: '#fce7f3', 'Balance Transfer': '#e0e7ff', Warning: '#ffedd5' }
  const tagText = { Beginner: '#166534', Strategy: '#1e40af', Basics: '#854d0e', Payoff: '#9f1239', Rewards: '#9d174d', 'Balance Transfer': '#3730a3', Warning: '#9a3412' }
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 32px' }}>
      <div style={{ marginBottom: 24 }}>
        <span onClick={() => navigate('guides')} style={{ fontSize: 12, color: C.textMuted, cursor: 'pointer' }}>← All Guides</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace", background: tagColors[guide.tag] || '#f3f4f6', color: tagText[guide.tag] || C.textMid, padding: '4px 10px', borderRadius: 4 }}>{guide.tag}</span>
        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono',monospace" }}>{guide.readTime} read</span>
      </div>
      <h1 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 32, fontWeight: 700, color: C.text, lineHeight: 1.2, margin: '0 0 32px', letterSpacing: '-0.4px' }}>{guide.title}</h1>
      <div style={{ fontSize: 15, lineHeight: 1.8, color: C.textMid }}>
        {guide.content.map((block, i) => {
          if (block.t === 'intro') return <p key={i} style={{ fontSize: 16, color: C.text, lineHeight: 1.75, marginBottom: 24, fontWeight: 400, borderLeft: `3px solid ${C.gold}`, paddingLeft: 18 }}>{block.v}</p>
          if (block.t === 'h2') return <h2 key={i} style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 20, fontWeight: 700, color: C.text, margin: '36px 0 12px', letterSpacing: '-0.2px' }}>{block.v}</h2>
          if (block.t === 'p') return <p key={i} style={{ marginBottom: 16, color: C.textMid, lineHeight: 1.8 }}>{block.v}</p>
          if (block.t === 'tip') return (
            <div key={i} style={{ margin: '28px 0', padding: '16px 20px', background: C.goldLight, border: `0.5px solid ${C.goldBorder}`, borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: C.gold, fontFamily: "'DM Mono',monospace", letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Calculator Tip</div>
              <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.65 }}>{block.v}</p>
            </div>
          )
          return null
        })}
      </div>
      <div style={{ marginTop: 48, padding: '24px', background: C.navy, borderRadius: 14 }}>
        <div style={{ fontSize: 10, color: C.gold, fontFamily: "'DM Mono',monospace", letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Put It Into Practice</div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px', lineHeight: 1.6 }}>Use the calculators to run the real numbers for your own situation.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('calculators')} style={{ background: C.gold, color: C.navy, border: 'none', padding: '10px 20px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Open Calculators</button>
          <button onClick={() => navigate('guides')} style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>More Guides</button>
        </div>
      </div>
      {/* Related guides */}
      <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.textMuted, marginBottom: 14 }}>More guides</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {GUIDES.filter(g => g.slug !== guide.slug).slice(0, 3).map(g => (
            <div key={g.slug} onClick={() => navigate('guides/' + g.slug)} style={{ padding: '12px 16px', border: `0.5px solid ${C.border}`, borderRadius: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontFamily: "'Libre Baskerville',serif", color: C.text }}>{g.title}</span>
              <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono',monospace" }}>{g.readTime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => urlToPage(window.location.pathname))

  useEffect(() => {
    const handlePop = () => setPage(urlToPage(window.location.pathname))
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = newPage => {
    window.history.pushState({}, '', pageToUrl(newPage))
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    if (page === 'home') return <HomePage navigate={navigate} />
    if (page === 'calculators') return <CalculatorsPage navigate={navigate} />
    if (page.startsWith('calculators/')) {
      const slug = page.replace('calculators/', '')
      const calc = CALC_LIST.find(c => c.slug === slug)
      if (calc) return <CalcDetailPage calc={calc} navigate={navigate} />
    }
    if (page === 'guides') return <GuidesPage navigate={navigate} />
    if (page.startsWith('guides/')) {
      const slug = page.replace('guides/', '')
      const guide = GUIDES.find(g => g.slug === slug)
      if (guide) return <ArticlePage guide={guide} navigate={navigate} />
    }
    return <HomePage navigate={navigate} />
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.text, background: '#fff', minHeight: '100vh' }}>
      <Nav page={page} navigate={navigate} />
      {renderPage()}
      <Footer navigate={navigate} />
    </div>
  )
}
