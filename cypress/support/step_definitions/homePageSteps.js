import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'


const acceptCookiesBtn = "a[aria-label='allow cookies'].cc-btn.cc-allow";
const languageBtn = '#carturestiLanguageDropdown > .ng-scope:first-child';
const roEng = '[aria-labelledby="carturestiLanguageDropdown"] a.dropdown-item';
const searchBar = '#search-input';
const meniu = '.coco';
const products = '.cartu-grid-tile';
const booksTab = 'a[data-ng-href="/raft/carte-109"][href="/raft/carte-109"]';
const inStockFilter = 'div.md-container + div.md-label';
const inStockMsg = 'div:contains("In stock")';
const inStockProducts = '#coloana-produse .cartu-grid-tile';
const priceFilter = 'div.md-container + div.md-label > :contains("100 - 200")';
const productsPrices = '#coloana-produse .suma';
const assistantBtn = '#druidContainerTooltip';
const assistantCloseBtn = '.fa-angle-down';


Given('the user is on the Home Page', () => {
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
   });
});


// Search
When('the user clicks on the search bar', () => {
   cy.get(searchBar);
});

When('the user search for an existing product {string}', (productName) => {
   cy.get(searchBar).click().type(productName, {force: true}, { delay: 100}).type('{enter}');
});

Then('at least three products are displayed', () => {
   cy.get(products).should('have.length.gte', 3);
});


//@Filter1
When('the user clicks on the dropdown menu', () => {
   cy.get(meniu).click();
});

When('the user clicks on the books tab', () => {
   cy.get(booksTab).click();
});

When('the user applies the in stock filter', () => {
   cy.get(inStockFilter).contains('In stock').click();
});


Then('the -in stock- detail is displayed', () => {
   cy.get(inStockMsg).should('be.visible');
});

Then('the product contains text {string}', (inStock) => {
   cy.wait(1000);
   cy.get(inStockProducts).should('contain.text', inStock);
});

// @Filter2
// first two steps are the same
When('the user applies the 100-200 price filter', () => {
   cy.get(priceFilter).click();
});

Then('all the prices of the products are between {string} and {string} ron', (minPrice, maxPrice) => {
   cy.wait(4000);
   const minPriceInt = parseInt(minPrice);
   const maxPriceInt = parseInt(maxPrice);
   cy.get(productsPrices) 
        .each(($price) => {
            const priceText = $price.text().replace(/[^\d.]/g, ''); // Extract price text and remove non-numeric characters
            const priceValue = parseFloat(priceText); // Convert price text to a float number
            expect(priceValue).to.be.at.least(minPriceInt); // Assert that the price is at least equal to minPrice
            expect(priceValue).to.be.at.most(maxPriceInt); // Assert that the price is at most equal to maxPrice
        });
});


//@Test_URL
When('the user clicks on a hyperlink {string}', (buttonName) => {
  const hyperlinkButtons = {
      "storesBtn": 'a[class*="ng-scope"]:contains("Stores")',
      "assistanceBtn": 'a[href*="asistenta-contact"]:contains("Assistance")',
      "aboutBtn": 'a[href*="despre-carturesti"]:contains("About Carturesti")',
  };
  cy.get(hyperlinkButtons[buttonName]).click();
});

Then('the user is redirected to a new {string}', (expectedUrl) => {
   cy.url().should('include', expectedUrl);
});


//@Language
When('the page is set to Romanian language', () => {
   cy.get(languageBtn).invoke('text').then((text) => {
      if (text.includes('English')) {
         cy.get(languageBtn).click();
         cy.get(roEng).click();
      };
   });
});

When('the user sets the page to English language', () => {
   cy.get(languageBtn).invoke('text').then((text) => {
      if (text.includes('Română')) {
         cy.get(languageBtn).click();
         cy.get(roEng).click();
      };
   });
});

Then('the page is set to {string}', (text) => {
   cy.get(languageBtn).should('contain.text', text);
});


//@Assistant
When('the user clicks on the assistant button', () => {
   cy.get(assistantCloseBtn).should('not.exist').then(() => {
      cy.get(assistantBtn).click();
   });
});

Then('the assistant tab is open', () => {
   cy.get(assistantCloseBtn).should('be.visible');
});

When('the user clicks on the close assistant button', () => {
   cy.wait(1000);
   cy.get(assistantCloseBtn).click();
});

Then('the assistant tab is closed', () => {
   cy.get(assistantCloseBtn).should('not.exist');
});
