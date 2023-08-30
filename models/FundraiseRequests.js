const mongoose = require('mongoose');
const { Schema } = mongoose;
const FundraiseRequestsSchema = new Schema({
    verified:{type: Boolean,default:false},
    slug:{type: String,unique:true},
    donators:[],
    category:{type:String,required:true},

    createdBy:{type: String,required:true},
    creatorMail:{type: String,required:true},
    creatorImg:{type:String},
    
    benefitterCreatorRelation:{type:String},
    
    benefitterName:{type: String,required:true},
    benefitterAge:{type: Number,required:true},
    benefitterGender:{type: String},
    benefitterAddress:{type: String,required:true},
    benefitterContact:{type: String,required:true},

    amountRequired:{type: String,required:true},
    amountRaised:{type: Number,default: 0},

    endDateToRaise:{type: Date,required:true},
    includeTaxBenefit:{type: String,required:true},

    hospitalName:{type:String,required:true},
    hospitalLocation:{type:String,required:true},
    ailment:{type:String,required:true},

    numberOfDonators:{type:Number,default:0},

    extension1:{type:String,default:"jpg"},
    extension2:{type:String,default:"jpg"},

    coverImg:{type:String,required:true},
    fundraiserTitle:{type: String,required:true},
    fundraiserStory:{type: String},

},{timestamps:true});
export default mongoose.models.FundraiseRequests || mongoose.model('FundraiseRequests', FundraiseRequestsSchema);