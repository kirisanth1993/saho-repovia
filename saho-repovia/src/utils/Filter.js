export const filterRowAction = (rows, filters) => {
    var filteredRow = [];
    rows.map(function (singleRowData) {
        var found = false;
        for ( var filterColumnIndex = 0; filterColumnIndex < filters.filterColumns.length; filterColumnIndex++) {
            if (filters.filterLogic === "or" && singleRowData[filters.filterColumns[filterColumnIndex]] && singleRowData[filters.filterColumns[filterColumnIndex]].toString().toLowerCase().includes(filters.filterTerm.toLowerCase())){
                found = true;
                break;
            }else if (filters.filterLogic === "and") {
                if (singleRowData[filters.filterColumns[filterColumnIndex]].toString().toLowerCase().includes(filters.filterTerm.toLowerCase())) {
                    found = true;
                }else if (!singleRowData[filters.filterColumns[filterColumnIndex]].toString().toLowerCase().includes(filters.filterTerm.toLowerCase())){
                    found = false;
                    break;
                }
            }
        }

        if (found) {
            filteredRow.push(singleRowData);
        }
    });
    return filteredRow;
};