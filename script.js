
const search = document.getElementById('search');
const searchIcon = document.querySelector('.search-icon');

// Top left Side
const conditionText = document.getElementById("condition-text");
const locationName = document.getElementById("name");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const img = document.getElementById("img");
const errorMessage = document.querySelector(".error-message");

// Top right side
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const chanceOfRain = document.getElementById('chance-of-rain');
const windSpeed = document.getElementById('wind-speed');

// btns
const dailyBtn = document.getElementById("daily");
const hourlyBtn = document.getElementById("hourly");
const display = document.getElementById("display");

// bottom
const bottomBody = document.querySelector('.bottom-body');


searchIcon.addEventListener("click", () => {
	const query = search.value;
	if (query == '') return

	weatherSearch(query);	
	
});

search.addEventListener("keydown", (e) => {
	const query = search.value;
	if (e.key === 'Enter'){
		if (query == '') return
		weatherSearch(query);
	}
});

async function weatherSearch (query="addis ababa") {
	try {
		const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=63c24c6f33f742c3880114012232208&q=${query}&days=8`, {mode: 'cors'});
		const result = await response.json();
	
		// console.log(result);

		const span = display.querySelector("span");
	
		if(result.error) {
			console.log('error');
			errorMessage.style.display = 'block';
			setTimeout(() => {
				errorMessage.style.display = 'none'
			}, 2000);

		} else {
				conditionText.innerText = result.current.condition.text;
				locationName.innerText = result.location.name;
				date.innerText = new Date().toDateString();
				if (span.innerText === '°C') {
					temp.innerText = result.current.temp_c + " °F";
					feelsLike.innerText = result.current.feelslike_c + " °F";	   				
				} else {
					temp.innerText = result.current.temp_c + " °C";
					feelsLike.innerText = result.current.feelslike_c + " °C";	   				
				}
				
				humidity.innerText = result.current.humidity +  " %";
				chanceOfRain.innerText = result.forecast.forecastday[0].day.daily_chance_of_rain + " %";
				windSpeed.innerText = result.current.wind_kph + " Km/h";
				img.src = result.forecast.forecastday[0].day.condition.icon;

			
			dailyBtn.addEventListener("click", () => {
				if (dailyBtn.classList.contains("active")) return
				dailyBtn.classList.add("active");
				hourlyBtn.classList.remove("active");
				if (span.innerText === '°F') {
					bottomBody.innerHTML = dailyBody;
				} else {
					bottomBody.innerHTML = dailyBodyF;
				}
				bottomBody.classList.remove("hourly");
			});

			
			hourlyBtn.addEventListener("click", () => {
				if (hourlyBtn.classList.contains("active")) return
				hourlyBtn.classList.add("active");
				dailyBtn.classList.remove("active");
				if (span.innerText === '°F') {
					bottomBody.innerHTML = hourlyBody;
				} else {
					bottomBody.innerHTML = hourlyBodyF;
				}

				bottomBody.classList.add("hourly");
			});

			
			// const span = display.querySelector('span');
			display.addEventListener("click", () => {	
				if (span.innerText === '°F'){
					span.innerText = '°C';			
					
					temp.innerText = result.current.temp_f + " °F";
					feelsLike.innerText = result.current.feelslike_f + " °F";
					
					if (dailyBtn.classList.contains("active")){
						bottomBody.innerHTML = dailyBodyF;		
					} else {
						bottomBody.innerHTML = hourlyBodyF;
					}
					
				} else {
					span.innerText = '°F';
					
					temp.innerText = result.current.temp_c + " °C";
					feelsLike.innerText = result.current.feelslike_c + " °C";	    

					if(dailyBtn.classList.contains("active")){
						bottomBody.innerHTML = dailyBody;	
					} else {
						bottomBody.innerHTML = hourlyBody;				
					}
					
				}
			})
			
			const hourlyBody = `<div class="bottom-element">
									<h4>6 am</h4>
									<h3>${result.forecast.forecastday[0].hour[0].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[0].condition.icon}" id="img1" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>7 am</h4>
									<h3>${result.forecast.forecastday[0].hour[1].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[1].condition.icon}" id="img2" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>8 am</h4>
									<h3>${result.forecast.forecastday[0].hour[2].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[2].condition.icon}" id="img3" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>9 am</h4>
									<h3>${result.forecast.forecastday[0].hour[3].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[3].condition.icon}" id="img4" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>10 am</h4>
									<h3>${result.forecast.forecastday[0].hour[4].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[4].condition.icon}" id="img5" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>11 am</h4>
									<h3>${result.forecast.forecastday[0].hour[5].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[5].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>12 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[6].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[6].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>1 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[7].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[7].condition.icon}" id="img1" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>2 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[8].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[8].condition.icon}" id="img2" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>3 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[9].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[9].condition.icon}" id="img3" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>4 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[10].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[10].condition.icon}" id="img4" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>5 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[11].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[11].condition.icon}" id="img5" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>6 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[12].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[12].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>7 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[13].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[13].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>8 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[14].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[14].condition.icon}" id="img1" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>9 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[15].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[15].condition.icon}" id="img2" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>10 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[16].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[16].condition.icon}" id="img3" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>11 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[17].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[17].condition.icon}" id="img4" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>12 am</h4>
									<h3>${result.forecast.forecastday[0].hour[18].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[18].condition.icon}" id="img5" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>1 am</h4>
									<h3>${result.forecast.forecastday[0].hour[19].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[19].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>2 am</h4>
									<h3>${result.forecast.forecastday[0].hour[20].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[20].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>3 am</h4>
									<h3>${result.forecast.forecastday[0].hour[21].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[21].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>4 am</h4>
									<h3>${result.forecast.forecastday[0].hour[22].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[22].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>5 am</h4>
									<h3>${result.forecast.forecastday[0].hour[23].feelslike_c + " °C"}</h3>
									<img src="${result.forecast.forecastday[0].hour[23].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								`;
			const hourlyBodyF = `<div class="bottom-element">
									<h4>6 am</h4>
									<h3>${result.forecast.forecastday[0].hour[0].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[0].condition.icon}" id="img1" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>7 am</h4>
									<h3>${result.forecast.forecastday[0].hour[1].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[1].condition.icon}" id="img2" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>8 am</h4>
									<h3>${result.forecast.forecastday[0].hour[2].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[2].condition.icon}" id="img3" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>9 am</h4>
									<h3>${result.forecast.forecastday[0].hour[3].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[3].condition.icon}" id="img4" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>10 am</h4>
									<h3>${result.forecast.forecastday[0].hour[4].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[4].condition.icon}" id="img5" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>11 am</h4>
									<h3>${result.forecast.forecastday[0].hour[5].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[5].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>12 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[6].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[6].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>1 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[7].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[7].condition.icon}" id="img1" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>2 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[8].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[8].condition.icon}" id="img2" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>3 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[9].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[9].condition.icon}" id="img3" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>4 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[10].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[10].condition.icon}" id="img4" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>5 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[11].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[11].condition.icon}" id="img5" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>6 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[12].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[12].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>7 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[13].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[13].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>8 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[14].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[14].condition.icon}" id="img1" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>9 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[15].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[15].condition.icon}" id="img2" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>10 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[16].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[16].condition.icon}" id="img3" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>11 pm</h4>
									<h3>${result.forecast.forecastday[0].hour[17].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[17].condition.icon}" id="img4" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>12 am</h4>
									<h3>${result.forecast.forecastday[0].hour[18].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[18].condition.icon}" id="img5" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>1 am</h4>
									<h3>${result.forecast.forecastday[0].hour[19].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[19].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>2 am</h4>
									<h3>${result.forecast.forecastday[0].hour[20].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[20].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>3 am</h4>
									<h3>${result.forecast.forecastday[0].hour[21].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[21].condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>4 am</h4>
									<h3>${result.forecast.forecastday[0].hour[22].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[22].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>5 am</h4>
									<h3>${result.forecast.forecastday[0].hour[23].feelslike_f + " °F"}</h3>
									<img src="${result.forecast.forecastday[0].hour[23].condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>
								`;

			const dailyBody = `<div class="bottom-element">
										<h4>${getDayName(result.forecast.forecastday[1].date)}</h4>
										<h3>${result.forecast.forecastday[1].day.maxtemp_c + " °C"}</h3>
										<p>${result.forecast.forecastday[1].day.mintemp_c + " °C"}</p>
										<img src="${result.forecast.forecastday[1].day.condition.icon}" id="img1" alt="" width="40px" height="40px">
									</div>
									<div class="bottom-element">
										<h4>${getDayName(result.forecast.forecastday[2].date)}</h4>
										<h3>${result.forecast.forecastday[2].day.maxtemp_c + " °C"}</h3>
										<p>${result.forecast.forecastday[2].day.mintemp_c + " °C"}</p>
										<img src="${result.forecast.forecastday[2].day.condition.icon}" id="img2" alt="" width="40px" height="40px">
									</div>
									<div class="bottom-element">
										<h4>${getDayName(result.forecast.forecastday[3].date)}</h4>
										<h3>${result.forecast.forecastday[3].day.maxtemp_c + " °C"}</h3>
										<p>${result.forecast.forecastday[3].day.mintemp_c + " °C"}</p>
										<img src="${result.forecast.forecastday[3].day.condition.icon}" id="img3" alt="" width="40px" height="40px">
									</div>
									<div class="bottom-element">
										<h4>${getDayName(result.forecast.forecastday[4].date)}</h4>
										<h3>${result.forecast.forecastday[4].day.maxtemp_c + " °C"}</h3>
										<p>${result.forecast.forecastday[4].day.mintemp_c + " °C"}</p>
										<img src="${result.forecast.forecastday[4].day.condition.icon}" id="img4" alt="" width="40px" height="40px">
									</div>
									<div class="bottom-element">
										<h4>${getDayName(result.forecast.forecastday[5].date)}</h4>
										<h3>${result.forecast.forecastday[5].day.maxtemp_c + " °C"}</h3>
										<p>${result.forecast.forecastday[5].day.mintemp_c + " °C"}</p>
										<img src="${result.forecast.forecastday[5].day.condition.icon}" id="img5" alt="" width="40px" height="40px">
									</div>
									<div class="bottom-element">
										<h4>${getDayName(result.forecast.forecastday[6].date)}</h4>
										<h3>${result.forecast.forecastday[6].day.maxtemp_c + " °C"}</h3>
										<p>${result.forecast.forecastday[6].day.mintemp_c + " °C"}</p>
										<img src="${result.forecast.forecastday[6].day.condition.icon}" id="img6" alt="" width="40px" height="40px">
									</div>
									<div class="bottom-element">
										<h4>${getDayName(result.forecast.forecastday[7].date)}</h4>
										<h3>${result.forecast.forecastday[7].day.maxtemp_c + " °C"}</h3>
										<p>${result.forecast.forecastday[7].day.mintemp_c + " °C"}</p>
										<img src="${result.forecast.forecastday[7].day.condition.icon}" id="img7" alt="" width="40px" height="40px">
									</div>`;

			const dailyBodyF = `<div class="bottom-element">
									<h4>${getDayName(result.forecast.forecastday[1].date)}</h4>
									<h3>${result.forecast.forecastday[1].day.maxtemp_f + " °F"}</h3>
									<p>${result.forecast.forecastday[1].day.mintemp_f + " °F"}</p>
									<img src="${result.forecast.forecastday[1].day.condition.icon}" id="img1" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>${getDayName(result.forecast.forecastday[2].date)}</h4>
									<h3>${result.forecast.forecastday[2].day.maxtemp_f + " °F"}</h3>
									<p>${result.forecast.forecastday[2].day.mintemp_f + " °F"}</p>
									<img src="${result.forecast.forecastday[2].day.condition.icon}" id="img2" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>${getDayName(result.forecast.forecastday[3].date)}</h4>
									<h3>${result.forecast.forecastday[3].day.maxtemp_f + " °F"}</h3>
									<p>${result.forecast.forecastday[3].day.mintemp_f + " °F"}</p>
									<img src="${result.forecast.forecastday[3].day.condition.icon}" id="img3" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>${getDayName(result.forecast.forecastday[4].date)}</h4>
									<h3>${result.forecast.forecastday[4].day.maxtemp_f + " °F"}</h3>
									<p>${result.forecast.forecastday[4].day.mintemp_f + " °F"}</p>
									<img src="${result.forecast.forecastday[4].day.condition.icon}" id="img4" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>${getDayName(result.forecast.forecastday[5].date)}</h4>
									<h3>${result.forecast.forecastday[5].day.maxtemp_f + " °F"}</h3>
									<p>${result.forecast.forecastday[5].day.mintemp_f + " °F"}</p>
									<img src="${result.forecast.forecastday[5].day.condition.icon}" id="img5" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>${getDayName(result.forecast.forecastday[6].date)}</h4>
									<h3>${result.forecast.forecastday[6].day.maxtemp_c + " °F"}</h3>
									<p>${result.forecast.forecastday[6].day.mintemp_f + " °F"}</p>
									<img src="${result.forecast.forecastday[6].day.condition.icon}" id="img6" alt="" width="40px" height="40px">
								</div>
								<div class="bottom-element">
									<h4>${getDayName(result.forecast.forecastday[7].date)}</h4>
									<h3>${result.forecast.forecastday[7].day.maxtemp_c + " °F"}</h3>
									<p>${result.forecast.forecastday[7].day.mintemp_f + " °F"}</p>
									<img src="${result.forecast.forecastday[7].day.condition.icon}" id="img7" alt="" width="40px" height="40px">
								</div>`;

			if (span.innerText === "°F"){
				if (dailyBtn.classList.contains("active")){
					bottomBody.innerHTML = dailyBody;		
				} else {
					bottomBody.innerHTML = hourlyBody;
				}
			} else {
				if(dailyBtn.classList.contains("active")){
					bottomBody.innerHTML = dailyBodyF;	
				} else {
					bottomBody.innerHTML = hourlyBodyF;				
				}
			}					
		}
	} catch(e) {
		console.log(`eRROR: ${e}`);
	}
}


function getDayName(date) {
	let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	let d = new Date(date).getDay();
	return days[d];
}

window.addEventListener("DOMContentLoaded", () => {
	weatherSearch('addis ababa');
});




