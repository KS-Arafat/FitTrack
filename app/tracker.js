let map,
	trackingPolyline,
	startMarker,
	endMarker,
	trackingInterval,
	startTime,
	markers = [],
	watchId = null,
	totalDistance = 0;
const startBtn = document.getElementById("startBtn"),
	stopBtn = document.getElementById("stopBtn"),
	clearBtn = document.getElementById("clearBtn"),
	saveBtn = document.getElementById("saveBtn"),
	distanceDisplay = document.getElementById("distance"),
	durationDisplay = document.getElementById("duration"),
	tripInfo = document.getElementById("tripInfo"),
	summaryDistance = document.getElementById("summaryDistance"),
	summaryDuration = document.getElementById("summaryDuration");
function initMap() {
	(map = L.map("map").setView([0, 0], 2)),
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 100,
		}).addTo(map),
		locateUser();
}
function locateUser() {
	navigator.geolocation
		? navigator.geolocation.getCurrentPosition(
				(t) => {
					const e = { lat: t.coords.latitude, lng: t.coords.longitude };
					map.setView([e.lat, e.lng], 15),
						L.marker([e.lat, e.lng])
							.addTo(map)
							.bindPopup("Your current location")
							.openPopup();
				},
				(t) => {
					console.log("Geolocation error:", t),
						map.setView([23.8151, 90.4255], 13),
						alert("Could not get your location. Using default location.");
				},
				{ enableHighAccuracy: !0, timeout: 1e4, maximumAge: 0 }
		  )
		: (alert("Geolocation is not supported by your browser"),
		  map.setView([23.8151, 90.4255], 13));
}
function setupEventListeners() {
	startBtn.addEventListener("click", startTracking),
		stopBtn.addEventListener("click", stopTracking),
		clearBtn.addEventListener("click", clearMap),
		saveBtn.addEventListener("click", saveTrip);
}
function startTracking() {
	null === watchId &&
		((totalDistance = 0),
		(pathCoordinates = []),
		clearMap(),
		(startBtn.disabled = !0),
		(stopBtn.disabled = !1),
		(tripInfo.style.display = "none"),
		(distanceDisplay.textContent = "0"),
		(durationDisplay.textContent = "00:00:00"),
		(startTime = new Date()),
		updateDurationDisplay(),
		(trackingInterval = setInterval(updateDurationDisplay, 1e3)),
		(watchId = navigator.geolocation.watchPosition(
			(t) => handlePositionUpdate(t),
			(t) => console.error("Geolocation error:", t),
			{ enableHighAccuracy: !0, maximumAge: 0, timeout: 5e3 }
		)),
		navigator.geolocation.getCurrentPosition((t) => {
			const e = { lat: t.coords.latitude, lng: t.coords.longitude };
			(startMarker = L.marker([e.lat, e.lng], {
				icon: L.divIcon({
					className: "start-marker",
					html: "🚩",
					iconSize: [30, 30],
				}),
			})
				.addTo(map)
				.bindPopup("Start point")),
				pathCoordinates.push([e.lat, e.lng]);
		}));
}
function handlePositionUpdate(t) {
	const e = { lat: t.coords.latitude, lng: t.coords.longitude };
	if ((pathCoordinates.push([e.lat, e.lng]), pathCoordinates.length > 1)) {
		const t = pathCoordinates[pathCoordinates.length - 2],
			a = calculateDistance(t[0], t[1], e.lat, e.lng);
		(totalDistance += a),
			(distanceDisplay.textContent = totalDistance.toFixed(2));
	}
	updateTrackingLine(), map.setView([e.lat, e.lng]);
}
function updateTrackingLine() {
	trackingPolyline && map.removeLayer(trackingPolyline),
		(trackingPolyline = L.polyline(pathCoordinates, {
			color: "#3498db",
			weight: 5,
			opacity: 0.7,
			lineJoin: "round",
		}).addTo(map));
}
function stopTracking() {
	if (null !== watchId) {
		if (
			(navigator.geolocation.clearWatch(watchId),
			(watchId = null),
			clearInterval(trackingInterval),
			(startBtn.disabled = !1),
			(stopBtn.disabled = !0),
			pathCoordinates.length > 0)
		) {
			const t = pathCoordinates[pathCoordinates.length - 1];
			endMarker = L.marker([t[0], t[1]], {
				icon: L.divIcon({
					className: "end-marker",
					html: "🏁",
					iconSize: [30, 30],
				}),
			})
				.addTo(map)
				.bindPopup("End point");
		}
		showTripSummary();
	}
}
function showTripSummary() {
	(summaryDistance.textContent = totalDistance.toFixed(2)),
		(summaryDuration.textContent = durationDisplay.textContent),
		(tripInfo.style.display = "block");
}
function updateDurationDisplay() {
	const t = new Date(),
		e = new Date(t - startTime),
		a = String(e.getUTCHours()).padStart(2, "0"),
		n = String(e.getUTCMinutes()).padStart(2, "0"),
		o = String(e.getUTCSeconds()).padStart(2, "0");
	durationDisplay.textContent = `${a}:${n}:${o}`;
}
function clearMap() {
	startMarker && map.removeLayer(startMarker),
		endMarker && map.removeLayer(endMarker),
		markers.forEach((t) => map.removeLayer(t)),
		(markers = []),
		trackingPolyline &&
			(map.removeLayer(trackingPolyline), (trackingPolyline = null)),
		(tripInfo.style.display = "none"),
		(distanceDisplay.textContent = "0"),
		(durationDisplay.textContent = "00:00:00");
}
function saveTrip() {
	const t = durationDisplay.textContent;
	fetch("../backend/save_tracker.php", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `distance=${totalDistance}&duration=${t}`,
	})
		.then((t) => t.json())
		.then((t) => {
			"success" === t.status
				? (alert("Trip saved successfully!"), clearMap())
				: alert("Error saving trip: " + t.message);
		})
		.catch((t) => {
			console.error("Error:", t), alert("Error saving trip");
		});
}
function calculateDistance(t, e, a, n) {
	const o = ((a - t) * Math.PI) / 180,
		r = ((n - e) * Math.PI) / 180,
		i =
			Math.sin(o / 2) * Math.sin(o / 2) +
			Math.cos((t * Math.PI) / 180) *
				Math.cos((a * Math.PI) / 180) *
				Math.sin(r / 2) *
				Math.sin(r / 2);
	return 6371 * (2 * Math.atan2(Math.sqrt(i), Math.sqrt(1 - i)));
}
function locateUser() {
	navigator.geolocation
		? (window.userLocationMarker && map.removeLayer(window.userLocationMarker),
		  window.accuracyCircle && map.removeLayer(window.accuracyCircle),
		  navigator.geolocation.getCurrentPosition(
				(t) => {
					const e = { lat: t.coords.latitude, lng: t.coords.longitude };
					map.setView([e.lat, e.lng], 15),
						(window.userLocationMarker = L.marker([e.lat, e.lng], {
							icon: L.divIcon({
								className: "location-marker",
								html: "📍",
								iconSize: [30, 30],
							}),
						})
							.addTo(map)
							.bindPopup("Your current location")
							.openPopup()),
						t.coords.accuracy &&
							(window.accuracyCircle = L.circle([e.lat, e.lng], {
								radius: t.coords.accuracy,
								color: "#136AEC",
								fillColor: "#136AEC",
								fillOpacity: 0.15,
							}).addTo(map));
				},
				(t) => {
					console.log("Geolocation error:", t), handleGeolocationError(t);
				},
				{ enableHighAccuracy: !0, timeout: 1e4, maximumAge: 0 }
		  ))
		: alert("Geolocation is not supported by your browser");
}
function handleGeolocationError(t) {
	let e;
	switch (t.code) {
		case t.PERMISSION_DENIED:
			e =
				"Location access was denied. Please enable location permissions in your browser settings.";
			break;
		case t.POSITION_UNAVAILABLE:
			e = "Location information is unavailable.";
			break;
		case t.TIMEOUT:
			e = "The request to get your location timed out.";
			break;
		case t.UNKNOWN_ERROR:
			e = "An unknown error occurred while getting your location.";
	}
	alert(e), map.setView([23.8151, 90.4255], 13);
}
document.addEventListener("DOMContentLoaded", function () {
	initMap(), setupEventListeners();
}),
	document.getElementById("locateBtn").addEventListener("click", locateUser);
