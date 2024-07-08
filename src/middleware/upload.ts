
import multer, { StorageEngine,FileFilterCallback  } from 'multer';
import { Request  } from 'express';
import { MulterError } from 'multer';

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);  // Accept the file
  } else {
    cb(null as any, false) // Reject the file
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter
}).single('image'); 

export default upload;

