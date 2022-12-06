import * as StringUtils from "./html.util";

describe("Html utils", () => {
  describe("Fix video content", () => {
    it("should replace 'figure' and 'oembed' tags by 'iframe'", () => {
      const originalContent = `<p><figure class="media"><oembed url="https://youtube.com/watch?v=fUhUDXWnSk4"></oembed></figure></p>`;
      const expectedContent = `<p><iframe src="https://youtube.com/watch?v=fUhUDXWnSk4"></iframe></p>`;
      expect(StringUtils.fixMediaContent(originalContent)).toBe(
        expectedContent
      );
    });

    it("should replace youtube links (https://youtube.com/watch?v=) by youtube embed links", () => {
      const originalContent = `<p><iframe src="https://youtube.com/watch?v=fUhUDXWnSk4"></iframe></p>`;
      const expectedContent = `<p><iframe src="https://youtube.com/embed/fUhUDXWnSk4"></iframe></p>`;
      expect(StringUtils.fixYoutubeLinkContent(originalContent)).toBe(
        expectedContent
      );
    });

    it("should replace youtube links (https://youtu.be/) by youtube embed links", () => {
      const originalContent = `<p><iframe src="https://youtu.be/fUhUDXWnSk4"></iframe></p>`;
      const expectedContent = `<p><iframe src="https://youtube.com/embed/fUhUDXWnSk4"></iframe></p>`;
      expect(StringUtils.fixYoutubeLinkContent(originalContent)).toBe(
        expectedContent
      );
    });
  });

  describe("fix list content", () => {
    it("should replace 'ul' tag by 'ul' with 'max-width'", () => {
      const screenWidth = 250;
      const originalContent = `<p><ul><li>item 1</li><li>item 2</li></ul></p>`;
      const expectedContent = `<p><ul style="max-width:${screenWidth}px;"><li>item 1</li><li>item 2</li></ul></p>`;
      expect(StringUtils.fixListContent(originalContent, screenWidth)).toBe(
        expectedContent
      );
    });
  });
});
