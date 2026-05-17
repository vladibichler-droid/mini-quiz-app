/*
  Verbindung zu Elementen aus der HTML-Datei.
  Diese Elemente werden wir mit JavaScript verändern.
*/
const frageStatus = document.querySelector("#frageStatus");
const punkteStatus = document.querySelector("#punkteStatus");
const kategorieText = document.querySelector("#kategorieText");
const frageText = document.querySelector("#frageText");
const antwortenBereich = document.querySelector("#antwortenBereich");
const meldung = document.querySelector("#meldung");
const weiterButton = document.querySelector("#weiterButton");

/*
  Hier speichern wir unsere Quizfragen.
  Ein Array ist eine Liste.
  In dieser Liste liegen mehrere Frage-Objekte.
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

/*
  Diese Funktion zeigt eine Frage auf der Webseite an.
*/
function frageAnzeigen() {
  const aktuelleFrage = quizFragen[aktuelleFrageIndex];

  frageWurdeBeantwortet = false;
  quizIstBeendet = false;

  frageStatus.textContent = `Frage ${aktuelleFrageIndex + 1} von ${quizFragen.length}`;
  punkteStatus.textContent = `${punkte} Punkte`;

  kategorieText.textContent = aktuelleFrage.kategorie;
  frageText.textContent = aktuelleFrage.frage;

  /*
    Vor dem Erstellen neuer Antwort-Buttons leeren wir den Bereich.
    Sonst würden alte Buttons stehen bleiben.
  */
  antwortenBereich.innerHTML = "";

  /*
    Für jede Antwort erstellen wir einen eigenen Button.
    Der index sagt uns, ob es Antwort 0, 1, 2 oder 3 ist.
  */
  aktuelleFrage.antworten.forEach(function (antwort, index) {
    const antwortButton = document.createElement("button");

    antwortButton.textContent = antwort;

    /*
      Beim Klick auf eine Antwort wird geprüft,
      ob diese Antwort richtig oder falsch ist.
    */
    antwortButton.addEventListener("click", function () {
      antwortPruefen(index);
    });

    antwortenBereich.appendChild(antwortButton);
  });

  /*
    Der Weiter-Button ist erst gesperrt.
    Er wird erst aktiv, wenn eine Antwort angeklickt wurde.
  */
  weiterButton.disabled = true;
  weiterButton.textContent = "Weiter";

  meldung.textContent = "Wähle eine Antwort aus.";
}

/*
  Diese Funktion prüft die angeklickte Antwort.
*/
function antwortPruefen(gewaehlteAntwort) {
  /*
    Falls schon geantwortet wurde, stoppen wir die Funktion.
    Dadurch kann man nicht zweimal Punkte bekommen.
  */
  if (frageWurdeBeantwortet === true) {
    return;
  }

  frageWurdeBeantwortet = true;

  const aktuelleFrage = quizFragen[aktuelleFrageIndex];
  const alleAntwortButtons = antwortenBereich.querySelectorAll("button");

  /*
    Nach dem ersten Klick werden alle Antwortbuttons gesperrt.
    So kann man nicht mehrfach antworten.
  */
  alleAntwortButtons.forEach(function (button) {
    button.disabled = true;
  });

  /*
    Die richtige Antwort wird immer grün markiert.
  */
  alleAntwortButtons[aktuelleFrage.richtigeAntwort].classList.add("richtig");

  /*
    Wenn die gewählte Antwort richtig ist,
    bekommt der Nutzer einen Punkt.
  */
  if (gewaehlteAntwort === aktuelleFrage.richtigeAntwort) {
    punkte = punkte + 1;
    punkteStatus.textContent = `${punkte} Punkte`;
    meldung.textContent = "Richtig! Du bekommst 1 Punkt.";
  } else {
    /*
      Wenn die gewählte Antwort falsch ist,
      wird sie rot markiert.
    */
    alleAntwortButtons[gewaehlteAntwort].classList.add("falsch");
    meldung.textContent = "Nicht ganz. Die grüne Antwort wäre richtig gewesen.";
  }

  /*
    Nach einer Antwort wird der Weiter-Button aktiviert.
  */
  weiterButton.disabled = false;

  /*
    Wenn es noch weitere Fragen gibt, steht dort „Nächste Frage“.
    Bei der letzten Frage steht dort „Ergebnis anzeigen“.
  */
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
  /*
    Nur weitermachen, wenn es wirklich noch eine nächste Frage gibt.
  */
  if (aktuelleFrageIndex < quizFragen.length - 1) {
    aktuelleFrageIndex = aktuelleFrageIndex + 1;
    frageAnzeigen();
    return;
  }

  /*
    Wenn keine nächste Frage mehr da ist,
    zeigen wir das Ergebnis an.
  */
  ergebnisAnzeigen();
}

/*
  Diese Funktion zeigt am Ende das Ergebnis.
*/
function ergebnisAnzeigen() {
  quizIstBeendet = true;

  frageStatus.textContent = "Quiz abgeschlossen";
  punkteStatus.textContent = `${punkte} von ${quizFragen.length} Punkten`;

  kategorieText.textContent = "Ergebnis";
  frageText.textContent = "Dein Quiz-Ergebnis";

  /*
    Die Antwortbuttons werden entfernt.
    Stattdessen zeigen wir eine Ergebnisbox.
  */
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
  Beim Klick auf den Button passiert je nach Zustand etwas anderes:
  - während des Quiz: nächste Frage anzeigen
  - nach dem Ergebnis: Quiz neu starten
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
frageAnzeigen();

/*
  Diese Ausgabe sieht man nur in der Entwicklerkonsole.
*/
console.log("Mini-Quiz-App Version 5 ist gestartet.");