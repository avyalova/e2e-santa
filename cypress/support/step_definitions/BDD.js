import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { faker } from "@faker-js/faker"
const boxPage = require("../../fixtures/pages/boxPage.json")
const generalElements = require("../../fixtures/pages/general.json")
const dashboardPage = require("../../fixtures/pages/dashboardPage.json")
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } })
let idBox = faker.word.noun({ length: { min: 5, max: 7 } })
let maxAmount = 50
let currency = "Евро"

Given("user is on the secret santa login page", function () {
  cy.visit("/login")
})

Given("user logs in as {string} and {string}", function (login, password) {
  cy.login(login, password)
})

Then("user is on dashboard page", function () {
  cy.contains("Создать коробку").click()
})

Then("user creates a box", function () {
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
})

Given("user is created box and started to add participants", function () {
  cy.get(generalElements.submitButton).click()
})

When("user1 added to the box as {string} and {string}", function (name, email) {
  cy.get(":nth-child(1) > .frm-wrapper > #input-table-0").type(name)
  cy.get(":nth-child(2) > .frm-wrapper > #input-table-0").type(email)
})

When("user2 added to the box as {string} and {string}", function (name, email) {
  cy.get(":nth-child(3) > .frm-wrapper > #input-table-1").type(name)
  cy.get(":nth-child(4) > .frm-wrapper > #input-table-1").type(email)
})

When("user3 added to the box as {string} and {string}", function (name, email) {
  cy.get(":nth-child(5) > .frm-wrapper > #input-table-2").type(name)
  cy.get(":nth-child(6) > .frm-wrapper > #input-table-2").type(email)
  cy.get(generalElements.mainButton).click()
})

Then("user notified about new participants", function () {
  cy.contains(
    "Карточки участников успешно созданы и приглашения уже отправляются."
  ).should("exist")
  cy.contains(newBoxName).click({ force: true })
})

Given("user stars lottery", function () {
  cy.startLoteri()
})

Then("check if lorrety been complited", function () {
  cy.contains("Жеребьевка проведена").should("exist")
  cy.clearAllCookies()
})

Given("user1 is on the secret santa login page", function () {
  cy.visit("/login")
})

When("user1 logs in as {string} and {string}", function (login1, password1) {
  cy.login(login1, password1)
})

Then("check notification for user1", function () {
  cy.get(generalElements.notificationButton).click()
  cy.contains(
    `У тебя появился подопечный в коробке "${newBoxName}". Скорее переходи по кнопке, чтобы узнать кто это!`
  ).should("exist")
  cy.clearCookies()
})

Given("user2 is on the secret santa login page", function () {
  cy.visit("/login")
})

When("user2 logs in as {string} and {string}", function (login1, password1) {
  cy.login(login1, password1)
})

Then("check notification for user2", function () {
  cy.get(generalElements.notificationButton).click()
  cy.contains(
    `У тебя появился подопечный в коробке "${newBoxName}". Скорее переходи по кнопке, чтобы узнать кто это!`
  ).should("exist")
  cy.clearCookies()
})
