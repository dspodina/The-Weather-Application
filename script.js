let apiKey = "3fdfe9a6806b9f43111a0155e65cce0f";
let city = document.querySelector(".city");
let button = document.querySelector("button");
let weatherByDay = {};
button.onclick = function () {
  if (city.value) {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${apiKey}`;
    fetch(url)
      .then((j) => j.json())
      .then((data) => {
        console.log(data);
        if (data.length) {
          let { lat, lon } = data[0];
          let weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
          fetch(weatherUrl)
            .then((j) => j.json())
            .then((data) => {
              let container = document.querySelector(".weatherForecast");
              document.querySelector(".cityName").innerHTML = city.value;
              data.list.forEach((element) => {
                let day = element.dt_txt.substring(0, 10);
                if (day in weatherByDay) {
                  weatherByDay[day].push(element);
                } else {
                  weatherByDay[day] = [element];
                }
                // let card = renderWeatherCard(element);
              });
              console.log(weatherByDay)
              for(let day in weatherByDay){
                let card =  renderWeatherDay(day, weatherByDay[day])
                container.append(card);
              }
            });
        }
      });
  }
};
function renderWeatherDay (day, weatherList){
let listOfTemp = weatherList.map(item => 
  item.main.temp 
  )
  let minTemp = Math.min(...listOfTemp)
  let maxTemp = Math.max(...listOfTemp)
  let holder = document.createElement("div");
  holder.className = "holder";
  holder.innerHTML = `tempeture is ${Math.round(minTemp)} - ${Math.round(maxTemp)}`
  return holder;
  console.log(listOfTemp)
}
// function renderWeatherCard(item) {
//   )}&deg; and it is ${item.weather[0].description}`;
// }
