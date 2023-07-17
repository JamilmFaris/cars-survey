const charachteristicAnswer = {
    BODY:   'body',
    SPEED: 'speed',
    COST:  'cost',
    SAFETY:  'safety',
    FUNCTIONALITY:  'functionality',
    FUEL:  'fuel',
    TECHNOLOGY:  'technology'
};
const types = new Map();
types.set("body" , ["sedan", "suv", "coupe", "hatchback"]);
types.set("speed",["city driving", "highway driving", "off-road driving", "racing"]);
types.set("cost", ["x < 200", "1000 < x < 10000", "x > 10000"]);
types.set("safety" ,["very important", "somewhat important", "not important"]);
types.set("functionality" ,["family car", "joyriding", "luxury", "maneuvers"]);
types.set("fuel" , ["very important", "somewhat important", "not important"]);
types.set("technology", ["very important", "somewhat important", "not important"]);
let ages = ['children', 'teen' ,'adult', 'middle age' ,'elderly'];
var currentCharacteristic = charachteristicAnswer.BODY;
var currentType = "sedan";
var labelsData = [];
var myChart;
for(let i = 0;i < 6;i++){
    labelsData.push(0);
}

function updateLabelsDataAccordingToAges(age){
    if(age < 0){}
    else if(age < 13){//child
        labelsData[0] = labelsData[0]+1;
    }
    else if(age < 20){//teen
        labelsData[1] = labelsData[1]+1;
    }
    else if(age < 39){//adult
        labelsData[2] = labelsData[2]+1;
    }
    else if(age < 59){//middle age
        labelsData[3] = labelsData[3]+1;
    }
    else {//60 and above -> elderly
        labelsData[4] = labelsData[4]+1;
    }
}
function getChart(){
    getData(currentCharacteristic);
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ages,
            datasets: [{
                label: 'Car charachteristics according to the owner\'s age',
                data: labelsData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }); 
    return myChart;
}

function updateLabelsDataAccordingToResponseText(responseText, type){
    let jsonResponse = JSON.parse(responseText);
    
    for(let i = 0;i < jsonResponse.length;i++){
        let age = jsonResponse[i]['age'];
        console.log("json type " + type);
        console.log(jsonResponse[i][type]);
        if(type === 'cost'){
            if(currentType === 'x < 200' && jsonResponse[i][type] < 200){
                updateLabelsDataAccordingToAges(age);
            }
            else if(currentType === '1000 < x < 10000' && jsonResponse[i][type] > 1000
                 && jsonResponse[i][type] < 10000){
                updateLabelsDataAccordingToAges(age);
            }
            else if(currentType === 'x > 10000' && jsonResponse[i][type] > 10000){
                updateLabelsDataAccordingToAges(age);
            }
        }
        else{
            if(jsonResponse[i][type] === currentType){
                updateLabelsDataAccordingToAges(age);
            }
        }
    }
    myChart.data.datasets[0].data = labelsData;
    myChart.update();
}
function getData(){
    for(let i = 0;i < 6;i++){
        labelsData[i] = 0;
    }
    if(currentCharacteristic === charachteristicAnswer.BODY){
        var xhr = new XMLHttpRequest();
        var url = 'getTypeAnswer.php';
        var params = 'type=body';
        xhr.open('GET', url + "?" + params);
        xhr.onload = function() {
            if (xhr.status === 200) {
                updateLabelsDataAccordingToResponseText(this.responseText, 'bodyTypeAnswer');
            }
            else {
                let p = document.createElement("p");
                document.body.appendChild(p);
                p.innerHTML = this.responseText;
            }
        };
        xhr.send();
    }
    else if(currentCharacteristic === charachteristicAnswer.SPEED){
        var xhr = new XMLHttpRequest();
        var url = 'getTypeAnswer.php';
        var params = 'type=speed';
        xhr.open('GET', url + "?" + params);
        xhr.onload = function() {
            if (xhr.status === 200) {
                updateLabelsDataAccordingToResponseText(this.responseText, 'favouriteSpeedAnswer');
            }
            else {
                let p = document.createElement("p");
                document.body.appendChild(p);
                p.innerHTML = this.responseText;
            }
        };
        xhr.send();
    }
    else if(currentCharacteristic === charachteristicAnswer.COST){
        var xhr = new XMLHttpRequest();
        var url = 'getTypeAnswer.php';
        var params = 'type=cost';
        xhr.open('GET', url + "?" + params);
        xhr.onload = function() {
            if (xhr.status === 200) {
                let response = JSON.parse(this.responseText);
                
                response.forEach(element => {
                    element['cost'] = (parseInt(element['costRangeMinAnswer']) 
                                        + parseInt(element['costRangeMaxAnswer'])) / 2;
                });
                updateLabelsDataAccordingToResponseText(JSON.stringify(response), 'cost');
            }
            else {
                let p = document.createElement("p");
                document.body.appendChild(p);
                p.innerHTML = this.responseText;
            }
        };
        xhr.send();
    }
    else if(currentCharacteristic === charachteristicAnswer.SAFETY){
        var xhr = new XMLHttpRequest();
        var url = 'getTypeAnswer.php';
        var params = 'type=safety';
        xhr.open('GET', url + "?" + params);
        xhr.onload = function() {
            if (xhr.status === 200) {
                updateLabelsDataAccordingToResponseText(this.responseText, 'carSafetyAnswer');
            }
            else {
                let p = document.createElement("p");
                document.body.appendChild(p);
                p.innerHTML = this.responseText;
            }
        };
        xhr.send();
    }
    else if(currentCharacteristic === charachteristicAnswer.FUNCTIONALITY){
        var xhr = new XMLHttpRequest();
        var url = 'getTypeAnswer.php';
        var params = 'type=functionality';
        xhr.open('GET', url + "?" + params);
        xhr.onload = function() {
            if (xhr.status === 200) {
                updateLabelsDataAccordingToResponseText(this.responseText, 'carFunctionalityAnswer');
            }
            else {
                let p = document.createElement("p");
                document.body.appendChild(p);
                p.innerHTML = this.responseText;
            }
        };
        xhr.send();
    }
    else if(currentCharacteristic === charachteristicAnswer.FUEL){
        var xhr = new XMLHttpRequest();
        var url = 'getTypeAnswer.php';
        var params = 'type=fuel';
        xhr.open('GET', url + "?" + params);
        xhr.onload = function() {
            if (xhr.status === 200) {
                updateLabelsDataAccordingToResponseText(this.responseText, 'fuelConsumptionAnswer');
            }
            else {
                let p = document.createElement("p");
                document.body.appendChild(p);
                p.innerHTML = this.responseText;
            }
        };
        xhr.send();
    }
    else if(currentCharacteristic === charachteristicAnswer.TECHNOLOGY){
        var xhr = new XMLHttpRequest();
        var url = 'getTypeAnswer.php';
        var params = 'type=technology';
        xhr.open('GET', url + "?" + params);
        xhr.onload = function() {
            if (xhr.status === 200) {
                updateLabelsDataAccordingToResponseText(this.responseText, 'carTechnologyAnswer');
            }
            else {
                let p = document.createElement("p");
                document.body.appendChild(p);
                p.innerHTML = this.responseText;
            }
        };
        xhr.send();
    }
}
function updateTypes(){
    
    let optionsHtml = "";
    const currentTypes = [];
    for(const [key, value] of types){
        if(key == currentCharacteristic){
            for(let i = 0;i < value.length;i++){
                currentTypes.push(value[i]);
            }
        }
    }
    
    for (let i = 0; i < currentTypes.length; i++) {
        optionsHtml += '<option value="';
        optionsHtml += currentTypes[i];
        optionsHtml += '">';
        optionsHtml += currentTypes[i];
        optionsHtml += '</option>';
    }
    // Add the options to a <select> element in the DOM
    selectElement = document.getElementById("typeChoices");
    selectElement.innerHTML = optionsHtml;
    currentType = currentTypes[0];
    getData();
}
function charachteristicChanged(){
    
    var selectElement = document.getElementById("charachteristicChoices");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;
    switch (selectedValue) {
      case "body":
        currentCharacteristic = charachteristicAnswer.BODY;
        break;
      case "speed":
        currentCharacteristic = charachteristicAnswer.SPEED;
        break;
      case "cost":
        currentCharacteristic = charachteristicAnswer.COST;
        break;
    case "safety":
        currentCharacteristic = charachteristicAnswer.SAFETY;
        break;
    case "functionality":
        currentCharacteristic = charachteristicAnswer.FUNCTIONALITY;
        break;
    case "fuel":
        currentCharacteristic = charachteristicAnswer.FUEL;
        break;
    case "technology":
        currentCharacteristic = charachteristicAnswer.TECHNOLOGY;
        break;      
      default:
        // Do nothing
        break;
    }
    updateTypes();
}
function typeChanged(){
    var selectElement = document.getElementById("typeChoices");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;
    currentType = selectedValue;
    
    getData();
}
window.addEventListener('load', function() {
    getChart();
  });
charachteristicChanged();

