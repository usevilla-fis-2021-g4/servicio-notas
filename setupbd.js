const mongoose = require('mongoose');
const dbConnection = require('./src/database');
const ApiKey = require('./apikeys')

dbConnection().then(
    ()=>{
        const user = new ApiKey({user:"fis"});
        user.save(function(err,user){
            if(err){
                console.log(err);
            } else{
                console.log('user: ' + user.user + ' , '+user.apikey +" saved.");
            };
        });
    }
)