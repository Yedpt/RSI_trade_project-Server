// controllers/rankingController.ts
import { Request, Response } from 'express';
import rankingModel from '../models/rankingModel';
import { IRanking, RankingResponse } from '../interfaces/rankingInterface';
import UserModel from '../models/userModel';

export class RankingController {
    public async getRankings(req: Request, res: Response<RankingResponse>) {
        try {
            const rankings = await rankingModel.findAll({
                include: [{
                    model: UserModel,
                    attributes: ['username']
                }],
                order: [
                    ['mount', 'DESC']
                ],
                limit: 10
            });

            const formattedRankings = rankings.map((ranking: any) => ({
                id: ranking.id,
                user_id: ranking.user_id,
                username: ranking.User?.username,
                mount: ranking.mount,
                ranking_date: ranking.ranking_date,
                state: ranking.state,
                total_investments: ranking.total_investments
            }));

            res.status(200).json({
                success: true,
                data: formattedRankings,
                message: "Rankings retrieved successfully"
            });

        } catch (error) {
            console.error('Error in getRankings:', error);
            res.status(500).json({
                success: false,
                message: "Error retrieving rankings",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    // Método para crear un nuevo ranking
    public async createRanking(req: Request, res: Response) {
        try {
            const rankingData: IRanking = req.body;
            const newRanking = await rankingModel.create(rankingData);

            res.status(201).json({
                success: true,
                data: newRanking,
                message: "Ranking created successfully"
            });

        } catch (error) {
            console.error('Error in createRanking:', error);
            res.status(500).json({
                success: false,
                message: "Error creating ranking",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    // Método para actualizar un ranking
    public async updateRanking(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const rankingData: Partial<IRanking> = req.body;

            const ranking = await rankingModel.findByPk(id);
            
            if (!ranking) {
                return res.status(404).json({
                    success: false,
                    message: "Ranking not found"
                });
            }

            await ranking.update(rankingData);

            res.status(200).json({
                success: true,
                data: ranking,
                message: "Ranking updated successfully"
            });

        } catch (error) {
            console.error('Error in updateRanking:', error);
            res.status(500).json({
                success: false,
                message: "Error updating ranking",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    // Método para obtener un ranking específico
    public async getRankingById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ranking = await rankingModel.findByPk(id, {
                include: [{
                    model: UserModel,
                    attributes: ['username']
                }]
            });

            if (!ranking) {
                return res.status(404).json({
                    success: false,
                    message: "Ranking not found"
                });
            }

            res.status(200).json({
                success: true,
                data: ranking,
                message: "Ranking retrieved successfully"
            });

        } catch (error) {
            console.error('Error in getRankingById:', error);
            res.status(500).json({
                success: false,
                message: "Error retrieving ranking",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}

export default new RankingController();