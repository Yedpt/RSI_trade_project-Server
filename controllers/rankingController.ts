// controllers/rankingController.ts
import { Response } from 'express';
import RankingModel from '../models/rankingModel';
import { IUserRequest } from '../interfaces/userInterface';
import UserModel from '../models/userModel';
import { Op } from 'sequelize';

export const getRankingData = async (req: IUserRequest, res: Response) => {
    try {
        const rankings = await RankingModel.findAll({
            attributes: ['id', 'user_id', 'mount', 'ranking_date', 'state', 'total_investments'],
            order: [['mount', 'DESC']],
            limit: 10,
            include: [{
                model: UserModel,
                attributes: ['username']
            }]
        });

        let userData = null;
        if (req.user?.id) {
            const userRanking = await RankingModel.findOne({
                where: { user_id: req.user.id },
            });

            const userPosition = await RankingModel.count({
                where: {
                    mount: {
                        [Op.gt]: userRanking?.mount || 0,
                    },
                },
            });

            userData = {
                position: userPosition + 1,
                rankingData: userRanking,
            };
        }

        res.json({
            success: true,
            data: {
                rankings,
                userData
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching ranking data'
        });
    }
};

export const createRanking = async (req: IUserRequest, res: Response) => {
    try {
        const { mount, state, total_investments } = req.body;
        const user_id = req.user?.id;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const newRanking = await RankingModel.create({
            user_id,
            mount,
            state,
            total_investments,
            ranking_date: new Date()
        });

        return res.status(201).json({
            success: true,
            data: newRanking
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating ranking entry'
        });
    }
};
export default {
    getRankingData,
    createRanking
};
