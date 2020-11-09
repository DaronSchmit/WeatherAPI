# HW6 Weather API

# Finding the weather!

## Description 

This project is an exercise in trying out new APIs and using user input to make an api call. This was also a personal endeavor in using a CSS framework that wasn't bootstrap. Overall, it went pretty well, but it does not respond well to mobile because materialize does things differently than bootstrap.

![Password Generation Demo!](./Assets/screencap.png)

## Installation

You can download this repo and open index.html in your favorite browser in order to see the results. You can also feel free to use your favorite text editor to 
take a peek under the hood. 

Additionally, you can skip the downloading and go straight to https://daronschmit.github.io/Weather-API/ to see the webpage deployed live. You can then use the inspect tool to see the page's innards in-browser. 


## Usage 

Generate a password by pressing the "Generate Password" button to begin the prompts. It will prompt  you to enter a password length, and ask you to confirm if you want different kinds of characters in your password. If you do not select a valid password length or select any of the choices for character types, you will be asked to re-submit all prompts. Failure to do this in 5 attemtps will kill the password generator and you'll need to press the button again to get the program going.

Once valid inputs are given, the program builds a master array of all the user-inputted character type options. The program iterates a number of times equal to the user inputted password length, adding random characters from the master character array. Once the password is generated, it is validated to make sure that it abides by the user requirements. If it does not pass validation, it is re-generated and re-validated. This will go on up to 100 attempts, at which point it will break. Once a valid password is generated, it updates the HTML on-screen to the generated password, allowing for it to be copied to the clipboard.

You might be thinking "Daron, that could potentially not output a valid password!". You'd be right. So I ran the numbers. In the highest chance scenario for a failed password, password generation yields an invalid password a theoretical 57% of the time. The failure rate in practice, was found to be 54.8% (tested 1,000,000 times, failed 547968 suceeded 452032 times, see probability math below for more). The chance of having a failure 100 times in a row is .548^100 or 0.00000000000000000000000000755189335581851%. In other words, this program has a 1 in 13,241,712,000,000,000,000,000,000,000 shot to fail. (Math found below).

Use testPasswordGenerator(); to run the tests. It defaults to 10000 tests and parameters of [8, true, true, true, true]. 

### PROBABILITY MATH
The set of requirements that have the highest chance of failure is character length of 8, and all characters valid. This gives the program the least number of chars to pick and least the chance of each set to be picked at least once.
Total number of valid characters is 90. 10 of these are numbers, so this gives each randomly generated character an 8/9 chance of being NOT a number.
Take this and apply it to all 8 characters and you have a (8/9)^8 = 39% chance to not pick a number at all, causing a failed password generation.
Do the same math with the sets of characters and you get uppercase (64/90)^8 = 6.5% chance to fail, lowercase (64/90)^8 = 6.5%, and special characters (62/90)^8 = 5%. 
Adding all these up to get the total chance to fail is 39% + 6.5% + 6.5% + 5% = 57% chance to fail.
That's a bit rough. Good thing we are running it up to 100 times. 
That 57% chance of it generating a bad password 100 times in a row is 3.867992e-25.
I think we're going to be okay.

To verify my math, I wrote a testing function that runs the password generator and validates the password x number of times. This keeps tabs on how many failures and successes were had. Then it logs out to the console how many of each as well as the failure percent. Running 1 million tests gave a failure rate 54.8%. (My math may be off, but it's only off by 2.2%. I'll take it.)

chance of this running 100 times and being a failure every time is (.548^100)*100 = 0.00000000000000000000000000755189335581851%
the odds of this failing, then is 1: 1/0.0000000000000000000000000000755189335581851 = 1 : 13,241,712,000,000,000,000,000,000,000 (approximately).


## Credits

credit to the University of Minnesota coding bootcamp for the starting files. The source is in a private gitlab, so I cannot share it. 
special thanks to Charlie, the instructor, as well as Jake, Paul, and the other TAs for answering so many questions. Shoutout to w3schools for the base of the random number generator.



## License

MIT License

Copyright (c) 2020 Daron Schmit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


