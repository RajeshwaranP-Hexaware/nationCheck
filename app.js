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
                "key": `IND`,
                "synonyms": `India`
            },
            "title": `India`,
            "description": `india country`
        });
        leave_details.push({
            "optionInfo": {
                "key": `ENG`,
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
      console.log('yAAR ',country, nationalIdType,nationalId,comment);
     if(nationalIdType == ""){

      let leave_details= [];
      leave_details.push({
          "optionInfo": {
              "key": `PAN`,
              "synonyms": `Pan`
          },
          "title": `Pan`,
          "description": `Pan Card`
      });
      leave_details.push({
          "optionInfo": {
              "key": `AADHAR`,
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

      var resp = {
          "contextOut": [
              {
                  "name": "actions_intent_option",
                  "parameters": {
                    "country": country,
                    "nationalId": nationalId,
                    "comment.original": comment,
                    "nationalId.original": nationalId,
                    "country.original": country,
                    "nationalIdType.original": nationalIdType,
                    "comment": comment,
                    "nationalIdType": nationalIdType
                  },
                  "lifespan": 5
                }
          ],
          "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Check Test",
                      "displayText": "Check test"
                    }
                  }
                ]
              }
            }
        }
    };
    console.log('pol', JSON.stringify(resp));
    return res.json(resp);
  }
  } else if(req.body.result.metadata.intentName == "addNationalId-type - custom"){
    console.log('JEJJEJE', JSON.stringify(req.body));
  } else if(req.body.result.metadata.intentName == "getCompetition"){
    console.log("GET COMP ",req.body.result.parameters);
    if(req.body.result.fulfillment.speech == "competition_name"){
        
        return res.json({
            "messages": [
                {
                    "displayText": "Enter Competiton Name",
                    "platform": "google",
                    "textToSpeech": "Enter Competiton Name",
                    "type": "simple_response"
                }
            ]
        });
    } else if(req.body.result.fulfillment.speech == "comment"){
        if(req.body.result.parameters.competitionName !== "PL"){
            let eventResp = {
                "followupEvent": {
                    "name": "competition_event",
                    "data": {
                        "competitionName": "",
                        "comment": ""
                    }
                },
                "messages": [
                    {
                        "displayText": "Need Comment",
                        "platform": "google",
                        "textToSpeech": "Need Comment",
                        "type": "simple_response"
                    }
                ]
            };
            return res.json(eventResp);
        } else {
            let resp = {
                "data": {
                  "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                      "items": [
                        {
                          "simpleResponse": {
                            "textToSpeech": "Enter Comment",
                            "displayText": "Enter Comment"
                          }
                        }
                      ]
                    }
                  }
              }};
                return res.json(resp);
        }
    } else{
        let resp = {"contextOut": [
        //     {
        //         "name": "94e17669-bbd5-4a0c-9c97-a0a734c6d566_id_dialog_context",
        //         "parameters": {
        //             "comment.original": "",
        //   "competitionName": "",
        //   "comment": "",
        //   "competitionName.original": ""
        //         },
        //         "lifespan": 1
        //       }
        ],
        "data": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "I am done",
                    "displayText": "I am done"
                  }
                }
              ]
            }
          }
      }};
        return res.json(resp);
    }
}

});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 3000!'));