const users = require("../fixtures/users.json")
const boxPage = require("../fixtures/pages/boxPage.json")
const generalElements = require("../fixtures/pages/general.json")
const dashboardPage = require("../fixtures/pages/dashboardPage.json")
const invitePage = require("../fixtures/pages/invitePage.json")
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json")
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json")
import { faker } from "@faker-js/faker"

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } })
  let idBox = faker.word.noun({ length: { min: 5, max: 7 } })
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective()
  let maxAmount = 50
  let currency = "Евро"

  it("user logins and create a box", () => {
    cy.visit("/login")
    cy.login(users.userAutor.email, users.userAutor.password)
    cy.contains("Создать коробку").click()
    cy.get(boxPage.boxNameField).type(newBoxName)
    cy.get(boxPage.idBoxField).clear().type(idBox)
    cy.get(generalElements.arrowRight).click()
    cy.get(boxPage.boxIcon).click()
    cy.get(generalElements.arrowRight).click()
    cy.get(boxPage.giftPriceToggle).check({ force: true })
    cy.get(boxPage.maxAmount).type(maxAmount)
    cy.get(boxPage.currency).select(currency)
    cy.get(generalElements.arrowRight).click()
    cy.get(generalElements.arrowRight).click()
    cy.get(generalElements.arrowRight).click({ force: true })
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName)
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники")
        expect(text).to.include("Моя карточка")
        expect(text).to.include("Подопечный")
      })
    cy.log(newBoxName)
  })

  it("add participants", () => {
    cy.get(generalElements.submitButton).click()
    cy.get(":nth-child(1) > .frm-wrapper > #input-table-0").type(
      users.user1.name
    )
    cy.get(":nth-child(2) > .frm-wrapper > #input-table-0").type(
      users.user1.email
    )
    cy.get(":nth-child(3) > .frm-wrapper > #input-table-1").type(
      users.user2.name
    )
    cy.get(":nth-child(4) > .frm-wrapper > #input-table-1").type(
      users.user2.email
    )
    cy.get(":nth-child(5) > .frm-wrapper > #input-table-2").type(
      users.user3.name
    )
    cy.get(":nth-child(6) > .frm-wrapper > #input-table-2").type(
      users.user3.email
    )
    cy.get(generalElements.mainButton).click()
    cy.contains(
      "Карточки участников успешно созданы и приглашения уже отправляются."
    ).should("exist")
    cy.contains(newBoxName).click({ force: true })
  })

  it("start Loteri", () => {
    cy.startLoteri()
    cy.contains("Жеребьевка проведена").should("exist")
    //cy.clearAllCookies()
  })

  it("user1 checks notification about loteri", () => {
    cy.visit("/login")
    cy.login(users.user1.email, users.user1.password)
    cy.get(generalElements.notificationButton).click()
    cy.contains(
      `У тебя появился подопечный в коробке "${newBoxName}". Скорее переходи по кнопке, чтобы узнать кто это!`
    ).should("exist")
    cy.clearCookies()
  })

  it("user2 checks notification about loteri", () => {
    cy.visit("/login")
    cy.login(users.user2.email, users.user2.password)
    cy.get(generalElements.notificationButton).click()
    cy.contains(
      `У тебя появился подопечный в коробке "${newBoxName}". Скорее переходи по кнопке, чтобы узнать кто это!`
    ).should("exist")
    cy.clearCookies()
  })

  it("user3 checks notification about loteri", () => {
    cy.visit("/login")
    cy.login(users.user3.email, users.user3.password)
    cy.get(generalElements.notificationButton).click()
    cy.contains(
      `У тебя появился подопечный в коробке "${newBoxName}". Скорее переходи по кнопке, чтобы узнать кто это!`
    ).should("exist")
    cy.clearCookies()
  })

  after("delete box", () => {
    let Api = Cypress.config("baseUrl") + "/api/box/" + idBox
    cy.ApiDeleteBox(Api)
  })
})
