Feature: Test the functionality of the Cart Page and of the associated features

  Background: Open Home Page
    Given the user is logged in and is on the home page


  @Cart
  Scenario: Check if the product is displayed in the cart when the user clicks the add to cart button
    When the user searches for book "Inovatia"
    When the user clicks on the add to cart button
    When the user clicks on the cart button
    Then the product is displayed
    Then the product in the cart contains text "Inovatia"

  @Wishlist
  Scenario: Check if the product is displayed in the wishlist when the user clicks the add to wishlist button
    When the user searches for wished book "Neuroplasticitatea"
    When the user clicks on the add to wishlist button
    When the user clicks on the wishlist button
    Then the wished product is displayed
    Then the product in the wishlist contains text "Neuroplasticitatea"

  @CartPrices
  Scenario: Check if the total price is correct when the user adds products to the cart
    When the user adds products to the cart
    When the user clicks on the cart button - CartPrices
    Then the total price is equal to the sum of all prices
