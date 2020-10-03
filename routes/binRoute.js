const express = require("express");
const binRouter = express();
var Bins = require("../models/Bins");
const openGeocoder = require("node-open-geocoder");
//var mongoose = require("mongoose");
const fetch = require("node-fetch");

//get count of bins - bio & non-bio
binRouter.get("/", (req, res) => {
  Bins.find({}, (err, items) => {
    if (err) console.log(err);
    else {
      Bins.find({ Type: "bio" }).countDocuments({}, (err, b) => {
        if (err) console.log(err);
        else {
          Bins.find({ Type: "non-bio" }).countDocuments({}, (err, n) => {
            if (err) console.log(err);
            else {
              res.render("index", { bio: b, non: n, data: items });
              console.log("Count of bio and non- bio " + b + " " + n);
            }
          });
        }
      });
    }
  });
});

//Get individual records
binRouter.get("/bins/:regId", (req, res) => {
  var docs1 = {};
  Bins.find({ Bin: req.params.regId }, (err, docs) => {
    if (err) console.log(err);
    else {
      docs1 = docs;
      console.log(docs);
      let time = docs[0].updatedAt;
      var t1 =
        (new Date().getTime() - new Date(time).getTime()) /
        (1000 * 60 * 60 * 24);
      t1 = Math.floor(t1);
      let qual = "";
      if (t1 <= 1) {
        qual = "Best";
      } else if (t1 >= 2 && t1 <= 4) {
        qual = "Moderate";
      } else {
        qual = "worst";
      }
      let addr = openGeocoder().reverse(
        docs[0].geometry.coordinates[0],
        docs[0].geometry.coordinates[1]
      );

      const url =
        "https://" + addr.httpOptions.hostname + addr.httpOptions.path;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          res.render("singleBins", {
            bins: docs1,
            time: t1,
            quality: qual,
            address: data.display_name,
          });
        });
    }
  });
});

module.exports = binRouter;
