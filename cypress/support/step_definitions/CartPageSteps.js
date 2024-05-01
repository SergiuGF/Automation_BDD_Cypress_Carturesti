import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'


const acceptCookiesBtn = "a[aria-label='allow cookies'].cc-btn.cc-allow";
const languageBtn = '#carturestiLanguageDropdown > .ng-scope:first-child';
const roEng = '[aria-labelledby="carturestiLanguageDropdown"] a.dropdown-item';
const registerLoginBtn = 'button[data-target="#modalLogin"]';
const helloBtn = 'span.ng-scope';
const existingUserBtn = '#loginTrigger';
const logEmailInput = '#loginform-email';
const logPwdInput = '#loginform-password';
const loginBtn = '[name="login-button"]';
const searchBar = '#search-input';
const addToCart = '[title="Add to cart"]';
const cartBtn = '.checkout__icon';
const productInovatia = 'a[href*="inovatia"]';
const addToWishlist = '.addToWishList';
const wishlistProduct = '.md-headline:contains("Neuroplasticitatea")';
const meniu = '.coco';
const musicTab = ('span.ng-binding', 'Music');

Given('the user is logged in and is on the home page', () => {
  cy.fixture('data.json').then((page) => {
    cy.visit(page.url.homePage);
    // Attempt to click the accept cookies button without causing test failure if not present (thanks to { failOnStatusCode: false } - this allows Cypress to continue running the test even if the button is not present.)
    cy.get(acceptCookiesBtn).click({ failOnStatusCode: false });
    cy.get(languageBtn).invoke('text').then((text) => {
      if (text.includes('Română')) {
        cy.get(languageBtn).click();
        cy.get(roEng).click();
      }
      // Check if registerLoginBtn is present
      cy.get(registerLoginBtn).eq(1).should('exist');
      // If registerLoginBtn is present, proceed with the login process
      cy.get(registerLoginBtn).eq(1).click();
      cy.get(existingUserBtn).click();
      cy.get(logEmailInput).type('testingemail2352@gmail.com', {force: true});
      cy.wait(1000)
      cy.get(logPwdInput).type('Passfortesting2352#', {force: true});
      cy.wait(1000)
      cy.get(loginBtn).click();
      cy.wait(1000);
    });
  });
});


//@Cart
When('the user searches for book {string}', (productName) => {
  cy.get(searchBar).click().type(productName, {force: true}, { delay: 100 }).type('{enter}');
  cy.contains('.md-title', productName).click();
});

When('the user clicks on the add to cart button', () => {
  cy.get(addToCart).click();
});

When('the user clicks on the cart button', () => {
  cy.get(cartBtn).click();
});

Then('the product is displayed', () => {
  cy.get(productInovatia).should('be.visible')
});

Then('the product in the cart contains text {string}', (productName) => {
    cy.get(productInovatia).should('contain.text', productName)
});
  

//@Wishlist
When('the user searches for wished book {string}', (productName) => {
  cy.get(searchBar).click().type(productName, {force: true}, { delay: 100 }).type('{enter}');
  cy.contains('.md-title', productName).click();
});

When('the user clicks on the add to wishlist button', () => {
  cy.get(addToWishlist).click();
});

When('the user clicks on the wishlist button', () => {
  cy.get(helloBtn).contains('Hello').click();
  cy.contains('li', 'Wishlists').find('a').click();
});

Then('the wished product is displayed', () => {
  cy.get(wishlistProduct).should('be.visible');
});

Then('the product in the wishlist contains text {string}', (productName) => {
  cy.get(wishlistProduct).should('contain.text', productName);
});


//@CartPrices
When('the user adds products to the cart', () => {
  cy.get(meniu).click();
  cy.contains(musicTab).click()
  const firstProduc = '#coloana-produse .cartu-grid-tile:eq(0)';
  const secondProduc = '#coloana-produse .cartu-grid-tile:eq(2)';
  const thirtdProduc = '#coloana-produse .cartu-grid-tile:eq(3)';
  cy.wait(1000)
  cy.get(firstProduc).click();
  cy.get(addToCart).click();
  cy.go(-1);
  cy.wait(1000)
  cy.get(secondProduc).click();
  cy.get(addToCart).click();
  cy.go(-1);
  cy.wait(1000)
  cy.get(thirtdProduc).click();
  cy.get(addToCart).click();
});

When('the user clicks on the cart button - CartPrices', () => {
  cy.get(cartBtn).click();
});

Then('the total price is equal to the sum of all prices', () => {
  // Simulate a sleep of 1 second
  cy.wait(1000); 
  const totalPrice = 'span[data-ng-bind="numberFormat(cart.total)"].ng-binding';
  const productsPrices = 'span[data-ng-bind="numberFormat(p.price)"].ng-binding';
  // Get the total price element and extract its text
  cy.get(totalPrice).invoke('text').then(totalPriceText => {
      // Convert the total price text to an integer and remove all commas 
      const totalPriceInt = parseInt(totalPriceText.replace(/,/g, ''));

      // Select all elements with the specified class and extract their text
      cy.get(productsPrices).then(($elements) => {
        // Declare a variable to store the prices
        let pricesList = [];
    
        // Iterate through each element and extract their text
        $elements.each((index, element) => {
            // Extract the text from the element
            const priceText = element.textContent.trim();

            // Replace commas with blank spaces
            const priceWithoutCommas = priceText.replace(/,/g, '');
            // Convert the text to an integer
            const priceInteger = parseInt(priceWithoutCommas);
            
            // Add the price to the price list
            pricesList.push(priceInteger);
        });
        // Calculate the sum of the prices in the list
        const totalPriceSum = pricesList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        expect(totalPriceSum).to.equal(totalPriceInt);
      });
    });  
  });  