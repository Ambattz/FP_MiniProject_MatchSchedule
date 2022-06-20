const express = require("express");
const Fixture = require("../models/fixture");

const router = new express.Router();

//Get for "/fixtures"
router.get("/fixtures", (req, res) => {
    var query = req.query;
    var filter = {};
    for (const params in query) {
        if (params == "start_date") {
            filter = {
                ...filter,
                date: { ...filter.date, "$gte": new Date(query[params]) }
            };
        }
        if (params == "end_date") {
            filter = {
                ...filter,
                date: { ...filter.date, "$lte": new Date(query[params]) }
            };
        }
        if (params === "venue") {
            filter = {
                ...filter,
                venue: query[params]
            }
        }
    }
    Fixture
        .find(filter, (err, matches) => {
            if (err) {
                res.status(400).send(err);
            }
            Fixture.countDocuments(filter, (err, count) => {
                if (err) {
                    res.status(400).send(err);
                }
                res.status(200).send({ count: count, records: matches });
            })
        }
        );


});

//Post for "/fixtures"
router.post("/fixtures", (req, res) => {
    const newMatch = new Fixture({
        team1: req.body.team1,
        team2: req.body.team2,
        venue: req.body.venue,
        date: req.body.date
    })
    newMatch
        .save()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = router;