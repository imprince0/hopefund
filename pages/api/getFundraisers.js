import FundraiseRequests from "../../models/FundraiseRequests";
import connectDb from "../../middleware/db";

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(); //! Method Not Allowed
    }
    try {
        let data = await FundraiseRequests.find({ verified: true });
        let data1 = await FundraiseRequests.find({ verified: true, category: "medical" });
        let data2 = await FundraiseRequests.find({ verified: true, category: "memorial" });
        let data3 = await FundraiseRequests.find({ verified: true, category: { $in: ["others", "education"] } });
        res.status(200).json({ success: "true",data,data1,data2,data3})
    } catch (e) {
        console.log(e)
    }
}
export default connectDb(handler);