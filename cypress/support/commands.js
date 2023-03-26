// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const loginPage = require("../fixtures/pages/loginPage.json")
const generalElements = require("../fixtures/pages/general.json")
const users = require("../fixtures/users.json")
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json")
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json")
const loteriPage = require("../fixtures/pages/loteriPage.json")
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective()
import { faker } from "@faker-js/faker"
let cookie

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName)
  cy.get(loginPage.passwordField).type(password)
  cy.get(generalElements.submitButton).click({ force: true })
})

Cypress.Commands.add("addUserApprove", (userName, userPassword) => {
  cy.login(userName, userPassword)
  cy.contains("Создать карточку участника").should("exist")
  cy.get(generalElements.submitButton).click({ force: true })
  cy.get(generalElements.arrowRight).click({ force: true })
  cy.get(generalElements.arrowRight).click({ force: true })
  cy.get(inviteeBoxPage.wishesInput).type(wishes)
  cy.get(generalElements.arrowRight).click({ force: true })
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой")
    })
  cy.clearCookies()
})

Cypress.Commands.add("startLoteri", () => {
  cy.contains("Перейти к жеребьевке").click({ force: true })
  cy.get(loteriPage.submitButton).click({ force: true })
  cy.get(loteriPage.confirmButton).click({ force: true })
})

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
    url: Api,
  })
})
