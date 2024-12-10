import newsModel from "../models/newsModel";
import { Request, Response } from "express";

// get every news
export const getNews = async (req: Request, res: Response) => {
    try {
        const news = await newsModel.findAll();
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}
// get one news
export const getOneNews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const news = await newsModel.findByPk(id);
        res .status(200).json(news);
     } catch (error) {
        console.log(error);

      }
}
// create news

import upload from './uploadImage';
import { Request, Response } from 'express';

export const createNewsWithImage = async (req: Request, res: Response) => {
    upload.single('image')(req, res, async (err: any) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { user_id, title, content } = req.body;
      const url_image = req.file ? req.file.path : null;

      try {
        const news = await newsModel.create({




          user_id,
          url_image,
          title,
          content,
        });
        res.status(200).json(news);




      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la noticia' });
      }
    });
};
// update news
export const updateNews = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, url_image, title, content } = req.body;
    try {
        const news = await newsModel.update({
            user_id,
            url_image,
            title,
            content,
        }, {
            where: {
                id,
            }
        });
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}
// delete news
export const deleteNews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const news = await newsModel.destroy({
            where: {
                id,
            }
        }
    );

            res.status(200).json(news);
} catch (error) {
        console.log(error);
    }
}    
          