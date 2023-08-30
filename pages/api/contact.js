// import ContactSchema from "../../models/Contact";
import connectDb from "../../middleware/db";
import Contact from "../../models/Contact";

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(); //! Method Not Allowed
    }

    try {
        let contactRequest = await Contact.create({
            requesterName: req.body.requesterName,
            requesterPhone: req.body.requesterPhone,
            requesterfundraise: req.body.requesterfundraise,
            requesterlanguage: req.body.requesterlanguage,
        });
        res.json({ success: true, contactRequest });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, error: 'Internal Server Error' });
    }
};

export default connectDb(handler);