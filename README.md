# Fetch
Fetch back-end apprenticeship assessment.

## Overview
A web service that accepts HTTP requests and returns responsese based on the conditions.

## Table of contents
- Description
- Installation
- Technology Used

## Description
This project is designed to be a back-end project.
There are three functionalities in this project.
  1. Getting member's total points per payer
    - Get will return member's total points by each payers in object
    ```
    sample:
    {
      "DANNON": 1000,
      "UNILEVER": 0,
      "MILLER COORS": 5300
    }
    ```
    - In the sample, key is payer's name and value is points they current have for the payer.
  3. Adding more payer & point information to the data
  4. Updating the data with points that needs to be spent

Unit test has been added to the project as well.

## Installation
Fork and clone this repo then run:

`npm install` in root folder

`npm start` will start the server

`npm test` will run the test (You will need to terminate the server by pressing (control + c) if you want to run the testing)
  
## Technology Used
- Dependencies: npm

- Server: ExpressJS

- Unit Testing: Jest
