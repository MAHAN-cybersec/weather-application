const apiKey = "caa6a37313235bc6d76c1cdaf4a4dfcd";

const button = document.getElementById("getWeather");

// Arrow function + Callback
button.addEventListener("click", () => {

    const city = document.getElementById("city").value;

    getWeather(city, displayChart);

});


// Promise function
const fetchWeatherData = (city) => {

    return new Promise((resolve,reject)=>{

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));

    });

};



// Async Await
async function getWeather(city, callback){

    try{

        const data = await fetchWeatherData(city);

        callback(data);

    }

    catch(error){

        console.log("Error:",error);

    }

}


// Callback function to display chart
const displayChart = (data) => {

    const temps = data.list.slice(0,8).map(item => item.main.temp);
    const times = data.list.slice(0,8).map(item => item.dt_txt);

    const ctx = document.getElementById("weatherChart");

    new Chart(ctx,{
        type:'line',

        data:{
            labels:times,
            datasets:[{
                label:'Temperature °C',
                data:temps,
                borderWidth:2
            }]
        },

        options:{
            responsive:true
        }

    });

};