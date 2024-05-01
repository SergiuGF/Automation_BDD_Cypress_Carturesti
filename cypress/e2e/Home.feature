Feature: Test the functionality of the Home Page and of the associated features

  Background: Open Home Page
    Given the user is on the Home Page

   @Search
   Scenario Outline: Check that you get at least 10 results when the user searches for a product
     When the user clicks on the search bar
     When the user search for an existing product "<product>"
     Then at least three products are displayed

     Examples:
       | product         |
       | psychology book |
       | rock music      |
       | gadgets         |

   @Filter1
   Scenario: Check that in stock message is shown when the user applies that filter
     When the user clicks on the dropdown menu
     When the user clicks on the books tab
     When the user applies the in stock filter
     Then the -in stock- detail is displayed
     Then the product contains text "In stock"

   @Filter2
   Scenario: Check the price filter
     When the user clicks on the dropdown menu
     When the user clicks on the books tab
     When the user applies the 100-200 price filter
     Then all the prices of the products are between "100" and "200" ron

   @Test_URL
   Scenario Outline: Check the functionality of the redirection feature
     When the user clicks on a hyperlink "<button>"
     Then the user is redirected to a new "<URL>"

     Examples:
       | button         | URL                                          |
       | storesBtn     | https://carturesti.ro/librarii               |
       | assistanceBtn | https://carturesti.ro/info/asistenta-contact |
       | aboutBtn  | https://carturesti.ro/info/despre-carturesti   |

   @Language
   Scenario: Check the functionality of the language feature
     When the page is set to Romanian language
     When the user sets the page to English language
     Then the page is set to "English"

   @Assistant
   Scenario: Check the functionality of the assistant feature
    When the user clicks on the assistant button
    Then the assistant tab is open
    When the user clicks on the close assistant button
    Then the assistant tab is closed
