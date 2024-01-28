import { Request, Response } from 'express';
import fetch from 'node-fetch';

const requestParams = {
    headers: {
        Accept: 'application/json',
        method: 'GET'
    },
};

const GetMonitoringData = async (req: Request, res: Response) => {

    let spaceData = null;
    const url = 'https://api.spacexdata.com/v5/launches/';

    try {
        spaceData = await fetch(url, requestParams);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Could not fetch data from API' });
    }

    const spaceDataParsed = await spaceData.json();
    
    return res.json(spaceDataParsed);

}

export default GetMonitoringData;