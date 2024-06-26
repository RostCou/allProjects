/// <reference types="cypress" />

describe("Начало игры", () => {
  beforeEach(() => {
    cy.viewport(800, 800);
    cy.visit("http://localhost:3000/");
    cy.contains("Начать игру!").dblclick();
    cy.get("li.list-item").should("have.length", 16);
    cy.get("li.list-item").find("span").should("have.text", "");
  });

  it("Нажать на одну произвольную карточку. Убедиться, что она осталась открытой.", () => {
    const randLi = "li#" + Math.floor(Math.random() * (16 - 1 + 1) + 1);
    cy.get(randLi).click();
    cy.wait(1000);
    cy.get(randLi).find("span").should("not.be.empty");
  });

  it("Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.", () => {
    let card1;
    let card2;

    function testCardOpen(idCardSecond) {
      cy.get("li#1")
        .click()
        .children()
        .should("not.be.empty")
        .then(($span) => {
          card1 = $span.text();
        })
        .then(() => {
          cy.get("li#" + idCardSecond)
            .click()
            .children()
            .should("not.be.empty")
            .then(($span) => {
              card2 = $span.text();
            })
            .then(() => {
              if (idCardSecond < 16)
                cy.get("li#" + idCardSecond)
                  .next()
                  .click()
                  .should("not.be.empty");
              else
                cy.get("li#" + idCardSecond)
                  .prev()
                  .click()
                  .should("not.be.empty");

              if (card1 !== card2) testCardOpen(++idCardSecond);
            });
        });
    }

    testCardOpen(2);
  });

  it("Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на третью карточку две несовпадающие карточки становятся закрытыми.", () => {
    cy.get("li#1")
      .click()
      .then(() => {
        cy.get("li#2")
          .click()
          .then(() => {
            cy.get("li#2").next().click().should("not.be.empty");;
          })
          .prev()
          .children()
          .should("be.empty");
      })
      .parent()
      .prev()
      .children()
      .should("be.empty");
  });
});
