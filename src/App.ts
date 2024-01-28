import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import GetMonitoringData from './GetMonitoringData.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3003;

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.send();
});

app.get('/getData', (req: Request, res: Response) => {
    return GetMonitoringData(req, res);
});

app.listen(port, () => {
    console.log(`Server is up & running at http://localhost:${port}`);
});

export default app;