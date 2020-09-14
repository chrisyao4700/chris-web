const express = require('express');
const router = express.Router();
const skillConn = require('../modules/skills/skills.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let skillList = skillConn.getSkillList();
  res.render('home/page_root', {
    title: 'Chris Yao',
    skillList: skillList
  });
});

module.exports = router;
