const multer = require('multer');

const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Save uploaded images to the 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = crypto.randomBytes(8).toString('hex');
//         const extension = path.extname(file.originalname);
//         const originalFilename = file.originalname.split('.')[0];
//         const filename = `${originalFilename}-${uniqueSuffix}${extension}`;
//         cb(null, filename);
//     }
// });

const upload = multer({ storage: storage });

module.exports = upload;
