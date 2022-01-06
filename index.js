/*var requirejs = require('./requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});
*/
const API = require('./instance.js');

(async () => {
    let res = await API.get(`transport/carpark-availability`);
    console.log("status", res.status);


// Convert timestamp into date and time outputs
let timeStamp = res.data.items[0].timestamp
console.log('TimeStamp: ', timeStamp);

let dateStamp = timeStamp.slice(0, 10);
let dateOutput = document.getElementsByClassName('date');
dateOutput.innerText(dateStamp);
console.log('Date: ', dateStamp);

let TimeStamp = timeStamp.slice(11, 16);
let timeOutput = document.getElementsByClassName('time');
timeOutput.innerText(TimeStamp);
console.log('Time: ', TimeStamp);



const clickButtonEl = document.querySelector("submit");
clickButtonEl.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("button clicked");

    // Extracting selected array
    let dataset = res.data.items[0].carpark_data;
    let filteredCarpark = dataset
    .filter(dataset => dataset.carpark_number === 'HLM')
    .map(dataset => dataset.carpark_info);
    console.log(filteredCarpark);
    
    //Extracting information from selected array and inserting extracted value
    let lotsOutput = document.querySelector('.lotsOutput');
    let totalLots = filteredCarpark[0][0].total_lots;
    lotsOutput.innerText(totalLots);
    console.log('Total lots: ', totalLots);

    let typeOutput = document.querySelector('.typeOutput');
    let lotType = filteredCarpark[0][0].lot_type;
    typeOutput.innerText(lotType);
    console.log('Lot type: ', lotType);

    let availableOutput = document.querySelector('.availableOutput');
    let lotsAvailable = filteredCarpark[0][0].lots_available;
    availableOutput.innerText(lotsAvailable);
    console.log('Lots available: ', lotsAvailable);
    });
})();
