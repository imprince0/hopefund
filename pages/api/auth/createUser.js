// import { NextApiRequest, NextApiResponse } from 'next';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDb from '@/middleware/db';
const JWT_SECRET=process.env.JWT_SECRET;

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

  try {
    // checking if a user already exists with this email or not.
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ success:false,errors: "A User with this email already exists" });
    }

    // Salting and hashing
    const salt = await bcrypt.genSalt(10);
    const secured_Pass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      password: secured_Pass,
      email: req.body.email,
    });

    const data = {user: {id: user.id,},};
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({success:true,authtoken,user,data });
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send({success:false,error:'Internal Server Error'});
  }
};

export default connectDb(handler);
