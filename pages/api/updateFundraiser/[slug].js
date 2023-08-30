import FundraiseRequests from "../../../models/FundraiseRequests";
import connectDb from "../../../middleware/db";

const handler = async (req, res) => {
    console.log("Enter backend");
    if (req.method !== 'PUT') {
        return res.status(405).end(); //! Method Not Allowed
    }
    const { fundraiserDetails,Amount } = req.body
    console.log(fundraiserDetails)
    console.log(parseInt(Amount));

    // Find the fundraiser to be updated and update it 
    let fundraiser = await FundraiseRequests.findById(fundraiserDetails);
    console.log("fundraiser",fundraiser)
    if (!fundraiser) {
        return res.status(404).send({ success: false, error: "Not Found" });
    }

    const updatedFundraiser = {};
    if (Amount) { updatedFundraiser.amountRaised = parseInt(Amount) + fundraiser.amountRaised };
    updatedFundraiser.numberOfDonators = 1 + fundraiser.numberOfDonators ;

    fundraiser = await FundraiseRequests.findByIdAndUpdate(fundraiserDetails, { $set: updatedFundraiser }, { new: true })
    console.log("updated",fundraiser);
    res.json({ success: true, fundraiser });

}
export default connectDb(handler);