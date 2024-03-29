import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js"
import urlsRoutes from "./routes/urls.routes.js"
import rankingRoutes from "./routes/ranking.routes.js"

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(urlsRoutes);
app.use(rankingRoutes);



const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})