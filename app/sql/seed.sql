-- Categories
INSERT INTO categories (name, description) VALUES
('SaaS', '소프트웨어 서비스 제품'),
('Mobile Apps', '모바일 애플리케이션'),
('Developer Tools', '개발자 도구'),
('AI/ML', '인공지능/머신러닝 제품'),
('E-commerce', '전자상거래 솔루션');

-- Topics
INSERT INTO topics (name, slug) VALUES
('Product Discussion', 'product-discussion'),
('Tech Stack', 'tech-stack'),
('Growth Hacking', 'growth-hacking'),
('Design', 'design'),
('Marketing', 'marketing');

-- Teams
INSERT INTO teams (product_name, team_size, equity_split, product_stage, roles, product_description) VALUES
('CodeFlow', 3, 33, 'mvp', 'Backend Developer, Frontend Developer, Designer', 'An innovative code review platform'),
('DataSense', 2, 50, 'prototype', 'Full-stack Developer, Data Scientist', 'AI-powered data analytics tool'),
('MarketPro', 4, 25, 'product', 'Product Manager, Developer, Designer, Marketer', 'Digital marketing automation platform'),
('DevOpsHub', 3, 33, 'mvp', 'DevOps Engineer, Backend Developer, Frontend Developer', 'DevOps automation platform'),
('AIWriter', 2, 50, 'idea', 'ML Engineer, Full-stack Developer', 'AI content generation platform');

-- Products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id) VALUES
('CodeReview Pro', 'Streamline Your Code Reviews', 'Advanced code review platform', 'AI-powered code analysis and review automation', '/icons/code-review.png', 'https://codereview.pro', '{"views": 1000, "reviews": 50}', 'xxxxx', 1),
('DevFlow', 'Developer Workflow Automation', 'Automate your development workflow', 'Integrates with your existing tools and provides automation', '/icons/devflow.png', 'https://devflow.io', '{"views": 800, "reviews": 30}', 'xxxxx', 3),
('AIAssist', 'AI-Powered Development', 'Your AI programming assistant', 'Uses GPT-4 to help with code generation and debugging', '/icons/aiassist.png', 'https://aiassist.dev', '{"views": 1200, "reviews": 45}', 'xxxxx', 4),
('CloudDeploy', 'One-Click Cloud Deployment', 'Simplified cloud deployment', 'Automated cloud infrastructure setup and deployment', '/icons/clouddeploy.png', 'https://clouddeploy.tech', '{"views": 600, "reviews": 25}', 'xxxxx', 3),
('DataViz Pro', 'Beautiful Data Visualization', 'Create stunning data visualizations', 'Drag-and-drop interface for creating charts and graphs', '/icons/dataviz.png', 'https://dataviz.pro', '{"views": 900, "reviews": 35}', 'xxxxx', 1);

-- Posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('Introducing CodeReview Pro', 'Excited to share our new code review platform', 1, 'xxxxx'),
('DevFlow Launch Announcement', 'DevFlow is now available in beta', 1, 'xxxxx'),
('AI in Development', 'How AI is changing software development', 3, 'xxxxx'),
('Cloud Deployment Best Practices', 'Tips for efficient cloud deployment', 2, 'xxxxx'),
('Data Visualization Trends', 'Latest trends in data visualization', 4, 'xxxxx');

-- Reviews
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, 'xxxxx', 5, 'Excellent code review platform'),
(2, 'xxxxx', 4, 'Great workflow automation tool'),
(3, 'xxxxx', 5, 'Amazing AI assistant'),
(4, 'xxxxx', 4, 'Simplified our deployment process'),
(5, 'xxxxx', 5, 'Best data visualization tool');

-- GPT Ideas
INSERT INTO gpt_ideas (idea, views, claimed_by) VALUES
('AI-powered code documentation generator', 100, 'xxxxx'),
('Automated API testing platform', 80, NULL),
('Smart git commit message generator', 120, NULL),
('Code complexity analyzer', 90, NULL),
('Developer productivity tracker', 150, NULL);

-- Message Rooms
INSERT INTO message_rooms DEFAULT VALUES;

-- Message Room Members (Composite Primary Key)
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, 'xxxxx');

-- Messages
INSERT INTO messages (message_room_id, sender_id, content) VALUES
(1, 'xxxxx', 'Hello! Interested in collaboration?');

-- Product Upvotes (Composite Primary Key)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, 'xxxxx');

-- Posts Upvotes (Composite Primary Key)
INSERT INTO posts_upvotes (post_id, profile_id) VALUES
(1, 'xxxxx');

-- GPT Ideas Likes (Composite Primary Key)
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, 'xxxxx');

-- Notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type) VALUES
(NULL, 1, NULL, 'xxxxx', 'reviews'),
(NULL, NULL, 1, 'xxxxx', 'mention'),
(NULL, 2, NULL, 'xxxxx', 'reviews'),
(NULL, NULL, 2, 'xxxxx', 'reply'),
(NULL, 3, NULL, 'xxxxx', 'reviews');

-- Post Replies
INSERT INTO post_replies (post_id, parent_id, profile_id, reply) VALUES
(1, NULL, 'xxxxx', '멋진 제품이네요!'),
(2, NULL, 'xxxxx', '베타 테스트에 참여하고 싶습니다'),
(3, NULL, 'xxxxx', 'AI의 발전이 정말 빠르네요'),
(4, NULL, 'xxxxx', '유용한 정보 감사합니다'),
(5, NULL, 'xxxxx', '시각화 트렌드 분석이 훌륭합니다');

-- Jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range) VALUES
('시니어 프론트엔드 개발자', '혁신적인 웹 애플리케이션 개발', '- React/TypeScript 기반 웹 애플리케이션 개발\n- 성능 최적화 및 사용자 경험 개선\n- 주니어 개발자 멘토링', '- 5년 이상의 프론트엔드 개발 경험\n- React, TypeScript 전문성\n- 웹 성능 최적화 경험', '- 유연근무제\n- 원격근무 가능\n- 최신 장비 지원\n- 교육비 지원', 'React, TypeScript, Next.js, TailwindCSS', 'TechCorp', '/logos/techcorp.png', '서울 강남구', 'https://techcorp.kr/careers', 'full-time', 'hybrid', '$100,000 - $120,000'),
('백엔드 개발자', '확장 가능한 서버 인프라 구축', '- Node.js/TypeScript 기반 API 개발\n- 데이터베이스 설계 및 최적화\n- 마이크로서비스 아키텍처 구현', '- 3년 이상의 백엔드 개발 경험\n- Node.js, TypeScript 숙련도\n- SQL/NoSQL 데이터베이스 경험', '- 자율 출퇴근\n- 건강검진 지원\n- 스톡옵션 제공', 'Node.js, TypeScript, PostgreSQL, Redis', 'CloudTech', '/logos/cloudtech.png', '서울 서초구', 'https://cloudtech.com/jobs', 'full-time', 'in-person', '$70,000 - $100,000'),
('UX/UI 디자이너', '사용자 중심 디자인 구현', '- 사용자 인터페이스 디자인\n- 프로토타입 제작\n- 사용성 테스트 진행', '- 3년 이상의 UX/UI 디자인 경험\n- Figma 전문성\n- 포트폴리오 필수', '- 4대보험\n- 점심식사 제공\n- 디자인 툴 지원', 'Figma, Adobe XD, Sketch', 'DesignHub', '/logos/designhub.png', '부산 해운대구', 'https://designhub.kr/careers', 'remote', 'remote', '$50,000 - $70,000'),
('DevOps 엔지니어', '클라우드 인프라 관리', '- AWS 인프라 구축 및 관리\n- CI/CD 파이프라인 구축\n- 모니터링 시스템 구축', '- 4년 이상의 DevOps 경험\n- AWS 자격증 보유\n- Kubernetes 경험', '- 재택근무\n- 장비 지원\n- 컨퍼런스 참가 지원', 'AWS, Kubernetes, Docker, Terraform', 'CloudOps', '/logos/cloudops.png', '대전 유성구', 'https://cloudops.dev/careers', 'full-time', 'remote', '$120,000 - $150,000'),
('모바일 앱 개발자', '크로스플랫폼 앱 개발', '- React Native 앱 개발\n- 성능 최적화\n- 앱스토어 배포 관리', '- 2년 이상의 모바일 앱 개발 경험\n- React Native 숙련도\n- iOS/Android 개발 경험', '- 주4일 근무\n- 성과급\n- 자기계발비 지원', 'React Native, TypeScript, Firebase', 'AppLabs', '/logos/applabs.png', '인천 송도', 'https://applabs.kr/jobs', 'part-time', 'hybrid', '$50,000 - $70,000'); 