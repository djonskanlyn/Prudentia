# Readme

## Website and Github

The link to the website can be found here: [Prudentia project website](https://prudentia.onrender.com).

The link to the github for the project can be found here: [Prudentia project github](https://github.com/djonskanlyn/Prudentia).

## API Swagger & Redoc

Note: to login to the API you need to be logged in as a superuser! You will be routed to the [admin page](https://prudentiaapi.onrender.com/admin) if not logged in.

The link to the API for the project can be found here: [Prudentia API](https://prudentiaapi.onrender.com/swagger).

The link to the API documentation can be found here: [Prudentia API documentation](https://prudentiaapi.onrender.com/redoc).

## API Rest Framework Roots

Note: to use the REST framework roots directly you need to be logged in as a superuser!

The root for the REST framework for the data app can be found here: [REST framework root for data app](https://prudentiaapi.onrender.com/api/data/).

The root for the REST framework for the key-measures app can be found here: [REST framework root for key-measures app](https://prudentiaapi.onrender.com/api/key-measures/).

The root for the REST framework for the pr-reviews app can be found here: [REST framework root for pr-reviews app](https://prudentiaapi.onrender.com/api/pr-reviews/).

## Reset-up Instructions

There is a file with the relevant environment variables (names and values); and some usernames and passwords for existing profiles included in the zip file uploaded with the project submission (it is not included in the github repository.) This is only provided for use by the person who is grading the assignment.


## Introduction

Prudentia is a tool for financial regulatory supervisors to review quarterly prudential return data submitted by regulated firms.
The tool allows users to view return data, create PR reviews and 4-eyes sign-off on these reviews.

The prundentia website has 3 components:

* frontend (React via Vite distribution)
* backend API (Django with REST framework)
* database (PostgreSQL)

## Frontend

You must logon to the website to be able to view any information. The landing page is the login page. This is because no part of this website is for non-authorised users.

Additionally, this webapp is designed for desktop use only, it is not designed for use on a mobile phone or tablet as this would not be appropriate and was a design decision.

Having logged on the user will be redirected to **Home Dashboard** page. They will be able to navigate to all the sections of the website using the top, bottom, left and right navbars.
The dashboard also displays summary graphs of **sectoral total assets**, **sectoral total investments**, **sectoral total loans** and a grid table that summarises by reporting period the number of returns scheduled, submitted, the number of PR reviews with single sign-off, and the number with double sign-off (completed).

In the top navbar there is a **logout** icon and a website **theme** switch (light/dark) icon.

In the bottom navbar there is an icon that will take the user to an **info** page, and another icon that will take the user to a **contact** page should they need to contact the developer.

In the left navbar there are 3 icons. One will take to user to the **Returns Detail** page, the second will take the user to the **Returns List** page and the third to the **PR Reviews List** page.

There are no icons or links in the right navbar.

### Login
The **Login** page is the landing page, it also provides links to register to the webpage (note in reality, registration would not be open to anyone, but project specification dictates that a regiistration link must be provided). Additionally there is a password reset link that takes you to the Django backend to process the password reset via Google API. Completion of reset provides a link to take you back to the frontend. You cannot access any area of the website if you have not signed in, all icons/links will redirect to the login landing page.

### Home Dashboard
As described above.

### Returns Detail
This page shows a formatted version of the return data submitted by the regulated firms. The user selects a firm and a reporting date and the data will load. There are 5 tabs that display the 5 pages of data submitted with each return:

* Income & Expenditure
* Balance Sheet
* Deposits & Investments
* Credit Risk Disclosures
* Loan Analysis

Note: You need to select a firm and a reporting date to trigger a data fetch when you first logon to the website even a a dafault select is provided.

### Returns List
This page lists all the current status returns available in the database. The primary purpose of this page is to identify the status of a return (submitted, version ref. etc) and to trigger the creation of a PR Review if desired. The grid table makes use of AG Grid which has advanced filtering and allows the reorganisation of the order of the field displayed.

### PR Reviews List
This page lists the PR Reviews that have been created and allows all users to view the PR Review Details.

The AG Grid based list has a field with a button that lets users view the PR Review by clisking on it.

### PR Reviews Detail
The PR reviews consist of 5 sections:

* Capital Key Measures & Summary Comments
* Liquidity Key Measures & Summary Comments
* Investments Key Measures & Summary Comments
* Credit Key Measures & Summary Comments
* Final Summary Comments

The Key Measures are supplied via AG Grid tables. 5 quarters of data are provided along with comparative ratios for the previous quater and previous year. The sectoral average of the key measure for the review period is also provided and an editable field that allows a comment on each individual key measure. Any data entered into the field is automatically saved.

The summary comments are provided via a textarea input that also automatically saves data to the database on input.

If a logged in user is recorded as part of the Supervisor user group in the backend, they can "supervisor sign-off" the PR Review. Once this has been done, a logged in user recorded as part of the Senior_Supervisor user group in the backend can complete the review with "senior supervisor sign-off". A supervisor must "supervisor sign-off" first before a senior supervisor can "senior supervisor sign-off" and complete the review.

## Backend

The backend uses the Django framework and is built to function as a REST api. The frontrnd does no directly communicate with the database it does so via the API.

The backend handles authenication via JWT tokens. Password reset functionality is handled via the django framework directly rather than the frontend. Links bring the user from the frontend to the backend for password reset functionality.

The backend comprises of 4 apps:

* authapp: handles authentication, login, logout, registration and related automated tests
* data: this sets up the database tables that store the return data; these database tables are not written to, they supply the data to the frontend and the other apps.
* key-measures: this handles the calculation of key measures from data supplied in the database. There is a signals.py set-up to calulate new key measures when data is added to the data database tables. However, for the purposes of this project a python command file calulated both the key measures and sectotal averages.
* pr-reviews: this app has some tables that are written too on the creation of pr-reviews and the addition of comments to the PR Review.

All the views can be accessed using the swagger endpoint when logged in as a superuser and the documentation for the api can be accessed using the redoc endpoint, similarly when logged.


## Database

The database is a PostgreSQL database hosted on Render. More details can be found in the project documentation.

