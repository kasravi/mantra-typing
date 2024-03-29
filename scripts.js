var drawerBtn = document.getElementById("drawer-button");
drawerBtn.addEventListener("click", toggleDrawer);
var pin = document.getElementById("pin");
var container = document.querySelector(".circumplex-container");

import { words } from "./words.js";
var userInput = "",
  word = "",
  arousal = 0,
  valence = 1,
  wordBucket = getClosestWords(1, 0, 100);
document.getElementsByTagName("html")[0].addEventListener("click", closeDrawer);

function show() {
  userInput = "";
  const newRandomIndex = Math.floor(Math.random() * wordBucket.length);
  word = wordBucket[newRandomIndex];
  if (document.getElementById("readAload").checked) {
    speakWord(word);
  }
  showHelp(word[0]);
  wordDisplay.textContent = word;
  wordDisplayUser.textContent = "";
  centerContent();
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
    if (key !== "Backspace") {
      if (
        document.getElementById("waitForCorrect").checked &&
        word[userInput.length] !== key
      )
        return;
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
