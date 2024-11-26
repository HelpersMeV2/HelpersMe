function getArraySplited (inputValue, seperateur){
	inputValueArray = inputValue.split(seperateur)
	if (inputValueArray[inputValueArray.length - 1] == '') {
		inputValueArray.pop()
	}
	return inputValueArray
}

function arrayToString(array,seperateur = "\n") {
	string = ""
	for (var i = 0; i < array.length; i++) {
		if (i == array.length-1) {	
			string += array[i]
		} else {
			string += array[i] + seperateur
		}
	}
	return string
}

function copyToClipboard(textarea) {

    // Select the textarea's content
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the textarea to the clipboard
    document.execCommand("copy");
}

function createExcel(nameFile, dataArray) {
	if (nameFile == "AllLog") {
		let allData = [];

        // Process each named array
        for (const [name, array] of Object.entries(dataArray)) {
            // Add the array name as a row
            allData.push({ Profile: name});

            // Add the data rows
            array.forEach(item => {
                allData.push({ Profile: item});
            });
        }

        // Create a new workbook and add a sheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(allData);

        // Append the sheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Write the workbook to a file
        XLSX.writeFile(wb, 'AllLog.xlsx');	
	} else if (nameFile == "Tags") {
		const data = dataArray.map(item => {
	        return { Tag: item };
	    });

	    // Create a new workbook and add a sheet
	    const wb = XLSX.utils.book_new();
	    const ws = XLSX.utils.json_to_sheet(data);

	    // Append the sheet to the workbook
	    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	    nameFile = nameFile+".xlsx"

	    // Write the workbook to a file
	    XLSX.writeFile(wb, nameFile);
	} else {
	    const data = dataArray.map(item => {
	        return { Profile: item };
	    });

	    // Create a new workbook and add a sheet
	    const wb = XLSX.utils.book_new();
	    const ws = XLSX.utils.json_to_sheet(data);

	    // Append the sheet to the workbook
	    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	    nameFile = nameFile+".xlsx"

	    // Write the workbook to a file
	    XLSX.writeFile(wb, nameFile);
    }
}

function downloadFile(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}		