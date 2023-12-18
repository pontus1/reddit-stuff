import { isValidImageUrl } from "../utils.ts"

describe("isValidImageUrl", () => {
  it('should return false if url does not start with "http"', () => {
    expect(isValidImageUrl("abc")).toBe(false)
  })

  it('should return true if url starts with "http"', () => {
    expect(isValidImageUrl("https://abc.def")).toBe(true)
  })
})
