// @vitest-environment jsdom
import { expect, it, vi } from "vitest"
import type { Disposable, ActionContext } from "@eidos.space/plugin-sdk"
import mount from "../src/main"
import activate from "../src/extension"

it("increments in the page and releases its UI and listener when closed", () => {
  const subscriptions: Disposable[] = []
  const root = document.createElement("div")
  mount(
    {
      subscriptions: { add: (value: Disposable) => subscriptions.push(value) },
    } as unknown as Parameters<typeof mount>[0],
    root
  )
  const button = root.querySelector("button")!
  button.click()
  button.click()
  expect(root.querySelector("output")!.textContent).toBe("2")
  const count = root.querySelector("output")!
  subscriptions.forEach((item) => item.dispose())
  expect(root.children).toHaveLength(0)
  button.click()
  expect(count.textContent).toBe("2")
})

it("opens the page through its registered command and releases the registration", async () => {
  const subscriptions: Disposable[] = []
  const dispose = vi.fn()
  let handler: ((context: ActionContext) => void | Promise<void>) | undefined
  const register = vi.fn((id: string, run: NonNullable<typeof handler>) => {
    expect(id).toBe("open")
    handler = run
    return { dispose }
  })
  activate({
    capabilities: { actions: { register } },
    subscriptions: { add: (value: Disposable) => subscriptions.push(value) },
  } as unknown as Parameters<typeof activate>[0])
  const navigate = vi.fn(async () => {})
  await handler!({
    capabilities: { ui: { navigate } },
  } as unknown as ActionContext)
  expect(navigate).toHaveBeenCalledWith("main", "/")
  subscriptions.forEach((item) => item.dispose())
  expect(dispose).toHaveBeenCalledOnce()
})
