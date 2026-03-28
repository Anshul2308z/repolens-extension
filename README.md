# RepoLens Extension 🔍

**Instant GitHub insights — without leaving the repo page.**

RepoLens Extension is a lightweight browser extension that eliminates the friction of copying a repository URL, opening a new tab, and pasting it into RepoLens.

👉 You stay on GitHub.
👉 You click once.
👉 You understand instantly.

---

## 🚀 What it does

On any GitHub repository page, RepoLens adds a floating button.

Click it → and you get:

* 🟢 **Health Status** (Healthy / Moderate Risk / High Risk)
* ⚠️ **Contributor Risk**
* 📉 **Activity Signals**
* 🚀 **Momentum Trends**

No navigation. No context switching.

---

## 🧠 Why this exists

The main RepoLens app is powerful — but has friction:

```txt
Open Repo → Copy URL → Open RepoLens → Paste → Analyze
```

This extension removes that entirely:

```txt
Open Repo → Click → Done
```

👉 Same intelligence.
👉 Zero friction.

---

## 🔗 Works with RepoLens

This extension is an **addon to the main RepoLens product**:

👉 https://git-hub-repolens.vercel.app/

Use the extension for **quick decisions**,
use the dashboard for **deep analysis**.

---

## 🏗️ Architecture

```txt
GitHub Repo Page
   ↓
RepoLens Extension (content.js)
   ↓
Floating Panel
   ↓
RepoLens API (Vercel)
   ↓
Insights + Health Score
   ↓
(Optional) Full Dashboard
```

---

## ⚙️ How it works

1. Detects the current repository (`/owner/repo`)
2. Fetches processed data from RepoLens API
3. Computes:

   * Contributor dominance
   * Activity recency
   * Issue pressure
   * Momentum (7d vs previous 7d)
4. Displays **instant insights + health**

---

## 📦 Installation (Manual)

1. Clone the repo

```bash
git clone https://github.com/Anshul2308z/repolens-extension
```

2. Open Chrome → `chrome://extensions/`

3. Enable **Developer Mode**

4. Click **Load unpacked**

5. Select this project folder

---

## 🧪 Development

Key files:

* `content.js` → UI + orchestration
* `insights.js` → insight + health computation
* helpers → momentum, contributors

After changes:

👉 Reload extension in Chrome

---

## 🔥 Example Insights

* ⚠️ One contributor owns 78% of commits
* 🔴 No activity for 21 days
* 📉 Activity dropping
* 🚀 Development accelerating

---

## 🚧 Roadmap

* [ ] Smarter insight ranking (only strongest signals)
* [ ] UI animations + smoother transitions
* [ ] Local caching (reduce API calls)
* [ ] Chrome Web Store release
* [ ] Better health accuracy (repo-size aware)

---

## ⚠️ Limitations

* Issue handling is approximated
* Small repos may skew results
* Works on public repositories only

---

## 🧨 Philosophy

This extension is not a dashboard.

It’s a **decision trigger**.

You shouldn’t analyze —
you should **know immediately**.

---

## 🤝 Contributing

PRs welcome.

Focus areas:

* Insight quality
* Performance
* UX clarity

---

## TL;DR

* RepoLens = deep analysis
* RepoLens Extension = instant insight
* Removes tab-switching friction completely
