# Timesheet Application

- Provision of temporary staffing services to an array of industries is what we specialize in. We fill in temporary gaps in organizations workforce which helps to ensure that there is no disruption to the services the organization renders to their customers.
- The objective of this project is to develop a web-based program that allows people to sign in and sign out of different events. This program should be able to develop reports based on different criteria like location, date range, time range, events name etc. This program will have different user levels like Admin, Manager, supervisor etc.

# Team

- Aaditya Tamrakar - [Website](https://aadityatamrakar.in) / [Linkedin](https://www.linkedin.com/in/aadityatamrakar/) 
- Aditya Ambati - n.ambati001@umb.edu
- Uma Mahesh Aari - umamahesh.aari001@umb.edu

### Supporting Documents: 
- Final Project [Presentation](https://github.com/Rybenben/Timesheet_project/blob/main/documents/CS682%20Final%20Project%20Presentation.pdf)
- [Scrapbook](https://github.com/Rybenben/Timesheet_project/blob/main/documents/Scrap%20book%20(Timesheet%20project).pdf) used for idea discussion
- [Additional Documentation](https://github.com/Rybenben/Timesheet_project/blob/main/documents/Timesheet%20project%20documentation.pdf)

## Deployed Demo

- Backend API:[http://timesheettesting-env.eba-fakakc8k.us-east-1.elasticbeanstalk.com/](http://timesheettesting-env.eba-fakakc8k.us-east-1.elasticbeanstalk.com/)
- Frontend:  [http://dev-timesheet.s3-website.us-east-2.amazonaws.com/](http://dev-timesheet.s3-website.us-east-2.amazonaws.com/)
	- Test Credentials: Username: [cs682@ryben.io](mailto:cs682@ryben.io) / Password: 123
- Postman API Documentation:  
[https://winter-meteor-947358.postman.co/workspace/timesheet-local~7906aa12-de42-4678-970f-149434218493/overview](https://winter-meteor-947358.postman.co/workspace/timesheet-local~7906aa12-de42-4678-970f-149434218493/overview)
- Github Repository:  [https://github.com/Rybenben/Timesheet_project](https://github.com/Rybenben/Timesheet_project)
- Project Documentation: [Scrapbook](https://docs.google.com/document/d/1vRc-wFACy1I8nCxoG3fLQCBkRmOrsD6qJEDeoLNFtL0/edit?usp=sharing), [Documentation](https://docs.google.com/document/d/1i6CvqUVu3y-VGR7glJNqfqQvD4_tm6oF7kGMEDuoIq8/edit?usp=sharing)

## REST API Documentation: 

- [Employee Controller / Employee API Endpoints](https://documenter.getpostman.com/view/4814690/2s8Z6u3uax)
Employees are temporary workers, get/getAll/add/delete endpoints are added in this controller.
- [Event Controller / Event API Endpoints](https://documenter.getpostman.com/view/4814690/2s8Z6u3uaz)
Event has get/getAll/add/delete endpoints, fields are name, location, start/end time and description.
- [EventWorker Controller / EventWorker API Endpoints](https://documenter.getpostman.com/view/4814690/2s8Z6u3ub1)
Event worker is a list of employees who are working in the particular event. 
- [Users Controller / Users API Endpoints](https://documenter.getpostman.com/view/4814690/2s8Z6u3ub2)
Users are the people who are using the application, there is different access roles for users, superadmin/manager. These users can be manager and admin for a particular event.


## Architecture

The web application is divided into three parts: frontend, backend, and testing/development tools.

![Architecture](https://github.com/Rybenben/Timesheet_project/blob/main/documents/architecture.png)

### Frontend

Frontend Code: [Timesheet_project/frontend](https://github.com/Rybenben/Timesheet_project/tree/main/timesheet)

The frontend of the web application is built using the React framework with TypeScript. React is a JavaScript library for building user interfaces, and TypeScript is a typed superset of JavaScript that adds optional static typing to the language. Together, these technologies allow for the creation of fast and scalable web applications with a clear and maintainable codebase.

#### Setup and further development
- Entry point - Timesheet_project/frontend/src/index.js
- Package.json - NPM node modules
- **Steps to setup local dev enviroment**
  - clone the repository, `cd` into frontend folder
  - `npm install` to install node modules and dependencies
  - `npm run start` for local testing and development 
  - `npm run deploy` to deploy your local changes to test dev enviroment

### Backend

Backend Code: [Timesheet_project/timesheet](https://github.com/Rybenben/Timesheet_project/tree/main/timesheet)

The backend of the web application is built using Java Spring Boot. Spring Boot is a framework for building standalone Java applications with minimal configuration. It provides a set of libraries and tools that make it easy to develop web applications using the Java language.

The backend connects to a PostgreSQL database using REST API endpoints. The API has both GET and POST endpoints, with the GET endpoints used to retrieve data from the database and the POST endpoints used to save and update data. The SQL queries required to interact with the database are written in Java and are executed using the Spring Boot framework.

The Structure of the code packages are divided into 4 packages
- Controller
- Model
- Repository
- Service 

Repository and Service
- We have created interface classes to include the abstract methods and then implemented them in a new class with Impl.
- We use service class for business logic and Repository (DAO) class for connectiing to the Database.

### Testing/Development Tools

You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.

Postman Collection: https://winter-meteor-947358.postman.co/workspace/timesheet-local~7906aa12-de42-4678-970f-149434218493/overview

## Deployment Environment

- AWS Login: https://739881411616.signin.aws.amazon.com/console
- Credentials: Contact administrator

We are using Amazon Web Services as our cloud provider and deployed on AWS services such as:-

- Amazon Web Services (AWS) Beanstalk: 
	- for java spring boot application
	- Beanstalk is a fully managed service that makes it easy to deploy, run, and scale web applications and services developed with popular programming languages, including Java, .NET, PHP, Node.js, Python, Ruby, and Go. With AWS Beanstalk, you can simply upload your code and the service automatically handles the deployment, capacity provisioning, and scaling of your application.
- Amazon Simple Storage Service (S3): 
	- we are using S3 websites to deploy the frontend React application, further improvement can be done using AWS Cloudfront to distribute same application to edge location with millisecond latency and caching.
	- S3 is a cloud storage service that provides secure, scalable, and low-cost storage for data and media. S3 allows you to store and retrieve any amount of data from anywhere on the web, making it a great storage solution for a variety of use cases, including backup and archival, disaster recovery, big data analytics, and static website hosting.
- Amazon Relational Database Service (RDS)
	- RDS is a fully managed database service that makes it easy to set up, operate, and scale a relational database in the cloud. RDS supports a variety of database engines, including PostgreSQL, a popular open-source object-relational database management system.
	- RDS for PostgreSQL provides several benefits over self-managed PostgreSQL deployments. It offers high availability, with the ability to create a multi-AZ (Availability Zone) deployment for automatic failover, as well as read replicas for scaling read performance. It also provides security features such as network isolation, encryption at rest, and integration with AWS Identity and Access Management (IAM).
	- Using RDS for PostgreSQL with Postman, you can test and develop your application by making HTTP requests to the RDS database and examining the responses. You can use Postman to send SQL queries to the database, retrieve and manipulate data, and perform other database operations.
- [Postman](https://www.postman.com/) for **API testing**
Postman is a popular tool for testing and developing APIs (Application Programming Interfaces). It allows you to make HTTP requests to a server, view and debug the response, and create and share collections of requests for testing and development purposes. Postman can be used to test APIs built using a variety of programming languages and frameworks, including those deployed on AWS Beanstalk.
- [DBeaver](https://dbeaver.io/): **for SQL query testing and managing PostgreSQL database**.
	- DBeaver has a user-friendly interface that allows you to connect to a database, browse and edit data, create and execute SQL queries, and manage database objects such as tables, views, and procedures. It also includes features such as SQL editor with syntax highlighting and autocomplete, data export and import, and data visualization.

