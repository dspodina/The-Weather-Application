let apiKey = "3fdfe9a6806b9f43111a0155e65cce0f";
let city = document.querySelector(".city");
let button = document.querySelector("button");
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
                let container = document.querySelector('.container')
                data.list.forEach(element => {
                    let card = renderWeatherCard(element)
                    container.append (card)
                });
            });
        }
      });
  }
};
function renderWeatherCard(item){
    let holder = document.createElement('div')
    holder.className = 'holder'
    holder.innerText = `tempeture is ${item.main.temp} and it is ${item.weather[0].description}`
    return holder
}

