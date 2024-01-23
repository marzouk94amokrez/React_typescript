/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Laypout", () => {
  describe("layout styles correspond to requirements", () => {
    it("should have the margin 0 1rem 1rem 0 (16*1.15)", () => {
      cy.viewport(1024, 768);
      // Start from the index page
      cy.visit('http://localhost:3000/');

      const baseFontSize = 16;
      const baseSize = 16 * 1.15;

      cy.get('.page-container').should('have.css', 'margin', `0px ${baseSize}px ${baseSize}px 0px`)
    });
  });
});
