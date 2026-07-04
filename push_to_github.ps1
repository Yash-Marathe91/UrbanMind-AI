# PowerShell script to commit and push in 10 stages

# 1. Initialize and Setup Remote
git init
git remote add origin https://github.com/Yash-Marathe91/UrbanMind-AI.git
git checkout -b main

# Create a .gitignore if it doesn't exist to avoid pushing node_modules
if (!(Test-Path .gitignore)) {
    Set-Content -Path .gitignore -Value "node_modules/`n.next/`n.env*`n!.env.example`n__pycache__/`n.venv/`n"
}

# Add all files to index first, but we'll reset and add selectively
git add .
git reset

# Commit 1: Project Configuration & Setup
git add package.json package-lock.json next.config.mjs tsconfig.json postcss.config.mjs tailwind.config.ts .eslintrc.json components.json .gitignore
git commit -m "chore: Initialize Next.js project structure and configuration"
git push -u origin main -f

# Commit 2: Global Styles and Base Layout
git add src/app/globals.css src/app/layout.tsx src/app/fonts
git commit -m "style: Setup global typography, Framer Motion, and CSS variables"
git push origin main

# Commit 3: UI Component Library (shadcn/Base UI)
git add src/components/ui/
git commit -m "feat: Add core UI components library (shadcn)"
git push origin main

# Commit 4: State Management & Utilities
git add src/lib/ src/store/
git commit -m "feat: Implement Zustand state management and Supabase client"
git push origin main

# Commit 5: Topbar & Sidebar Layout
git add src/components/layout/
git commit -m "feat: Build authenticated Topbar and Sidebar layouts"
git push origin main

# Commit 6: Core Dashboard Components
git add src/components/dashboard/
git commit -m "feat: Develop SwarmGlobe 3D viz and SwarmAssistant chat UI"
git push origin main

# Commit 7: Dashboard Pages
git add src/app/dashboard/
git commit -m "feat: Implement Swarm Command Center dashboard pages"
git push origin main

# Commit 8: Landing & Authentication Gateway
git add src/app/page.tsx src/app/login/
git commit -m "feat: Build Landing page and Cyberpunk Login gateway"
git push origin main

# Commit 9: API & Integration
git add src/app/api/
git commit -m "feat: Integrate Google Gemini AI API for SwarmAssistant"
git push origin main

# Commit 10: Python Swarm Brain & SQL Scripts
git add backend/ database.sql supabase_auth.sql
# Add any remaining untracked/modified files
git add .
git commit -m "feat: Add Python Swarm Brain engine and Supabase SQL schemas"
git push origin main
