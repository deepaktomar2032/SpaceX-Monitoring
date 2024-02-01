import TableManager from "./TableManager.js";

class SearchManager {
  constructor(searchInput) {
    this.searchBox = document.getElementById(searchInput);
    this.searchBox.addEventListener("keyup", this.showSearchResults.bind(this));
    this.tableManager = new TableManager("myTable");
  }

  showSearchResults() {
    const searchTerm = this.searchBox.value.toLowerCase();
    const rows = this.tableManager.table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      let rowVisible = false;
      for (let j = 0; j < rows[i].cells.length; j++) {
        const cellValue =
          rows[i].cells[j].querySelector(`#spaceshipDetails`).innerHTML;
        if (cellValue.toLowerCase().includes(searchTerm.toLowerCase())) {
          rowVisible = true;
          break;
        }
      }
      rows[i].style.display = rowVisible ? "" : "none";
    }
  }
}

export default SearchManager;
