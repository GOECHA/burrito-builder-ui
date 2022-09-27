describe('Burrito order user flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: "/burrito_data.json",
    }) .as("orders");
    cy.visit('http://localhost:3000/')
  })
  it('should be able to visit the page and find the header', () => {
    cy.get('h1')
    .contains('Burrito Builder')
  })
  it('should be able to see button that submits neOrder', () => {
    cy.get('.submit-btn')
    .should('be.visible')
  })
  it("should render burrito form", () => {
    cy.get("form").should("contain", "Submit Order");
    cy.get("form").should("contain", "lettuce");
    cy.get("form").should("contain", "Nothing selected");
    cy.get("button").should("have.length", 13);
  });

  it("should render previous orders", () => {
    cy.get(".order").should("contain", "Pat");
    cy.get(".order").should("contain", "Sam");
    cy.get(".order").should("contain", "Alex");
  });

  it("should not be able to place an order if NAME isn't present", () => {
    cy.wait("@orders");
    cy.get(".order").should("have.length", 3);
    cy.get(".error").should("contain", "");
    cy.get("button").first().click();
    cy.get("p").should("contain", "Order: beans");
    cy.get(".submit-btn").click();
    cy.get(".error").should("contain",  "You're missing name, please fill out missing info");
    cy.get(".order").should("have.length", 3);
  });

  it("should not be able to place an order if INGREDIENT isn't present", () => {
    cy.wait("@orders");
    cy.get(".order").should("have.length", 3);
    cy.get(".error").should("contain", "");
    cy.get('input[type="text"]').type("Josh");
    cy.get(".submit-btn").click();
    cy.get(".error").should(
      "contain",
      "You're missing ingredient, please fill out missing info"
    );
    cy.get(".order").should("have.length", 3);
  });

  it("should be able to place an order", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders").as("order");
    cy.visit("http://localhost:3000");
    cy.get('input[type="text"]').type("Chantal");
    cy.get("button").first().click();
    cy.get("p").should("contain", "Order: beans");
    cy.get(".submit-btn").click();
    cy.wait("@order").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.name).to.eq("Chantal");
      expect(response.body.ingredients).to.deep.eq(["beans"]);
    });
    cy.get("h3").last().should("contain", "Chantal");
    cy.get(".order").last().should("contain", "beans");
  });
});

