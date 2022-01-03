const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const ApiKeySchema= new mongoose.Schema({
    user:String,
    apikey:String
});

ApiKeySchema.pre('save', function(next){
    const user= this;
    user.apikey= uuidv4();
    next();
});

const ApiKey = mongoose.model('ApiKey', ApiKeySchema);

module.exports= ApiKey;