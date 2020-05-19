Feature: Login

    Background:

        Given a default page

    Scenario: login successfully

        When I type 'admin@gmail.com' as 'username'
        And I type '123456' as 'password'
        And I press Login button
        Then it lands on 'apartment' page

    Scenario: incorrect username or password

        When I type 'admin-failed@gmail.com' as 'username'
        And I type '123456' as 'password'
        And I press Login button
        Then show 'login-failed' error popup with 'Incorrect email or password' message
        When I press Close button
        Then 'login-failed' error popup disappears

    Scenario: missing username and password

        When I press Login button
        Then 'User Name is required' appears as 'username' message
        And 'Password is required' appears as 'password' message
        When I type 'admin@gmail.com' as 'username'
        Then 'username' message disappears
        When I type '123456' as 'password'
        Then 'password' message disappears
        When I press Login button
        Then it lands on 'apartment' page
