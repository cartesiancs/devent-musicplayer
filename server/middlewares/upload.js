import multer from 'multer'

import path from 'path'
import { v4 as uuidv4 } from 'uuid';


const storageDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4().split('-').join('')+ path.extname(file.originalname));
    }
})


const filter = (req, file, cb) => {
    if (
        file.mimetype == 'image/png' || 
        file.mimetype == 'image/gif' || 
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'audio/mpeg'
    ) {
        return cb(null, true);
    } else {
        return cb(null, false);
    }
    
}

const upload = multer({
    storage: storageDisk,
    fileFilter: filter
}).single('file');


export { upload };