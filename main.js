let text = document.getElementById("city");
let button = document.getElementById('btn');
let output = document.getElementById('output');

const loadData = (cb, city) => {

  let xhr = new XMLHttpRequest();
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4459729cd7eb1254af8bcab26dc8476f&units=metric`;

  xhr.open('GET', URL);

  //Another way
  // let mapURL = {
  //   url: 'https://api.openweathermap.org/data/2.5/weather',
  //   q: city,
  //   appid: '4459729cd7eb1254af8bcab26dc8476f',
  //   units: 'metric'
  // };

  // xhr.open('GET', `${mapURL.url}?q=${mapURL.q}&appid=${mapURL.appid}&units=${mapURL.units}`);
  
  xhr.onload = () => {
    let data = JSON.parse(xhr.responseText);
    // console.log('>>', data.main.temp); // JSON string ----> JS
    cb(data);
  }

  xhr.send();
}


const submitForm = (e) => {
  e.preventDefault();

  let city = text.value;
  console.log(city);
  
  loadData(render, city);
  text.value = "";
}


const render = (data) => {
  console.log(data);
  
  if (!data) {
    output.innerHTML = `The server didn't give the weather data. Please try again!`;
 
  } else {
    output.innerHTML = `In ${data.name} the temperature is ${data.main.temp}℃, the air humidity is ${data.main.humidity}% and the wind speed is ${data.wind.speed}km/h.`;
  }
}

button.addEventListener('click', 
submitForm);
