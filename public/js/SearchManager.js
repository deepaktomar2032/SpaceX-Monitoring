import TableManager from "./TableManager.js";

class SearchManager {
    constructor(searchInput) {
        this.searchBox = document.getElementById(searchInput);
        this.searchBox.addEventListener("keyup", this.showSearchResults);
        this.getSearchData();
    }

    getSearchData() {
        const data = TableManager.getMonitoringData();
    }

    showSearchResults() {
        console.log('hello how are you');
    }
}

export default SearchManager;