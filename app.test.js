import app from './app.js';
import supertest from 'supertest';

describe("POST /add/:member_id", () => {

  describe("first given points are negative points, making account balance go negative", () => {
    //should return error message saying balance can't go negative
    //should respond with 400 status code
    test("should respond with a 400 status code", async () => {
      const response = await supertest(app).post("/add/1").send({
        payer: "DANNON",
        points: -300,
        timestamp: "2020-11-02T14:00:00Z"
      })
      expect(response.statusCode).toBe(400);
    })

    test("should respond with an error message", async () => {
      const response = await supertest(app).post("/add/1").send({
        payer: "DANNON",
        points: -300,
        timestamp: "2020-11-02T14:00:00Z"
      })
      expect(response.body).toBe('error: points cannot go negative');
    })

  })

  describe("given a valid payer, points and timestamp information, should return status code 200", () => {
    //should respond with 200 status code
    test("should respond with a status code 200", async () => {
      await supertest(app).post("/add/1").send({
        payer: "DANNON",
        points: 1000,
        timestamp: "2020-11-02T14:00:00Z"
      })
      await supertest(app).post("/add/1").send({
        payer: "UNILEVER",
        points: 200,
        timestamp: "2020-10-31T11:00:00Z"
      })
      await supertest(app).post("/add/1").send({
        payer: "DANNON",
        points: -200,
        timestamp: "2020-10-31T15:00:00Z"
      })
      await supertest(app).post("/add/1").send({
        payer: "MILLER COORS",
        points: 10000,
        timestamp: "2020-11-01T14:00:00Z"
      })
      const response = await supertest(app).post("/add/1").send({
        payer: "DANNON",
        points: 300,
        timestamp: "2020-10-31T10:00:00Z"
      })

      expect(response.statusCode).toBe(200);
    })

  })

  describe("given a negative points that are higher than total collected points", () => {
    //should return error message saying balance can't go negative
    //should respond with 400 status code
    test("should respond with a 400 status code", async () => {
      const response = await supertest(app).post("/add/1").send({
        payer: "DANNON",
        points: -3000,
        timestamp: "2020-11-02T14:00:00Z"
      })
      expect(response.statusCode).toBe(400);
    })

    test("should respond with an error message", async () => {
      const response = await supertest(app).post("/add/1").send({
        payer: "DANNON",
        points: -3000,
        timestamp: "2020-11-02T14:00:00Z"
      })
      expect(response.body).toBe('error: points cannot go negative');
    })
  })

})

describe("GET /get/:member_id", () => {

  describe("if given member_id does not exist in the system", () => {
    //should return 400 status code
    test("should respond with a 400 status code", async () => {
      const response = await supertest(app).get("/get/3")
      expect(response.statusCode).toBe(400);
    })
    //should return error message saying member doesn't exist
    test("should respond with an error message with member does not exist", async () => {
      const response = await supertest(app).get("/get/3")
      expect(response.body).toBe('member does not exist');
    })

  })

  describe("if given member_id exist in the system", () => {
    //should return 200 status code
    test("should respond with a 400 status code", async () => {
      const response = await supertest(app).get("/get/1")
      expect(response.statusCode).toBe(200);
    })
    //should return member's total collected points per payer
    test("should respond with an error message with member does not exist", async () => {
      const response = await supertest(app).get("/get/1")
      const body = JSON.stringify(response.body);
      const testCase = JSON.stringify({
        "DANNON": 1100,
        "UNILEVER": 200,
        "MILLER COORS": 10000
      })
      console.log(testCase === body);
      expect(body).toBe(testCase);
    })
  })

})

describe("PUT /spent/:member_id", () => {

  describe("if given member_id does not exist in the system", () => {
    //should return 400 status code
    //should return error message saying member doesn't exist
    test("should respond with a 400 status code", async () => {
      const response = await supertest(app).put("/spent/3").send({
        points: 1000,
      })
      expect(response.statusCode).toBe(400);
    })

    test("should respond with an error message", async () => {
      const response = await supertest(app).put("/spent/3").send({
        points: 1000,
      })
      expect(response.body).toBe('member does not exist');
    })
  })

  describe("if given member_id does not have enough points to spend", () => {
    //should return 400 status code
    //should return error message saying member does not have enough points
    test("should respond with a 400 status code", async () => {
      const response = await supertest(app).put("/spent/1").send({
        points: 50000,
      })
      expect(response.statusCode).toBe(400);
    })

    test("should respond with an error message", async () => {
      const response = await supertest(app).put("/spent/1").send({
        points: 50000,
      })
      expect(response.body).toBe('Not enough points');
    })
  })

  describe("if given member_id has enough point to spend", () => {
    //should return total spent points per payer
    test("should respond with a spent points per payer", async () => {
      const response = await supertest(app).put("/spent/1").send({
        points: 5000,
      })
      const body = response.body;
      const testCase = [
        {
          payer: "DANNON",
          points: -100
        },
        {
          payer: "UNILEVER",
          points: -200
        },
        {
          payer: "MILLER COORS",
          points: -4700
        }
      ];

      let contentEqual = true;

      for (let i = 0; i < testCase.length; i++) {
        if (JSON.stringify(body[i]) !== JSON.stringify(testCase[i])) {
          contentEqual = false;
        }
      }

      expect(response.body.length).toBe(testCase.length);
      expect(contentEqual).toBe(true);

    })
  })

})