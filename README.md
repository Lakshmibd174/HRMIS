# HRMIS
A Human Resource Management System
### Code Running Instructions on a Local System
1.	hrmis.sql is the database file
2.	Download and install node.js from https://nodejs.org/en/download, download the windows installer 64 bit
3.	Download and install xampp from https://www.apachefriends.org/download.html download version 8.2.12 or any supported MySQL database provider.
4.	Download and install Postman App from https://www.postman.com/downloads/?utm_source=postman-home
5.	Once xampp is installed open xampp control panel from programs list. The control panel below will appear
6.	Click on the start button for both Apache and MySQL
7.	XAMPP is now started. Navigate to the address http://localhost/phpmyadmin/
This opens the MySQL database through phpMyAdmin as shown below
8.	On the left pane click on the New option and create the hrmis database
9.	Once it is created, from the left pane, click on the hrmis database to open it
10.	Once it is open, click on the import option from the tabs on the top bar on the right. The import window opens. Click on choose file and select the hrmis.sql file provided and then click on the import button at the bottom of that window.
11.	The hrmis database is now successfully imported and contains all the tables required by the express app 
12.	In the HRMIS directory, open the index.js and update the database credentials. If you haven’t made any changes to the default XAMPP installation, you can skip this section and leave the index.js with the default credentials
13.	Launch a command prompt and run the command cd with the path where the HRMIS folder is located and press enter
14.	Run the node js app using the command node index.js
15.	The app is now available on the address http://localhost:3000/
16.	In your web browser navigate to the address above
17.	The login page is loaded. There are two accounts already setup as below:
Account 1
Email: js@admin.com
Password: 1234
Location: admin dashboard


Account 2
Address: localhost:3000
Email: jking@emp.com
Password: 1234
Location: employee dashboard

17.	Login into the admin account to test the functionality
18.	After a successful login, the admin dashboard is loaded as shown
19.	Once the dashboard is open, all the existing departments are shown. They are loaded by making a GET request to the webservice. Check the app demo presentation slides and the report, for the type of requests and endpoints supported. You can click on update to update the details of the department and also click on delete to remove the department completely
20.	The same results can be achieved using the Postman app as shown
a.	Open the Postman app you installed and make a get request to the department endpoint as shown
b.	Make a POST request with JSON data to add a new department as shown
c.	Make a GET request to retrieve the department you added
d.	Make a PUT request  to update the first department using JSON data



