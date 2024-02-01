const requestParams = {
    headers: {
        Accept: 'application/json',
        method: 'GET'
    },
};

const getMonitoringData = async (req, res) => {

    let spaceData;
    const url = 'https://api.spacexdata.com/v5/launches/';
    try {
        spaceData = await fetch(url, requestParams);
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Could not fetch data from API' });
    }

    const spaceDataParsed = await spaceData.json();
    return res.status(200).json(spaceDataParsed);
};

module.exports = getMonitoringData;