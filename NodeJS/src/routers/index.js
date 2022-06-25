const express = require("express");
const Fixture = require("../models/fixture");

const router = new express.Router();

// Your code goes here
// Write a route to get fetch the matches i.e., GET /fixtures
// You should also implement below filters
//   * filter to list matches that will be held between given start and end date
//   * filter for venue
//Get for "/fixtures"
router.get("/fixtures", async (req, res) => {
    var query = req.query;
    var filter = {};
    if (query.hasOwnProperty("venue")) {
        filter = { ...filter, venue: query["venue"] }
    }
    if (query.hasOwnProperty("start_date")) {
        filter = { ...filter, date: { ...filter.date, "$gte": query["start_date"] } }
    }
    if (query.hasOwnProperty("end_date")) {
        filter = { ...filter, date: { ...filter.date, "$lte": query["end_date"] } }
    }
    try {
        const fixtures = await Fixture.find(filter);
        res.status(200).json({ count: fixtures.length, records: fixtures });
    } catch (error) {
        res.status(400).send(error);
    }
})

// Write a route to create a match fixture i.e., POST /fixtures
// POST route will take all of these below params
//   * team1
//   * team2
//   * venue
//   * date
//Post for "/fixtures"
router.post("/fixtures", async (req, res) => {
    try {
        const { team1, team2, venue, date } = req.body;
        const newMatch = new Fixture({ team1, team2, venue, date });
        const response = await newMatch.save();
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Delete for "/fixtures"
router.delete("/fixtures/:id", async (req, res) => {
    var filter = { _id: req.params.id };
    try {
        const response = await Fixture.deleteOne(filter);
        res.status(200).json({ ...response, message: "Delete Successful" });
    } catch (error) {
        res.status(400).send({ ...error, message: "Delete Unsuccessful" });
    }
})

//Patch for "/fixtures"
router.patch("/fixtures/:id", async (req, res) => {
    var filter = { _id: req.params.id };
    try {
        const response = await Fixture.findOneAndUpdate(filter, req.body);
        res.status(200).json({ ...response, message: "Update Successful" });
    } catch (error) {
        res.status(400).send({ ...error, message: "Update Unsuccessful" });
    }
})

module.exports = router;