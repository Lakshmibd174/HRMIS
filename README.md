# HRMIS
A Human Resource Management System
### Code Running Instructions on a Local System
1.	hrmis.sql is the database file
2.	Download and install node.js from https://nodejs.org/en/download, download the windows installer 64 bit
3.	Download and install xampp from https://www.apachefriends.org/download.html download version 8.2.12 or any supported MySQL database provider.
4.	Download and install Postman App from https://www.postman.com/downloads/?utm_source=postman-home
5.	Once xampp is installed open xampp control panel from programs list. The control panel below will appear
![step5](https://github.com/Lakshmibd174/HRMIS/assets/160733534/fcf16d2b-c8a3-4434-a78b-875f293352ae)

6.	Click on the start button for both Apache and MySQL
![step6](https://github.com/Lakshmibd174/HRMIS/assets/160733534/d387770f-5d90-452f-93f8-2ae34b7c1f8e)

7.	XAMPP is now started. Navigate to the address http://localhost/phpmyadmin/
This opens the MySQL database through phpMyAdmin as shown below
![step7](https://github.com/Lakshmibd174/HRMIS/assets/160733534/60dbdec8-64c4-46bf-b50c-91f16ed3967c)

8.	On the left pane click on the New option and create the hrmis database
![step 8](https://github.com/Lakshmibd174/HRMIS/assets/160733534/19460695-d90f-46fb-9438-4787868ebc58)

9.	Once it is created, from the left pane, click on the hrmis database to open it
![step9](https://github.com/Lakshmibd174/HRMIS/assets/160733534/4307d78d-0be1-400d-bdc3-c79ca365192f)

10.	Once it is open, click on the import option from the tabs on the top bar on the right. The import window opens. Click on choose file and select the hrmis.sql file provided and then click on the import button at the bottom of that window.
![step10](https://github.com/Lakshmibd174/HRMIS/assets/160733534/6fed95d0-5d9e-434f-a9d7-33414ce609bc)

11.	The hrmis database is now successfully imported and contains all the tables required by the express app 
![step11](https://github.com/Lakshmibd174/HRMIS/assets/160733534/c32571fa-14d4-415a-87a0-4e99da067ed9)

12.	In the HRMIS directory, open the index.js and update the database credentials. If you haven’t made any changes to the default XAMPP installation, you can skip this section and leave the index.js with the default credentials
![step12](https://github.com/Lakshmibd174/HRMIS/assets/160733534/fa5e4e62-4d1b-4927-820c-72fad27249e0)

13.	Launch a command prompt and run the command cd with the path where the HRMIS folder is located and press enter
![step13](https://github.com/Lakshmibd174/HRMIS/assets/160733534/f3494826-d5cf-4068-af31-69ecb010d582)

14.	Run the node js app using the command node index.js

![step14](https://github.com/Lakshmibd174/HRMIS/assets/160733534/741056e1-9508-4476-9bc0-c606c97a4217)

15.	The app is now available on the address http://localhost:3000/
16.	In your web browser navigate to the address above
![step16](https://github.com/Lakshmibd174/HRMIS/assets/160733534/d4531132-0e91-4a8a-9499-9b1401babdb8)

The login page is loaded. There are two accounts already setup as below:
- Account 1
- Email: js@admin.com
- Password: 1234
- Location: admin dashboard


- Account 2
- Address: localhost:3000
- Email: jking@emp.com
- Password: 1234
- Location: employee dashboard

17.	Login into the admin account to test the functionality
18.	After a successful login, the admin dashboard is loaded as shown
![step18](https://github.com/Lakshmibd174/HRMIS/assets/160733534/f1e2a3dc-bf84-43c3-a641-0c7d1e5d322c)

19.	Once the dashboard is open, all the existing departments are shown. They are loaded by making a GET request to the webservice. Check the app demo presentation slides and the report, for the type of requests and endpoints supported. You can click on update to update the details of the department and also click on delete to remove the department completely
20.	The same results can be achieved using the Postman app as shown
a.	Open the Postman app you installed and make a get request to the department endpoint as shown
![step20a](https://github.com/Lakshmibd174/HRMIS/assets/160733534/123a0c33-e56e-4b51-8cdf-8ff9ea183ae4)

b.	Make a POST request with JSON data to add a new department as shown
![step20b](https://github.com/Lakshmibd174/HRMIS/assets/160733534/f2452c37-fd15-416a-bb93-b4631f892483)

c.	Make a GET request to retrieve the department you added
![step20c](https://github.com/Lakshmibd174/HRMIS/assets/160733534/a44f2d15-6db9-4792-86d3-afca2abb1875)

d.	Make a PUT request  to update the first department using JSON data

![step20d](https://github.com/Lakshmibd174/HRMIS/assets/160733534/84d68cda-2c6f-4b34-9b52-d5906dc51b80)


