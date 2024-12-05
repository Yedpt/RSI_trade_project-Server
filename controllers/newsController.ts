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

export const createNews = async (req: Request, res: Response) => {
    const { user_id, url_image, title, content } = req.body;
    try {
        const news = await newsModel.create({
            user_id,
            url_image,
            title,
            content,
        });
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}
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
          