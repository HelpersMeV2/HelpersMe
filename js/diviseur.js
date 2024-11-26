const Drops = document.getElementById('Drops')
const Entity = document.getElementById('Entity')
const Rdps = document.getElementById('Rdps')
const Seperateur = document.getElementById('Seperateur')

const RdpsInEntity = document.getElementById('RdpsInEntity')
const AllDivisuerRdpsInEntity = document.getElementById('AllDivisuerRdpsInEntity')

function Diviseur(id) {
	const Profiles = document.getElementById(`Profiles_${id}`)
	const All = document.getElementById(`All_${id}`)
	const profilesValue = Profiles.value
	const allValue = All.value
	const dropsValue = Drops.value

	if (profilesValue == '' || allValue == '' || id == '') {
		alert("Empty inputs / textarea")
	} else {
		profilesArr = getArraySplited(profilesValue,"\n")
		allArr = getArraySplited(allValue,"\n")

		sortAll = []

		for (var i = 0; i < allArr.length; i++) {
			profileTag = allArr[i]
			profilesTagArr = getArraySplited(profileTag,"\t")
			sortAll.push(profilesTagArr)
		}

		const filteredArr = sortAll.filter(item => profilesArr.includes(item[0]));

	    const profilesArray = [];
	    const tagsArray = [];

	    filteredArr.forEach(item => {
	        profilesArray.push(item[0]);
	        tagsArray.push(item[1]);
	    });

	    profilesArrayDivised = splitArrayIntoSubarrays(profilesArray,dropsValue)
	    tagsArrayDivised = splitArrayIntoSubarrays(tagsArray,dropsValue)

	    for (var i = 0; i < dropsValue; i++) {
	    	innerHtmlMulti(i,id,arrayToString(profilesArrayDivised[i]),"Profiles")
	    	innerHtmlMulti(i,id,arrayToString(tagsArrayDivised[i]),"Tags")
	    }
	   	
	}
}	

Drops.addEventListener('input', function() {
    const inputValue = Drops.value;

    if (inputValue<1) {
    	Drops.value = 1
    }
});

Rdps.addEventListener('input', function() {
    const inputValue = Rdps.value;
    if (inputValue<1) {
    	Rdps.value = 1
    }
    entityValue = Entity.value
    if (entityValue == '') {
    	alert('Enter Name Of Entity')
    } else {
    	rdpsValue = Rdps.value
    	RdpsInEntity.innerHTML = ''
   	    for (var i = 0; i < rdpsValue; i++) {
	    	innerHTMLRdps(entityValue,i)
	    }
    }
});

function innerHtmlMulti(numberOfDepot,id,value,type) {
	const ResultId = document.getElementById(`result_${id}`)
	numberOfDepot++
	const inner = `<div>
		  	<label  class="d-flex align-items-center justify-content-between" for="${id}_${numberOfDepot}_${type}">
			  	${id} Depot ${numberOfDepot} : ${type}
			  	<span class = "btn btn-info" onclick="copyFromThis('${id}_${numberOfDepot}_${type}')">
			  		Copy
			  	</span>
			  	<i class="fa fa-download btn btn-success" onclick="downloadToTxt('${id}_${numberOfDepot}_${type}','${numberOfDepot}')"></i>
		  	</label>
		  	<textarea class="form-control my-2" readonly="readonly" id="${id}_${numberOfDepot}_${type}">${value}</textarea>
		</div>`
	ResultId.innerHTML += inner 
}
function innerHTMLRdps(entityName, numberOfRdp) {
	numberOfRdp++
	const innerBtn = `<div class="d-flex justify-content-center gap-3 my-2">
		<button type="button" onclick="show('${entityName}_Rdp${numberOfRdp}')" class="btn btn-warning">${entityName} Rdp${numberOfRdp}</button>
	</div>`
	const innerDiviser = `<div class="AllDivisuerRdpsInEntity" id="${entityName}_Rdp${numberOfRdp}" style="display: none !important;">
		<span class="d-flex w-100 justify-content-center">${entityName}_Rdp${numberOfRdp}</span><br>
		<div class="d-flex justify-content-evenly flex-wrap">
			<div>
			  <label for="Profiles">Profiles Connected</label>
			  <textarea class="form-control" placeholder="Leave a Profiles Connected here" id="Profiles_${entityName}_Rdp${numberOfRdp}"></textarea>
			</div>

			<div>
			  <label for="All">All Profiles + All Tags</label>
			  <textarea class="form-control" placeholder="Leave a All Profiles + All Tags here" id="All_${entityName}_Rdp${numberOfRdp}"></textarea>
			</div>
		</div>

		<div class="d-flex justify-content-center gap-3 my-2">
			<button type="button" onclick="Diviseur('${entityName}_Rdp${numberOfRdp}')" class="btn btn-info">Diviseur</button>
		</div>
		<div class="d-flex justify-content-evenly flex-wrap gap-3 container" id="result_${entityName}_Rdp${numberOfRdp}"></div>
	</div>`
	RdpsInEntity.innerHTML += innerBtn 
	AllDivisuerRdpsInEntity.innerHTML += innerDiviser 
}
function splitArrayIntoSubarrays(arr, divisor) {
    const result = [];
    const len = arr.length;
    const subarraySize = Math.floor(len / divisor);
    let startIndex = 0;

    for (let i = 0; i < divisor - 1; i++) {
        const endIndex = startIndex + subarraySize;
        result.push(arr.slice(startIndex, endIndex));
        startIndex = endIndex;
    }

    // Push the remaining elements into the last subarray
    result.push(arr.slice(startIndex));

    return result;
}
function copyFromThis(id){
	const textarea = document.getElementById(id)
	copyToClipboard(textarea)
}
function downloadToTxt(id,numberOfDepot) {
	const textarea = document.getElementById(id)
	textareaValue = textarea.value
	textareaArray = getArraySplited (textareaValue, '\n')
    const content = textareaArray.join(";");		
    fileName = `file_${numberOfDepot}.txt`
	downloadFile(content, fileName, "text/plain");
}

function show(id) {
	const AllDivisuerRdpsInEntityByCN = document.getElementsByClassName('AllDivisuerRdpsInEntity')
	const DivisuerRdpInEntity = document.getElementById(id)

	for (var i = 0; i < AllDivisuerRdpsInEntityByCN.length; i++) {
		AllDivisuerRdpsInEntityByCN[i].setAttribute('style','display: none !important')
	}
	DivisuerRdpInEntity.removeAttribute('style')
}

function generateZip() {
    const entityName = Entity.value;
    const dropsValue = Drops.value;
    const rdpsValue = Rdps.value;
    const separatorValue = Seperateur.value;

    textareasContents = [];

    // Loop through drops and rdps to gather textarea contents
    for (let i = 0; i < dropsValue; i++) {
        let textareaContent = '';
        for (let j = 0; j < rdpsValue; j++) {
            const textarea = document.getElementById(`${entityName}_Rdp${j + 1}_${i + 1}_Tags`);
            const textareaValue = textarea.value;
            const textareaValueArr = textareaValue.split("\n");
            const textareaContentJoined = textareaValueArr.join(separatorValue);
            textareaContent += textareaContentJoined + separatorValue;
        }
		file = { 
			name: `file_${i+1}.txt`, 
			content: textareaContent
		}
		textareasContents.push(file)
    }

	// Créer une nouvelle instance de JSZip
    const zip = new JSZip();

    // Ajouter chaque fichier au zip avec le contenu spécifié
    textareasContents.forEach(file => {
        zip.file(file.name, file.content.replace(/\\n/g, '\n'));
    });

    // Générer le fichier zip et le déclencher pour téléchargement
    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            // Créer un lien pour le téléchargement
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `${entityName}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
}

function getProfiles() {
 	const entityName = Entity.value;
    const dropsValue = Drops.value;
    const rdpsValue = Rdps.value;

    textareasContents = [];

    // Loop through drops and rdps to gather textarea contents
    for (let i = 0; i < rdpsValue; i++) {
        let textareaContentRdp = []
        for (let j = 0; j < dropsValue; j++) {
            const textarea = document.getElementById(`${entityName}_Rdp${i + 1}_${j + 1}_Profiles`);
            const textareaValue = textarea.value;
            textareaContentRdp.push(textareaValue)
        }
        textareasContents.push(textareaContentRdp)
    }
    console.log(textareasContents)
}