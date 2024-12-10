import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// Definir un tipo para el archivo
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

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  // Definir destino de almacenamiento de archivos
  destination: (req: Request, file: FileWithMetadata, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/news-images/'); // Carpeta donde se guardarán las imágenes
  },
  
  // Definir nombre del archivo
  filename: (req: Request, file: FileWithMetadata, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configuración de filtro para tipos de archivo
const fileFilter = (req: Request, file: FileWithMetadata, cb: FileFilterCallback) => {
  // Aceptar solo imágenes
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG y GIF.'));
  }
};

// Configuración final de Multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Límite de 5MB
  }
});

export default upload;