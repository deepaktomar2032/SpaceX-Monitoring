import TableManager from './TableManager.js'
import SearchManager from './SearchManager.js'

window.onload = () => {
    const tableManager = new TableManager('myTable');
    tableManager.getTableData().then(() => {
        tableManager.createColumns();
        tableManager.createRows();
    })
    new SearchManager('searchInput');
}