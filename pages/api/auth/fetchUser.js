import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDb from '@/middleware/db';
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(); //! Method Not Allowed
    }

    //! Checking if the inputs are valid or not
    const validationMiddleware = [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    ];

    // Run validation middleware
    await Promise.all(validationMiddleware.map((middleware) => middleware.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        // Checking if a user with the given mail exists?
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, error: "Please Login with correct credentials." })
        }

        // Comparing the password and checking if it is true.
        const password_compare = await bcrypt.compare(password, user.password);
        if (!password_compare) {
            return res.status(400).json({ success: false, error: "Please Login with correct credentials." })
        }

        // If both credentials are correct => send the payload
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, error: "Some Error occurred" });
    }
};

export default connectDb(handler);
