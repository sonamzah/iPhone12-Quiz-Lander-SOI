# CR-iPhone-SOI
This is a simple "quiz lander" designed for a client, who promotes sweepstakes CPA affiliate "offers" using paid advertising. 

Built in HTML, CSS & Vanilla JS nothing crazy...

**DEMO VIDEO**: https://www.loom.com/share/906f21e8660149db8e8ddfd3e71ad495 

To load and run this simple site/quiz app download or fork this repo and then

1. Click to open the index.html located in the "iphone12-l1" directory

NOTE: "iphone12-l2" and "example" directories are unnecessary. 
"iphone12-l2" -- is intended to be a duplicate, which may later be developed into a minor variation... different images, questions, etc..
"example" -- is simply a placeholder meant to demonstrate where the quiz would redirect to after completing the re-captcha and then pressing the final button

To use this as a template minimal changes need to be made:

1. You will need to register your site for a google recaptcha V2 and then paste your key into the "data-sitekey" attribute on the div with the class "g-recaptcha"

2. Change the redirect address specified by the LOC variable at the top of the file in control.js (this should be the web address of the affiliate offer)

3. To change questions locate the //** MODEL **// section of control.js (lines 12-36) 
   -- change the strings correlating to each numbered question and corresponding array of answers... should be fairly simple to see whats going on.
   
4*. Lastly, i suppose youd want to change all the links in the footer section of the index.html file to be those of your own legal documents ( privacy, terms, etc)
      -- and add your own legal disclaimer at the botom or remove it completely if you find no need for it!
      
     ~~ E N J O Y ~~
