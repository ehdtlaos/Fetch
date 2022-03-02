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

     - Each member will have their own membership id, which needs to be given at the beginning

     - In the sample below, key is payer's name and value is points they current have for the payer.

     ```
     Member_id: 1,
     Request: 'GET /get/1'
     
     return:
     {
      "DANNON": 1000,
      "UNILEVER": 0,
      "MILLER COORS": 5300
     }
     ```
     
  2. Adding more payer & point information to the data


     - You can add points to member's data by using POST function

     - In the sample below, you will need to use member's id to access member's data, then you will need to send payor, points, and timestamp information with body

     ```
     Member_id: 1,
     Request: 'POST /add/1'
     
     body:
     {
      "payer": "DANNON",
      "points": 1000,
      "timestamp": "2020-10-31T10:00:00Z"
     }
     ```
     - It won't return anything, but you will still get status code 200 if it succeeds.
     
  3. Updating the data with points that needs to be spent

     - You can use member's id and spent point information to adjest balance in member's account.

     - You will receive data of how much points were deducted from each payer.

     - In the sample below, you'll need to use member's id to access member's data, then you will send points that they spent.

     ```
     Member_id: 1,
     Request: 'PUT /spent/1'
     
     body:
     {
      "points": 1000,
     }
     ```
     

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
