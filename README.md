# OSSP-SKKU_2048

------

## Project Plan Reason
>Hello, we are OS_Team18. Recently, at a time when the importance of IP utilization is drawing attention, such as Pokemon Bread, we tried to use Sungkyunkwan University's IP to promote the school and carry out a project that can contain the fun of the game.
>After discussion, we were sure that if we applied Sungkyunkwan University IP to a simple game called "2048", which was popular in the past, we could make a familar web game. We tried to create "Yuljeon and Myeongryun's Travel Story" by drawing out the charm of 2048 as much as possible.

------

## How to Start Playing?
> Just Visit the website! (https://jinh-636.github.io/OSSP-SKKU_2048/index.html)

------

## Precautions
+ In login, as a test account ID, 'user' cannot be used 
+ In login, Don't use an ID that starts with an lb because lb is used for leader boards.
+ Because the program contents are stored in local storage, it may not work externally.

------

## functions
#### In index.html(Login)
1. try_login()
+ Compared to the content of local storage, it is a function that allows login. If you don't have an account, create a new one

#### In main.html(Main)
2. window.onload = function()
+ This function displays the information of the accessed user in the upper right corner of HTML.

#### In game.html(Game)
3. init()
+ This init() function is called when the user enter the website. Creates two Images and add proper images to the right section.
4. updateChange()
+ This function updates all changes provoked by the user. Applies all changes visually, and add proper images to the right section if needed. Checks if game is clear, as well as gameover conditions. Creates a new image before the function ends.
5. createImg()
+ This function randomly creates a new img : coin_100 (90%) and coin_500 (10%).
6. checkGameOver()
+ This function simply checks the conditions of gameover: (1)board is full (2) there is no remaining elements to merge. 
7. checkIsFull()
+ Checks if the board is full by looping through the board.

#### In lb.html(leaderboard)
8. update_lb()
+ This function updates the leaderboard with the top 7 IDs and scores stored in localStorage.

------

