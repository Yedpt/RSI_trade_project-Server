import { Request, Response } from "express";
import newsModel from "../models/newsModel";
import upload from './uploadImage';

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
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}

// create news
export const createNewsWithImage = async (req: Request, res: Response) => {
    // Envolver el manejo del archivo en una promesa
    await new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err: any) => {
            if (err) {
                return reject(err);
            }
            resolve(null);
        });
    }).catch((err) => {
        return res.status(400).json({ error: err.message });
    });

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
};

// Update news
export const updateNews = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, url_image, title, content } = req.body;
    try {
        const news = await newsModel.findByPk(id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        
        const updatedNews = await newsModel.update({
            user_id,
            url_image,
            title,
            content,
        }, {
            where: { id },
            returning: true
        });
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ error: 'Error updating news' });
    }
}

// Delete news
export const deleteNews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const news = await newsModel.findByPk(id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        
        await newsModel.destroy({
            where: { id }
        });
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting news' });
    }
}