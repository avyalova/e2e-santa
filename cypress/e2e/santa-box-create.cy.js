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
    cy.clearAllCookies()
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

  // it("user3 checks notification about loteri", () => {
  //   cy.visit("/login")
  //   cy.login(users.user3.email, users.user3.password)
  //   cy.get(generalElements.notificationButton).click()
  //   cy.contains(
  //     `У тебя появился подопечный в коробке "${newBoxName}". Скорее переходи по кнопке, чтобы узнать кто это!`
  //   ).should("exist")
  //   cy.clearCookies()
  // })

  Cypress.Commands.add("ApiDeleteBox", (Api) => {
    cy.request({
      url: "/api/login",
      failOnStatusCode: false,
      method: "POST",
      body: {
        email: "washingtonqwerty@gmail.com",
        password: "123456",
      },
    })

    cy.request({
      method: "DELETE",
      // headers: {
      //   Cookie:
      //     "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDEzNzMsImlhdCI6MTY3OTg1NjMxOCwiZXhwIjoxNjc5ODU5OTE4fQ.zw7Ez_LMfpT-4GcvQPyuVkDSXvEEvHwrGw7QMHitUXI; _ym_isad=2; _ohmybid_cmf=2; pm=6roxbbvlalo1wki2kqc48fhs9sa9ejgtkdx; _ym_d=1679856012; _ym_uid=1679344497311567266; adtech_uid=69e67548-3193-4473-a12a-a81bddfe0c60%3Alpitko.ru; top100_id=t1.7627570.2054377752.1679855936257; t3_sid_7627570=s1.717573348.1679855936258.1679856112717.1.7; last_visit=1679848912134%3A%3A1679856112134",
      // },
      url: "/api/box/" + idBox,
    })
  })
})
