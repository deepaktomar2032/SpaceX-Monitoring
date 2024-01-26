import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3003;

app.use(express.static('public'));

app.get("/", (req: Request, res: Response) => {
    res.send();
});

app.listen(port, () => {
    console.log(` Server is up & running at http://localhost:${port}`);
});