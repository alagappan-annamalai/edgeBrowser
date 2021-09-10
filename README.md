# edgeBrowser

Here I have packages edge driver and selenium JAR.
Mostly webdriver-manager update and webdriver-manager start will do this work.
Then the path need to be specified in the config file. To simplify this I have downloaded these files and packaged.
Whenever edge browser upgrade happens, replace this msedgedriver.exe with the new version.

Open 2 terminals.

1st terminal: 
java -D"webdriver.edge.driver=msedgedriver.exe" -jar .\selenium-server-standalone-3.141.59.jar -port 4444

2nd terminal:
npm i
npm test

Sample test to open Google website in Edge browser.
