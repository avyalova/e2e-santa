Feature: User login on santa website

Scenario: User logs in sucessfully and create a box
Given user is on the secret santa login page
When user logs in as "washingtonqwerty@gmail.com" and "123456"
Then user is on dashboard page
Then user creates a box

Scenario: User add participants 
Given user is created box and started to add participants
When user1 added to the box as "Anna" and "ja-rus_89@mail.ru"
When user2 added to the box as "AnnaTest2" and "anna_vyalova@yahoo.com"
When user3 added to the box as "oksana3" and "ommelnikova+test3@gmail.com"
Then user notified about new participants

Scenario: Start lottery 
Given user stars lottery
Then check if lorrety been complited

Scenario: check notifocation for user1
Given user1 is on the secret santa login page
When user1 logs in as "ja-rus_89@mail.ru" and "123456"
Then check notification for user1

Scenario: check notifocation for user2
Given user2 is on the secret santa login page
When user2 logs in as "ja-rus_89@mail.ru" and "123456"
Then check notification for user2

