-- Seed Data — Manan Jain's Portfolio
-- Run AFTER schema.sql in Supabase SQL Editor
--
-- IMPORTANT: Before running this, set your admin password:
-- 1. Open the app and visit /setup to set your password via the UI
-- OR
-- 2. Manually compute SHA-256 of your password and insert below:
--    INSERT INTO config (key, value) VALUES ('admin_password', '<your-sha256-hash>');
--
-- You can compute SHA-256 in browser console:
--   const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword'));
--   console.log([...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join(''));

-- ──────────────────────────────────────────
-- PERSONAL
-- ──────────────────────────────────────────
insert into personal (name, designation, bio, email, phone, address, github, linkedin, twitter, leetcode, instagram, resume_url)
values (
  'Manan Jain',
  'Final Year B.Tech(CSE) | IIIT Nagpur',
  'Hi, I''m Manan Jain — a curious, self-driven individual currently pursuing Computer Science Engineering at IIIT Nagpur. I''m someone who genuinely enjoys learning and building things that matter. Whether it''s collaborating on a group project, leading a college fest team, or diving deep into a new concept, I find joy in the process of creating, exploring, and improving. I believe in learning by doing, and I enjoy taking on challenges that push me outside my comfort zone. I value simplicity, clear thinking, and people who are passionate about what they do. Over the past few years, I''ve grown not just as a tech enthusiast, but as someone who loves to connect ideas, communicate clearly, and work with teams toward meaningful goals. Outside of the screen, I enjoy good conversations, thoughtful design, and a mindset that blends creativity with consistency.',
  'er.mananjain26@gmail.com',
  '+918112283285',
  'Mansarovar, Jaipur, Rajasthan, India',
  'https://github.com/MananJain2464',
  'https://www.linkedin.com/in/manan-jain-6770751b6',
  'https://x.com/manan_jain26',
  'https://leetcode.com/u/manan_jain_iiitn/',
  'https://www.instagram.com/manan_jain2464/',
  'https://drive.google.com/drive/folders/1CctFYivoN8zw69cEuB5hrDJR3EXaKnMq?usp=sharing'
);

-- ──────────────────────────────────────────
-- PROJECTS (11)
-- ──────────────────────────────────────────
insert into projects (title, description, tools, role, github_url, demo_url, category, sort_order) values
(
  'Anime Recommendation & Search System',
  'Hybrid recommendation system using TF-IDF and collaborative filtering on 10K+ anime dataset with Flask backend.',
  array['Python', 'Flask', 'DVC', 'Docker', 'Jenkins', 'GKE', 'GCP', 'Comet-ML', 'SQL', 'NLP', 'Deep Learning'],
  'Deep Learning Engineering, MLOps, Full Stack Development',
  'https://github.com/MananJain2464/Anime_recommedation_system',
  'http://35.224.140.74/',
  'ML/MLOps',
  1
),
(
  'DeepFake Audio Detection & Fraud Call Classifier',
  'System to detect DeepFake audio and classify fraud calls using Librosa (25 audio features), LSTM neural network (95% accuracy on 10K+ samples), Naïve Bayes for fraud detection (50K+ conversations), with LLM-based speech-to-text.',
  array['Python', 'TensorFlow', 'Librosa', 'LSTM', 'NLP', 'Naïve Bayes', 'Streamlit', 'Scikit-learn'],
  'ML Developer',
  'https://github.com/MananJain2464/Deep_Fake-Detection',
  null,
  'ML/MLOps',
  2
),
(
  'Custom Gun Object Detection Model',
  'Object detection for guns in surveillance images using Kaggle dataset, PyTorch, FasterRCNN Resnet with TensorBoard tracking, DVC pipeline, FastAPI backend.',
  array['Python', 'PyTorch', 'YOLOv5', 'TensorBoard', 'DVC', 'FastAPI', 'OpenCV'],
  'Computer Vision & MLOps Engineer',
  'https://github.com/MananJain2464/Custom_Gun_Object_Detection',
  null,
  'ML/MLOps',
  3
),
(
  'User Survival Prediction System',
  'Production-grade MLOps pipeline with PostgreSQL, Astro Airflow ETL, Redis feature store, Flask inference, data drift detection (Alibi-Detect), Prometheus/Grafana monitoring.',
  array['PostgreSQL', 'Astro Airflow', 'Redis', 'Flask', 'Scikit-learn', 'Prometheus', 'Grafana', 'Alibi-Detect'],
  'ML Engineer',
  'https://github.com/MananJain2464/Titanic',
  null,
  'ML/MLOps',
  4
),
(
  'AI-Powered Financial & Market Intelligence Bot',
  'Stock market analysis and investment insights bot with real-time data (Yahoo Finance API, Alpha Vantage), VADER sentiment analysis, GPT-4 financial statement summarization, buy/hold/sell recommendations, Streamlit dashboards with Plotly.',
  array['Python', 'Streamlit', 'LangChain', 'DeepSeek LLM', 'GPT-4', 'VADER', 'Yahoo Finance API', 'Alpha Vantage', 'Plotly'],
  'Generative AI Developer',
  'https://github.com/MananJain2464/AI_bot_for_stock_market',
  null,
  'Generative AI',
  5
),
(
  'LLM-based Question Framing and Validation System',
  'Multilingual question validation tool using GROQ API, Llama 3.2, MarianMT for language handling, with dataset chunking and multilingual tokenization. Built at Analytica Hackathon.',
  array['Python', 'Llama 3.2', 'MarianMT', 'GROQ API', 'Transformers', 'Tokenizers'],
  'LLM Engineer',
  'https://github.com/MananJain2464/Analytica',
  null,
  'Generative AI',
  6
),
(
  'Generative AI & Multi-Agent System Builder',
  'Multi-agent system using LangChain, LlamaIndex, HuggingFace, Groq, Auto-GPT with optimized chatbot (50% faster responses), improved task automation (40%), RAG pipelines (30% faster search), vector databases (60% better query processing).',
  array['LangChain', 'LlamaIndex', 'HuggingFace', 'Groq', 'Auto-GPT', 'FAISS'],
  'LLM Systems Architect',
  'https://github.com/MananJain2464/RAGs-and-Agents',
  null,
  'Generative AI',
  7
),
(
  'AI-Driven Transcript Sentiment Classifier',
  'Sentiment classifier on earnings call transcripts of 10 Big Tech companies, fine-tuned transformers to predict stock movement (70% accuracy on 200+ transcripts), FinBERT and XGBoost integration, LSTM for temporal understanding.',
  array['Python', 'Transformers', 'FinBERT', 'XGBoost', 'Scikit-learn', 'LSTM', 'Pandas'],
  'ML/NLP Engineer',
  null,
  null,
  'ML/MLOps',
  8
),
(
  'College Database Management System',
  'Full-stack system with Flask backend and WordPress frontend. Manages 1,200+ student records, 120+ courses, 80+ faculty profiles. 30+ interconnected SQL tables with full CRUD. Custom admin panel reducing manual operations by 50%. Awarded A+ grade, recognized as best in batch.',
  array['Flask', 'SQL', 'WordPress', 'Jinja', 'HTML/CSS', 'Bootstrap'],
  'Full Stack Developer',
  'https://github.com/MananJain2464/college_database_management_system',
  null,
  'Web Dev',
  9
),
(
  'TweetHub — Twitter Clone',
  'Django-based Twitter-like application with tweet CRUD, media uploads, real-time image previews, Django authentication, user-specific tweet visibility, search functionality with query filters.',
  array['Django', 'Python', 'SQLite', 'HTML', 'CSS', 'Bootstrap'],
  'Full Stack Developer',
  'https://github.com/MananJain2464/TweetHub-Mini-Twitter-Clone',
  null,
  'Web Dev',
  10
),
(
  'React-Based News Application',
  'Responsive multi-page news app integrating NewsAPI with real-time updates. Categorized sections (General, Politics, Entertainment, Sports, Lifestyle), React hooks, reusable components, React Router navigation, responsive design.',
  array['React.js', 'JavaScript', 'CSS', 'NewsAPI', 'React Router'],
  'Frontend Developer',
  null,
  null,
  'Web Dev',
  11
);

-- ──────────────────────────────────────────
-- TIMELINE — Experience
-- ──────────────────────────────────────────
insert into timeline (type, title, organization, duration, description, tags, link, sort_order) values
(
  'experience',
  'Runner-Up — Analytica',
  'Data Science and AI Hackathon',
  'October 2024',
  'Built a multilingual question validation system using GROQ API, Llama 3.2, and MarianMT for language handling. Secured Runner-Up position among competing teams.',
  array['Python', 'LLM', 'NLP', 'GROQ API'],
  'https://unstop.com/certificate-preview/0a3badfe-fd22-48ea-ae33-022b57b4067e',
  1
),
(
  'experience',
  'Special Mention — MarketWise',
  'Data Science Hackathon',
  'February 2025',
  'Built a DeepFake audio detection and fraud call classification system. Received special mention for innovative approach to audio forensics and fraud detection.',
  array['Python', 'TensorFlow', 'LSTM', 'NLP'],
  'https://github.com/MananJain2464/Deep_Fake-Detection',
  2
),
(
  'experience',
  'Content and Anchoring Lead',
  'Orator Club, IIIT Nagpur',
  'August 2023 — April 2024',
  'Led content strategy and anchoring for college events. Managed a team of writers and speakers for multiple college-level events and competitions.',
  array['Leadership', 'Communication', 'Content Creation'],
  'https://drive.google.com/file/d/1W7kyd-LnGzHvlttpRdP8PBcAD3vOCQmm/view?usp=sharing',
  3
),
(
  'experience',
  'Club Lead',
  'CRISPR Club, IIIT Nagpur',
  'August 2023 — April 2024',
  'Led the CRISPR Club at IIIT Nagpur, organizing technical events, workshops, and interdisciplinary discussions on biotechnology and computer science.',
  array['Leadership', 'Event Management', 'Team Building'],
  'https://drive.google.com/file/d/14Q2tEmpD2xG6Lj15EOyoZ4ETMky0fwuo/view?usp=sharing',
  4
);

-- ──────────────────────────────────────────
-- TIMELINE — Education
-- ──────────────────────────────────────────
insert into timeline (type, title, organization, duration, description, tags, link, sort_order) values
(
  'education',
  'Bachelor of Technology in Computer Science and Engineering',
  'Indian Institute of Information Technology, Nagpur',
  '2022 — 2026',
  'Pursuing B.Tech in CSE with focus on Machine Learning, MLOps, and Full Stack Development. Active member of multiple technical clubs.',
  array['CSE', 'ML', 'MLOps', 'Python', 'React'],
  'https://iiitn.ac.in/',
  5
),
(
  'education',
  'Higher Secondary School (Class XII)',
  'MPS International School, Jaipur',
  '2020 — 2022',
  'Completed higher secondary education with focus on Physics, Chemistry, and Mathematics.',
  array['PCM', 'Science'],
  'https://www.mpsinternational.in/',
  6
),
(
  'education',
  'Secondary School (Class X)',
  'MPS International School, Jaipur',
  '2015 — 2020',
  'Completed secondary education with strong foundation in Mathematics and Sciences.',
  array['Mathematics', 'Science'],
  'https://www.mpsinternational.in/',
  7
);

-- ──────────────────────────────────────────
-- CREDENTIALS — Competitions
-- ──────────────────────────────────────────
insert into credentials (type, name, issuer, date, category, result, link) values
(
  'competition',
  'Analytica — Data Science and AI Hackathon',
  'Unstop',
  'October 2024',
  'AI/ML',
  'Runner-Up',
  'https://unstop.com/certificate-preview/0a3badfe-fd22-48ea-ae33-022b57b4067e'
),
(
  'competition',
  'MarketWise — Data Science Hackathon',
  'MarketWise',
  'February 2025',
  'AI/ML',
  'Special Mention',
  'https://github.com/MananJain2464/Deep_Fake-Detection'
);

-- ──────────────────────────────────────────
-- SKILLS (22)
-- ──────────────────────────────────────────
insert into skills (name, category, sort_order) values
-- Languages
('Python', 'Languages', 1),
('JavaScript', 'Languages', 2),
('HTML', 'Languages', 3),
('CSS', 'Languages', 4),
-- Frameworks & Libraries
('React', 'Frameworks', 5),
('Django', 'Frameworks', 6),
('TensorFlow', 'Frameworks', 7),
('PyTorch', 'Frameworks', 8),
('NumPy', 'Frameworks', 9),
('OpenCV', 'Frameworks', 10),
('Tailwind', 'Frameworks', 11),
('Bootstrap', 'Frameworks', 12),
('Selenium', 'Frameworks', 13),
-- Tools & Databases
('Git', 'Tools', 14),
('Docker', 'Tools', 15),
('MongoDB', 'Tools', 16),
('MySQL', 'Tools', 17),
('PostgreSQL', 'Tools', 18),
('Microsoft Office', 'Tools', 19),
-- Cloud
('AWS', 'Cloud', 20),
('GCP', 'Cloud', 21);
