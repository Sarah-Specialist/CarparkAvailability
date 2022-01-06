const clickButtonEl = document.querySelector("submit");
const input = document.querySelector("#carparkNumber");


clickButtonEl.addEventListener('click', function(event){
    console.log("button clicked");
    event.preventDefault();

    (async () => {
        const res = await axios.get("https://api.data.gov.sg/v1/transport/carpark-availability");
        console.log("status", res.status);

        // Convert timestamp into date and time outputs
        let timeStamp = res.data.items[0].timestamp
        console.log('TimeStamp: ', timeStamp);

        let dateStamp = timeStamp.slice(0, 10);
        let dateOutput = document.getElementsByClassName('dateOutput');
        dateOutput.innerText = 'dateStamp';
        console.log('Date: ', dateStamp);

        let TimeStamp = timeStamp.slice(11, 16);
        let timeOutput = document.getElementsByClassName('timeOutput');
        timeOutput.innerText = 'TimeStamp';
        console.log('Time: ', TimeStamp);

        const inputString = JSON.stringify(input.value);

        // Extracting selected array
        let dataset = res.data.items[0].carpark_data;
        let filteredCarpark = dataset
        .filter(dataset => dataset.carpark_number === inputString)
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
    })();
});