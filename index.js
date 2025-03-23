// chatgpt gevraagd hoe kan ik pas het spel laten starten nadat ik de knop spelen heb ingedrukt?
// aan chatgpt gevraagd: hoe kan ik de irritatie van de hamster verhogen als hij te vaak wordt gevoed?
// chatgpt gevraagd: hoe ik via if else statement de kans kan aanpassen resultaat winnen of verliezen? meer richting 50/50
// aan chatgpt gevraagd wat de uitleg is van feedattempts & games played & NoEnergyAttempts
// aan chatgpt gevraagd welke situatie je const of beter let kan gebruiken
//  aan chatgpt grvaagd hoe ik bij de if-else statement de uitvoering laat stoppen als de hamster is weggerend
console.log('Hamtaro spel');

const hamster = {
    name: 'Hamtaro',
    energy: 50,
    health: 100,
    hunger: 50,
    blijheid: 50, 
    irritatie: 0, // Houdt het irritatieniveau van de hamster bij
    feedAttempts: 0, // Aantal keer geprobeerd te voeden als honger 0 is
    gamesPlayed: 0, // Aantal keer dat het spel is gespeeld
    noEnergyAttempts: 0 // Aantal keer geprobeerd te spelen zonder energie
};
// aan chatgpt gevraagd: hoe kan ik de irritatie van de hamster verhogen als hij te vaak wordt gevoed?

const feedSound = new Audio('sounds/minecraft-eating.mp3');
const sleepSound = new Audio('sounds/snore-mimi.mp3');
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
// https://stackoverflow.com/questions/9419263/how-to-play-audio

// Voedingsfuncties
function feed() {
    // Controleer overvoeding en zijn irritatie
    if (hamster.irritatie >= 4) {
        console.log("Hamtaro is weggerend van de irritatie. Start opnieuw.");
        updateDisplay();
        return; // Stopt uitvoering als de hamster is weggerend
    }

    // Controleer overvoeding
    if (hamster.hunger <= 0) {
        hamster.feedAttempts++; // Verhoog het aantal voedingspogingen
        hamster.irritatie += 1; // Verhoog de irritatie met 1 bij elke poging

        // Controleer of de hamster meer dan 3 keer is gevoed nadat de honger op 0 was
        if (hamster.feedAttempts > 3) {
            console.log("Hamtaro is overvoed en raakt geïrriteerd van jou. Hij rent weg.");
            hamster.irritatie = 4; // Stel irritatie in op 4 zodat hij wegloopt
            updateDisplay();
            return; // stopt verdere uitvoering
        } else {
            // Geef melding over de irritatie en voedingspogingen
            console.log(`Hamtaro heeft al genoeg gegeten en is geïrriteerd! Pogingen gedaan: ${hamster.feedAttempts}/3. Probeer het later opnieuw.`);
            updateDisplay(); // Update het display na het voeden
            return; // stopt verdere uitvoering
        }
    }

    // Voed de hamster
    hamster.hunger = Math.max(hamster.hunger - 10, 0); // Verminder honger bij voeding
    hamster.blijheid = Math.min(hamster.blijheid + 5, 100); // Verhoog blijheid
    hamster.health = Math.min(hamster.health + 5, 100); // Verhoog gezondheid
    hamster.irritatie = Math.max(hamster.irritatie - 1, 0); // Verlaag irritatie na succesvol voeden

    // Reset de voedingspogingen als de hamster succesvol gevoed is
    if (hamster.hunger > 0) {
        hamster.feedAttempts = 0; // Reset pogingen bij succesvolle voeding
    }

    // Stel in dat de hamster energie moet hebben
    if (hamster.energy < 20) {
        console.log("Hamtaro heeft energie nodig. Overweeg hem te laten slapen.");
    }

    // Speel geluid af bij voeding
    feedSound.play(); // Speel het voedgeluid af
    updateDisplay(); // Update het display na het voeden
}

// Slaapfuncties
function sleep() {
    // Controleer de energie van de hamster
    if (hamster.irritatie >= 4) {
        console.log("Hamtaro is weggerend van de irritatie. Start opnieuw.");
        updateDisplay();
        return; // stopt als hamster is weggerend
    }

    // Herstel de energie van de hamster
    hamster.energy = Math.min(hamster.energy + 30, 100); // = energie tot 100max
    console.log("Hamtaro heeft geslapen, zijn energie is nu:", hamster.energy);
    
    // Speel het slaapgeluid af
    sleepSound.play(); // Voegt de geluidsspelingsregel toe

    updateDisplay(); // Update het display na het slapen
}

// Spelfuncties 
const keuzes = ['steen', 'papier', 'schaar'];
const resultDiv = document.getElementById('resultaat');

// Functie om een willekeurige keuze voor de computer te krijgen
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * keuzes.length);
    return keuzes[randomIndex];
}

// Functie om het spel te spelen
function playGame(playerChoice) {
    if (hamster.energy <= 0) {
        hamster.noEnergyAttempts++; // Verhoog het aantal pogingen zonder energie
        console.log("Hamtaro heeft geen energie meer! Laat hem rusten door te slapen.");
        return; // Stop uitvoering als Hamtaro geen energie meer heeft
    }

    const computerChoice = getComputerChoice();

    console.log(`Speler keuze: ${playerChoice}, Computer keuze: ${computerChoice}`);
    
    // Verminder 10 energie bij elke keer spelen
    hamster.energy = Math.max(hamster.energy - 10, 0); // Zorg ervoor dat energie niet onder 0 gaat

    // chatgpt gevraagd: hoe ik via if else statement de kans kan aanpassen resultaat winnen of verliezen? meer richting 50/50
    let outcome = Math.random(); // Genereer een willekeurige waarde tussen 0 en 1
    if (outcome < 0.33) { // 33% kans op verlies (computer wint)
        resultDiv.innerHTML = `Je verliest! ${computerChoice} verslaat ${playerChoice}.`;
        updateHamsterblijheid(10); // Hamtaro wint 10 blijheid bij verlies
    } else if (outcome < 0.66) { // 33% kans op gelijkspel
        resultDiv.innerHTML = `Het is gelijkspel! Jullie hebben allebei ${playerChoice} gekozen.`; 
    } else { // 34% kans op winst (speler wint)
        resultDiv.innerHTML = `Je wint! ${playerChoice} verslaat ${computerChoice}.`;
        updateHamsterblijheid(-10); // Hamtaro verliest 10 blijheid bij winst
    }

    // Verhoog het aantal gespeelde spellen
    hamster.gamesPlayed++;

    // Controleer of de honger moet worden verlaagd
    if (hamster.gamesPlayed % 4 === 0) {
        hamster.hunger = Math.max(hamster.hunger - 10, 0); // Verminder honger elke 4 spellen
        console.log("Honger verminderd na 4 spellen spelen.");
    }

    // Reset het aantal pogingen zonder energie als de energie weer groter is dan 0
    if (hamster.energy > 0) {
        hamster.noEnergyAttempts = 0; // Reset pogingen zonder energie
    }

    updateDisplay(); // Update het display na elke keer spelen
}

// ** Update Functies **
function updateDisplay() {
    const hamsterStatus = document.getElementById('hamsterStatus');
    const resetButton = document.getElementById('resetButton'); // Krijg de reset-knop

    // Update de interface, controleer of de hamster nog leeft
    if (hamster.irritatie >= 4) {
        hamsterStatus.innerHTML = `
            <h2>Status van Hamtaro</h2>
            <p>Hamtaro is weggerend vanwege irritatie. Wil je een nieuw leven starten?</p>
        `;
        resetButton.style.display = 'block'; // Maak de reset knop zichtbaar
    } else {
        hamsterStatus.innerHTML = `
            <h2>Status van Hamtaro</h2>
            <p>Naam: ${hamster.name}</p>
            <p>Energie: ${hamster.energy}</p>
            <p>Gezondheid: ${hamster.health}</p>
            <p>Honger: ${hamster.hunger}</p>
            <p>Blijheid: ${hamster.blijheid}</p> <!-- Gewijzigd van happiness naar blijheid -->
            <p>Irritatie: ${hamster.irritatie}/4</p> <!-- Weergave als 1/4, 2/4, 3/4 of 4/4 -->
        `;

        // Controleer of de hamster recentelijk overvoed is en toon melding
        if (hamster.feedAttempts > 0) {
            hamsterStatus.innerHTML += `
                <p>Probeer Hamtaro niet te overvoeden! Hij is inmiddels al ${hamster.feedAttempts} keer geïrriteerd geweest.</p>
            `;
        }

        // Meld dat de hamster energie nodig heeft
        if (hamster.energy <= 0) {
            hamsterStatus.innerHTML += `<p>Hamtaro heeft geen energie meer! Laat hem rusten (slaap knop) om zijn energie te herstellen.</p>`;
        }

        resetButton.style.display = 'none'; // Maak de reset knop onzichtbaar
    }
}

// Functie om een nieuw leven te starten
function restartLife() {
    // Reset de hamster naar de beginwaarden
    hamster.energy = 50;
    hamster.health = 100;
    hamster.hunger = 50;
    hamster.blijheid = 50; // Gewijzigd van happiness naar blijheid
    hamster.irritatie = 0; // Reset de irritatie
    hamster.feedAttempts = 0; // Reset de voedingspogingen
    hamster.gamesPlayed = 0; // Reset het aantal gespeelde spellen
    hamster.noEnergyAttempts = 0; // Reset de pogingen zonder energie
    updateDisplay(); // Update het display na het herstarten
    console.log("Een nieuw leven voor Hamtaro is gestart!");
}

// Functie om de blijheid van Hamtaro bij te werken
function updateHamsterblijheid(change) {
    hamster.blijheid += change;
    hamster.blijheid = Math.max(0, Math.min(100, hamster.blijheid)); // Zorgt ervoor dat blijheid tussen 0 en 100 blijft
    updateDisplay(); // Update het display na het wijzigen van blijheid
}


function setupEventListeners() {
    document.getElementById('feedButton').addEventListener('click', feed);
    document.getElementById('sleepButton').addEventListener('click', sleep); 
    document.getElementById('resetButton').addEventListener('click', restartLife);
}

// Setup event listeners
setupEventListeners();
updateDisplay();


// Event listener voor de 'Spelen' knop
// chatgpt gevraagd hoe kan ik pas het spel laten starten nadat ik de knop spelen heb ingedrukt?
document.getElementById('playButton').addEventListener('click', () => {
    toggleGamePlay(true); // Maak het spel speelbaar
});

// Functie om de knoppen in- of uit te schakelen
// chatgpt gevraagd hoe kan ik pas het spel laten starten nadat ik de knop spelen heb ingedrukt?
function toggleGamePlay(enabled) {
    const keuzesSection = document.getElementById('keuzes');
    keuzesSection.style.display = enabled ? 'block' : 'none'; 

    if (enabled) {
        resultDiv.innerHTML = ""; // Wis het resultaat
    }
}

// Event listeners voor de opties
const optionsButtons = document.querySelectorAll('.keuze');
optionsButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const playerChoice = event.target.id; // wanneer de speler op een knop klikt, wordt de id van de knop opgeslagen
        playGame(playerChoice); // Speel het spel met de gekozen optie
    });
});