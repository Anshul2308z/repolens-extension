// ---------- CONFIG ----------
const API_BASE = "https://git-hub-repolens.vercel.app"

// ---------- UTIL ----------
function getRepoInfo() {
  const path = window.location.pathname.split("/").filter(Boolean)
  if (path.length !== 2) return null
  const [owner, repo] = path
  return { owner, repo }
}

function buildRepoUrl({ owner, repo }) {
  return `https://github.com/${owner}/${repo}`
}

// ---------- API ----------
async function fetchRepoData(repo) {
  try {
    const res = await fetch(
      `${API_BASE}/api/repo?url=${encodeURIComponent(
        buildRepoUrl(repo)
      )}&branch=main`
    )
    return await res.json()
  } catch (err) {
    console.error("RepoLens fetch error:", err)
    return null
  }
}

// ---------- LOGIC ----------

function getHealthMeta(score) {
  if (score >= 80) return { label: "🟢 Healthy", color: "#2ea043" }
  if (score >= 50) return { label: "🟡 Moderate Risk", color: "#d29922" }
  return { label: "🔴 High Risk", color: "#f85149" }
}

// ---------- UI ----------
function createBasePanel() {
  const panel = document.createElement("div")
  panel.id = "repolens-panel"

  Object.assign(panel.style, {
    position: "fixed",
    top: "70px",
    right: "20px",
    width: "320px",
    zIndex: "999999",
    background: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "12px",
    padding: "16px",
    color: "#c9d1d9",
    fontSize: "14px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
  })

  return panel
}

function renderLoading(panel) {
  panel.innerHTML = `
    <div style="font-weight:600;">RepoLens</div>
    <div style="margin-top:8px; font-size:13px; opacity:0.8;">
      Analyzing repository...
    </div>
  `
}

function renderError(panel) {
  panel.innerHTML = `<div>⚠️ Failed to load</div>`
}

function renderPanel(panel, { health, insights, repo }) {
  const { label, color } = getHealthMeta(health)

  panel.innerHTML = `
    <div style="font-weight:600; margin-bottom:10px;">
      RepoLens
    </div>

    <div style="margin-bottom:10px; font-weight:600; color:${color}">
      ${label}
    </div>

    <div style="font-size:12px; line-height:1.4;">
      ${
        insights?.slice(0, 3).map(i => `• ${i}`).join("<br>") ||
        "No insights available"
      }
    </div>

    <button id="repolens-open" style="
      margin-top:12px;
      width:100%;
      padding:8px;
      background:#238636;
      border:none;
      border-radius:6px;
      color:white;
      cursor:pointer;
    ">
      Open Dashboard →
    </button>
  `

  document.getElementById("repolens-open").onclick = () => {
    const url = `${API_BASE}/dashboard?url=${encodeURIComponent(
      buildRepoUrl(repo)
    )}&branch=main`

    window.open(url, "_blank")
  }
}

// ---------- PANEL CONTROL ----------
async function mountPanel() {
  if (document.getElementById("repolens-panel")) return

  const repo = getRepoInfo()
  if (!repo) return

  const panel = createBasePanel()
  renderLoading(panel)
  document.body.appendChild(panel)

  const data = await fetchRepoData(repo)
  if (!data) return renderError(panel)

const { insights, health } = compute(data)
const healthMeta = getHealthMeta(health)


  renderPanel(panel, {
    health,
    insights,
    repo,
  })
}

function togglePanel() {
  const existing = document.getElementById("repolens-panel")
  existing ? existing.remove() : mountPanel()
}

// ---------- BUTTON ----------
function createButton() {
  if (document.getElementById("repolens-btn")) return

  const button = document.createElement("button")
  button.id = "repolens-btn"
  button.innerText = "RepoLens"

  Object.assign(button.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "999999",
    padding: "10px 14px",
    background: "#111",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  })

  button.onclick = togglePanel
  document.body.appendChild(button)
}

// ---------- INIT ----------
if (getRepoInfo()) {
  createButton()
}