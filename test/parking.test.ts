import request from "supertest";
import app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

describe("GET /bookparking", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/bookparking")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});


describe("POST /bookparking", () => {
  it("should return false from assert when no message is found", (done) => {

    // Need a user in order to book a parking spot
    request(app).post("/signup")
      .field("email", "Parking@user.com")
      .field("password", "testpass")
      .field("confirmPassword", "testpass")
      .expect(302)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });

    // Book parking spot
    request(app).post("/bookparking")
      .field("bookDate", "19/05/2018")
      .expect(302)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });

    // Cancel previous booking
    request(app).post("/bookparking")
    .field("bookDate", "19/05/2018")
    .expect(302)
    .end((err, res) => {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });
});