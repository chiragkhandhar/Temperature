window.addEventListener('load', () => {
    let long;
    let lat;
    let locationName = document.querySelector(".location-name");
    let locationRegion = document.querySelector(".location-region");
    let locationTimeZone = document.querySelector(".location-timezone");
    let locationLocalTime = document.querySelector(".location-localtime");

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");

    let weatherIcon = document.querySelector(".icon");
    let degreeSection = document.querySelector(".degree-section");
    let degreeSpan = document.querySelector(".temperature-symb");
    let locationBtn = document.querySelector(".getLocation");
    let errorBox = document.querySelector(".errorBox");
    let tempPill = document.querySelector(".tempPill");
    let humidityLab = document.querySelector(".humidity");
    tempPill.textContent = "Fahrenite";

    let searchInput=document.querySelector(".search-box");
    errorBox.hidden = true;

    searchInput.addEventListener('keypress', (evt) => 
    {
        if (evt.keyCode == 13)
        {   
            console.log('Enter Pressed' + 'Text: ' + searchInput.value)
            const api = `${proxy}http://api.weatherstack.com/current?access_key=${key}&query=${searchInput.value}`;
            callAPI(api)
            searchInput.value = ''
        }
        
    })

    const getGeoLocation = () =>
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const api = `${proxy}http://api.weatherstack.com/current?access_key=${key}&query=${lat},${long}`;

                callAPI(api);
            });

        }
    }

    getGeoLocation()
    
    const key = '7834fd4e3be2f0300356603b771ee2db';
    const proxy = ''
    const proxy1='https://cors-anywhere.herokuapp.com/';

    const callAPI = api => {
        console.log("callAPI clicked.")
        fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                errorBox.hidden = true;
                console.log(data);
                const { temperature, weather_descriptions, weather_icons, humidity } = data.current;
                const { name, region, localtime, timezone_id } = data.location;

                temperatureDegree.textContent = temperature;
                humidityLab.textContent = humidity + ' %';
                temperatureDescription.textContent = weather_descriptions;
                weatherIcon.innerHTML = `<img src=\"${weather_icons}\" width=\"64px\" height=\"64px\">`;


                locationName.textContent = name + ', ' + region;
                locationLocalTime.textContent = localtime;
                locationTimeZone.textContent = timezone_id;

                let Fahrenite = (temperature * (9 / 5)) + 32;
                degreeSection.addEventListener('click', () => {
                    if (degreeSpan.textContent === "C") {
                        temperatureDegree.textContent = Math.floor(Fahrenite);
                        degreeSpan.textContent = "F";
                        tempPill.textContent = "Celsius";
                    } else {
                        temperatureDegree.textContent = temperature;
                        degreeSpan.textContent = "C";
                        tempPill.textContent = "Fahrenite";
                    }
                });

            })
            .catch(err => {
                console.log(`Error| ${err}`);
                errorBox.hidden = false;
            });;
    }

    locationBtn.addEventListener('click', () => {
        getGeoLocation()
    });

    
});


