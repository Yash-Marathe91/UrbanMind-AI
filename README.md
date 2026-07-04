# 🌐 UrbanMind AI
**AI-Powered Multi-Agent Decision Intelligence Platform for Smarter Communities**

![UrbanMind AI Cover](https://github.com/Yash-Marathe91/UrbanMind-AI/assets/placeholder-cover.png)

UrbanMind AI is a next-generation command center designed to orchestrate and simulate an autonomous network of AI agents. It acts as the "Swarm Brain" for smart cities, ingesting real-time data, detecting anomalies across urban infrastructure (traffic, power, security), and executing autonomous decision intelligence with a human-in-the-loop fallback.

---

## ✨ Core Features

- 🧠 **Autonomous Python Swarm Brain**: A robust Python backend engine (`backend/swarm_brain.py`) that constantly simulates live city data, generates localized anomalies, and attempts self-healing protocols autonomously.
- 🌍 **3D Swarm Command Center**: An immersive WebGL-powered 3D Earth visualization built with `React Three Fiber` that plots the swarm topology and data flow in real-time.
- ⚡ **Real-Time Data Sync**: Fully integrated with **Supabase Realtime** and **Zustand**. When the Swarm Brain generates a new incident in the database, the frontend dashboard updates and alerts the operator instantaneously.
- 🤖 **Swarm Assistant (Core AI)**: A floating NLP-driven chat widget integrated directly with the **Google Gemini 1.5 Flash API**, allowing operators to interrogate the swarm network using natural language.
- 🔐 **Cyberpunk Security Gateway**: A meticulously designed, gamified authentication portal utilizing Supabase Auth and Framer Motion for secure operator login and registration.

---

## 🛠️ Technology Stack

**Frontend Architecture:**
- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) (3D Visualization)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
- [shadcn/Base UI](https://ui.shadcn.com/) (Component Library)

**Backend & Infrastructure:**
- [Supabase](https://supabase.com/) (PostgreSQL Database, Realtime Subscriptions, Authentication)
- Python 3.11+ (Simulation Engine)
- [Google Gemini API](https://ai.google.dev/) (Core AI Assistant)

---

## 🚀 Local Development Setup

To run UrbanMind AI locally, you need to run both the Next.js frontend and the Python Swarm Brain backend simultaneously.

### 1. Prerequisites
- Node.js 20+
- Python 3.11+
- A Supabase Project
- A Google Gemini API Key

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Database Setup
Execute the SQL queries found in `database.sql` and `supabase_auth.sql` in your Supabase SQL Editor to provision the required tables (`agents`, `incidents`, `system_metrics`, `profiles`) and setup Row Level Security (RLS).

### 4. Start the Frontend
```bash
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

### 5. Start the Swarm Brain
In a new terminal window, initialize the Python environment and run the intelligence engine:
```bash
cd backend
pip install -r requirements.txt
python swarm_brain.py
```

---

## 👥 The Team

- **Yash Marathe** - Team Leader, Architect & Lead Developer
- **Krishna Patil Rajput** - Member, Core Contributor

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
