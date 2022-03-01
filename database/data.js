//let data = {};

//dummy testing data
let data = {
  "1": {
      "allPoints": [
          {
              "payer": "DANNON",
              "earnedPoints": 300,
              "timestamp": "2020-10-31T10:00:00Z",
              "currentPoints": 300
          },
          {
              "payer": "UNILEVER",
              "earnedPoints": 200,
              "timestamp": "2020-10-31T11:00:00Z",
              "currentPoints": 200
          },
          {
              "payer": "DANNON",
              "earnedPoints": -200,
              "timestamp": "2020-10-31T15:00:00Z",
              "currentPoints": -200
          },
          {
              "payer": "MILLER COORS",
              "earnedPoints": 10000,
              "timestamp": "2020-11-01T14:00:00Z",
              "currentPoints": 10000
          },
          {
              "payer": "DANNON",
              "earnedPoints": 1000,
              "timestamp": "2020-11-02T14:00:00Z",
              "currentPoints": 1000
          }
      ],
      "spentPoints": {},
      "pointsPerPayer": {
          "DANNON": 1100,
          "UNILEVER": 200,
          "MILLER COORS": 10000
      }
  }
}

module.exports = data;