import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';


interface FileWithMetadata extends multer.File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}


const storage = multer.diskStorage({
  
  destination: (req: Request, file: FileWithMetadata, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/news-images/');
  },
  
  
  filename: (req: Request, file: FileWithMetadata, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const fileFilter = (req: Request, file: FileWithMetadata, cb: FileFilterCallback) => {
 
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG y GIF.'));
  }
};


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 
  }
});

export default upload;