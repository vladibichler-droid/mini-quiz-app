/*
  Verbindung zu Elementen aus der HTML-Datei.
  Diese Elemente werden wir mit JavaScript verändern.
*/
const frageStatus = document.querySelector("#frageStatus");
const punkteStatus = document.querySelector("#punkteStatus");
const highscoreStatus = document.querySelector("#highscoreStatus");
const fortschrittProzent = document.querySelector("#fortschrittProzent");
const fortschrittBalken = document.querySelector("#fortschrittBalken");
const kategorieText = document.querySelector("#kategorieText");
const frageText = document.querySelector("#frageText");
const antwortenBereich = document.querySelector("#antwortenBereich");
const meldung = document.querySelector("#meldung");
const weiterButton = document.querySelector("#weiterButton");

/*
  Hier speichern wir unsere Quizfragen.
*/
const quizFragen = [
  {
    kategorie: "HTML",
    frage: "Wofür ist HTML hauptsächlich zuständig?",
    antworten: [
      "Für die Struktur einer Webseite",
      "Für das Speichern von Passwörtern",
      "Für das Bearbeiten von Bildern",
      "Für das Einschalten des Computers"
    ],
    richtigeAntwort: 0
  },
  {
    kategorie: "CSS",
    frage: "Wofür ist CSS hauptsächlich zuständig?",
    antworten: [
      "Für das Design einer Webseite",
      "Für den Akku vom Laptop",
      "Für das Erstellen von Ordnern",
      "Für das Hochladen zu GitHub"
    ],
    richtigeAntwort: 0
  },
  {
    kategorie: "JavaScript",
    frage: "Was macht JavaScript auf einer Webseite?",
    antworten: [
      "Es macht die Webseite interaktiv",
      "Es ersetzt den Bildschirm",
      "Es löscht automatisch Dateien",
      "Es schaltet WLAN ein"
    ],
    richtigeAntwort: 0
  },
  {
    kategorie: "GitHub",
    frage: "Wofür benutzt man GitHub häufig?",
    antworten: [
      "Um Code-Projekte zu speichern und zu teilen",
      "Um den Bildschirm heller zu machen",
      "Um den Router neu zu starten",
      "Um Fotos automatisch zu löschen"
    ],
    richtigeAntwort: 0
  },
  {
    kategorie: "Programmieren",
    frage: "Warum testet man ein Projekt Schritt für Schritt?",
    antworten: [
      "Damit man Fehler schneller findet",
      "Damit der Code länger aussieht",
      "Damit der Computer lauter wird",
      "Damit Dateien verschwinden"
    ],
    richtigeAntwort: 0
  }
];

/*
  Diese Variablen merken sich den aktuellen Stand.
*/
let aktuelleFrageIndex = 0;
let punkte = 0;
let frageWurdeBeantwortet = false;
let quizIstBeendet = false;

let highscore = Number(localStorage.getItem("quizHighscore")) || 0;

/*
  Diese Funktion aktualisiert den Fortschrittsbalken.
*/
function fortschrittAktualisieren() {
  const aktuelleFragenNummer = aktuelleFrageIndex + 1;
  const prozent = Math.round((aktuelleFragenNummer / quizFragen.length) * 100);

  fortschrittProzent.textContent = `${prozent}%`;
  fortschrittBalken.style.width = `${prozent}%`;
}
/*
  Diese Funktion aktualisiert die Highscore-Anzeige.
*/
function highscoreAnzeigen() {
  highscoreStatus.textContent = `Highscore: ${highscore} Punkte`;
}
/*
  Diese Funktion zeigt eine Frage auf der Webseite an.
*/
function frageAnzeigen() {
  const aktuelleFrage = quizFragen[aktuelleFrageIndex];

  frageWurdeBeantwortet = false;
  quizIstBeendet = false;

  frageStatus.textContent = `Frage ${aktuelleFrageIndex + 1} von ${quizFragen.length}`;
punkteStatus.textContent = `${punkte} Punkte`;

fortschrittAktualisieren();
highscoreAnzeigen();

kategorieText.textContent = aktuelleFrage.kategorie;
frageText.textContent = aktuelleFrage.frage;

  antwortenBereich.innerHTML = "";

  aktuelleFrage.antworten.forEach(function (antwort, index) {
    const antwortButton = document.createElement("button");

    antwortButton.textContent = antwort;

    antwortButton.addEventListener("click", function () {
      antwortPruefen(index);
    });

    antwortenBereich.appendChild(antwortButton);
  });

  weiterButton.disabled = true;
  weiterButton.textContent = "Weiter";

  meldung.textContent = "Wähle eine Antwort aus.";
}

/*
  Diese Funktion prüft die angeklickte Antwort.
*/
function antwortPruefen(gewaehlteAntwort) {
  if (frageWurdeBeantwortet === true) {
    return;
  }

  frageWurdeBeantwortet = true;

  const aktuelleFrage = quizFragen[aktuelleFrageIndex];
  const alleAntwortButtons = antwortenBereich.querySelectorAll("button");

  alleAntwortButtons.forEach(function (button) {
    button.disabled = true;
  });

  alleAntwortButtons[aktuelleFrage.richtigeAntwort].classList.add("richtig");

  if (gewaehlteAntwort === aktuelleFrage.richtigeAntwort) {
    punkte = punkte + 1;
    punkteStatus.textContent = `${punkte} Punkte`;
    meldung.textContent = "Richtig! Du bekommst 1 Punkt.";
  } else {
    alleAntwortButtons[gewaehlteAntwort].classList.add("falsch");
    meldung.textContent = "Nicht ganz. Die grüne Antwort wäre richtig gewesen.";
  }

  weiterButton.disabled = false;

  if (aktuelleFrageIndex < quizFragen.length - 1) {
    weiterButton.textContent = "Nächste Frage";
  } else {
    weiterButton.textContent = "Ergebnis anzeigen";
  }
}

/*
  Diese Funktion lädt die nächste Frage.
*/
function naechsteFrageAnzeigen() {
  if (aktuelleFrageIndex < quizFragen.length - 1) {
    aktuelleFrageIndex = aktuelleFrageIndex + 1;
    frageAnzeigen();
    return;
  }

  ergebnisAnzeigen();
}

/*
  Diese Funktion zeigt am Ende das Ergebnis.
*/
function ergebnisAnzeigen() {
  quizIstBeendet = true;

  frageStatus.textContent = "Quiz abgeschlossen";
punkteStatus.textContent = `${punkte} von ${quizFragen.length} Punkten`;

if (punkte > highscore) {
  highscore = punkte;
  localStorage.setItem("quizHighscore", highscore);
}

highscoreAnzeigen();

fortschrittProzent.textContent = "100%";
fortschrittBalken.style.width = "100%";

  kategorieText.textContent = "Ergebnis";
  frageText.textContent = "Dein Quiz-Ergebnis";

  antwortenBereich.innerHTML = "";

  const ergebnisBox = document.createElement("div");
  ergebnisBox.classList.add("ergebnis-box");

  const ergebnisZahl = document.createElement("p");
  ergebnisZahl.classList.add("ergebnis-zahl");
  ergebnisZahl.textContent = `${punkte} / ${quizFragen.length}`;

  const ergebnisText = document.createElement("p");
  ergebnisText.classList.add("ergebnis-text");
  ergebnisText.textContent = ergebnisTextErstellen();

  ergebnisBox.appendChild(ergebnisZahl);
  ergebnisBox.appendChild(ergebnisText);

  antwortenBereich.appendChild(ergebnisBox);

  meldung.textContent = "Das Quiz ist fertig. Du kannst es neu starten.";
  weiterButton.disabled = false;
  weiterButton.textContent = "Quiz neu starten";
}

/*
  Diese Funktion erstellt einen passenden Ergebnistext.
*/
function ergebnisTextErstellen() {
  if (punkte === quizFragen.length) {
    return "Sehr stark! Du hast alle Fragen richtig beantwortet.";
  }

  if (punkte >= 3) {
    return "Gut gemacht! Du hast schon viel verstanden.";
  }

  if (punkte >= 1) {
    return "Das ist ein Anfang. Beim nächsten Durchgang wird es leichter.";
  }

  return "Kein Stress. Das Quiz ist zum Üben da, nicht zum Perfektsein.";
}

/*
  Diese Funktion startet das Quiz wieder von vorne.
*/
function quizNeuStarten() {
  aktuelleFrageIndex = 0;
  punkte = 0;
  frageWurdeBeantwortet = false;
  quizIstBeendet = false;

  frageAnzeigen();
}

/*
  Beim Klick auf den Button passiert je nach Zustand etwas anderes.
*/
weiterButton.addEventListener("click", function () {
  if (quizIstBeendet === true) {
    quizNeuStarten();
    return;
  }

  naechsteFrageAnzeigen();
});

/*
  Beim Start der Webseite wird direkt die erste Frage angezeigt.
*/
highscoreAnzeigen();
frageAnzeigen();
/*
  Diese Ausgabe sieht man nur in der Entwicklerkonsole.
*/
console.log("Mini-Quiz-App Version 6A ist gestartet.");