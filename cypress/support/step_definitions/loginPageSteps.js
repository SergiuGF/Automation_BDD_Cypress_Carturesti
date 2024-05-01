import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'


const acceptCookiesBtn = "a[aria-label='allow cookies'].cc-btn.cc-allow";
const languageBtn = '#carturestiLanguageDropdown > .ng-scope:first-child';
const roEng = '[aria-labelledby="carturestiLanguageDropdown"] a.dropdown-item';
const registerLoginBtn = 'button[data-target="#modalLogin"]';
const helloLoginBtn = 'i.cartu-icons-reader.ng-scope ~ span.ng-scope';
const helloBtn = 'span.ng-scope';
const logOut = "li:has(> a[href='/site/logout'][data-method='post'])";
const existingUserBtn = '#loginTrigger';
const logEmailInput = '#loginform-email';
const logPwdInput = '#loginform-password';
const loginBtn = '[name="login-button"]';
const loginBox = ".fade.modal.in";
const secondLogMsgError = '.help-block:contains("Incorrect email or password.")';


Given('the user is on the home page and is logged out', () => {
  cy.fixture('data.json').then((page) => {
  cy.visit(page.url.homePage)
  // Attempt to click the accept cookies button without causing test failure if not present (thanks to { failOnStatusCode: false } - this allows Cypress to continue running the test even if the button is not present.)
  cy.get(acceptCookiesBtn).click({ failOnStatusCode: false });
  cy.get(languageBtn).invoke('text').then((text) => {
    if (text.includes('Română')) {
      cy.get(languageBtn).click();
      cy.get(roEng).click();
    };
  });
  // Checks if the user is already logged in. If is, it will log out.
  cy.get(helloLoginBtn).eq(1).invoke('text').then((text) => {
    if (!text.includes('Login')) {
      cy.get(helloBtn).contains('Hello').click();
      cy.get(logOut).click();
    };
  }); 
  });
});


// @Login1
When('the user clicks on the login button', () => {
  cy.get(registerLoginBtn).eq(1).click();
});

When('the user clicks on the existing user button', () => {
  cy.get(existingUserBtn).click();
});

When('the user enters a valid email {string}', (validEmail) => {
  if (validEmail !== 'N/A') {
    cy.get(logEmailInput).type(validEmail, {force: true});
  };
});

When('the user enters a correct password {string}', (validPassword) => {
  if (validPassword !== 'N/A') {
    cy.get(logPwdInput).type(validPassword, {force: true});
  };
});

When('the user clicks the login button', () => {
  cy.wait(1000); 
  cy.get(loginBtn).click();
  cy.wait(1000); 
});

Then('the login box is closed', () => {
  cy.wait(1000);
  cy.get(loginBox).should('not.exist');
});


// @Login2
// first two steps are the same
When('the user enters email address {string}', (email) => {
  if (email !== 'N/A') {
    cy.get(logEmailInput).type(email, {force: true});
  };
});

When('the user enters password {string}', (password) => {
  if (password !== 'N/A') {
    cy.get(logPwdInput).type(password, {force: true});
  };
});

// next step is the same

Then('the login error message is displayed', () => {
  cy.get(logEmailInput).invoke('attr', 'class').then((classes) => {
    if (classes.includes('ng-not-empty')) {
       cy.contains('Password cannot be blank.').should('be.visible');
    } else {
       cy.contains('Email cannot be blank').should('be.visible');
    }
});
});

Then('the login error message contains {string} text', (errorMsgText) => {
  cy.get(logEmailInput).invoke('attr', 'class').then((classes) => {
    if (classes.includes('ng-not-empty')) {
       cy.contains('Password cannot be blank.').should('contain.text', errorMsgText);
    } else {
       cy.contains('Email cannot be blank').should('contain.text', errorMsgText);
    }
});
});


// # @Login3
// first five steps are the same
Then('the second login error message is displayed', () => {
  cy.get(secondLogMsgError).should('be.visible');
});

Then('the second login error message contains {string} text', (errorMsgText) => {
  cy.get(secondLogMsgError).should('contain.text', errorMsgText);
});
