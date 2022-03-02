import supertest from 'supertest'
import server from './server.js'

describe("POST /add/:member_id", () => {

  describe("first given points are negative points, making account balance go negative", () => {
    //should return error message saying balance can't go negative
    //should respond with 400 status code
  })

  describe("given a payer, points and timestamp information", () => {
    //should respond with 200 status code

  })

  describe("given a negative points that are higher than total collected points", () => {
    //should return error message saying balance can't go negative
    //should respond with 400 status code

  })

})

describe("GET /get/:member_id", () => {

  describe("if given member_id does not exist in the system", () => {
    //should return 400 status code
    //should return error message saying member doesn't exist

  })

  describe("if given member_id exist in the system", () => {
    //should return 200 status code
    //should return member's total collected points per payer

  })

})

describe("PUT /spent/:member_id", () => {

  describe("if given member_id does not exist in the system", () => {
    //should return 400 status code
    //should return error message saying member doesn't exist
  })

  describe("if given member_id does not have enough points to spend", () => {
    //should return 400 status code
    //should return error message saying member does not have enough points
  })

  describe("if given member_id has enough point to spend", () => {
    //should return 200 status code
    //should return total spent points per payer

  })

})