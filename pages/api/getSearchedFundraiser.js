import FundraiseRequests from "../../models/FundraiseRequests";
import connectDb from "../../middleware/db";

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(); //! Method Not Allowed
    }
    try {
        console.log(req.body.search);
        let searchTerm = req.body.search;
        let regexTerm = new RegExp(`.*${searchTerm}.*`, "i");
        let data = await FundraiseRequests.find({ verified: true, $or: [{benefitterName:{$regex:regexTerm}},{category:{$regex:regexTerm}}, {fundraiserTitle:{$regex:regexTerm}}, {benefitterAddress:{$regex:regexTerm}},{ailment:{$regex:regexTerm}}] });
        res.status(200).json({ success: "true", data })
    } catch (error) {
        console.log(error)
    }
}
export default connectDb(handler);