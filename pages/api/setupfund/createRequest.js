// import { NextApiRequest, NextApiResponse } from 'next';
import { body, validationResult } from 'express-validator';
import FundraiseRequests from '../../../models/FundraiseRequests';
import connectDb from '@/middleware/db';


const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); //! Method Not Allowed
  }

  //! Checking if the inputs are valid or not
  const validationMiddleware = [
    body('creatorMail', 'Enter a valid email').isEmail(),
  ];

  // Run validation middleware
  await Promise.all(validationMiddleware.map((middleware) => middleware.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let fundraiseRequest = await FundraiseRequests.create({
      verified: req.body.verified,
            category: req.body.category,

      createdBy: req.body.createdBy,
      creatorMail: req.body.creatorMail,
      creatorImg: req.body.creatorImg,

      benefitterCreatorRelation: req.body.benefitterCreatorRelation,

      benefitterName: req.body.benefitterName,
      benefitterAge: req.body.benefitterAge,
      benefitterGender: req.body.benefitterGender,
      benefitterAddress: req.body.benefitterAddress,
      benefitterContact: req.body.benefitterContact,

      extension1:req.body.extension1,
      extension2:req.body.extension2,

      amountRequired: req.body.amountRequired,
      amountRaised: req.body.amountRaised,

      endDateToRaise: req.body.endDateToRaise,
      includeTaxBenefit: req.body.includeTaxBenefit,

      hospitalName: req.body.hospitalName,
      hospitalLocation: req.body.hospitalLocation,
      ailment: req.body.ailment,

      coverImg: req.body.coverImg,
      fundraiserTitle: req.body.fundraiserTitle,
      fundraiserStory: req.body.fundraiserStory,
      slug: req.body.fundraiserTitle,
    });
    res.json({ success: true, fundraiseRequest});
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
};

export default connectDb(handler);
