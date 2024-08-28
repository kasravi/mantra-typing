var drawerBtn = document.getElementById("drawer-button");
drawerBtn.addEventListener("click", toggleDrawer);
var pin = document.getElementById("pin");
var container = document.querySelector(".circumplex-container");

import { words } from "./words.js";
import { words_all } from "./words_all.js";
import { words_alpha } from "./words_alpha.js";

var userInput = "",
  word = "",
  arousal = 0,
  valence = 1,
  wordBucket = getClosestWords(1, 0, 100);
document.getElementsByTagName("html")[0].addEventListener("click", closeDrawer);

//settings load and save
function saveSettings() {
  const settings = {
    waitForCorrect: document.getElementById("waitForCorrect").checked,
    beepForWrong: document.getElementById("beepForWrong").checked,
    readAload: document.getElementById("readAload").checked,
    lowerOnly: document.getElementById("lowerOnly").checked,
    config: document.getElementById("config").value,
    corpus: document.getElementById("corpus").value
  };
  localStorage.setItem("mantraTypingSettings", JSON.stringify(settings));
}

document.getElementById("waitForCorrect").addEventListener("change", saveSettings);
document.getElementById("beepForWrong").addEventListener("change", saveSettings);
document.getElementById("readAload").addEventListener("change", saveSettings);
document.getElementById("lowerOnly").addEventListener("change", saveSettings);
document.getElementById("config").addEventListener("change", saveSettings);
document.getElementById("corpus").addEventListener("change", saveSettings);

function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("mantraTypingSettings"));
  if (settings) {
    document.getElementById("waitForCorrect").checked = settings.waitForCorrect;
    document.getElementById("beepForWrong").checked = settings.beepForWrong;
    document.getElementById("readAload").checked = settings.readAload;
    document.getElementById("lowerOnly").checked = settings.lowerOnly;
    document.getElementById("config").value = settings.config;
    document.getElementById("corpus").value = settings.corpus;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSettings();
  show(); // Ensure to call show after loading settings
});


function show() {
  userInput = "";
  const newRandomIndex = Math.floor(Math.random() * wordBucket.length);
  word = wordBucket[newRandomIndex];

  if(document.getElementById("lowerOnly").checked){
    word = word.toLowerCase();
  }

  if (document.getElementById("readAload").checked) {
    speakWord(word);
  }

  showHelp(word[0]);
  wordDisplay.textContent = word;
  wordDisplayUser.textContent = "";
  centerContent();
}

document.getElementById("corpus").addEventListener("change", function () {
    wordBucket = getClosestWords(valence, arousal, 100);
  show();
});

function beep() {
  var snd = new  Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
  snd.play();
}

document.getElementById("onlyLetters").addEventListener("click", () => {
  wordBucket = Object.keys(helpDict[document.getElementById("config").value]);
  show();
});

function centerContent() {
  const wordContainer = document.getElementById("wordContainer");
  const wordDisplay = document.getElementById("wordDisplay");
  const leftValue = (window.innerWidth - wordDisplay.offsetWidth) / 2;
  wordContainer.style.left = leftValue + "px";
}

window.addEventListener("resize", centerContent);

function getClosestWords(targetValence, targetArousal, n) {
  const selectedCorpus = document.getElementById("corpus").value;
  if (selectedCorpus !== "words") {
    if (selectedCorpus === "words_all") {
      return words_all.map(f=>f.w);  // Load all words, ignoring arousal and valence
    } else if (selectedCorpus === "words_alpha") {
      return words_alpha.map(f=>f.w);  // Load alpha words, ignoring arousal and valence
    }
  }

  const distances = [];

  words.forEach((wordData) => {
    const distance = Math.sqrt(
      Math.pow(targetValence - wordData.v, 2) +
        Math.pow(targetArousal - wordData.a, 2)
    );
    distances.push({ word: wordData.w, distance: distance });
  });

  distances.sort((a, b) => a.distance - b.distance);

  return distances.slice(0, n).map((entry) => entry.word);
}


pin.addEventListener("mousedown", function (event) {
  event.preventDefault();
  var shiftX = event.clientX - pin.getBoundingClientRect().left;
  var shiftY = event.clientY - pin.getBoundingClientRect().top;

  function movePin(event) {
    var newX = event.clientX - shiftX - container.getBoundingClientRect().left;
    var newY = event.clientY - shiftY - container.getBoundingClientRect().top;

    newX = Math.min(
      container.clientWidth - pin.offsetWidth / 2,
      Math.max(-pin.offsetWidth / 2, newX)
    );
    newY = Math.min(
      container.clientHeight - pin.offsetHeight / 2,
      Math.max(-pin.offsetHeight / 2, newY)
    );

    pin.style.left = newX + "px";
    pin.style.top = newY + "px";
    valence =
      (10 + newX - container.clientWidth / 2) / (container.clientWidth / 2);
    arousal =
      -(10 + newY - container.clientHeight / 2) / (container.clientHeight / 2);
  }

  function releasePin() {
    document.removeEventListener("mousemove", movePin);
    document.removeEventListener("mouseup", releasePin);
    wordBucket = getClosestWords(valence, arousal, 100);
    show();
  }

  document.addEventListener("mousemove", movePin);
  document.addEventListener("mouseup", releasePin);
});

function toggleDrawer() {
  var drawer = document.getElementById("myDrawer");
  drawer.classList.toggle("open");
}

function closeDrawer(e) {
  var drawer = document.getElementById("myDrawer");

  var drawerBtn = document.getElementById("drawer-button");

  if (drawer.contains(e.target) || drawerBtn.contains(e.target)) return;
  drawer.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", function () {
  show();

  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if(key=="Shift") return;
    if (key !== "Backspace") {
      if (
        document.getElementById("waitForCorrect").checked &&
        word[userInput.length] !== key
      ){
        return;
      }

        if (word[userInput.length] !== key && document.getElementById("beepForWrong").checked) {
          beep();
        }

      userInput += key;
      wordDisplayUser.innerHTML = userInput
        .split("")
        .map((f, i) => {
          const style = word[i] === f ? "" : "color:red";
          return `<span style="${style}">${f}</span>`;
        })
        .join("");
      let lastGoodChar = "";
      let counter = 0;
      for (let f of word.split("")) {
        if (userInput[counter++] === f) lastGoodChar = f;
        else break;
      }
      showHelp(word[counter - 1]);
      if (userInput === word) {
        show();
      }
    } else {
      userInput = userInput.substring(0, userInput.length - 1);
      wordDisplayUser.innerHTML = userInput
        .split("")
        .map((f, i) => {
          const style = word[i] === f ? "" : "color:red";
          return `<span style="${style}">${f}</span>`;
        })
        .join("");
    }
  });
});

const helpDict = {
  qwerty: {
    q: {
      finger: "lp",
      arrow: "bi-arrow-up",
    },
    w: {
      finger: "lr",
      arrow: "bi-arrow-up",
    },
    e: {
      finger: "lm",
      arrow: "bi-arrow-up",
    },
    r: {
      finger: "li",
      arrow: "bi-arrow-up",
    },
    t: {
      finger: "li",
      arrow: "bi-arrow-up-right",
    },
    a: {
      finger: "lp",
      arrow: "bi-x-circle",
    },
    s: {
      finger: "lr",
      arrow: "bi-x-circle",
    },
    d: {
      finger: "lm",
      arrow: "bi-x-circle",
    },
    f: {
      finger: "li",
      arrow: "bi-x-circle",
    },
    g: {
      finger: "li",
      arrow: "bi-arrow-right",
    },
    z: {
      finger: "lp",
      arrow: "bi-arrow-down",
    },
    x: {
      finger: "lr",
      arrow: "bi-arrow-down",
    },
    c: {
      finger: "lm",
      arrow: "bi-arrow-down",
    },
    v: {
      finger: "li",
      arrow: "bi-arrow-down",
    },
    b: {
      finger: "li",
      arrow: "bi-arrow-down-right",
    },
    //////
    p: {
      finger: "rp",
      arrow: "bi-arrow-up",
    },
    o: {
      finger: "rr",
      arrow: "bi-arrow-up",
    },
    i: {
      finger: "rm",
      arrow: "bi-arrow-up",
    },
    u: {
      finger: "ri",
      arrow: "bi-arrow-up",
    },
    y: {
      finger: "ri",
      arrow: "bi-arrow-up-left",
    },
    ";": {
      finger: "rp",
      arrow: "bi-x-circle",
    },
    l: {
      finger: "rr",
      arrow: "bi-x-circle",
    },
    k: {
      finger: "rm",
      arrow: "bi-x-circle",
    },
    j: {
      finger: "ri",
      arrow: "bi-x-circle",
    },
    h: {
      finger: "ri",
      arrow: "bi-arrow-left",
    },
    "/": {
      finger: "rp",
      arrow: "bi-arrow-down",
    },
    ".": {
      finger: "rr",
      arrow: "bi-arrow-down",
    },
    ",": {
      finger: "rm",
      arrow: "bi-arrow-down",
    },
    m: {
      finger: "ri",
      arrow: "bi-arrow-down",
    },
    n: {
      finger: "ri",
      arrow: "bi-arrow-down-left",
    },
    " ": {
      finger: "ts",
      arrow: "bi-x-circle",
    },
    //
    '1': { finger: "lp", arrow: "bi-arrow-up" },
    '2': { finger: "lr", arrow: "bi-arrow-up" },
    '3': { finger: "lm", arrow: "bi-arrow-up" },
    '4': { finger: "li", arrow: "bi-arrow-up" },
    '5': { finger: "li", arrow: "bi-arrow-up-right" },
    '6': { finger: "ri", arrow: "bi-arrow-up-left" },
    '7': { finger: "ri", arrow: "bi-arrow-up" },
    '8': { finger: "rm", arrow: "bi-arrow-up" },
    '9': { finger: "rr", arrow: "bi-arrow-up" },
    '0': { finger: "rp", arrow: "bi-arrow-up" },
    '!': { finger: "lp", arrow: "bi-arrow-up" },
    '@': { finger: "lr", arrow: "bi-arrow-up" },
    '#': { finger: "lm", arrow: "bi-arrow-up" },
    '$': { finger: "li", arrow: "bi-arrow-up" },
    '%': { finger: "li", arrow: "bi-arrow-up-right" },
    '^': { finger: "ri", arrow: "bi-arrow-up-left" },
    '&': { finger: "ri", arrow: "bi-arrow-up" },
    '*': { finger: "rm", arrow: "bi-arrow-up" },
    '(': { finger: "rr", arrow: "bi-arrow-up" },
    ')': { finger: "rp", arrow: "bi-arrow-up" },
    '-': { finger: "rp", arrow: "bi-arrow-up-right" },
    '_': { finger: "rp", arrow: "bi-arrow-up-right" },
    '=': { finger: "rp", arrow: "bi-x-circle" },
    '+': { finger: "rp", arrow: "bi-x-circle" },
    '[': { finger: "rp", arrow: "bi-arrow-up-right" },
    ']': { finger: "rp", arrow: "bi-arrow-up-right" },
    '{': { finger: "rp", arrow: "bi-arrow-up-right" },
    '}': { finger: "rp", arrow: "bi-arrow-up-right" },
    '\\': { finger: "rp", arrow: "bi-arrow-up" },
    '|': { finger: "rp", arrow: "bi-arrow-up" },
    ':': { finger: "rp", arrow: "bi-x-circle" },
    "'": { finger: "rp", arrow: "bi-x-circle" },
    '"': { finger: "rp", arrow: "bi-x-circle" },
    '<': { finger: "rm", arrow: "bi-arrow-down" },
    '>': { finger: "rr", arrow: "bi-arrow-down" },
    '?': { finger: "rp", arrow: "bi-arrow-down" }
  },
};
const showHelp = (c) => {
  [...document.getElementsByClassName("arrows")].forEach((f) => {
    f.style.display = "none";
  });

  let t = helpDict[document.getElementById("config").value][c];
  if (!t) return;
  let element = document.getElementById(t.finger);
  const classes = element.classList;

  if (classes.length > 0) {
    const lastClass = classes.item(classes.length - 1);
    classes.replace(lastClass, t.arrow);
    element.style.display = "block";
  }
};

function speakWord(txt) {
  if ("speechSynthesis" in window) {
    var utterance = new SpeechSynthesisUtterance(txt);
    utterance.rate = 0.5;
    utterance.pitch = 0.8;
    utterance.volume = 0.5;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser doesn't support text to speech.");
  }
}
