const express = require("express");
const adminRouter = express();
var Complaint = require("../models/Complaint");

// Bar graph Logic
adminRouter.get("/complains", (req, res) => {
  Complaint.find({ damaged: "yes" }).countDocuments({}, (err, d) => {
    if (err) console.log(err);
    else {
      Complaint.find({ overflow: "yes" }).countDocuments({}, (err, o) => {
        if (err) console.log(err);
        else {
          Complaint.find({ frequency: "yes" }).countDocuments({}, (err, f) => {
            if (err) console.log(err);
            else {
              Complaint.find({ smell: "yes" }).countDocuments({}, (err, s) => {
                if (err) console.log(err);
                else {
                  Complaint.find({ sensor: "yes" }).countDocuments(
                    {},
                    (err, sen) => {
                      if (err) console.log(err);
                      else {
                        console.log(
                          "the count of damaged,overflow,frequency,smell,sensor in order " +
                            d +
                            o +
                            f +
                            s +
                            sen
                        );
                        res.render("complains", {
                          damaged: d,
                          overflow: o,
                          frequency: f,
                          smell: s,
                          sensor: sen,
                        });
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    }
  });
});

//Get all records
adminRouter.get("/main", (req, res) => {
  Complaint.find({}, (err, items) => {
    if (err) console.log(err);
    else res.render("main", { items: items });
  });
});

//Get individual records
adminRouter.get("/details/:regId", (req, res) => {
  Complaint.find({ bin: req.params.regId }, (err, docs) => {
    if (err) console.log(err);
    else res.render("single", { users: docs });
  });
});

module.exports = adminRouter;
