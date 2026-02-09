# 🎯 Context Switch Tracker

A productivity app that helps developers and knowledge workers track context switches, monitor their focus, and protect deep work time.

![Context Switch Tracker](https://img.shields.io/badge/React-18.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

- **Real-time Task Tracking** - Start a task and watch the timer count up
- **Context Switch Detection** - Logs every task switch with duration
- **Deep Work Metrics** - Tracks sessions over 25 minutes as "deep work"
- **Productivity Insights** - Shows estimated time lost to context switching (based on research showing each switch costs ~23 minutes)
- **Task History** - Visual timeline of all completed tasks
- **Smart Alerts** - Warns when you're switching too frequently
- **Beautiful UI** - Dark gradient theme with smooth animations

## 📊 Metrics Displayed

- Total context switches
- Average task duration
- Deep work percentage
- Total session time
- Estimated productivity loss

## 🚀 Live Demo

[View Live Demo](https://yourusername.github.io/context-switch-tracker/)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/context-switch-tracker.git
cd context-switch-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📦 Deployment

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repository name:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/'
})
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in your repository settings (Settings → Pages → Source: gh-pages branch)

## 🎯 How to Use

1. **Start a Task**: Enter what you're working on and click "Start Task"
2. **Switch Tasks**: When you need to switch, click "Switch Task" - it will log the time spent
3. **Monitor Your Metrics**: Watch your context switch count and deep work percentage
4. **Get Insights**: The app alerts you when you're switching too frequently
5. **End Your Session**: Click "End Session" when you're done for the day

## 💡 Deep Work Tips

- Aim for task blocks of at least 25 minutes to enter flow state
- Each context switch costs ~23 minutes of refocusing time
- Schedule "context switch time" for emails, messages, and quick tasks
- Protect your morning hours for deep, creative work
- Use "Do Not Disturb" mode during tracked tasks

## 🧰 Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **LocalStorage** - Data persistence (in browser)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Research on context switching costs from the University of California, Irvine
- Deep work methodology inspired by Cal Newport's "Deep Work"
- Icon set from Lucide Icons

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/context-switch-tracker](https://github.com/yourusername/context-switch-tracker)

---

Made with ❤️ for developers who want to protect their focus time
