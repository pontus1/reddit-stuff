import { screen } from "@testing-library/react"
import Home from "../app/page"
import { renderWithStore } from "@/testUtils"

import { mockPostsResponse } from "@/tests/__mocks__/mockPostsResponse"

describe("Home", () => {
  beforeEach(() => {
    fetchMock.doMock()
  })

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("should render without crashing", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPostsResponse))
    renderWithStore(<Home />)
    screen.getByText(/Reddit Stuff/)
  })

  it("should fetch and render first 10 posts by subject on mount", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPostsResponse))
    renderWithStore(<Home />)
    mockPostsResponse.data.children.forEach(({ data }, index) => {
      if (index < 10) {
        screen.getByText(data.title)
      }
    })
  })

  //   TODO: test error and pagination etc.
})
