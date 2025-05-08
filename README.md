# 🧠 MindExpressions: Emotion Matcher

**MindExpressions** is a fast-paced mini-game where players test their emotional recognition skills by matching AI-generated facial expressions with labels, emojis, or even mimicking them in real-time using a webcam.

Built with React + TypeScript + Vite, powered by TensorFlow.js, Firebase, and modern UI/UX libraries like Framer Motion and Tailwind CSS.

---

## 🎮 Game Modes

![image](https://github.com/user-attachments/assets/8560f799-7d5c-4bb8-af62-6e6e021d6062)


- **Classic Mode:** Match face to emotion label (e.g., Happy, Angry, Sad)
![image](https://github.com/user-attachments/assets/5f85fc7b-1b9c-4f0c-8101-c4a177b1004f)

- **Emoji Mode:** Match face to correct emoji
- **Mirror Mode (Pro):** Use webcam to mimic expression, verified in real-time with TensorFlow.js

---

## 🚀 Live Features

- AI-generated or preloaded faces
- 3-second timed decisions
- Combo streaks and score multipliers
- Global high-score leaderboard (via Firebase)
- Unlockable themes and badges
- Rive/Lottie animations for win/loss effects

---

## 🧪 Technologies Used

| Tech           | Purpose                                 |
|----------------|------------------------------------------|
| **React + Vite** | Fast frontend with Hot Module Reload   |
| **TypeScript**   | Type safety and better tooling         |
| **Tailwind CSS** | Rapid UI styling                      |
| **TensorFlow.js**| Facial expression detection (Mirror Mode) |
| **Firebase**     | Auth, database for high scores         |
| **Framer Motion**| UI transitions and animation           |
| **Lottie / Rive**| Animated feedback                     |

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/faizzyhon/MindExpressions.git
cd MindExpressions
2. Install Dependencies
bash
Copy
Edit
npm install
# or
yarn
3. Run Locally
bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser.

🧰 ESLint Configuration (Recommended)
Update .eslintrc.cjs for strict, type-aware linting:

js
Copy
Edit
module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
};
Install additional ESLint plugins if needed:

bash
Copy
Edit
npm install -D eslint-plugin-react @typescript-eslint/eslint-plugin eslint-config-prettier
📦 Build for Production
bash
Copy
Edit
npm run build
Deploy the dist/ folder to Hostinger or any static hosting provider.

📷 Assets and AI Models
You may use Generated Photos or This Person Does Not Exist for initial faces.

For webcam expression matching: TensorFlow.js pre-trained models like face-landmarks-detection or blazeface.

👨‍💻 Developer Info
Built with ❤️ by FaizzyHon

💼 AI Engineer | React & Next.js Developer | CEH Certified

🔗 GitHub: github.com/faizzyhon

🔗 LinkedIn: linkedin.com/in/mfaizanai

📸 Instagram: @faizzyhon

📅 Book a Meeting: Calendly

🛒 Buy Source Code / Donate: PocketsFlow

🧠 Why Play?
MindExpressions trains both your reflexes and emotional intelligence — making it more than a game, it's a brain gym with style.

"Feel fast. Think faster."

📜 License
MIT – Use freely, mention the original author when publishing public forks.

vbnet
Copy
Edit

Let me know if you'd like the full **starter project template**, component structure, or codebase zip 
