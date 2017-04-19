/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();

const buzzwordsJSON = {
  "buzzwords" : []
};
let totalPoints = 0;

router.route('/')
  .get((req, res) => {
    res.json(buzzwordsJSON);
  })
  .post((req, res) => {
    if(checkPostBody(req.body)) {
      req.body.heard = false;
      req.body.points = Number(req.body.points);
      buzzwordsJSON.buzzwords.push(req.body);
      res.json({success: true});
    } else {
      res.status(400).end('Invalid or Duplicate Object');
    }
  })
  .put((req, res) => {
    if(checkPutBody(req.body)) {
      res.json({success: true, newScore: updateBuzzwordBool(req.body)});
    } else {
      res.status(400).end('Invalid Object');
    }
  })
  .delete((req, res) => {
    if (checkDeleteBody(req.body)) {
      res.json(deleteBuzzword(req.body));
    } else {
      res.status(400).end('Invalid Object');
    }
  });


module.exports = router;

const checkPostBody = (bodyObj) => {
  let duplicateCheck = buzzwordsJSON.buzzwords.some((element) => element.buzzword === bodyObj.buzzword);
  return bodyObj.hasOwnProperty('buzzword') && bodyObj.hasOwnProperty('points') && !duplicateCheck;
};

const checkPutBody = (bodyObj) => {
  return bodyObj.hasOwnProperty('buzzword') && bodyObj.hasOwnProperty('heard');
};

const updateBuzzwordBool = (bodyObj) => {
  for (let i = 0; i < buzzwordsJSON.buzzwords.length; i++) {
    if (bodyObj.buzzword === buzzwordsJSON.buzzwords[i].buzzword) {
      buzzwordsJSON.buzzwords[i].heard = bodyObj.heard;
      totalPoints += buzzwordsJSON.buzzwords[i].points;
      return totalPoints;
    }
  }
};

const checkDeleteBody = (bodyObj) => {
  let duplicateCheck = buzzwordsJSON.buzzwords.some((element) => element.buzzword === bodyObj.buzzword);
  return bodyObj.hasOwnProperty('buzzword') && duplicateCheck;
};

const deleteBuzzword = (bodyObj) => {
  buzzwordsJSON.buzzwords = buzzwordsJSON.buzzwords.filter((element) => element.buzzword !== bodyObj.buzzword);
  return {success: true};
};