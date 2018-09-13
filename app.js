'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) => {
    console.log('REQUSST', JSON.stringify(req.body));
    if(req.body.result.metadata.intentName == "addNationalId"){
        console.log('I am in');
        let leave_details= [];
        leave_details.push({
            "optionInfo": {
                "key": `ind`,
                "synonyms": `India`
            },
            "title": `India`,
            "description": `india country`
        });
        leave_details.push({
            "optionInfo": {
                "key": `eng`,
                "synonyms": `england`
            },
            "title": `England`,
            "description": `England`
        });
        let data = {
            "speechMsg": "Test",
            "title": "Test",
            "itemValues": leave_details
        };

        return res.json({
          "messages": [
              {
                  "displayText": data.speechMsg,
                  "platform": "google",
                  "textToSpeech": data.speechMsg,
                  "type": "simple_response"
              },  {
                  "items": data.itemValues,
                  "platform": "google",
                  "title": data.title,
                  "type": "list_card"
              }
          ]
      });
    } else if(req.body.result.metadata.intentName == "addNationalId-type"){
      console.log('FULL REQ IN addNationalId', JSON.stringify(req.body));
      var country, nationalIdType="", nationalId ="", comment=""
      var contexts = req.body.result.contexts;
      for(var i=0;i<contexts.length;i++){
        if(contexts[i].name === "actions_intent_option"){
            console.log("HEY RAJESH", JSON.stringify(contexts[i]));
            country = contexts[i].parameters.OPTION;
            nationalIdType = contexts[i].parameters.nationalIdType;
            nationalId = contexts[i].parameters.nationalId;
            comment = contexts[i].parameters.comment;
        }
     }

     if(nationalIdType == ""){

      let leave_details= [];
      leave_details.push({
          "optionInfo": {
              "key": `pan`,
              "synonyms": `Pan`
          },
          "title": `Pan`,
          "description": `Pan Card`
      });
      leave_details.push({
          "optionInfo": {
              "key": `aadhar`,
              "synonyms": `Aadhar`
          },
          "title": `Aadhar`,
          "description": `aadhar card`
      });
      let data = {
          "speechMsg": "Test 1",
          "title": "Test 1",
          "itemValues": leave_details
      };

      return res.json({
          "contextOut": [
              {
                  "name": "actions_intent_option",
                  "parameters": {
                    "country": country,
                    "country.original": country,
                    "nationalIdType": nationalIdType,
                    "nationalIdType.original": nationalIdType,
                    "nationalId": nationalId,
                    "nationalId.original": nationalId,
                    "comment": comment,
                    "comment.original": comment
                  },
                  "lifespan": 5
                }
          ],
        "messages": [
            {
                "displayText": data.speechMsg,
                "platform": "google",
                "textToSpeech": data.speechMsg,
                "type": "simple_response"
            },  {
                "items": data.itemValues,
                "platform": "google",
                "title": data.title,
                "type": "list_card"
            }
        ]
    });
  }
  } else{
    console.log('JEJJEJE', req.body);
  }

});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 3000!'));