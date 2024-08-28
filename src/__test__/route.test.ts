import app from "../server";
import supertest from "supertest";

describe("POST /user", function () {
  it("responds with json", async () => {
    const res = await supertest(app)
      .post("/signin")
      .send({ username: "thomas", password: "password" })
      .set("Accept", "application/json")
    expect(res.status).toEqual(200);
    console.log(res)
    expect(res.headers["Content-Type"]).toMatch(/json/);

  });
});