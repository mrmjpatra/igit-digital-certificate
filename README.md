
# Digital Certificate

A brief description of what this project does and who it's for

To showcase the flow of the website, you can create a visual sitemap that outlines the pages and their relationships. The sitemap can start with the homepage, followed by the registration page, and then the list of available documents. When a student clicks on a document, the availability status can be checked in the database, and if available, the download button can be displayed. If the document is not available, the apply button can be displayed, and upon clicking it, the notification can be sent to the concerned department for clearance.

The structure of the database will depend on the specific requirements of your website, but some common tables could include:

Students table: Contains the details of registered students
Documents table: Contains the details of each document, such as its name, type, availability status, and clearance requirements
Departments table: Contains the details of each department and their respective clearance requirements
Clearance table: Contains the details of each student's clearance status for each department
When a student applies for clearance, a new record can be added to the clearance table, indicating the student's ID, the department, and the clearance status. The website can check the clearance table to determine whether a student has been cleared for a particular document, and display the appropriate download or apply button.

In terms of arranging the website, you can use a simple and intuitive interface with clear navigation to help students find what they need easily. You may also consider adding a search function to allow students to quickly find the documents they need. Additionally, it's important to make sure that the website is secure, with appropriate authentication and authorization measures in place to protect sensitive student information.



## Authors

- [@mrmjpatra](https://www.github.com/mrmjpatra)


## Badges



[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Demo

Insert gif or link to demo
www.igitcertificate.web.app

## Installation

clone the project to you local project
open the code in the with project context.
Run the following command
```bash
  npm install
  npm run
```
    