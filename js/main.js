
let input = document.getElementById("cityName");
input.addEventListener("keyup", function(e) {
if (e.keyCode === 13) {
    getWeather();
}
});

function getWeather(){
    //refresh 
    $('.weatherResponse').html('');
    $('#tempResponse').html('');
    $('#namecountryResponse').html('');
    $('#situationResponse').html('')
    $('#iconResponse').html('');
    $('#tempResponse').html('');
    $('#windSpeedResponse').html('');
    $('#windDegreeResponse').html('');
    $('#tempMin-right').html('');
    $('#tempMin-left').html('');
    $('#tempMax-right').html('');
    $('#tempMax-left').html('');
    $('#humidity-right').html('');
    $('#humidity-left').html('');
    $('#pressure-right').html('');
    $('#pressure-left').html('');
    $('#sunrise-right').html('');
    $('#sunrise-left').html('');
    $('#sunset-right').html('');
    $('#sunset-left').html('');

    let cityName = $('#cityName').val();
    let apiCall = 'http://api.openweathermap.org/data/2.5/weather?q='  + cityName + '&appid=9f51939407a11140208dec86971ef8b7&units=metric';

    $.getJSON(apiCall,weatherCallback);

    function weatherCallback(weatherData){
        let cityName = weatherData.name;
        let country = weatherData.sys.country;
        $('#namecountryResponse').append(cityName + "," + country );
        let iconcode = weatherData.weather[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#iconResponse').attr('src', iconurl);
        let description = weatherData.weather[0].description;
        let day;
        switch (new Date().getDay()) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thu";
            break;
        case 5:
            day = "Fri";
            break;
        case  6:
            day = "Sat";
        }
        let time= new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
        let dateTime = day+', '+time+',';
        $('#situationResponse').append(dateTime + description);
        let temp = Math.round(weatherData.main.temp);
        $('#tempResponse').append(temp+ '&deg;');
        let windspeed = weatherData.wind.speed;
        $('#windSpeedResponse').append('<i class="fas fa-wind"></i>' + windspeed+' m/s');
        let degree = weatherData.wind.deg;
        function  toTextualDescription(degree){
            if (degree>337.5) {
                return degree = 'Northerly';
            } else if (degree>292.5) {
                return degree = 'North Westerly';
            } else if(degree>247.5) {
                return degree='Westerly';
            } else if(degree>202.5) {
                return degree='South Westerly';
            } else if(degree>157.5) {
                return degree='Southerly';
            } else if(degree>122.5) {
                return degree='South Easterly';
            } else if(degree>67.5){
                return degree='Easterly';
            } else if(degree>22.5){
                return degree = 'North Easterly';
            } else {
                return degree='Northerly';
            }
            
        }
        $('#windDegreeResponse').append('<i class="fas fa-leaf"></i>' + toTextualDescription(degree));
        document.getElementById("background").style.backgroundImage = "url('/img/background.png')";
        let tempMin = weatherData.main.temp_min;
        $('#tempMin-right').append(tempMin+ '&deg;')
        $('#tempMin-left').append('Min_Temperature')
        let tempMax = weatherData.main.temp_max;
        $('#tempMax-right').append(tempMax+ '&deg;');
        $('#tempMax-left').append('Max_Temperature');
        let humidity = weatherData.main.humidity;
        $('#humidity-right').append(humidity+ '&#37;');
        $('#humidity-left').append('Humidity');
        let pressure = weatherData.main.pressure;
        $('#pressure-right').append(pressure+ ' hPa');
        $('#pressure-left').append('Pressure');
        document.getElementById("changeMargin").style.marginTop = "0%";
        let sunrise =weatherData.sys.sunrise;
        let sunset =weatherData.sys.sunset;
        function convertUnix(element){
            let date = new Date(element*1000);
            let time_= date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
            return time_
        };
        sunrise =convertUnix(sunrise);
        sunset = convertUnix(sunset);
        $('#additionalInfo').append('Additional Information');
        $('#sunrise-right').append(sunrise);
        $('#sunrise-left').append('Sunrise');
        $('#sunset-right').append(sunset);
        $('#sunset-left').append('Sunset');


    }
}









