import { useState, useCallback } from 'react'

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg:       '#08090f',
  bgCard:   '#0f1018',
  bgDeep:   '#060710',
  bgHover:  '#141520',
  accent:   '#00e5a0',
  accentDim:'#00b87d',
  accentBg: 'rgba(0,229,160,0.08)',
  accentBorder: 'rgba(0,229,160,0.2)',
  blue:     '#3b82f6',
  blueDim:  '#2563eb',
  yellow:   '#f59e0b',
  red:      '#ef4444',
  text:     '#e8e8f0',
  textDim:  '#8888aa',
  textMuted:'#44445a',
  border:   '#1a1a2e',
  borderLight: '#22223a',
}

const F = {
  display: "'Syne', sans-serif",
  body:    "'Space Grotesk', sans-serif",
  mono:    "'JetBrains Mono', monospace",
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const Label = ({ children, style }) => (
  <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent, marginBottom: 8, ...style }}>
    {children}
  </div>
)

const Tag = ({ children, color = C.accent }) => (
  <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color, background: `${color}18`, border: `1px solid ${color}30`, borderRadius: 4, padding: '2px 8px' }}>
    {children}
  </span>
)

const Card = ({ children, style }) => (
  <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, ...style }}>
    {children}
  </div>
)

const BigStat = ({ label, value, sub, highlight }) => (
  <div style={{ background: highlight ? C.accentBg : C.bgDeep, border: `1px solid ${highlight ? C.accentBorder : C.border}`, borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
    <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textDim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: F.mono, fontSize: 28, fontWeight: 600, color: highlight ? C.accent : C.text, lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted, marginTop: 6 }}>{sub}</div>}
  </div>
)

const SliderRow = ({ label, value, min, max, step = 1, onChange, format = v => v, minLabel, maxLabel }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim }}>{label}</label>
      <span style={{ fontFamily: F.mono, fontSize: 14, color: C.accent, fontWeight: 600 }}>{format(value)}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
      style={{ width: '100%', accentColor: C.accent, cursor: 'pointer', height: 4 }} />
    {(minLabel || maxLabel) && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{minLabel}</span>
        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{maxLabel}</span>
      </div>
    )}
  </div>
)

const SelectRow = ({ label, value, options, onChange }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: C.bgDeep, border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: '10px 14px', color: C.text, fontFamily: F.body, fontSize: 14, cursor: 'pointer', outline: 'none' }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
)

const AffiliateCTA = () => (
  <div style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 12, padding: 20, marginTop: 24 }}>
    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Find A Better Card</div>
    <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 14, lineHeight: 1.5 }}>
      If the math shows you're overpaying, it might be time to switch. Compare cards from real issuers — no fluff.
    </p>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {[
        { name: 'CardRatings', url: 'https://www.cardratings.com/?aid=cardvaluelab' },
        { name: 'CreditCards.com', url: 'https://www.creditcards.com/?aid=cardvaluelab' },
        { name: 'NerdWallet', url: 'https://www.nerdwallet.com/cards?utm_source=cardvaluelab' },
      ].map(a => (
        <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, border: `1px solid ${C.accentBorder}`, borderRadius: 6, padding: '6px 14px', textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => e.target.style.background = C.accentBg}
          onMouseLeave={e => e.target.style.background = 'transparent'}>
          {a.name} →
        </a>
      ))}
    </div>
  </div>
)

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 16, marginBottom: 16 }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
        <span style={{ fontFamily: F.body, fontSize: 15, color: C.text, fontWeight: 500 }}>{q}</span>
        <span style={{ fontFamily: F.mono, fontSize: 16, color: C.accent, marginLeft: 16 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{a}</p>}
    </div>
  )
}

const ToolCTA = ({ page, setPage }) => (
  <div style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginTop: 28, textAlign: 'center' }}>
    <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 12 }}>Ready to run the numbers on your own card?</p>
    <button onClick={() => setPage('tools')}
      style={{ fontFamily: F.mono, fontSize: 13, color: C.bg, background: C.accent, border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}>
      Open Free Calculators →
    </button>
  </div>
)

const fmt$ = v => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt$0 = v => '$' + Math.round(v).toLocaleString()
const fmtPct = v => v.toFixed(2) + '%'

// ─── CALCULATORS ─────────────────────────────────────────────────────────────

// 1. Credit Card Interest Calculator
const InterestCalc = () => {
  const [balance, setBalance] = useState(3500)
  const [apr, setApr] = useState(22)
  const [payment, setPayment] = useState(120)

  const monthlyRate = apr / 100 / 12
  let bal = balance, months = 0, totalInterest = 0
  while (bal > 0 && months < 600) {
    const interest = bal * monthlyRate
    totalInterest += interest
    bal = bal + interest - payment
    if (bal < 0) bal = 0
    months++
    if (payment <= bal * monthlyRate) { months = 999; break }
  }
  const totalPaid = balance + totalInterest
  const minPayWarning = payment <= balance * monthlyRate

  return (
    <div>
      <Label>Credit Card Interest Calculator</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        See exactly how long it takes to pay off your balance and how much interest you'll pay total.
      </p>
      <SliderRow label="Current Balance" value={balance} min={100} max={30000} step={100} onChange={setBalance} format={fmt$0} minLabel="$100" maxLabel="$30,000" />
      <SliderRow label="APR" value={apr} min={1} max={36} step={0.5} onChange={setApr} format={v => v + '%'} minLabel="1%" maxLabel="36%" />
      <SliderRow label="Monthly Payment" value={payment} min={25} max={2000} step={25} onChange={setPayment} format={fmt$0} minLabel="$25" maxLabel="$2,000" />
      {minPayWarning ? (
        <div style={{ background: '#ef444420', border: '1px solid #ef444440', borderRadius: 10, padding: 14, marginBottom: 20 }}>
          <span style={{ fontFamily: F.body, fontSize: 13, color: '#ef4444' }}>⚠️ Your payment doesn't cover the monthly interest — balance will grow forever.</span>
        </div>
      ) : null}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
        <BigStat label="Months to Pay Off" value={months >= 999 ? '∞' : months} highlight />
        <BigStat label="Total Interest Paid" value={months >= 999 ? '∞' : fmt$(totalInterest)} />
        <BigStat label="Total Amount Paid" value={months >= 999 ? '∞' : fmt$(totalPaid)} />
        <BigStat label="Monthly Interest" value={fmt$(balance * monthlyRate)} />
      </div>
      <AffiliateCTA />
    </div>
  )
}

// 2. Rewards Points Value Calculator
const PointsCalc = () => {
  const [points, setPoints] = useState(50000)
  const [cppMin, setCppMin] = useState(1.0)
  const [cppMax, setCppMax] = useState(2.0)
  const [program, setProgram] = useState('chase')

  const programs = {
    chase: { name: 'Chase Ultimate Rewards', cppLow: 1.0, cppHigh: 2.0 },
    amex: { name: 'Amex Membership Rewards', cppLow: 0.8, cppHigh: 2.0 },
    citi: { name: 'Citi ThankYou Points', cppLow: 0.8, cppHigh: 1.7 },
    capital: { name: 'Capital One Miles', cppLow: 1.0, cppHigh: 1.7 },
    custom: { name: 'Custom', cppLow: cppMin, cppHigh: cppMax },
  }

  const p = programs[program]
  const lowVal = points * p.cppLow / 100
  const highVal = points * p.cppHigh / 100

  return (
    <div>
      <Label>Rewards Points Value Calculator</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        Convert your points or miles to dollars using real cents-per-point estimates.
      </p>
      <SelectRow label="Points Program" value={program} onChange={setProgram} options={[
        { value: 'chase', label: 'Chase Ultimate Rewards' },
        { value: 'amex', label: 'Amex Membership Rewards' },
        { value: 'citi', label: 'Citi ThankYou Points' },
        { value: 'capital', label: 'Capital One Miles' },
        { value: 'custom', label: 'Custom / Other' },
      ]} />
      <SliderRow label="Points Balance" value={points} min={1000} max={500000} step={1000} onChange={setPoints} format={v => v.toLocaleString()} minLabel="1,000" maxLabel="500,000" />
      {program === 'custom' && <>
        <SliderRow label="Min Value (cpp)" value={cppMin} min={0.3} max={3} step={0.1} onChange={setCppMin} format={v => v.toFixed(1) + '¢'} />
        <SliderRow label="Max Value (cpp)" value={cppMax} min={0.3} max={3} step={0.1} onChange={setCppMax} format={v => v.toFixed(1) + '¢'} />
      </>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
        <BigStat label="Conservative Value" value={fmt$(lowVal)} sub={`${p.cppLow}¢ per point`} />
        <BigStat label="Optimized Value" value={fmt$(highVal)} sub={`${p.cppHigh}¢ per point`} highlight />
      </div>
      <div style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginTop: 12 }}>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 0, lineHeight: 1.6 }}>
          💡 <strong style={{ color: C.text }}>Tip:</strong> Redeeming through travel partners usually gets you closest to the high end. Cash back redemptions typically land at the low end.
        </p>
      </div>
      <AffiliateCTA />
    </div>
  )
}

// 3. Balance Transfer Calculator
const BalanceTransferCalc = () => {
  const [balance, setBalance] = useState(5000)
  const [currentApr, setCurrentApr] = useState(24)
  const [transferFee, setTransferFee] = useState(3)
  const [promoMonths, setPromoMonths] = useState(15)
  const [payment, setPayment] = useState(350)

  const monthlyRate = currentApr / 100 / 12
  const fee = balance * (transferFee / 100)
  const promoBalance = balance + fee
  const promoPayoff = promoBalance / promoMonths

  let interestSaved = 0
  let bal = balance
  for (let i = 0; i < promoMonths; i++) {
    interestSaved += bal * monthlyRate
    bal = Math.max(0, bal - payment)
  }
  const netSavings = interestSaved - fee
  const worthIt = netSavings > 0

  return (
    <div>
      <Label>Balance Transfer Savings Calculator</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        Find out whether a 0% promo offer actually saves you money after the transfer fee.
      </p>
      <SliderRow label="Balance to Transfer" value={balance} min={500} max={25000} step={250} onChange={setBalance} format={fmt$0} minLabel="$500" maxLabel="$25,000" />
      <SliderRow label="Current APR" value={currentApr} min={10} max={36} step={0.5} onChange={setCurrentApr} format={v => v + '%'} />
      <SliderRow label="Transfer Fee" value={transferFee} min={0} max={5} step={0.5} onChange={setTransferFee} format={v => v + '%'} />
      <SliderRow label="0% Promo Period" value={promoMonths} min={6} max={24} step={1} onChange={setPromoMonths} format={v => v + ' mo'} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
        <BigStat label="Transfer Fee Cost" value={fmt$(fee)} />
        <BigStat label="Interest Avoided" value={fmt$(interestSaved)} highlight />
        <BigStat label="Net Savings" value={fmt$(Math.abs(netSavings))} sub={worthIt ? 'you save this' : 'you lose this'} />
        <BigStat label="Monthly Payment Needed" value={fmt$(promoPayoff)} sub="to clear by promo end" />
      </div>
      <div style={{ background: worthIt ? C.accentBg : '#ef444415', border: `1px solid ${worthIt ? C.accentBorder : '#ef444430'}`, borderRadius: 10, padding: 14, marginTop: 12 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: worthIt ? C.accent : '#ef4444', fontWeight: 600, marginBottom: 0 }}>
          {worthIt ? `✓ This transfer saves you ${fmt$(netSavings)} — worth doing.` : `✗ The fee exceeds your interest savings — not worth it at your payment level.`}
        </p>
      </div>
      <AffiliateCTA />
    </div>
  )
}

// 4. Card Payoff Calculator
const PayoffCalc = () => {
  const [balance, setBalance] = useState(8000)
  const [apr, setApr] = useState(21)
  const [goal, setGoal] = useState(24)

  const monthlyRate = apr / 100 / 12
  const requiredPayment = goal > 0
    ? (balance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -goal))
    : 0

  let bal = balance, minMonths = 0, minInterest = 0
  const minPay = Math.max(25, balance * 0.02)
  while (bal > 0.01 && minMonths < 600) {
    const interest = bal * monthlyRate
    minInterest += interest
    bal = Math.max(0, bal + interest - minPay)
    minMonths++
  }

  return (
    <div>
      <Label>Card Payoff Calculator</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        Set a payoff goal and find exactly what monthly payment you need to hit it.
      </p>
      <SliderRow label="Balance Owed" value={balance} min={500} max={50000} step={250} onChange={setBalance} format={fmt$0} minLabel="$500" maxLabel="$50,000" />
      <SliderRow label="APR" value={apr} min={1} max={36} step={0.5} onChange={setApr} format={v => v + '%'} />
      <SliderRow label="Payoff Goal (months)" value={goal} min={3} max={72} step={1} onChange={setGoal} format={v => v + ' mo'} minLabel="3 mo" maxLabel="6 yrs" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
        <BigStat label="Required Monthly Payment" value={fmt$(requiredPayment)} highlight />
        <BigStat label="Total Interest at Goal" value={fmt$(requiredPayment * goal - balance)} />
        <BigStat label="Min Payment (~2%)" value={fmt$(minPay)} />
        <BigStat label="Months at Min Payment" value={minMonths >= 600 ? '20+ yrs' : minMonths} sub={`$${Math.round(minInterest).toLocaleString()} interest`} />
      </div>
      <AffiliateCTA />
    </div>
  )
}

// 5. Credit Utilization Calculator
const UtilizationCalc = () => {
  const [cards, setCards] = useState([
    { balance: 1200, limit: 5000 },
    { balance: 400, limit: 2000 },
  ])

  const addCard = () => setCards([...cards, { balance: 0, limit: 1000 }])
  const removeCard = i => setCards(cards.filter((_, idx) => idx !== i))
  const updateCard = (i, field, val) => {
    const updated = [...cards]
    updated[i] = { ...updated[i], [field]: Number(val) }
    setCards(updated)
  }

  const totalBalance = cards.reduce((s, c) => s + c.balance, 0)
  const totalLimit = cards.reduce((s, c) => s + c.limit, 0)
  const util = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0

  const getColor = u => u <= 10 ? C.accent : u <= 30 ? C.yellow : C.red
  const getLabel = u => u <= 10 ? 'Excellent' : u <= 30 ? 'Good' : u <= 50 ? 'Fair' : 'Poor'

  return (
    <div>
      <Label>Credit Utilization Calculator</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        Utilization is 30% of your credit score. See where you stand and how to improve it.
      </p>
      {cards.map((card, i) => (
        <div key={i} style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textDim }}>Card {i + 1}</span>
            {cards.length > 1 && <button onClick={() => removeCard(i)} style={{ background: 'none', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 14 }}>✕</button>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontFamily: F.body, fontSize: 12, color: C.textDim, display: 'block', marginBottom: 4 }}>Balance</label>
              <input type="number" value={card.balance} onChange={e => updateCard(i, 'balance', e.target.value)}
                style={{ width: '100%', background: C.bgCard, border: `1px solid ${C.borderLight}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontFamily: F.mono, fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontFamily: F.body, fontSize: 12, color: C.textDim, display: 'block', marginBottom: 4 }}>Credit Limit</label>
              <input type="number" value={card.limit} onChange={e => updateCard(i, 'limit', e.target.value)}
                style={{ width: '100%', background: C.bgCard, border: `1px solid ${C.borderLight}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontFamily: F.mono, fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ background: C.bgCard, borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (card.balance / card.limit) * 100)}%`, height: '100%', background: getColor((card.balance / card.limit) * 100), transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      ))}
      <button onClick={addCard} style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, background: 'none', border: `1px dashed ${C.accentBorder}`, borderRadius: 8, padding: '8px 20px', cursor: 'pointer', width: '100%', marginBottom: 20 }}>
        + Add Another Card
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 8 }}>
        <BigStat label="Total Balance" value={fmt$0(totalBalance)} />
        <BigStat label="Total Limit" value={fmt$0(totalLimit)} />
        <BigStat label="Utilization" value={util.toFixed(1) + '%'} highlight />
      </div>
      <div style={{ background: `${getColor(util)}15`, border: `1px solid ${getColor(util)}30`, borderRadius: 10, padding: 14, marginTop: 8 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: getColor(util), fontWeight: 600, marginBottom: 4 }}>
          {getLabel(util)} — {util.toFixed(1)}% utilization
        </p>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 0 }}>
          {util <= 10 ? 'Ideal range. This positively impacts your credit score.' :
           util <= 30 ? 'Acceptable. Under 10% is better if you can manage it.' :
           util <= 50 ? 'Elevated. Try to pay down balances to get under 30%.' :
           'High utilization is likely hurting your score. Prioritize paying this down.'}
        </p>
      </div>
      <AffiliateCTA />
    </div>
  )
}

// 6. Cash Back vs Points
const CashVsPointsCalc = () => {
  const [monthlySpend, setMonthlySpend] = useState(2000)
  const [cashBackRate, setCashBackRate] = useState(2)
  const [pointsRate, setPointsRate] = useState(3)
  const [pointsCpp, setPointsCpp] = useState(1.5)
  const [annualFee, setAnnualFee] = useState(95)

  const annualSpend = monthlySpend * 12
  const cashBackEarned = annualSpend * (cashBackRate / 100)
  const pointsEarned = (annualSpend * (pointsRate / 100)) * (pointsCpp / 100) * 100
  const pointsNet = pointsEarned - annualFee
  const cashBackNet = cashBackEarned

  const winner = pointsNet > cashBackNet ? 'points' : 'cashback'
  const diff = Math.abs(pointsNet - cashBackNet)

  return (
    <div>
      <Label>Cash Back vs Points Calculator</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        Compare which card type puts more money in your pocket based on your real spending.
      </p>
      <SliderRow label="Monthly Spend" value={monthlySpend} min={200} max={10000} step={100} onChange={setMonthlySpend} format={fmt$0} minLabel="$200" maxLabel="$10,000" />
      <div style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textDim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Cash Back Card</div>
        <SliderRow label="Cash Back Rate" value={cashBackRate} min={0.5} max={6} step={0.5} onChange={setCashBackRate} format={v => v + '%'} />
      </div>
      <div style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 20 }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textDim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Points Card</div>
        <SliderRow label="Points Earn Rate" value={pointsRate} min={1} max={6} step={0.5} onChange={setPointsRate} format={v => v + 'x'} />
        <SliderRow label="Points Value (cpp)" value={pointsCpp} min={0.5} max={3} step={0.1} onChange={setPointsCpp} format={v => v.toFixed(1) + '¢'} />
        <SliderRow label="Annual Fee" value={annualFee} min={0} max={695} step={5} onChange={setAnnualFee} format={fmt$0} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <BigStat label="Cash Back Annual Value" value={fmt$(cashBackNet)} highlight={winner === 'cashback'} />
        <BigStat label="Points Annual Value (net)" value={fmt$(pointsNet)} highlight={winner === 'points'} />
      </div>
      <div style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 10, padding: 14 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.accent, fontWeight: 600, marginBottom: 0 }}>
          {winner === 'points' ? `Points card wins by ${fmt$(diff)}/year` : `Cash back card wins by ${fmt$(diff)}/year`}
        </p>
      </div>
      <AffiliateCTA />
    </div>
  )
}

// 7. APR Comparison Calculator
const AprCompareCalc = () => {
  const [balance, setBalance] = useState(5000)
  const [payment, setPayment] = useState(200)
  const [aprA, setAprA] = useState(24)
  const [aprB, setAprB] = useState(17)

  const calcCard = (bal, apr, pmt) => {
    const rate = apr / 100 / 12
    let b = bal, months = 0, interest = 0
    while (b > 0.01 && months < 600) {
      const i = b * rate
      interest += i
      b = Math.max(0, b + i - pmt)
      months++
      if (pmt <= b * rate) { months = 999; break }
    }
    return { months, interest, total: bal + interest }
  }

  const cardA = calcCard(balance, aprA, payment)
  const cardB = calcCard(balance, aprB, payment)
  const savings = cardA.interest - cardB.interest

  return (
    <div>
      <Label>APR Comparison Calculator</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        Compare two credit cards side-by-side to see exactly how much the lower APR saves you.
      </p>
      <SliderRow label="Balance" value={balance} min={500} max={30000} step={250} onChange={setBalance} format={fmt$0} />
      <SliderRow label="Monthly Payment" value={payment} min={25} max={2000} step={25} onChange={setPayment} format={fmt$0} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textDim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Card A</div>
          <SliderRow label="APR" value={aprA} min={5} max={36} step={0.5} onChange={setAprA} format={v => v + '%'} />
          <BigStat label="Interest Paid" value={cardA.months >= 999 ? '∞' : fmt$(cardA.interest)} />
        </div>
        <div style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textDim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Card B</div>
          <SliderRow label="APR" value={aprB} min={5} max={36} step={0.5} onChange={setAprB} format={v => v + '%'} />
          <BigStat label="Interest Paid" value={cardB.months >= 999 ? '∞' : fmt$(cardB.interest)} highlight />
        </div>
      </div>
      <div style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 10, padding: 14 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.accent, fontWeight: 600, marginBottom: 4 }}>
          Lower APR saves you {savings >= 0 ? fmt$(savings) : fmt$(Math.abs(savings))} in interest
        </p>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 0 }}>
          That's {cardA.months - cardB.months > 0 ? `${cardA.months - cardB.months} fewer months` : 'the same payoff time'} to pay off your balance.
        </p>
      </div>
      <AffiliateCTA />
    </div>
  )
}

// 8. Minimum Payment Trap
const MinPaymentCalc = () => {
  const [balance, setBalance] = useState(4000)
  const [apr, setApr] = useState(22)
  const [minPct, setMinPct] = useState(2)

  const monthlyRate = apr / 100 / 12

  const calcMinPay = (bal, rate, pct) => {
    let b = bal, months = 0, interest = 0
    while (b > 1 && months < 1200) {
      const i = b * rate
      interest += i
      const pay = Math.max(25, b * (pct / 100))
      b = Math.max(0, b + i - pay)
      months++
    }
    return { months, interest }
  }

  const fixed200 = (() => {
    let b = balance, months = 0, interest = 0
    while (b > 0.01 && months < 600) {
      const i = b * monthlyRate
      interest += i
      b = Math.max(0, b + i - 200)
      months++
    }
    return { months, interest }
  })()

  const minResult = calcMinPay(balance, monthlyRate, minPct)
  const saved = minResult.interest - fixed200.interest

  return (
    <div>
      <Label>Minimum Payment Trap</Label>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        See the real cost of paying only the minimum every month — and how much you save by paying more.
      </p>
      <SliderRow label="Balance" value={balance} min={500} max={20000} step={250} onChange={setBalance} format={fmt$0} minLabel="$500" maxLabel="$20,000" />
      <SliderRow label="APR" value={apr} min={10} max={36} step={0.5} onChange={setApr} format={v => v + '%'} />
      <SliderRow label="Minimum % of Balance" value={minPct} min={1} max={4} step={0.5} onChange={setMinPct} format={v => v + '%'} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={{ background: '#ef444415', border: '1px solid #ef444430', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: '#ef4444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Minimum Payments</div>
          <div style={{ fontFamily: F.mono, fontSize: 22, color: '#ef4444', fontWeight: 600 }}>{minResult.months >= 1200 ? '30+ yrs' : `${minResult.months} mo`}</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted, marginTop: 4 }}>{fmt$(minResult.interest)} interest</div>
        </div>
        <div style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Fixed $200/month</div>
          <div style={{ fontFamily: F.mono, fontSize: 22, color: C.accent, fontWeight: 600 }}>{fixed200.months} mo</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted, marginTop: 4 }}>{fmt$(fixed200.interest)} interest</div>
        </div>
      </div>
      <div style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 10, padding: 14 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.accent, fontWeight: 600, marginBottom: 0 }}>
          Paying $200/month instead of minimums saves you {fmt$(saved)} and {minResult.months - fixed200.months} months of payments.
        </p>
      </div>
      <AffiliateCTA />
    </div>
  )
}

// ─── ARTICLES ────────────────────────────────────────────────────────────────
const articles = [
  {
    id: 'good-credit-card-apr',
    title: 'What Is a Good Credit Card APR?',
    tag: 'BASICS',
    desc: 'The average APR is higher than most people think. Here\'s what counts as good — and how to get it.',
    content: () => (
      <>
        <p>The average credit card APR in 2026 sits around 21–24%. Anything below 20% is generally considered good. Below 15% is excellent. If you're carrying a balance, this number matters enormously.</p>
        <h3>APR Ranges Explained</h3>
        <p><strong style={{color:C.accent}}>Under 15%</strong> — Excellent. Usually reserved for cardholders with scores above 750.</p>
        <p><strong style={{color:C.yellow}}>15–20%</strong> — Good. Common for cardholders with solid credit history.</p>
        <p><strong style={{color:'#f97316'}}>20–25%</strong> — Average. The most common range for standard credit cards.</p>
        <p><strong style={{color:C.red}}>Over 25%</strong> — High. Retail cards, store cards, and subprime cards often fall here.</p>
        <h3>Does APR Matter If You Pay in Full?</h3>
        <p>If you pay your statement balance in full every month, you pay zero interest — your APR is irrelevant. APR only matters when you carry a balance from month to month. If you regularly carry a balance, the APR is one of the most important card features to optimize.</p>
        <h3>How to Get a Lower APR</h3>
        <p>The fastest way to qualify for a lower APR card is to improve your credit score. Pay on time, keep utilization under 30%, and avoid opening too many new accounts at once. Once your score improves, you can apply for lower-APR cards or call your issuer to request a rate reduction.</p>
        <FAQItem q="Can I negotiate my APR?" a="Yes — issuers can lower your rate if you have a strong payment history. Call the number on the back of your card, mention you've been a reliable customer, and ask directly. Many people are surprised that a single call works." />
        <FAQItem q="Is 0% APR real?" a="Yes, but it's a promotional rate. After the promo period (usually 12–21 months), the rate jumps to the card's standard APR. Make sure you know the end date and plan accordingly." />
      </>
    )
  },
  {
    id: 'how-credit-card-interest-works',
    title: 'How Does Credit Card Interest Work?',
    tag: 'BASICS',
    desc: 'Daily periodic rates, average daily balance, grace periods — the mechanics most people never learned.',
    content: () => (
      <>
        <p>Credit card interest is calculated daily, not monthly. Your APR is divided by 365 to get a Daily Periodic Rate (DPR). That rate is multiplied by your average daily balance over the billing cycle to determine your interest charge.</p>
        <h3>The Daily Periodic Rate Formula</h3>
        <p>DPR = APR ÷ 365. For a 22% APR card: 22 ÷ 365 = 0.0603% per day. On a $3,000 balance, that's about $1.81 per day in interest — $54 per month.</p>
        <h3>The Grace Period</h3>
        <p>If you pay your full statement balance by the due date, you owe zero interest. This is the grace period — usually 21–25 days. Once you carry a balance (pay less than the full statement), the grace period disappears and interest accrues immediately on new purchases too.</p>
        <h3>Why Minimum Payments Are a Trap</h3>
        <p>Minimum payments are usually 1–3% of your balance. On a $5,000 balance at 22% APR, a 2% minimum is $100 — but the monthly interest is around $92. You're barely denting the principal. At minimum payments only, that balance could take 15+ years to pay off.</p>
        <FAQItem q="When does interest start?" a="Interest starts accruing from the day a charge posts to your account — but you won't be charged if you pay the full balance by the due date. The moment you carry any balance over, interest charges begin immediately on the remaining amount." />
        <FAQItem q="What is compound interest on a credit card?" a="Credit card interest compounds daily — meaning yesterday's unpaid interest becomes part of today's balance, which then earns interest itself. This compounding effect is why carrying a balance accelerates how quickly your debt grows." />
      </>
    )
  },
  {
    id: 'is-balance-transfer-worth-it',
    title: 'Is a Balance Transfer Actually Worth It?',
    tag: 'STRATEGY',
    desc: 'The transfer fee is real. The 0% is temporary. Here\'s how to run the actual math.',
    content: () => (
      <>
        <p>A balance transfer moves debt from a high-APR card to a new card offering 0% for a promotional period. The catch: most cards charge a transfer fee of 3–5% upfront.</p>
        <h3>When a Balance Transfer Makes Sense</h3>
        <p>If the interest you'd pay on your current card over the promo period is greater than the transfer fee, it's a net win. The larger the balance and the longer the promo period, the more likely this math works in your favor.</p>
        <h3>The Trap to Avoid</h3>
        <p>The promo rate expires. If you haven't paid off the transferred balance by then, you're back to a high APR — often higher than your original card. Treat the promo period as a hard deadline, not a relief valve.</p>
        <h3>What to Look For in a Balance Transfer Card</h3>
        <p>Longest 0% period (15–21 months is good), lowest transfer fee (some cards offer 0%), no annual fee during the promo period. Don't make new purchases on the card — payments typically apply to the promotional balance first, not new charges.</p>
        <FAQItem q="Does a balance transfer hurt your credit score?" a="Applying for a new card causes a hard inquiry, which can temporarily lower your score by a few points. But if the transfer helps you pay down debt faster, your utilization drops — which helps your score more in the long run." />
        <FAQItem q="Can I transfer a balance to an existing card?" a="Some issuers allow balance transfers to existing cards, not just new ones. Call your issuer to ask. The fee structure is usually the same." />
      </>
    )
  },
  {
    id: 'how-much-are-credit-card-points-worth',
    title: 'How Much Are Credit Card Points Really Worth?',
    tag: 'REWARDS',
    desc: 'Points aren\'t currency — but they can be close. Here\'s what each program actually gives you.',
    content: () => (
      <>
        <p>Credit card points are worth whatever the issuer decides — which can range from 0.5¢ to 2¢+ per point depending on how you redeem them. Understanding cents-per-point (cpp) is the key to maximizing your rewards.</p>
        <h3>Common Program Values</h3>
        <p><strong style={{color:C.accent}}>Chase Ultimate Rewards:</strong> 1¢ cash back, up to 1.5–2¢ through travel portal or partners.</p>
        <p><strong style={{color:C.accent}}>Amex Membership Rewards:</strong> 0.6¢ cash back, up to 2¢ through transfer partners.</p>
        <p><strong style={{color:C.accent}}>Capital One Miles:</strong> 1¢ travel, up to 1.7¢ through select partners.</p>
        <p><strong style={{color:C.accent}}>Citi ThankYou:</strong> 0.5–1¢ cash, up to 1.7¢ through airline transfers.</p>
        <h3>How to Maximize Value</h3>
        <p>Transfer to airline or hotel partners instead of redeeming through the bank portal. Business class flights and hotel nights typically offer the highest cpp values. Gift cards and statement credits are usually the worst redemptions.</p>
        <FAQItem q="Do points expire?" a="Most major bank points don't expire as long as your account stays open. Airline miles typically expire after 12–24 months of account inactivity. Always check your specific program's rules." />
        <FAQItem q="Are points better than cash back?" a="It depends on whether you travel and how much effort you put into optimization. For most people who don't travel frequently or don't want to manage points programs, a flat 2% cash back card often beats a travel card in real-world value." />
      </>
    )
  },
  {
    id: 'what-is-credit-utilization',
    title: 'What Is Credit Utilization and Why Does It Matter?',
    tag: 'CREDIT SCORE',
    desc: 'It\'s 30% of your FICO score. Here\'s exactly what counts — and what moves the needle.',
    content: () => (
      <>
        <p>Credit utilization is the ratio of your credit card balances to your credit limits, expressed as a percentage. It accounts for 30% of your FICO score — the second-largest factor after payment history.</p>
        <h3>How It's Calculated</h3>
        <p>Total all your credit card balances. Divide by total credit limits. Multiply by 100. A $1,500 balance on a $5,000 limit = 30% utilization. Issuers also look at per-card utilization, not just the overall number.</p>
        <h3>What's the Target?</h3>
        <p>Under 30% is the standard advice. Under 10% is better. The highest scorers typically show 1–7% utilization. Zero utilization (no balance reported) can actually slightly hurt your score — using cards and paying them shows active, responsible credit use.</p>
        <h3>Quick Ways to Lower Utilization</h3>
        <p>Pay down balances before your statement closes (not just the due date), request credit limit increases from existing issuers, and avoid closing old cards — that reduces your total available credit.</p>
        <FAQItem q="Does paying in full each month help utilization?" a="Paying in full is good for avoiding interest, but utilization is based on the balance reported to credit bureaus — which is usually your statement balance. If you want lower utilization, pay down before the statement closes." />
        <FAQItem q="Should I spread my balance across multiple cards?" a="Yes — if one card has high utilization, spreading the balance reduces per-card utilization. Both the per-card and overall ratios affect your score." />
      </>
    )
  },
  {
    id: 'cash-back-vs-travel-rewards',
    title: 'Cash Back vs Travel Rewards: Which Is Better?',
    tag: 'STRATEGY',
    desc: 'The right answer depends on how you spend and how much effort you want to put in.',
    content: () => (
      <>
        <p>Cash back is simple: you earn a percentage back as cash. Travel rewards earn points or miles that can be worth more — but require redemption strategy to unlock that value.</p>
        <h3>Cash Back Wins When:</h3>
        <p>You don't travel frequently enough to use points for premium redemptions. You want simplicity — no tracking portals, expiration dates, or transfer partners. You prefer guaranteed value over potential value.</p>
        <h3>Travel Rewards Win When:</h3>
        <p>You travel regularly and can use points for flights or hotels. You're willing to spend time learning redemption strategies. You want to unlock 2–5¢ per point value through transfer partners and premium cabins.</p>
        <h3>The Middle Ground</h3>
        <p>Some cards offer both — flexible points you can redeem as cash back or transfer to travel partners. Chase Sapphire Preferred and Amex Gold are popular examples. You get optionality without fully committing to either model.</p>
        <FAQItem q="What's the best cash back rate available?" a="Flat-rate cards typically offer 1.5–2%. Category cards can offer 3–6% on specific spending (dining, groceries, gas). Pairing a flat-rate card with a category card is a popular optimization." />
        <FAQItem q="Can I have both types of cards?" a="Absolutely. Most credit card optimizers carry at least one travel rewards card and one cash back card. Use the travel card for categories with high multipliers and the cash back card for everything else." />
      </>
    )
  },
  {
    id: 'how-long-to-pay-off-credit-card',
    title: 'How Long Will It Take To Pay Off My Credit Card?',
    tag: 'PAYOFF',
    desc: 'The answer changes dramatically based on your monthly payment. The calculator shows you in seconds.',
    content: () => (
      <>
        <p>The time it takes to pay off a credit card balance depends on three numbers: your balance, your APR, and your monthly payment. Small changes to the payment amount can cut years off your timeline.</p>
        <h3>The Math That Surprises People</h3>
        <p>On a $5,000 balance at 22% APR, paying the 2% minimum (about $100/month) takes over 8 years and costs $4,200+ in interest. Bumping that to $200/month cuts the time to 2.5 years and saves $3,000.</p>
        <h3>The Snowball vs Avalanche Method</h3>
        <p><strong style={{color:C.accent}}>Avalanche:</strong> Pay minimums on all cards, put extra toward the highest APR card first. Mathematically optimal — you pay less total interest.</p>
        <p><strong style={{color:C.accent}}>Snowball:</strong> Pay minimums on all, put extra toward the lowest balance first. Psychologically motivating — you eliminate cards faster and build momentum.</p>
        <h3>How to Find Extra Payment Money</h3>
        <p>Even $50–100 extra per month makes a significant difference over time. Look at recurring subscriptions, dining spending, and other variable categories first. Redirect windfalls (tax refunds, bonuses) directly to the highest-APR card.</p>
        <FAQItem q="Should I pay more than the minimum?" a="Always, if you can. The minimum payment is designed to maximize the interest you pay, not help you get out of debt faster. Even $25 extra per month meaningfully reduces your payoff timeline." />
        <FAQItem q="What if I can't afford more than the minimum?" a="Look into 0% balance transfer cards to pause interest while you pay down principal. Also contact your issuer — hardship programs exist that can temporarily reduce your interest rate." />
      </>
    )
  },
  {
    id: 'minimum-payment-trap',
    title: 'What Happens If You Only Make Minimum Payments?',
    tag: 'WARNING',
    desc: 'The numbers are ugly. Here\'s exactly what the bank doesn\'t put in the big print.',
    content: () => (
      <>
        <p>Minimum payments are typically 1–3% of your balance or a flat minimum ($25), whichever is greater. They're designed to keep you in debt as long as possible while maximizing interest revenue for the issuer.</p>
        <h3>A Real Example</h3>
        <p>$4,000 balance at 22% APR. Minimum payment: 2% = $80/month at the start. After making only minimum payments, you'll be making payments for over 11 years and paying more than $3,500 in interest — nearly doubling what you borrowed.</p>
        <h3>Why the Minimum Shrinks Over Time</h3>
        <p>Most minimums are calculated as a percentage of your current balance. As the balance slowly drops, so does the minimum. This means you're making smaller payments as time goes on — which slows your payoff even further.</p>
        <h3>The Required CARD Act Disclosure</h3>
        <p>Since 2010, credit card statements must show how long it takes to pay off your balance making only minimum payments, and how much you'll pay in total. Check your statement — it's usually on page 2. Most people are shocked when they see it.</p>
        <FAQItem q="Is missing a minimum payment as bad as paying nothing?" a="Yes. Missing a minimum payment triggers a late fee, can trigger a penalty APR (often 29.99%), and gets reported to credit bureaus after 30 days — damaging your score significantly." />
        <FAQItem q="What's the fastest way to escape minimum payment debt?" a="Commit to a fixed payment above the minimum — ideally 3–4x the minimum — and don't increase spending on the card. Consider a balance transfer to a 0% card if the math works in your favor." />
      </>
    )
  },
  {
    id: 'how-to-avoid-credit-card-interest',
    title: 'How to Avoid Paying Credit Card Interest Legally',
    tag: 'STRATEGY',
    desc: 'It\'s simpler than it sounds. Millions of people use credit cards and pay zero interest every year.',
    content: () => (
      <>
        <p>Credit cards charge zero interest if you pay your full statement balance by the due date every month. This is the grace period — and it's one of the most powerful tools in personal finance if you use it right.</p>
        <h3>The Three Rules</h3>
        <p><strong style={{color:C.accent}}>1. Pay the statement balance (not the current balance):</strong> The statement balance is what was billed at the close of your last cycle. Paying this amount in full by the due date means zero interest.</p>
        <p><strong style={{color:C.accent}}>2. Pay by the due date, not the statement date:</strong> You have a grace period between when the statement closes and when the payment is due — typically 21–25 days. Use it.</p>
        <p><strong style={{color:C.accent}}>3. Never carry a balance:</strong> The moment you carry any balance (pay less than the full statement), you lose the grace period and interest starts accruing on new purchases immediately.</p>
        <h3>Use Autopay to Never Miss</h3>
        <p>Set autopay to pay the statement balance in full every month. This eliminates the risk of forgetting and ensures you always capture the grace period.</p>
        <FAQItem q="What if I can't pay in full this month?" a="Pay as much as possible and prioritize getting back to full payment next month. Consider a balance transfer to 0% if you need more time. The key is to avoid letting a one-time shortfall become a permanent habit." />
        <FAQItem q="Do cash advances have a grace period?" a="No. Cash advances accrue interest immediately from the date of the advance — there's no grace period, and the APR is typically higher than purchase APR. Avoid cash advances unless it's a true emergency." />
      </>
    )
  },
  {
    id: 'best-first-credit-card',
    title: 'Best First Credit Card: What to Look For in 2026',
    tag: 'BEGINNERS',
    desc: 'Your first card sets the foundation. Here\'s what actually matters for building credit from scratch.',
    content: () => (
      <>
        <p>Your first credit card doesn't need to be your best card — it needs to help you build a credit history without costing you money. The right starter card is simple, has no annual fee, and is easy to qualify for.</p>
        <h3>What to Look For</h3>
        <p><strong style={{color:C.accent}}>No annual fee:</strong> You shouldn't pay to build credit. Many strong starter cards are free.</p>
        <p><strong style={{color:C.accent}}>Reports to all 3 bureaus:</strong> The card must report to Experian, Equifax, and TransUnion to help your score.</p>
        <p><strong style={{color:C.accent}}>Low or no foreign transaction fee:</strong> Good to have even if you don't travel internationally now.</p>
        <p><strong style={{color:C.accent}}>Reasonable credit limit:</strong> Even a $500 limit is fine to start — you won't use much of it anyway.</p>
        <h3>Secured vs Unsecured Cards</h3>
        <p>If you have no credit history, you may need a secured card — you deposit $200–$500 as collateral and get a matching credit limit. After 12–18 months of responsible use, most issuers graduate you to an unsecured card and return your deposit.</p>
        <h3>Building Credit With Your First Card</h3>
        <p>Use the card for one small recurring purchase each month (a streaming subscription works perfectly). Pay the full statement balance automatically. Don't apply for other cards for at least 6–12 months. Your score will build steadily and predictably.</p>
        <FAQItem q="How long until I have a credit score?" a="You typically need at least 6 months of payment history before FICO can generate a score. Some bureaus can generate a score sooner. Being an authorized user on someone else's account can speed this up." />
        <FAQItem q="Should I get a store card as my first card?" a="Generally no. Store cards have very high APRs (often 25–30%), low limits, and limited usefulness outside the store. A general-purpose Visa or Mastercard with cash back is almost always the better starting point." />
      </>
    )
  },
]

// ─── PAGES ───────────────────────────────────────────────────────────────────
const tools = [
  { id: 'interest', label: 'Credit Card Interest', icon: '📊', component: InterestCalc },
  { id: 'points', label: 'Rewards Points Value', icon: '⭐', component: PointsCalc },
  { id: 'transfer', label: 'Balance Transfer', icon: '🔄', component: BalanceTransferCalc },
  { id: 'payoff', label: 'Card Payoff', icon: '🎯', component: PayoffCalc },
  { id: 'utilization', label: 'Credit Utilization', icon: '📈', component: UtilizationCalc },
  { id: 'cashvspoints', label: 'Cash Back vs Points', icon: '⚖️', component: CashVsPointsCalc },
  { id: 'aprcompare', label: 'APR Comparison', icon: '🔢', component: AprCompareCalc },
  { id: 'minpayment', label: 'Minimum Payment Trap', icon: '⚠️', component: MinPaymentCalc },
]

const Nav = ({ page, setPage }) => (
  <nav style={{ background: C.bgCard, borderBottom: `1px solid ${C.border}`, padding: '0 24px', position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
    <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill={C.bg}/>
        <rect x="4" y="10" width="24" height="14" rx="2" fill="none" stroke={C.accent} strokeWidth="1.5"/>
        <rect x="4" y="14" width="24" height="3" fill={C.accent} opacity="0.3"/>
        <circle cx="22" cy="20" r="2" fill={C.accent}/>
      </svg>
      <span style={{ fontFamily: F.display, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: '-0.02em' }}>CardMechanics</span>
    </button>
    <div style={{ display: 'flex', gap: 4 }}>
      {[['home','Home'],['tools','Calculators'],['guides','Guides']].map(([p,l]) => (
        <button key={p} onClick={() => setPage(p)}
          style={{ fontFamily: F.body, fontSize: 14, color: page === p ? C.accent : C.textDim, background: page === p ? C.accentBg : 'none', border: page === p ? `1px solid ${C.accentBorder}` : '1px solid transparent', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', transition: 'all 0.2s' }}>
          {l}
        </button>
      ))}
    </div>
  </nav>
)

const HomePage = ({ setPage }) => (
  <div>
    {/* Hero */}
    <div style={{ background: `linear-gradient(180deg, ${C.bgDeep} 0%, ${C.bg} 100%)`, borderBottom: `1px solid ${C.border}`, padding: '80px 24px 72px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <Tag>Utility-first finance</Tag>
        <h1 style={{ fontFamily: F.display, fontSize: 'clamp(42px, 6vw, 68px)', fontWeight: 800, color: C.text, lineHeight: 1.05, margin: '20px 0 20px', letterSpacing: '-0.03em' }}>
          Stop guessing.<br /><span style={{ color: C.accent }}>Start calculating.</span>
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 18, color: C.textDim, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Eight free tools to quantify your credit card interest, rewards value, and payoff strategy. No sign-up. No fluff. Just math.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setPage('tools')}
            style={{ fontFamily: F.mono, fontSize: 14, color: C.bg, background: C.accent, border: 'none', borderRadius: 10, padding: '14px 32px', cursor: 'pointer', fontWeight: 700, letterSpacing: '0.02em' }}>
            Open Calculators →
          </button>
          <button onClick={() => setPage('guides')}
            style={{ fontFamily: F.mono, fontSize: 14, color: C.text, background: 'none', border: `1px solid ${C.borderLight}`, borderRadius: 10, padding: '14px 32px', cursor: 'pointer' }}>
            Read the Guides
          </button>
        </div>
      </div>
    </div>

    {/* Tools Grid */}
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      <Label style={{ textAlign: 'center', marginBottom: 4 }}>Free Tools</Label>
      <h2 style={{ fontFamily: F.display, fontSize: 32, color: C.text, textAlign: 'center', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>8 Credit Card Calculators</h2>
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, textAlign: 'center', marginBottom: 48 }}>Each tool is built around one decision. Run the numbers in under 60 seconds.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {tools.map(t => (
          <button key={t.id} onClick={() => setPage('tools')}
            style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s, background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.background = C.bgHover }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{t.icon}</div>
            <div style={{ fontFamily: F.body, fontSize: 15, color: C.text, fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.accent }}>Open →</div>
          </button>
        ))}
      </div>
    </div>

    {/* Trust row */}
    <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '36px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
        {['No account required', 'Transparent math', 'No data collected', 'Updated for 2026'].map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: C.accent, fontSize: 16 }}>✓</span>
            <span style={{ fontFamily: F.body, fontSize: 14, color: C.textDim }}>{t}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Articles preview */}
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      <Label style={{ textAlign: 'center', marginBottom: 4 }}>Learn</Label>
      <h2 style={{ fontFamily: F.display, fontSize: 32, color: C.text, textAlign: 'center', fontWeight: 700, marginBottom: 48, letterSpacing: '-0.02em' }}>Credit Card Guides</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {articles.slice(0, 6).map(a => (
          <button key={a.id} onClick={() => setPage(a.id)}
            style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.background = C.bgHover }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard }}>
            <Tag>{a.tag}</Tag>
            <h3 style={{ fontFamily: F.body, fontSize: 16, color: C.text, fontWeight: 600, margin: '12px 0 8px', lineHeight: 1.4 }}>{a.title}</h3>
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.5, margin: 0 }}>{a.desc}</p>
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button onClick={() => setPage('guides')}
          style={{ fontFamily: F.mono, fontSize: 13, color: C.accent, background: 'none', border: `1px solid ${C.accentBorder}`, borderRadius: 8, padding: '10px 24px', cursor: 'pointer' }}>
          View All 10 Guides →
        </button>
      </div>
    </div>
  </div>
)

const ToolsPage = ({ setPage }) => {
  const [active, setActive] = useState('interest')
  const ActiveTool = tools.find(t => t.id === active)?.component || InterestCalc

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <Label>Free Tools</Label>
      <h1 style={{ fontFamily: F.display, fontSize: 36, color: C.text, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>Credit Card Calculators</h1>
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 36 }}>Eight tools, zero fluff. Pick a calculator and run the numbers on your actual card.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Sidebar */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 12, position: 'sticky', top: 80 }}>
          {tools.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              style={{ width: '100%', background: active === t.id ? C.accentBg : 'none', border: active === t.id ? `1px solid ${C.accentBorder}` : '1px solid transparent', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span style={{ fontFamily: F.body, fontSize: 13, color: active === t.id ? C.accent : C.textDim, fontWeight: active === t.id ? 600 : 400, lineHeight: 1.3 }}>{t.label}</span>
            </button>
          ))}
        </div>
        {/* Calculator */}
        <Card>
          <ActiveTool />
        </Card>
      </div>
    </div>
  )
}

const GuidesPage = ({ setPage }) => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
    <Label>Learn</Label>
    <h1 style={{ fontFamily: F.display, fontSize: 36, color: C.text, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>Credit Card Guides</h1>
    <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 40 }}>Plain-English answers to the most-searched credit card questions — backed by the calculators.</p>
    <div style={{ display: 'grid', gap: 14 }}>
      {articles.map(a => (
        <button key={a.id} onClick={() => setPage(a.id)}
          style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 20, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.background = C.bgHover }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard }}>
          <div style={{ flex: 1 }}>
            <Tag>{a.tag}</Tag>
            <h2 style={{ fontFamily: F.body, fontSize: 17, color: C.text, fontWeight: 600, margin: '10px 0 6px', lineHeight: 1.3 }}>{a.title}</h2>
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, margin: 0, lineHeight: 1.5 }}>{a.desc}</p>
          </div>
          <span style={{ fontFamily: F.mono, fontSize: 18, color: C.accent, flexShrink: 0 }}>→</span>
        </button>
      ))}
    </div>
  </div>
)

const ArticlePage = ({ article, setPage }) => {
  const ArticleContent = article.content
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <button onClick={() => setPage('guides')}
        style={{ fontFamily: F.mono, fontSize: 12, color: C.textDim, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 0 }}>
        ← All Guides
      </button>
      <Tag>{article.tag}</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 40px)', color: C.text, fontWeight: 700, margin: '16px 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{article.title}</h1>
      <p style={{ fontFamily: F.body, fontSize: 16, color: C.textDim, lineHeight: 1.6, borderLeft: `3px solid ${C.accentBorder}`, paddingLeft: 16, marginBottom: 36 }}>{article.desc}</p>
      <div style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, lineHeight: 1.8 }}>
        <style>{`
          .article-content h3 { font-family: ${F.display}; color: ${C.text}; font-size: 20px; font-weight: 700; margin: 32px 0 12px; letter-spacing: -0.01em; }
          .article-content p { margin-bottom: 16px; }
          .article-content strong { color: ${C.text}; }
        `}</style>
        <div className="article-content">
          <ArticleContent />
        </div>
      </div>
      <ToolCTA page="tools" setPage={setPage} />
      <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <Label>More Guides</Label>
        <div style={{ display: 'grid', gap: 10 }}>
          {articles.filter(a => a.id !== article.id).slice(0, 3).map(a => (
            <button key={a.id} onClick={() => setPage(a.id)}
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.accentBorder}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.text }}>{a.title}</span>
              <span style={{ color: C.accent, fontSize: 14 }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const Footer = ({ setPage }) => (
  <footer style={{ borderTop: `1px solid ${C.border}`, padding: '40px 24px', marginTop: 60 }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <div>
        <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>CardMechanics</div>
        <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>Free credit card calculators. No sign-up. No hype.</div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        {[['tools','Calculators'],['guides','Guides']].map(([p,l]) => (
          <button key={p} onClick={() => setPage(p)}
            style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ fontFamily: F.body, fontSize: 11, color: C.textMuted }}>
        For educational use only. Not financial advice. © 2026 CardMechanics
      </div>
    </div>
  </footer>
)

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home')

  const article = articles.find(a => a.id === page)

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text, fontFamily: F.body }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: ${C.borderLight}; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${C.accent}; cursor: pointer; }
        input[type=number] { outline: none; }
        select { outline: none; }
      `}</style>
      <Nav page={page} setPage={setPage} />
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'tools' && <ToolsPage setPage={setPage} />}
      {page === 'guides' && <GuidesPage setPage={setPage} />}
      {article && <ArticlePage article={article} setPage={setPage} />}
      <Footer setPage={setPage} />
    </div>
  )
}
