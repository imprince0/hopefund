import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            console.log("body",req.body)
            console.log(fields.photo, files)
            console.log(files.file.filepath)
            var oldPath = files.file.filepath;
            const extension = files.file.originalFilename.slice(files.file.originalFilename.lastIndexOf('.'));
            console.log(extension);
            // var newPath = `./public/uploads/${files.file.originalFilename}`;
            var newPath = `./public/profileImg/${fields.photo}${extension}`;
            mv(oldPath, newPath, function(err) {});
            res.status(200).json({ fields, files })
        })
    })
    
}