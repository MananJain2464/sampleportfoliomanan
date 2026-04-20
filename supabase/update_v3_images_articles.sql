-- ══════════════════════════════════════════════════════════════
-- UPDATE v3 — Articles table + image columns on all sections
-- Run in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ── Add image columns to existing tables ─────────────────────

ALTER TABLE projects  ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE timeline  ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE skills    ADD COLUMN IF NOT EXISTS icon_url  text;

-- ── Articles table ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS articles (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  url          text NOT NULL,
  excerpt      text,
  cover_image  text,
  published_at text,
  read_time    text,
  tags         text[] DEFAULT '{}',
  sort_order   int DEFAULT 0
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "anon all articles"    ON articles FOR ALL USING (true) WITH CHECK (true);

-- ── Seed articles (from Medium @er.mananjain26) ───────────────

DELETE FROM articles;

INSERT INTO articles (title, url, excerpt, cover_image, published_at, read_time, tags, sort_order) VALUES
(
  'Heston''s Stochastic Volatility Model',
  'https://medium.com/@er.mananjain26/hestons-stochastic-volatility-model-c9f1d943718e',
  'Deep dive into Heston''s 1993 seminal paper on stochastic volatility — covering SDEs, PDE derivation, characteristic functions, and practical applications to currency and bond options.',
  null,
  'March 8, 2026',
  '18 min read',
  array['Quant Finance', 'Stochastic Volatility', 'Black-Scholes', 'Options'],
  1
),
(
  'How to Size Your Bets: The Kelly Rule Explained Intuitively',
  'https://medium.com/@er.mananjain26/how-to-size-your-bets-the-kelly-rule-explained-intuitively-with-equity-market-examples-634c71b98982',
  'To grow wealth optimally over time, you should maximize the expected logarithm of wealth. A practical breakdown of the Kelly Criterion with real Indian equity market examples.',
  null,
  'December 14, 2025',
  '15 min read',
  array['Finance', 'Portfolio Theory', 'Kelly Criterion'],
  2
),
(
  'Mean–Variance Portfolio Optimization Explained',
  'https://medium.com/@er.mananjain26/mean-variance-portfolio-optimization-explained-with-theory-math-and-a-practical-python-1e9243309a8a',
  'Complete walkthrough of Markowitz''s Modern Portfolio Theory with the math made clear and a hands-on Python implementation using NSE equities.',
  null,
  'December 13, 2025',
  '12 min read',
  array['Portfolio Optimization', 'Markowitz', 'Risk Management', 'Python'],
  3
),
(
  'Separating Signal from Noise: Evaluating Alpha Factors with Alphalens',
  'https://medium.com/@er.mananjain26/separating-signal-from-noise-a-practical-guide-to-evaluating-alpha-factors-with-alphalens-b883070aab14',
  'A reproducible workflow for factor signal assessment — IC metrics, quantile analysis, and turnover measurement using Alphalens.',
  null,
  'November 29, 2025',
  '20 min read',
  array['Quantitative Finance', 'Alpha Factors', 'Alphalens', 'Signal Processing'],
  4
),
(
  'A Practical Framework for Factor Research: Implementing Mean Reversion Strategies',
  'https://medium.com/@er.mananjain26/a-practical-framework-for-factor-research-implementing-mean-reversion-strategies-using-zipline-c3f5c9311ae1',
  'Complete backtest implementation using Zipline — pipeline construction, transaction costs, and performance metrics for mean reversion strategies.',
  null,
  'November 15, 2025',
  '16 min read',
  array['Quant', 'Mean Reversion', 'Zipline', 'Backtesting'],
  5
),
(
  'Beyond Moving Averages: The Hidden Power of Kalman Filters and Wavelets',
  'https://medium.com/@er.mananjain26/beyond-moving-averages-the-hidden-power-of-kalman-filters-and-wavelets-30cddc0124dd',
  'Signal processing techniques that adapt dynamically to market regimes — contrasting static moving averages with Kalman Filters and Wavelet transforms.',
  null,
  'November 13, 2025',
  '6 min read',
  array['Signal Processing', 'Kalman Filter', 'Technical Analysis', 'Quant'],
  6
);
