# SpaceX-Monitoring


# Run following commands to install the dependencies & run the project
- `npm i`
- `npm start` (Make sure port 8000 on your local machine isn't being used by some service, if so update the port no. in server.js & retry)
- npm run test (To run the test cases)
- Open http://localhost:8000/ or http://127.0.0.1:8000/ or http://<Your private IP>:8000/


# Project Folder Structure
- src (Backend)
    - index.js - Entry point of server
    - server.js - Helps to create server
    - routes.js - create routes
    - controller/
        - has controller required to serve the request
    - utils/
        - has common modules used through out the project
- tests (Test folder)
    - app.test.js - To manage test cases

- public (Frontend)
    - index.html - Entry point html file
    - js/index.js - Entry point javascript file that initializes TableManager
    - js/TableManager.js - To manage the complete UI table including filters
    - js/SearchManager.js - To manage the search box


# Flow & API End point
- Front-end hits a backend api /api/data
- Back-end hits SpaceX api end point ie https://api.spacexdata.com/v5/launches/, fetches data & respond to Front-end
- Front-end receives the data & renders it in a table


# Data shown & features on Front-end side
- By default it shows details of all spaceX launches
- There are 4 categories/filters available, all launches are divided into
    - All
    - Successful
    - Upcoming
    - Failed
- Details shown about each
    - Rocket image
    - Rocket detail
    - Link to Wikipedia (If any)
    - Link to Reddit (If any)
    - Link to Youtube (If any)
    - Launch Status
    - Launch Date
    - Reason (In case of failed launch)

    
# Search and Filtering abilities (successful launches, future launches, rocket information, etc.)
- All these launches can be filtered & seen by clicking on respective launch status heading
- Search option is available & is able to search by Rocket detail
- Search option also allows us to search in filtered list (Successful + Rocket detail) by going in that tab & search