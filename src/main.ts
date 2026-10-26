import type { Mount } from "@eidos.space/plugin-sdk"
import "./style.css"

const mount: Mount = (ctx, root) => {
  const page = document.createElement("section")
  page.className = "plugin-page"
  const heading = document.createElement("h1")
  heading.textContent = "Hello from your plugin"
  const description = document.createElement("p")
  description.textContent = "Edit src/main.ts to build your own tool."
  const button = document.createElement("button")
  button.type = "button"
  button.textContent = "Add one"
  const count = document.createElement("output")
  count.setAttribute("aria-label", "Count")
  count.setAttribute("aria-live", "polite")
  count.textContent = "0"
  let value = 0
  const increment = () => {
    count.textContent = String(++value)
  }
  button.addEventListener("click", increment)
  const controls = document.createElement("div")
  controls.className = "plugin-controls"
  controls.append(button, count)
  page.append(heading, description, controls)
  root.append(page)
  ctx.subscriptions.add({
    dispose() {
      button.removeEventListener("click", increment)
      page.remove()
    },
  })
}

export default mount
