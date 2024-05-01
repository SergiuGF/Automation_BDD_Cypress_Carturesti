import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'


const acceptCookiesBtn = "a[aria-label='allow cookies'].cc-btn.cc-allow";
const languageBtn = '#carturestiLanguageDropdown > .ng-scope:first-child';
const roEng = '[aria-labelledby="carturestiLanguageDropdown"] a.dropdown-item';
const registerLoginBtn = 'button[data-target="#modalLogin"]';
const helloLoginBtn = 'i.cartu-icons-reader.ng-scope ~ span.ng-scope';
const helloBtn = 'span.ng-scope';
const logOut = "li:has(> a[href='/site/logout'][data-method='post'])";
const newUserBtn = '#signupTrigger';
const regEmailInput = '#signupform-email';
const regPwdInput = '#signupform-password';
const singUpBtn = '#modalSignupForm button';
const regEmailErrMsg = '.field-signupform-email.md-input-invalid';
const regPwdErrMsg = '.field-signupform-password.md-input-invalid';
const regEmailMessageError = '.field-signupform-email .help-block';
const regPwdMessageError = '.field-signupform-password .help-block';
const regCaptchaMessageError = '.field-signupform-recaptcha .help-block';


Given('the user is on the home page and is not logged in', () => {
  cy.fixture('data.json').then((page) => {
  cy.visit(page.url.homePage);
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


// @Register1
When('the user clicks on the register button', () => {
  cy.get(registerLoginBtn).eq(1).click();
});

When('the user clicks on the new user button', () => {
  cy.get(newUserBtn).click();
});

When('the user enters a random valid email', () => {
  cy.setRandomEmail(regEmailInput);
});

When('the user enters a valid password {string}', (password) => {
  cy.get(regPwdInput).type(password, {force: true});
});

When('the user clicks the signup button', () => {
  cy.get(singUpBtn).click();
});

Then('the email and password error message is not displayed', () => {
  cy.get(regEmailErrMsg).should('not.exist');
  cy.get(regPwdErrMsg).should('not.exist');
});


// @Register2
// first two steps are the same
When('the user enters an invalid email {string}', (invalidEmail) => {
  if (invalidEmail !== 'N/A') {
    cy.get(regEmailInput).type(invalidEmail, {force: true});
  };
});

// next two steps are the same

Then('the email error message is displayed', () => {
  cy.get(regEmailMessageError).should('be.visible');
});

Then('the email error message contains {string} text', (errorMsgText) => {
  // const 
  cy.get(regEmailMessageError).should('contain.text', errorMsgText);
});


// @Register2
// first three steps are the same
When('the user enters an invalid password {string}', (pwd) => {
  if (pwd !== 'N/A') {
    cy.get(regPwdInput).type(pwd, {force: true});
  }; 
});
// next step is the same

Then('the password error message is displayed', () => {
  cy.get(regPwdMessageError).should('be.visible');
});

Then('the password error message contains {string} text', (errorMsgText) => {
  cy.get(regPwdMessageError).should('contain.text', errorMsgText);
});


// @Register2
// first five steps are the same
Then('the captcha error message is displayed', () => {
  cy.get(regCaptchaMessageError).should('be.visible');
});

Then('the captcha error message contains {string} text', (cptErrMsg) => {
  cy.get(regCaptchaMessageError).should('contain.text', cptErrMsg);
});