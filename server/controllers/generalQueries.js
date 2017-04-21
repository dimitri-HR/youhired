var pg = require('pg');
var Sequelize = require('sequelize');
var connection = require('./../db');
var User = require('./../models/UserModel');
var Token = require('./../models/TokenModel')
var JobApplication = require('./../models/JobApplicationModel');
var Contact = require('./../models/ContactModel');
var ActivityLog = require('./../models/ActivityLogModel');
var ContactApplicationJoin = require('./../models/ContactApplicationJoinModel');


var Promise = require('bluebird');

module.exports = {

  getData: function (req, res) {

    var data = {
      jobapplications: []
    };

    var applications;

    var getContacts = function(){
      return Contact.findAll({
        attributes: [
        ['id', 'contactid'],
        'contactfirstname',
        'contactlastname',
        'contactcompany',
        'contactpositiontitle',
        'contactphonenumber',
        'contactemail',
        'contactaddress',
        'contactcity',
        'contactstate',
        'contactzip',
        'secondaryphonenumber',
        'secondaryemail',
        'backgroundinformation',
        [Sequelize.fn('TO_CHAR', Sequelize.col('createdat'), 'dd MON YYYY'), 'createdat']
        // [Sequelize.fn('TO_CHAR', Sequelize.col('createdat'), 'dd-mm-YYYY'), 'createdat']
        ],
        where: {
          userid: req.body.userid
        }
      });
    };

    var getApplications = function(){
      return JobApplication.findAll({
        attributes: [
          ['id', 'applicationid'],
          'positionname',
          'companyname',
          'jobposturl',
          'jobfile',
          'status',
          'companyaddress',
          'companycity',
          'companystate',
          'companyzip',
          'offersalary',
          'offeroptions',
          'offerbenefits',
          'userid',
          [Sequelize.fn('TO_CHAR', Sequelize.col('createdat'), 'MON YYYY'), 'createdat']
        ],
        where: {
          userid: req.body.userid
        }
      });
    };

    var getActivitiesForApplication = function(id){
      return ActivityLog.findAll({
        attributes: [
          ['id', 'activitylogid'],
          'applicationid',
          'activitytype',
          'activitylogcontent',
          [Sequelize.fn('TO_CHAR', Sequelize.col('createdat'), 'dd MON YYYY'), 'createdat']
        ],
        where: {
          applicationid: id,
          activitytype: 'NOTE'
        }
      });
    };

    var getContactsForApplication = function(id){
      return connection.query("SELECT c.id AS contactid, c.contactfirstname, c.contactlastname, c.contactcompany, c.contactpositiontitle, c.contactphonenumber, c.contactemail, c.contactaddress, c.contactcity, c.contactstate, c.contactzip, c.secondaryphonenumber, c.secondaryemail, c.backgroundinformation, TO_CHAR(c.createdat, 'DD MON YYYY') AS createdat FROM ((contacts c INNER JOIN applicationcontacts j ON c.id = j.contactid) INNER JOIN jobapplications a ON j.applicationid = a.id) WHERE a.id = :id ", {
          replacements: { id: id}
        });
    };


    var loopThroughApplications = function(array, count){

      if(count === array.length){
          console.log(count);
          res.send(data);
          return;
        } else {
          console.log(count);
          var item = applications[count];
          data['jobapplications'].push({
            details: item['dataValues']
          });
          var id = item['dataValues']['applicationid'];
          getActivitiesForApplication(id)
          .then((result) => {
            // console.log(data['jobapplications'][index]);
            data['jobapplications'][count]['activities'] = result || [];
            // console.log(data['jobapplications'][count]['activities']);
          }).then(() => {
            var id = item['dataValues']['applicationid'];
            getContactsForApplication(id)
              .then((result) => {
                  console.log(count);
                  data['jobapplications'][count]['contacts'] = result[0] || [];
              }).then(() => {
                  loopThroughApplications(array, count += 1)
                })
              })
      }
    };


    getContacts()
    .then((results) => {
      data['contacts'] = results;
    })
    .then(() => {
      getApplications()
        .then((results) => {
          applications = results;
          // console.log(applications);
        })
        .then(() => {
          // var count = 0;
          loopThroughApplications(applications, 0)
          // res.send(data);
      })
    }).catch((error) => {
      console.log(error);
    });
  },

  modifyTimeStamp: function(req, res) {
    JobApplication.findAll({
      attributes: [
      ['id', 'applicationid'],
      'positionname',
      'companyname',
      [Sequelize.fn('TO_CHAR', Sequelize.col('createdat'), 'mm-YYYY'), 'createdat']
      // 'createdat'
      ],
      where: {
        userid: req.body.userid
      }
    }).then((results) => {
      res.send(results);
    })
  }




};
