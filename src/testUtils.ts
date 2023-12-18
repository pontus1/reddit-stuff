import React, { ReactElement } from "react"
import { render, RenderOptions, RenderResult } from "@testing-library/react"
import { ReduxProvider } from "./store/ReduxProvider"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {}

export function renderWithStore(
  ui: ReactElement,
  renderOptions: ExtendedRenderOptions = {}
): RenderResult {
  return render(ui, { wrapper: ReduxProvider, ...renderOptions })
}
