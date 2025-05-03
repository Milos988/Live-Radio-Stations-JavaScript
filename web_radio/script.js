const stationList = document.getElementById('station-list');
const searchInput = document.getElementById('search');
const audioPlayer = document.getElementById('audio-player');

let stations = [];

// Fetch stations from Radio Browser API
async function fetchStations() {
	try {
		const response = await fetch('https://de1.api.radio-browser.info/json/stations/topclick/100');
		stations = await response.json();
		displayStations(stations);
	} catch (error) {
		console.error('Error fetching stations:', error);
	}
}

// Display stations in the DOM
function displayStations(stations) {
	stationList.innerHTML = '';
	stations.forEach(station => {
		const li = document.createElement('li');
		li.classList.add('station-item');
		li.innerHTML = `
      <h2>${station.name}</h2>
      <p>${station.country} - ${station.tags}</p>
      <button data-url="${station.url_resolved}">Play</button>
    `;
		stationList.appendChild(li);
	});
}

// Play selected station
stationList.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const streamUrl = e.target.getAttribute('data-url');
		audioPlayer.src = streamUrl;
		audioPlayer.play();
	}
});

// Search functionality
searchInput.addEventListener('input', () => {
	const query = searchInput.value.toLowerCase();
	const filteredStations = stations.filter(station =>
		station.name.toLowerCase().includes(query)
	);
	displayStations(filteredStations);
});

// Initialize
fetchStations();
