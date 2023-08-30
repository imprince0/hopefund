const mongoose = require('mongoose');
const { Schema } = mongoose;
const ContactSchema = new Schema({
    requesterName: {type: String, required: true},
    requesterPhone: { type: Number, required: true},
    requesterfundraise: {type: String, required: true},
    requesterlanguage: {type: String, required: true},
},{timestamps:true});
export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);