// ---------- HELPERS ----------

// Safe momentum calc
function getMomentum(timeline) {
  if (!timeline || timeline.length < 14) return 0

  const last14 = timeline.slice(-14)

  const recent = last14
    .slice(-7)
    .reduce((sum, d) => sum + (d.commits || 0), 0)

  const previous = last14
    .slice(0, 7)
    .reduce((sum, d) => sum + (d.commits || 0), 0)

  if (previous === 0) return 0 // avoid divide by zero

  return (recent - previous) / previous
}

// Safe contributor selection
function getTopContributor(contributors) {
  if (!contributors || contributors.length === 0) return null

  return contributors.reduce((max, curr) =>
    (curr.commits || 0) > (max.commits || 0) ? curr : max
  )
}

// ---------- MAIN ----------
function compute(data) {
  if (!data) return { insights: [], health: null }

  const insights = []

  // ---------- Contributor Risk ----------
  const totalCommits = data.stats?.totalCommits || 1
  const top = getTopContributor(data.contributors) // ✅ fixed

  const dominance = top ? top.commits / totalCommits : 0

  if (top) {
    if (dominance > 0.7) {
      insights.push(`⚠️ ${top.name} owns ${Math.round(dominance * 100)}% of commits`)
    } else if (dominance > 0.4) {
      insights.push(`🟡 ${top.name} heavily contributes (${Math.round(dominance * 100)}%)`)
    }
  }

  // ---------- Activity ----------
  const commits = data.commits || []
  let lastDays = null

  if (commits.length) {
    const latest = Math.max(
      ...commits.map(c => new Date(c.date).getTime())
    )
    lastDays = Math.floor((Date.now() - latest) / (1000 * 60 * 60 * 24))
  }

  if (lastDays !== null) {
    if (lastDays > 14) {
      insights.push(`🔴 No activity for ${lastDays} days`)
    } else if (lastDays > 3) {
      insights.push(`🟡 Last commit ${lastDays} days ago`)
    }
  }

  // ---------- Issues ----------
  const issues = data.stats?.totalIssues || 0
  const contributors = data.stats?.totalContributors || 1

  if (issues > 0) {
    const ratio = contributors / issues

    if (ratio < 0.4) {
      insights.push(`🔴 Too many issues (${issues}) for team size`)
    } else if (ratio < 0.7) {
      insights.push(`🟡 Issues may be piling up`)
    }
  }

  // ---------- Momentum ----------
  const timeline = data.timeline || []
  const trend = getMomentum(timeline) // ✅ fixed

  if (timeline.length >= 14) {
    if (trend < -0.2) {
      insights.push(`📉 Activity dropping`)
    } else if (trend > 0.3) {
      insights.push(`🚀 Activity increasing`)
    }
  }

  // ---------- HEALTH ----------

  const risk = dominance * 100

  const activity =
    lastDays === null
      ? 50
      : lastDays > 30
      ? 0
      : Math.max(0, 100 - lastDays * 3)

  let momentumScore = 50
  if (timeline.length >= 14) {
    momentumScore = Math.max(0, Math.min(100, (trend + 1) * 50))
  }

  const issueScore =
    issues === 0 ? 80 : Math.min((contributors / issues) * 100, 100)

  const health = Math.round(
    (100 - risk) * 0.35 +
    activity * 0.25 +
    momentumScore * 0.2 +
    issueScore * 0.2
  )

  return { insights, health }
}