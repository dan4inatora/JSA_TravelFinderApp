
import multer from 'multer';
import imageFilter from './isFileImage';
import path from 'path';

// SET STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
   
  let upload = multer({ storage: storage, fileFilter: imageFilter })
  export default upload;