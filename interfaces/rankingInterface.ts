export enum RankingEnum {
    master = 'master',
    middle = 'middle',
    junior = 'junior'
}

export interface IRanking {
    id?: number;
    user_id: number;
    mount: number;
    ranking_date: Date;
    state: RankingEnum;
    total_investments: number;
}

export interface RankingResponse {
    success: boolean;
    data?: IRanking[];
    message: string;
    error?: string;
}