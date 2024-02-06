import { rankingService } from "../services/ranking.service.js"

export default async function getRankings (req, res) {
    try {
        const ranking = await rankingService.getAll();
        return res.status(200).send(ranking)
    } catch (error) {
        return res.status(500).send(error)
    }
}
