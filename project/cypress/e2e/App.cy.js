describe("Tests", () => {
  before(() => {
    cy.task("resetDatabase");
    cy.wait(2000);
    cy.request("http://localhost:3000/api/v1/categories/seed");
    cy.wait(2000);
  });

  it("should register a basic user", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("input#register-firstName").type("Big");
    cy.get("input#register-lastName").type("Gamer");
    cy.get("input#register-email").type("biggamer@email.com");
    cy.get("input#register-username").type("biggamer");
    cy.get("input#register-password").type("BigGamer1!");
    cy.get("input#register-confirmPassword").type("BigGamer1!");
    cy.get("button").contains("Submit").click();
    cy.wait(2000);
    cy.contains("User successfully registered");
  }),
    it("should login as admin and create quiz", () => {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
      const todayDay = String(today.getDate()).padStart(2, "0");
      const todayHours = String(today.getHours() + 1).padStart(2, "0");
      const todayMinutes = String(today.getMinutes()).padStart(2, "0");
      const formattedTodayDate = `${todayYear}-${todayMonth}-${todayDay}T${todayHours}:${todayMinutes}`;

      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 4);
      const futureYear = futureDate.getFullYear();
      const futureMonth = String(futureDate.getMonth() + 1).padStart(2, "0");
      const futureDay = String(futureDate.getDate()).padStart(2, "0");
      const futureHours = String(futureDate.getHours()).padStart(2, "0");
      const futureMinutes = String(futureDate.getMinutes()).padStart(2, "0");
      const formattedFutureDate = `${futureYear}-${futureMonth}-${futureDay}T${futureHours}:${futureMinutes}`;

      cy.visit("http://localhost:5173/login");
      cy.get("input#login-email").type("michaeldavis@gmail.com");
      cy.get("input#login-password").type("M1ch@elP@ss12");
      cy.get("button").contains("Submit").click();
      cy.wait(2000);
      cy.contains("User successfully logged in");
      cy.visit("http://localhost:5173/quiz");
      cy.get("select#quiz-categoryId").select("Vehicles");
      cy.get("input#quiz-name").type("CarQuiz");
      cy.get("select#quiz-difficulty").select("medium");
      cy.get("select#quiz-type").select("True/False");
      cy.get("input#quiz-startDate").clear().type(formattedTodayDate);
      cy.get("input#quiz-endDate").clear().type(formattedFutureDate);
      cy.get("button").contains("Create Quiz").click();
      cy.wait(2000);
      cy.contains("Quiz successfully created");
    });

  it("should login as a basic user", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("input#login-email").type("biggamer@email.com");
    cy.get("input#login-password").type("BigGamer1!");
    cy.get("button").contains("Submit").click();
    cy.wait(2000);
    cy.contains("User successfully logged in");
  });
});
