function createButton() {
    if(document.getElementById("repolens-btn")) {
        return
    }
  const button = document.createElement("button")
    button.id = "repolens-btn"
  button.innerText = "RepoLens"

  button.style.position = "fixed"
  button.style.top = "20px"
  button.style.right = "20px"
  button.style.zIndex = "999999"

  button.style.padding = "10px 14px"
  button.style.background = "#111"
  button.style.color = "#fff"
  button.style.border = "1px solid #333"
  button.style.borderRadius = "8px"
  button.style.cursor = "pointer"
  button.style.fontSize = "14px"

  document.body.appendChild(button)
}

createButton()