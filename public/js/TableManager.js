import lang from './../json/lang.json' assert { type: "json" };

class TableManager {
  constructor(tableId) {
    this.table = document.getElementById(tableId);
    this.getTableData().then(() => {
      this.createColumns();
      this.createRows(this.monitoringData);
    })
  }

  async getTableData() {
    const requestParams = {
      headers: {
        Accept: 'application/json',
        method: "GET"
      },
    };

    let response = null;
    try {
      response = await fetch('/getData', requestParams);
    } catch (error) {
      console.log("something went wrong");
    }
    this.monitoringData = await response.json();
    console.log('monitoringData', this.monitoringData);
  }

  createColumns() {

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    const headerColumns = [lang["en"].All, lang["en"].Successfull, lang["en"].Upcoming, lang["en"].Failed];

    for (var i = 0; i < headerColumns.length; i++) {
      var th = document.createElement("th");
      th.style.color = 'black';
      th.textContent = headerColumns[i];
      th.dataset.column = headerColumns[i].toLowerCase();
      th.onclick = function () {

        highlightColumn(this.dataset.column);

        function highlightColumn(column) {
          var headers = document.querySelectorAll("th");
          headers.forEach(function (header) {
            header.classList.remove("selected");
          });

          var clickedHeader = document.querySelector("th[data-column='" + column + "']");
          clickedHeader.classList.add("selected");

          var cells = document.querySelectorAll("td[data-column='" + column + "']");
          cells.forEach(function (cell) {
            cell.classList.add("selected");
          });
        }
      };
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    this.table.appendChild(thead);
  }

  createRows(monitoringData, filter = lang["en"].All) {
    for (let data of monitoringData) {
      let newRow, cell;
      newRow = this.table.insertRow();
      cell = newRow.insertCell();
      cell.colSpan = 4;
      cell.appendChild(this.getCellData(data, filter));
    }
  }

  getCellData(data, filter) {

    let contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';

    let spaceShipImageUrl = data.links.patch.small;
    let image = document.createElement('img');
    image.src = spaceShipImageUrl || './../img/spaceship.png'
    contentContainer.appendChild(image);

    let spaceShipName = data.name;
    let heading = document.createElement('h2');
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
    if (data.upcoming == false && data.success == false) {
      launchStatus = lang['en'].Failed;
      smallText1.style.color = 'red';
      failedReason = data.details;
    } else if (data.upcoming == false && data.success == true) {
      launchStatus = lang['en'].Successfull;
      smallText1.style.color = 'Lime';
    } else {
      launchStatus = lang['en'].Upcoming;
      smallText1.style.color = 'Blue';
    }

    smallText1.textContent = launchStatus + " " + lang['en'].Launch;
    smallText1.className = 'small-text';

    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(smallText1);

    if (launchStatus == lang['en'].Failed) {
      let smallText2 = document.createElement('span');
      smallText2.textContent = lang['en'].Failed_Reason + ": " + failedReason;
      smallText2.className = 'small-text';
      contentContainer.appendChild(document.createElement('br'));
      contentContainer.appendChild(smallText2);
    }

    let launchDate = new Date(data.date_utc);
    launchDate.toString();

    let smallText3 = document.createElement('span');
    smallText3.textContent = lang['en'].Launch_Date + ": " + launchDate;
    smallText3.className = 'small-text';

    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(smallText3);

    return contentContainer;
  }
}

export default TableManager;