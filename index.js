// ES6로 시작
// API_KEY 발급받아 사용하면 됨 (아래 임의의 key값 작성해둠)
const API_KEY = "ej2ejfli2aawpg834";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const error404 = document.querySelector(".not-found");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const wind = document.querySelector(".wind");

const mapImageSrc = (main) => {
    let imageSrc;

    switch(main) {
        case "Clear": 
            imageSrc = "./images/clear.png";
            break;
        case "Rain":
            imageSrc = "./images/rain.png";
            break;
        case "Snow":
            imageSrc = "./images/snow.png";
            break;
        case "Clouds":
            imageSrc = "images/cloud.png";
            break;
        case "Mist":
            imageSrc = "images/mist.png";
            break;
        default:
            imageSrc = "";
    }
    
    return imageSrc;
}

search.addEventListener("click", async() => {
    const city = document.querySelector(".search-box input").value;
    
    if(city.length === 0){
        console.warn("비어있습니다");
        return;
    }

    try{
        //요청 성공시
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        console.log(data);

        const {cod} = data;

        //만약에 데이터가 없다면
        // 404 화면을 띄워준다
        if(cod === "404"){
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");

            return;
        }

        error404.style.display = "none";
        error404.classList.remove("fadeIn");
        
        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");

        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        const { 
            main = {},
            weather = [],
            wind: windData,

        } = data;
        console.log(data);
        image.src = mapImageSrc(weather[0].main);

        temperature.innerHTML = `${main.temp}`;
        description.innerHTML = `${weather[0].description}`;
        humidity.innerHTML = `${main.humidity}%`;
        wind.innerHTML = `${windData.speed}`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";

    }catch(error){
        //요청 실패시
        console.warn(error);
    }

});
