import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
const users = require("../../fixtures/users.json")

Given("user is on the secret santa login page", function () {
  cy.visit("/login")
})

// When("user logs in", function () {
//   cy.login(users.userAutor.email, users.userAutor.password)
// })

Given("user logs in as {string} and {string}", function (login, password) {
  cy.login(login, password)
})

Given("user logs in with table", function (dataTable) {
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password)
})

Then("user is on dashboard page", function () {
  cy.contains("Создать коробку")
})
