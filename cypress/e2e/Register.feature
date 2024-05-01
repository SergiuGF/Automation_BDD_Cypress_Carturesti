Feature: Test the functionality of the register feature

  Background: Open Home Page
    Given the user is on the home page and is not logged in

    @Register1
    Scenario: Check that the register box is closed when the user enters valid data
      When the user clicks on the register button
      When the user clicks on the new user button
      When the user enters a random valid email
      When the user enters a valid password "Password8910#"
      When the user clicks the signup button
      Then the email and password error message is not displayed

    @Register2
    Scenario Outline: Check that the error message is displayed when the user enters an invalid email
      When the user clicks on the register button
      When the user clicks on the new user button
      When the user enters an invalid email "<invalid_email>"
      When the user enters a valid password "Password8910#"
      When the user clicks the signup button
      Then the email error message is displayed
      Then the email error message contains "<error_msg_text>" text

      Examples:
        | invalid_email     | error_msg_text                      |
        | N/A               | Email cannot be blank.              |
        | email             | Email is not a valid email address. |
        | email!@@gmail.com | Email is not a valid email address. |

    @Register3
    Scenario Outline: Check that the error message is displayed when the user enters an invalid password
      When the user clicks on the register button
      When the user clicks on the new user button
      When the user enters a random valid email
      When the user enters an invalid password "<password>"
      When the user clicks the signup button
      Then the password error message is displayed
      Then the password error message contains "<error_msg_text>" text

      Examples:
        | password | error_msg_text                                 |
        | N/A      | Password cannot be blank.                      |
        | 12345    | Password should contain at least 6 characters. |

  @Register4
     Scenario: Check that the captcha error message is displayed when the user dont check the - Im not a robot - button
       When the user clicks on the register button
       When the user clicks on the new user button
       When the user enters a random valid email
       When the user enters a valid password "Password8910#"
       When the user clicks the signup button
       Then the captcha error message is displayed
       Then the captcha error message contains "Re Captcha cannot be blank." text
