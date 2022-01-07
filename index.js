const clickButtonEl = document.getElementById("submit");

function handleClickEvent(event) {
    event.preventDefault();

    (async () => {
        const res = await axios.get("https://api.data.gov.sg/v1/transport/carpark-availability");
        console.log("status", res.status);

        // Print carpark number
        const input = document.getElementById("carparkNumber");

        let numberOutput = document.getElementById("numberOutput")
        numberOutput.innerText = input.value;

        // Convert timestamp into date and time outputs
        let timeStamp = res.data.items[0].timestamp;

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
        let filteredCarpark = dataset.filter(function(dataset) {
           if (dataset.carpark_number === input.value) {
               return dataset;
           };
        })

        let carparkInfo = filteredCarpark.map(e => {
            return e.carpark_info;
        })
    
        //Extracting information from selected array and inserting extracted value
        let infoString = JSON.stringify(carparkInfo);
        
        let lotsOutput = document.getElementById('lotsOutput');
        let totalLots = (infoString.slice(15, 22)).replace(/[^0-9]/g, '');
        lotsOutput.innerText = totalLots;
        console.log('Total lots: ', totalLots);

        let typeOutput = document.getElementById('typeOutput');
        let lotType = (infoString.slice(32, 36)).replace(/[^a-zA-Z ]/g, "");
        typeOutput.innerText = lotType;
        console.log('Lot type: ', lotType);

        let availableOutput = document.getElementById('availableOutput');
        let lotsAvailable = (infoString.slice(50,60)).replace(/[^0-9]/g, '');
        availableOutput.innerText = lotsAvailable;
        console.log('Lots available: ', lotsAvailable);
    })();
};
