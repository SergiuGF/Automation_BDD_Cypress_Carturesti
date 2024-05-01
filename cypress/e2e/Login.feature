Feature: Test the functionality of the login feature

  Background: Open Home Page
    Given the user is on the home page and is logged out

    @Login1
    Scenario: Check that the login box is closed when the user enters valid data
      When the user clicks on the login button
      When the user clicks on the existing user button
      When the user enters a valid email "testingemail2352@gmail.com"
      When the user enters a correct password "Passfortesting2352#"
      When the user clicks the login button
      Then the login box is closed

    @Login2
    Scenario Outline: Check that the error message is displayed when the user enters empty data
      When the user clicks on the login button
      When the user clicks on the existing user button
      When the user enters email address "<email>"
      When the user enters password "<password>"
      When the user clicks the login button
      Then the login error message is displayed
      Then the login error message contains "<error_msg_text>" text

      Examples:
        | email                      | password | error_msg_text            |
        | N/A                        | 123456   | Email cannot be blank.    |
        | testingemail2352@gmail.com | N/A      | Password cannot be blank. |

    @Login3
    Scenario Outline: Check that the error message is displayed when the user enters invalid data
      When the user clicks on the login button
      When the user clicks on the existing user button
      When the user enters email address "<email>"
      When the user enters password "<password>"
      When the user clicks the login button
      Then the second login error message is displayed
      Then the second login error message contains "<error_msg_text>" text

      Examples:
        | email                      | password            | error_msg_text               |
        | invalid_email234@gmail.com | Passfortesting2352# | Incorrect email or password. |
        | testingemail2352@gmail.com | invalid_password    | Incorrect email or password. |