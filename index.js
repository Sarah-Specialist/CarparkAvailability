const clickButtonEl = document.getElementById("submit");

function handleClickEvent(event) {
    console.log("button clicked");
    event.preventDefault();

    (async () => {
        const res = await axios.get("https://api.data.gov.sg/v1/transport/carpark-availability");
        console.log("status", res.status);

        // Print carpark number
        const input = document.getElementById("carparkNumber");
        //const inputString = JSON.stringify(input.value);

        let numberOutput = document.getElementById("numberOutput")
        numberOutput.innerText = input.value;

        // Convert timestamp into date and time outputs
        let timeStamp = res.data.items[0].timestamp;
        console.log('TimeStamp: ', timeStamp);

        let dateStamp = timeStamp.slice(0, 10);
        let dateOutput = document.getElementById('dateOutput');
        dateOutput.innerText = dateStamp;
        console.log('Date: ', dateStamp);

        let TimeStamp = timeStamp.slice(11, 16);
        let timeOutput = document.getElementById('timeOutput');
        timeOutput.innerText = TimeStamp;
        console.log('Time: ', TimeStamp);

        // Extracting selected array
        let dataset = res.data.items[0].carpark_data;
        console.log(dataset);
        let filteredCarpark = dataset.fetch();
        filteredCarpark.filter(dataset, carpark_number) {
            return new Promise((resolve) => {
                resolve dataset.filter((dataset) => dataset[carpark_number] === input));
            }
        }
        database.filter("carpark_number", input);


        .map(dataset => dataset.carpark_info);
        console.log(filteredCarpark);
    
        //Extracting information from selected array and inserting extracted value
        let lotsOutput = document.getElementById('lotsOutput');
        let totalLots = filteredCarpark[0][0].total_lots;
        lotsOutput.innerText(totalLots);
        console.log('Total lots: ', totalLots);

        let typeOutput = document.getElementById('typeOutput');
        let lotType = filteredCarpark[0][0].lot_type;
        typeOutput.innerText(lotType);
        console.log('Lot type: ', lotType);

        let availableOutput = document.getElementById('availableOutput');
        let lotsAvailable = filteredCarpark[0][0].lots_available;
        availableOutput.innerText(lotsAvailable);
        console.log('Lots available: ', lotsAvailable);
    })();
};