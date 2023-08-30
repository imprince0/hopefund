import connectDb from "../../middleware/db";
import User from "../../models/User";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).end(); //! Method Not Allowed
    }

    try {
        const { email } = req.body;
        let user = await User.findOne({ email: email });
        if(user){
            res.json({ success: true, user });
        }
        res.json({success:false,"eroor":"not found"})
    } catch (error) {
        res.status(500).json({ success:false,"error": error });
        console.log(error);
    }
};

export default connectDb(handler)

// export default nextConnect().use(connectDb).use(Fetchuser).post(handler);
