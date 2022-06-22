const express = require("express");
const Fixture = require("../models/fixture");

const router = new express.Router();

// Your code goes here
// Write a route to get fetch the matches i.e., GET /fixtures
// You should also implement below filters
//   * filter to list matches that will be held between given start and end date
//   * filter for venue
//Get for "/fixtures"
router.get("/fixtures", (req, res) => {
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
    Fixture.find(filter, (error, data) => {
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).json({ count: data.length, records: data });
    })
});

// Write a route to create a match fixture i.e., POST /fixtures
// POST route will take all of these below params
//   * team1
//   * team2
//   * venue
//   * date
//Post for "/fixtures"
router.post("/fixtures", (req, res) => {
    const { team1, team2, venue, date } = req.body;
    const newMatch = new Fixture({ team1, team2, venue, date });
    newMatch
        .save()
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).send(error); });
});

router.delete("/fixtures/:id", (req, res) => {
    var filter = { _id: req.params.id };
    Fixture.deleteOne(filter, (error, data) => {
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).json({ data: data, message: "Deleted Succssfully" });
    })
})

module.exports = router;