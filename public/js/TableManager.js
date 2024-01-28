class TableManager {
  constructor(tableId) {
    this.table = document.getElementById(tableId);
  }

  async getTableData() {
    const requestParams = {
      headers: {
        Accept: 'application/json',
        method: 'GET'
      },
    };

    let response = null;
    try {
      response = await fetch('/getData', requestParams);
    } catch (error) {
      console.log('something went wrong');
    }
    this.monitoringData = await response.json();
  }

  createColumns() {
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let headerRow = document.createElement('tr');
    const headerColumns = ['All', 'Successful', 'Upcoming', 'Failed'];

    for (let i = 0; i < headerColumns.length; i++) {
      let th = document.createElement('th');
      th.style.color = 'black';
      th.textContent = headerColumns[i];
      th.dataset.column = headerColumns[i].toLowerCase();
      th.addEventListener('click', this.highlightColumn.bind(this, th.dataset.column));
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    this.table.appendChild(thead);
    this.table.appendChild(tbody);
    this.highlightColumn('all');
  }

  highlightColumn(column) {
    let headers = document.querySelectorAll('th');
    headers.forEach(function (header) {
      header.classList.remove('selected');
    });

    let clickedHeader = document.querySelector(`th[data-column= ${column} ] `);
    clickedHeader.classList.add('selected');

    let cells = document.querySelectorAll(`td[data-column= ${column} ]`);
    cells.forEach(function (cell) {
      cell.classList.add('selected');
    });
    this.createRows(column);
    document.getElementById('searchInput').value = '';
  }

  deleteRows() {
    let rows = this.table.rows;
    for (let i = rows.length - 1; i > 0; i--) {
      let row = rows[i];
      row.parentNode.removeChild(row);
    }
  }

  createRows(filter = 'all') {
    this.deleteRows();
    let filteredArray;
    switch (filter) {
      case 'all':
        filteredArray = this.monitoringData;
        break;
      case 'successful':
        filteredArray = this.monitoringData.filter(data => data.success == true);
        break;
      case 'upcoming':
        filteredArray = this.monitoringData.filter(data => data.upcoming == true);
        break;
      case 'failed':
        filteredArray = this.monitoringData.filter(data => data.success == false);
        break;
    }

    for (let data of filteredArray) {
      let newRow, cell;
      let tbodyRef = this.table.getElementsByTagName('tbody')[0];
      newRow = tbodyRef.insertRow();
      cell = newRow.insertCell();
      cell.colSpan = 4;
      cell.appendChild(this.getCellData(data));
    }
  }

  getCellData(data) {

    let contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';
    contentContainer.className = 'content-container';

    let spaceShipImageUrl = data.links.patch.small;
    let image = document.createElement('img');
    image.src = spaceShipImageUrl || './../img/spaceship.png'
    contentContainer.appendChild(image);

    let spaceShipName = data.name;
    let heading = document.createElement('h2');
    heading.id = 'spaceshipDetails';
    heading.textContent = spaceShipName;
    heading.style.color = 'black';
    contentContainer.appendChild(heading);
    contentContainer.appendChild(document.createElement('br'));

    let icons = document.createElement('div');
    icons.className = 'icon-container';

    let spaceShipWikiUrl, spaceShipRedditUrl, spaceShipYoutubeUrl;
    if (data.links.wikipedia != null) {
      spaceShipWikiUrl = data.links.wikipedia;
      let iconWiki = document.createElement('img');
      iconWiki.src = './../img/wikipedia.png';
      iconWiki.onclick = () => window.open(spaceShipWikiUrl, '_blank');
      icons.appendChild(iconWiki);
    }

    if (data.links.reddit.launch != null) {
      spaceShipRedditUrl = data.links.reddit.launch;
      let iconReddit = document.createElement('img');
      iconReddit.src = './../img/reddit.png';
      iconReddit.onclick = () => window.open(spaceShipRedditUrl, '_blank');
      icons.appendChild(iconReddit);
    }

    if (data.links.webcast != null) {
      spaceShipYoutubeUrl = data.links.webcast;
      let iconYoutube = document.createElement('img');
      iconYoutube.src = './../img/youtube.png';
      iconYoutube.onclick = () => window.open(spaceShipYoutubeUrl, '_blank');
      icons.appendChild(iconYoutube);
    }

    contentContainer.appendChild(icons);

    let smallText1 = document.createElement('span');
    let launchStatus, failedReason;
    if (data.success == false) {
      launchStatus = 'Failed';
      smallText1.style.color = 'red';
      failedReason = data.details;
    } else if (data.success == true) {
      launchStatus = 'Successful';
      smallText1.style.color = 'Lime';
    } else if (data.upcoming == true) {
      launchStatus = 'Upcoming';
      smallText1.style.color = 'Blue';
    }

    smallText1.textContent = `${launchStatus} Launch`;
    smallText1.className = 'small-text';

    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(smallText1);

    if (launchStatus == 'Failed') {
      let smallText2 = document.createElement('span');
      smallText2.textContent = `Failure Details: ${failedReason}`;
      smallText2.className = 'small-text';
      contentContainer.appendChild(document.createElement('br'));
      contentContainer.appendChild(smallText2);
    }

    let launchDate = new Date(data.date_utc);
    launchDate.toString();

    let smallText3 = document.createElement('span');
    smallText3.textContent = `Launch Date: ${launchDate}`;
    smallText3.className = 'small-text';

    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(smallText3);

    return contentContainer;
  }
}

export default TableManager;