-- ══════════════════════════════════════════════════════════════
-- PORTFOLIO DATA UPDATE v2 — Manan Jain (from Resume + LinkedIn)
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ── PERSONAL ─────────────────────────────────────────────────

DELETE FROM personal;

INSERT INTO personal (name, designation, bio, email, phone, address, github, linkedin, twitter, leetcode, instagram, resume_url)
VALUES (
  'Manan Jain',
  'Software Engineering Intern @ LumberFi · B.Tech CSE, IIIT Nagpur',
  'Software engineer and AI practitioner building production systems at the intersection of fintech and machine learning. Currently at LumberFi, architecting real-time ERP integration pipelines across Tier-1 construction platforms — Procore and Sage Intacct — processing live financial data at scale. Previously at RagaAI, where I cut pipeline processing time from 1 hour to under 5 minutes across 100K+ insurance records, and at PepSales AI, building agentic AI micro-services and LLM-powered automation. I ship systems that run in production, not demos that live in READMEs.',
  'er.mananjain26@gmail.com',
  '+918112283285',
  'Bengaluru, Karnataka, India',
  'https://github.com/MananJain2464',
  'https://www.linkedin.com/in/manan-jain-6770751b6',
  'https://x.com/manan_jain26',
  'https://leetcode.com/u/manan_jain_iiitn/',
  'https://www.instagram.com/manan_jain2464/',
  'https://drive.google.com/drive/folders/1CctFYivoN8zw69cEuB5hrDJR3EXaKnMq?usp=sharing'
);

-- ── TIMELINE — EXPERIENCE ─────────────────────────────────────

DELETE FROM timeline WHERE type = 'experience';

INSERT INTO timeline (type, title, organization, duration, description, tags, link, sort_order) VALUES
(
  'experience',
  'Software Engineering Intern',
  'LumberFi',
  'Jan 2026 — Present',
  'Architected and deployed end-to-end data synchronization pipelines between the LumberFi platform and Tier-1 ERPs (Procore, Sage Intacct) using Java Spring Boot and RESTful APIs. Developed bidirectional Push/Pull integration logic for Timesheets, Project Tasks, and Cost Codes — maintaining 100% data integrity across fragmented financial systems. Streamlined CI/CD pipelines with Jenkins and Quartz Scheduler for integration microservices.',
  array['Java', 'Spring Boot', 'React', 'Jenkins', 'RESTful APIs', 'ERP Integration'],
  'https://www.linkedin.com/in/manan-jain-6770751b6',
  1
),
(
  'experience',
  'Data Science Intern',
  'RagaAI',
  'Aug 2025 — Dec 2025',
  'Improved project accuracy from 60% to 72% by redesigning evaluation logic and optimizing data workflows across 100K+ insurance records. Reduced end-to-end pipeline processing time from 1 hour to under 5 minutes per template — a 92% efficiency gain. Built an AI Chatbot + Calling Agent for medical appointment booking. Engineered AMI, Jenkins, and Docker-based deployment environments for LLM-as-a-Judge metric agents, increasing deployment reliability by 30%.',
  array['NLP', 'Agentic AI', 'RAG', 'LangChain', 'FastAPI', 'GCP', 'Docker', 'LLM'],
  'https://www.linkedin.com/in/manan-jain-6770751b6',
  2
),
(
  'experience',
  'AI Backend Engineer Intern',
  'PepSales AI',
  'Jun 2025 — Jul 2025',
  'Boosted model accuracy by 20% via advanced hyperparameter tuning and multi-API speech recognition integration. Developed an automated email notification system using Amazon SES with pixel tracking and unsubscribe management, reducing manual effort by 60%. Collaborated on AI micro-services, refining model logic and improving feature intelligence.',
  array['NLP', 'RAG', 'AWS', 'LangChain', 'MongoDB', 'Flask', 'Amazon SES'],
  'https://www.linkedin.com/in/manan-jain-6770751b6',
  3
),
(
  'experience',
  'Runner-Up — Data Analytica Hackathon',
  'Among 632 participants',
  'October 2024',
  'Built a multilingual learning tool using LLMs, GROQ API, and MarianMT for dataset chunking, tagging, and multilingual question generation.',
  array['LLM', 'GROQ API', 'MarianMT', 'NLP', 'Python'],
  'https://unstop.com/certificate-preview/0a3badfe-fd22-48ea-ae33-022b57b4067e',
  4
),
(
  'experience',
  'Special Mention (Top 5%) — Market-Wise ML Hackathon',
  'Among 392 teams',
  'February 2025',
  'Developed a DeepFake Audio Detection System using LSTM neural networks achieving 95% accuracy on 10K+ audio samples, with Naïve Bayes fraud call classification across 50K+ conversations.',
  array['Python', 'TensorFlow', 'LSTM', 'Librosa', 'NLP'],
  'https://github.com/MananJain2464/Deep_Fake-Detection',
  5
);

-- ── TIMELINE — EDUCATION ─────────────────────────────────────

DELETE FROM timeline WHERE type = 'education';

INSERT INTO timeline (type, title, organization, duration, description, tags, link, sort_order) VALUES
(
  'education',
  'B.Tech in Computer Science and Engineering',
  'Indian Institute of Information Technology, Nagpur',
  '2022 — 2026',
  'Focused on machine learning, distributed systems, and software engineering. Active across technical clubs and hackathons. 300+ LeetCode problems solved.',
  array['CSE', 'Machine Learning', 'Algorithms', 'Python', 'Java'],
  'https://iiitn.ac.in/',
  6
);

-- ── SKILLS ───────────────────────────────────────────────────

DELETE FROM skills;

INSERT INTO skills (name, category, sort_order) VALUES
-- Languages
('Java', 'Languages', 1),
('Python', 'Languages', 2),
('C++', 'Languages', 3),
('SQL', 'Languages', 4),
-- AI / ML
('PyTorch', 'AI & ML', 5),
('TensorFlow', 'AI & ML', 6),
('Keras', 'AI & ML', 7),
('Scikit-learn', 'AI & ML', 8),
('Hugging Face', 'AI & ML', 9),
('LangChain', 'AI & ML', 10),
('SpaCy', 'AI & ML', 11),
('NLTK', 'AI & ML', 12),
-- Data
('NumPy', 'Data', 13),
('Pandas', 'Data', 14),
('OpenCV', 'Data', 15),
('Matplotlib', 'Data', 16),
('Tableau', 'Data', 17),
('PowerBI', 'Data', 18),
-- Backend
('Java Spring Boot', 'Backend', 19),
('FastAPI', 'Backend', 20),
('Flask', 'Backend', 21),
('Django', 'Backend', 22),
('React', 'Backend', 23),
-- MLOps & Cloud
('Docker', 'MLOps & Cloud', 24),
('AWS EC2', 'MLOps & Cloud', 25),
('GCP', 'MLOps & Cloud', 26),
('Jenkins', 'MLOps & Cloud', 27),
('GitHub', 'MLOps & Cloud', 28);

-- ── PROJECTS ─────────────────────────────────────────────────

DELETE FROM projects;

INSERT INTO projects (title, description, tools, role, github_url, demo_url, category, visible, sort_order) VALUES
(
  'AI-Powered Financial & Market Intelligence Bot',
  'AI assistant analyzing 10K+ real-time financial data points daily. Sentiment-driven buy/hold/sell recommendations using VADER + GPT-4 achieving 85% prediction precision. Integrated Yahoo Finance API and Alpha Vantage for live market feeds.',
  array['LangChain', 'FinBERT', 'GPT-4', 'VADER', 'YFinance', 'Streamlit', 'Plotly'],
  'Generative AI Developer',
  'https://github.com/MananJain2464/AI_bot_for_stock_market',
  null,
  'Generative AI',
  true,
  1
),
(
  'Anime Recommendation & Search System',
  'Hybrid recommendation engine combining TF-IDF and collaborative filtering across 10K+ titles with 90%+ relevancy. Automated CI/CD with Jenkins and Docker for zero-downtime deployment on GKE with horizontal scalability.',
  array['Flask', 'Docker', 'Jenkins', 'GCP', 'Kubernetes', 'TF-IDF', 'Collaborative Filtering'],
  'ML Engineer · MLOps',
  'https://github.com/MananJain2464/Anime_recommedation_system',
  'http://35.224.140.74/',
  'ML/MLOps',
  true,
  2
),
(
  'DeepFake Audio Detection & Fraud Call Classifier',
  'LSTM neural network achieving 95% accuracy on 10K+ audio samples using 25 Librosa features. Naïve Bayes fraud detection across 50K+ conversations. LLM-based speech-to-text integration. Built at Market-Wise Hackathon — Top 5% of 392 teams.',
  array['Python', 'TensorFlow', 'LSTM', 'Librosa', 'Scikit-learn', 'Streamlit'],
  'ML Developer',
  'https://github.com/MananJain2464/Deep_Fake-Detection',
  null,
  'ML/MLOps',
  true,
  3
),
(
  'Generative AI & Multi-Agent System Builder',
  'Production multi-agent system with LangChain, LlamaIndex, and FAISS vector stores. 50% faster chatbot responses, 40% better task automation, 30% faster RAG retrieval, and 60% improvement in vector query processing.',
  array['LangChain', 'LlamaIndex', 'HuggingFace', 'Groq', 'FAISS', 'Auto-GPT'],
  'LLM Systems Architect',
  'https://github.com/MananJain2464/RAGs-and-Agents',
  null,
  'Generative AI',
  true,
  4
),
(
  'LLM Question Framing & Validation System',
  'Multilingual question validation tool built at Analytica Hackathon (Runner-up, 632 participants). Uses GROQ API, Llama 3.2, and MarianMT for cross-language dataset chunking, tagging, and multilingual question generation.',
  array['Llama 3.2', 'MarianMT', 'GROQ API', 'Transformers', 'Python'],
  'LLM Engineer',
  'https://github.com/MananJain2464/Analytica',
  null,
  'Generative AI',
  true,
  5
),
(
  'Custom Gun Object Detection (Surveillance AI)',
  'Computer vision pipeline for firearm detection in surveillance footage. FasterRCNN + ResNet50 with TensorBoard tracking, full DVC pipeline, and FastAPI inference endpoint.',
  array['PyTorch', 'FasterRCNN', 'YOLOv5', 'DVC', 'FastAPI', 'OpenCV', 'TensorBoard'],
  'Computer Vision & MLOps Engineer',
  'https://github.com/MananJain2464/Custom_Gun_Object_Detection',
  null,
  'ML/MLOps',
  true,
  6
),
(
  'Production MLOps Pipeline — Titanic Survival',
  'End-to-end MLOps system: PostgreSQL + Airflow ETL, Redis feature store, Flask inference API, Alibi-Detect for data drift, Prometheus/Grafana monitoring stack.',
  array['PostgreSQL', 'Airflow', 'Redis', 'Flask', 'Scikit-learn', 'Prometheus', 'Grafana'],
  'ML Engineer',
  'https://github.com/MananJain2464/Titanic',
  null,
  'ML/MLOps',
  true,
  7
),
(
  'College Database Management System',
  'Full-stack system managing 1,200+ student records, 120+ courses, 80+ faculty profiles across 30+ interconnected SQL tables. Custom admin panel reduced manual operations by 50%. Awarded best-in-batch.',
  array['Flask', 'SQL', 'WordPress', 'Jinja', 'Bootstrap'],
  'Full Stack Developer',
  'https://github.com/MananJain2464/college_database_management_system',
  null,
  'Web Dev',
  true,
  8
),
(
  'TweetHub — Twitter Clone',
  'Django-based microblogging platform with tweet CRUD, media uploads, real-time image previews, user-specific visibility, and search with query filters using Django ORM.',
  array['Django', 'Python', 'SQLite', 'Bootstrap'],
  'Full Stack Developer',
  'https://github.com/MananJain2464/TweetHub-Mini-Twitter-Clone',
  null,
  'Web Dev',
  true,
  9
);

-- ── CREDENTIALS ───────────────────────────────────────────────

DELETE FROM credentials;

INSERT INTO credentials (type, name, issuer, date, category, result, link) VALUES
(
  'competition',
  'Data Analytica — AI & Data Science Hackathon',
  'Unstop',
  'October 2024',
  'AI/ML',
  'Runner-Up · 632 participants',
  'https://unstop.com/certificate-preview/0a3badfe-fd22-48ea-ae33-022b57b4067e'
),
(
  'competition',
  'Market-Wise — ML & Data Science Hackathon',
  'Market-Wise',
  'February 2025',
  'AI/ML',
  'Special Mention · Top 5% of 392 teams',
  'https://github.com/MananJain2464/Deep_Fake-Detection'
),
(
  'certificate',
  'LeetCode — 300+ Problems Solved',
  'LeetCode',
  '2024',
  'DSA',
  null,
  'https://leetcode.com/u/manan_jain_iiitn/'
),
(
  'certificate',
  'GeeksForGeeks — 80+ Problems Solved',
  'GeeksForGeeks',
  '2024',
  'DSA',
  null,
  'https://www.geeksforgeeks.org/'
);
