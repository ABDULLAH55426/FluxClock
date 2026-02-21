/* ================= SOUNDS ================= */
const timerSound = new Audio("a.mp3"); // place your alarm mp3 in same folder

function toggleFullscreen() {
    const topBar = document.querySelector('.top-bar');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            topBar.style.display = 'none'; // hide navbar & quotes
        }).catch((err) => {
            console.log("Fullscreen error:", err);
        });
    } else {
        document.exitFullscreen().then(() => {
            topBar.style.display = 'flex'; // show navbar & quotes
        });
    }
}

/* ================= SECTION SWITCH ================= */
function showSection(id, event) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(id).classList.add('active');

    // Highlight active nav button
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.classList.remove('active');
    });

    if (event && event.target) {
        event.target.classList.add('active');
    }
}

/* ================= 12-HOUR CLOCK ================= */
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('liveClock').innerText =
        `${String(hours).padStart(2,'0')}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();

/* ================= QUOTES ================= */
const quotes = [
    "Focus", "Keep going", "Do it now", "One step", "Stay sharp", "Be patient", 
    "Learn daily", "Work hard", "Never quit", "Dream big", "Start now", "Push forward",
    "Stay humble", "Think clear", "Be consistent", "Act today", "Small wins", "No excuses",
    "Do better", "Keep learning", "Rise up", "Stay curious", "Time is gold", "Plan ahead",
    "Take action", "Stay strong", "Focus hard", "Be brave", "Learn fast", "Try again",
    "Stay disciplined", "Do more", "Stay kind", "Keep moving", "Work smart", "Be ready",
    "Stay calm", "Grow daily", "Finish it", "Push limits", "Think big", "Own it",
    "Be bold", "Keep focus", "Step forward", "Stay motivated", "Act smart", "Keep trying",
    "Be relentless", "Start small", "Believe yourself", "Never settle", "Aim high", "Stay confident",
    "Keep improving", "Be fearless", "Challenge yourself", "Embrace change", "Learn from mistakes",
    "Persist", "Stay focused", "Work quietly", "Shine brightly", "Keep dreaming", "Act now",
    "Make progress", "Stay positive", "Keep pushing", "Do your best", "Stay determined",
    "Be resilient", "Take risks", "Stay organized", "Keep balance", "Stay inspired",
    "Keep disciplined", "Be adaptable", "Plan smart", "Focus deeply", "Think clearly",
    "Take breaks", "Stay mindful", "Keep curiosity", "Be patient", "Respect time",
    "Stay humble", "Keep learning daily", "Strive for growth", "Prioritize well", "Keep faith",
    "Stay strong mentally", "Build habits", "Seek knowledge", "Celebrate wins", "Learn fast",
    "Push boundaries", "Keep moving forward", "Stay motivated daily", "Take initiative", "Stay consistent"
];

function changeQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteText').innerText = `"${quotes[random]}"`;

}


function changeQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteText').innerText = quotes[random]; // no extra quotes here
}
/* ================= STOPWATCH ================= */
let stopwatchInterval;
let stopwatchTime = 0;

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        displayStopwatch();
        updateStopwatchTitle();
    }, 1000);
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    displayStopwatch();
    document.title = "FluxClock"; // reset title
}

function displayStopwatch() {
    let hrs = Math.floor(stopwatchTime / 3600);
    let mins = Math.floor((stopwatchTime % 3600) / 60);
    let secs = stopwatchTime % 60;

    document.getElementById('stopwatchDisplay').innerText =
        `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

function updateStopwatchTitle() {
    let hrs = Math.floor(stopwatchTime / 3600);
    let mins = Math.floor((stopwatchTime % 3600) / 60);
    let secs = stopwatchTime % 60;

    document.title = `Stopwatch: ${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')} | FluxClock`;
}

/* ================= TIMER ================= */
let timerInterval;
let timerTime = 0;

function startTimer() {
    const hrs = parseInt(document.getElementById("hours").value) || 0;
    const mins = parseInt(document.getElementById("minutes").value) || 0;
    const secs = parseInt(document.getElementById("seconds").value) || 0;

    timerTime = hrs * 3600 + mins * 60 + secs;

    clearInterval(timerInterval);

    if (timerTime <= 0) return; // Prevent starting empty timer

    document.getElementById("timerDisplay").classList.remove("timer-finished");

    timerInterval = setInterval(() => {
        if (timerTime <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").classList.add("timer-finished");
            timerSound.loop = true;
            timerSound.play();

            // Stop alarm after 5 seconds
            setTimeout(() => {
                timerSound.pause();
                timerSound.currentTime = 0;
            }, 5000);

            document.title = `Timer Finished! | FluxClock`; // reset title
        } else {
            timerTime--;
            displayTimer();
            updateTimerTitle();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerTime = 0;
    document.getElementById("timerDisplay").classList.remove("timer-finished");
    displayTimer();
    document.title = "FluxClock"; // reset title
}

function displayTimer() {
    let hrs = Math.floor(timerTime / 3600);
    let mins = Math.floor((timerTime % 3600) / 60);
    let secs = timerTime % 60;

    document.getElementById("timerDisplay").innerText =
        `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

function updateTimerTitle() {
    let hrs = Math.floor(timerTime / 3600);
    let mins = Math.floor((timerTime % 3600) / 60);
    let secs = timerTime % 60;

    document.title = `Timer: ${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')} | FluxClock`;
}





// Full list of countries with IANA timezones
const countryTimezones = {
    "Afghanistan": "Asia/Kabul",
    "Albania": "Europe/Tirane",
    "Algeria": "Africa/Algiers",
    "Andorra": "Europe/Andorra",
    "Angola": "Africa/Luanda",
    "Argentina": "America/Argentina/Buenos_Aires",
    "Armenia": "Asia/Yerevan",
    "Australia": "Australia/Sydney",
    "Austria": "Europe/Vienna",
    "Azerbaijan": "Asia/Baku",
    "Bahamas": "America/Nassau",
    "Bahrain": "Asia/Bahrain",
    "Bangladesh": "Asia/Dhaka",
    "Barbados": "America/Barbados",
    "Belarus": "Europe/Minsk",
    "Belgium": "Europe/Brussels",
    "Belize": "America/Belize",
    "Benin": "Africa/Porto-Novo",
    "Bhutan": "Asia/Thimphu",
    "Bolivia": "America/La_Paz",
    "Bosnia and Herzegovina": "Europe/Sarajevo",
    "Botswana": "Africa/Gaborone",
    "Brazil": "America/Sao_Paulo",
    "Brunei": "Asia/Brunei",
    "Bulgaria": "Europe/Sofia",
    "Burkina Faso": "Africa/Ouagadougou",
    "Burundi": "Africa/Bujumbura",
    "Cambodia": "Asia/Phnom_Penh",
    "Cameroon": "Africa/Douala",
    "Canada": "America/Toronto",
    "Cape Verde": "Atlantic/Cape_Verde",
    "Central African Republic": "Africa/Bangui",
    "Chad": "Africa/Ndjamena",
    "Chile": "America/Santiago",
    "China": "Asia/Shanghai",
    "Colombia": "America/Bogota",
    "Comoros": "Indian/Comoro",
    "Congo (Brazzaville)": "Africa/Brazzaville",
    "Congo (Kinshasa)": "Africa/Kinshasa",
    "Costa Rica": "America/Costa_Rica",
    "Croatia": "Europe/Zagreb",
    "Cuba": "America/Havana",
    "Cyprus": "Asia/Nicosia",
    "Czech Republic": "Europe/Prague",
    "Denmark": "Europe/Copenhagen",
    "Djibouti": "Africa/Djibouti",
    "Dominica": "America/Dominica",
    "Dominican Republic": "America/Santo_Domingo",
    "Ecuador": "America/Guayaquil",
    "Egypt": "Africa/Cairo",
    "El Salvador": "America/El_Salvador",
    "Equatorial Guinea": "Africa/Malabo",
    "Eritrea": "Africa/Asmara",
    "Estonia": "Europe/Tallinn",
    "Eswatini": "Africa/Mbabane",
    "Ethiopia": "Africa/Addis_Ababa",
    "Fiji": "Pacific/Fiji",
    "Finland": "Europe/Helsinki",
    "France": "Europe/Paris",
    "Gabon": "Africa/Libreville",
    "Gambia": "Africa/Banjul",
    "Georgia": "Asia/Tbilisi",
    "Germany": "Europe/Berlin",
    "Ghana": "Africa/Accra",
    "Greece": "Europe/Athens",
    "Grenada": "America/Grenada",
    "Guatemala": "America/Guatemala",
    "Guinea": "Africa/Conakry",
    "Guinea-Bissau": "Africa/Bissau",
    "Guyana": "America/Guyana",
    "Haiti": "America/Port-au-Prince",
    "Honduras": "America/Tegucigalpa",
    "Hungary": "Europe/Budapest",
    "Iceland": "Atlantic/Reykjavik",
    "India": "Asia/Kolkata",
    "Indonesia": "Asia/Jakarta",
    "Iran": "Asia/Tehran",
    "Iraq": "Asia/Baghdad",
    "Ireland": "Europe/Dublin",
    "Israel": "Asia/Jerusalem",
    "Italy": "Europe/Rome",
    "Jamaica": "America/Jamaica",
    "Japan": "Asia/Tokyo",
    "Jordan": "Asia/Amman",
    "Kazakhstan": "Asia/Almaty",
    "Kenya": "Africa/Nairobi",
    "Kiribati": "Pacific/Tarawa",
    "Kuwait": "Asia/Kuwait",
    "Kyrgyzstan": "Asia/Bishkek",
    "Laos": "Asia/Vientiane",
    "Latvia": "Europe/Riga",
    "Lebanon": "Asia/Beirut",
    "Lesotho": "Africa/Maseru",
    "Liberia": "Africa/Monrovia",
    "Libya": "Africa/Tripoli",
    "Liechtenstein": "Europe/Vaduz",
    "Lithuania": "Europe/Vilnius",
    "Luxembourg": "Europe/Luxembourg",
    "Madagascar": "Indian/Antananarivo",
    "Malawi": "Africa/Blantyre",
    "Malaysia": "Asia/Kuala_Lumpur",
    "Maldives": "Indian/Maldives",
    "Mali": "Africa/Bamako",
    "Malta": "Europe/Malta",
    "Marshall Islands": "Pacific/Majuro",
    "Mauritania": "Africa/Nouakchott",
    "Mauritius": "Indian/Mauritius",
    "Mexico": "America/Mexico_City",
    "Micronesia": "Pacific/Chuuk",
    "Moldova": "Europe/Chisinau",
    "Monaco": "Europe/Monaco",
    "Mongolia": "Asia/Ulaanbaatar",
    "Montenegro": "Europe/Podgorica",
    "Morocco": "Africa/Casablanca",
    "Mozambique": "Africa/Maputo",
    "Myanmar": "Asia/Yangon",
    "Namibia": "Africa/Windhoek",
    "Nauru": "Pacific/Nauru",
    "Nepal": "Asia/Kathmandu",
    "Netherlands": "Europe/Amsterdam",
    "New Zealand": "Pacific/Auckland",
    "Nicaragua": "America/Managua",
    "Niger": "Africa/Niamey",
    "Nigeria": "Africa/Lagos",
    "North Korea": "Asia/Pyongyang",
    "North Macedonia": "Europe/Skopje",
    "Norway": "Europe/Oslo",
    "Oman": "Asia/Muscat",
    "Pakistan": "Asia/Karachi",
    "Palau": "Pacific/Palau",
    "Panama": "America/Panama",
    "Papua New Guinea": "Pacific/Port_Moresby",
    "Paraguay": "America/Asuncion",
    "Peru": "America/Lima",
    "Philippines": "Asia/Manila",
    "Poland": "Europe/Warsaw",
    "Portugal": "Europe/Lisbon",
    "Qatar": "Asia/Qatar",
    "Romania": "Europe/Bucharest",
    "Russia": "Europe/Moscow",
    "Rwanda": "Africa/Kigali",
    "Saint Kitts and Nevis": "America/St_Kitts",
    "Saint Lucia": "America/St_Lucia",
    "Saint Vincent and the Grenadines": "America/St_Vincent",
    "Samoa": "Pacific/Apia",
    "San Marino": "Europe/San_Marino",
    "Saudi Arabia": "Asia/Riyadh",
    "Senegal": "Africa/Dakar",
    "Serbia": "Europe/Belgrade",
    "Seychelles": "Indian/Mahe",
    "Sierra Leone": "Africa/Freetown",
    "Singapore": "Asia/Singapore",
    "Slovakia": "Europe/Bratislava",
    "Slovenia": "Europe/Ljubljana",
    "Solomon Islands": "Pacific/Guadalcanal",
    "Somalia": "Africa/Mogadishu",
    "South Africa": "Africa/Johannesburg",
    "South Korea": "Asia/Seoul",
    "South Sudan": "Africa/Juba",
    "Spain": "Europe/Madrid",
    "Sri Lanka": "Asia/Colombo",
    "Sudan": "Africa/Khartoum",
    "Suriname": "America/Paramaribo",
    "Sweden": "Europe/Stockholm",
    "Switzerland": "Europe/Zurich",
    "Syria": "Asia/Damascus",
    "Taiwan": "Asia/Taipei",
    "Tajikistan": "Asia/Dushanbe",
    "Tanzania": "Africa/Dar_es_Salaam",
    "Thailand": "Asia/Bangkok",
    "Togo": "Africa/Lome",
    "Tonga": "Pacific/Tongatapu",
    "Trinidad and Tobago": "America/Port_of_Spain",
    "Tunisia": "Africa/Tunis",
    "Turkey": "Europe/Istanbul",
    "Turkmenistan": "Asia/Ashgabat",
    "Tuvalu": "Pacific/Funafuti",
    "Uganda": "Africa/Kampala",
    "Ukraine": "Europe/Kiev",
    "United Arab Emirates": "Asia/Dubai",
    "United Kingdom": "Europe/London",
    "United States": "America/New_York",
    "Uruguay": "America/Montevideo",
    "Uzbekistan": "Asia/Tashkent",
    "Vanuatu": "Pacific/Efate",
    "Vatican City": "Europe/Vatican",
    "Venezuela": "America/Caracas",
    "Vietnam": "Asia/Ho_Chi_Minh",
    "Yemen": "Asia/Aden",
    "Zambia": "Africa/Lusaka",
    "Zimbabwe": "Africa/Harare"
};

// Populate the dropdown
const countrySelect = document.getElementById("countrySelect");
Object.keys(countryTimezones).sort().forEach(country => {
    const opt = document.createElement("option");
    opt.value = countryTimezones[country];
    opt.innerText = country;
    countrySelect.appendChild(opt);
});

// World Clock display
const worldTimeDisplay = document.getElementById("worldTime");
const timezoneDisplay = document.getElementById("timezoneDisplay");

let currentTimezone = "";

countrySelect.addEventListener("change", () => {
    const tz = countrySelect.value;
    if (tz) {
        currentTimezone = tz;
        updateWorldClock();
    }
});

function updateWorldClock() {
    if (!currentTimezone) return;

    try {
        const now = new Date();
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: currentTimezone
        };
        worldTimeDisplay.innerText = new Intl.DateTimeFormat([], options).format(now);
        timezoneDisplay.innerText = currentTimezone.replace("_", " ");
    } catch {
        worldTimeDisplay.innerText = "Invalid timezone";
        timezoneDisplay.innerText = "";
    }
}

// Update every second
setInterval(updateWorldClock, 1000);




function toggleInfo() {
    const popup = document.getElementById('infoPopup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}