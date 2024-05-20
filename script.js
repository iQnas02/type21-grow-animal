"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const animals = document.querySelectorAll(".img150");
    const startButton = document.querySelector(".nextPageButton");
    const backButton = document.querySelector(".backToPickAnimal");
    let selectedAnimal = null;
    const specialDiv = document.querySelector(".specialDiv");
    let pos = 0;
    setInterval(() => {
        specialDiv.style.backgroundPosition = `-${pos}px 0`;
        pos += 62;
        if (pos >= 125) {
            pos = 0;
        }
    }, 1000);
    animals.forEach(animal => {
        animal.addEventListener("click", () => {
            selectedAnimal = animal.src;
            animals.forEach(a => a.classList.remove('selected'));
            animal.classList.add('selected');
        });
    });
    if (startButton) {
        startButton.addEventListener("click", () => {
            if (selectedAnimal) {
                localStorage.setItem("selectedAnimal", selectedAnimal);
                window.location.href = "second.html";
            }
            else {
                alert("Please select an animal!");
            }
        });
    }
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});
window.addEventListener("load", () => {
    var _a;
    const selectedAnimalSrc = localStorage.getItem("selectedAnimal");
    const gameElement = document.querySelector("#game");
    const mainElement = document.querySelector(".main");
    const healthBar = document.getElementById("health");
    const hungerBar = document.getElementById("hunger");
    const funBar = document.getElementById("fun");
    const feedButton = document.getElementById("feedButton");
    const funButton = document.getElementById("funButton");
    const gameMode = document.getElementById("gameMode");
    const activateGameModeButton = document.getElementById("activateGameModeButton");
    const healthPercent = document.getElementById("healthPercent");
    const hungerPercent = document.getElementById("hungerPercent");
    const funPercent = document.getElementById("funPercent");
    function updateProgressBars() {
        healthPercent.textContent = `${healthBar.value}%`;
        hungerPercent.textContent = `${hungerBar.value}%`;
        funPercent.textContent = `${funBar.value}%`;
    }
    if (selectedAnimalSrc) {
        const selectedAnimalImg = document.createElement("img");
        selectedAnimalImg.src = selectedAnimalSrc;
        selectedAnimalImg.classList.add("img150");
        selectedAnimalImg.id = "selectedAnimalImg";
        (_a = document.getElementById("selectedAnimal")) === null || _a === void 0 ? void 0 : _a.appendChild(selectedAnimalImg);
        gameElement.style.display = "block";
        if (mainElement) {
            mainElement.style.display = "none";
        }
    }
    let hunger = 100;
    let health = 100;
    let fun = 100;
    function decrementValues() {
        hunger = Math.max(0, hunger - 1);
        if (hunger <= 95) {
            health = Math.max(0, health - 3);
        }
        fun = Math.max(0, fun - 1);
        hungerBar.value = hunger;
        healthBar.value = health;
        funBar.value = fun;
        updateProgressBars();
    }
    setInterval(decrementValues, 10000);
    feedButton === null || feedButton === void 0 ? void 0 : feedButton.addEventListener("click", () => {
        hunger = Math.min(100, hunger + 5);
        hungerBar.value = hunger;
        updateProgressBars();
    });
    funButton === null || funButton === void 0 ? void 0 : funButton.addEventListener("click", () => {
        fun = Math.min(100, fun + 5);
        funBar.value = fun;
        updateProgressBars();
    });
    activateGameModeButton === null || activateGameModeButton === void 0 ? void 0 : activateGameModeButton.addEventListener("click", () => {
        const selectedAnimalImg = document.getElementById("selectedAnimalImg");
        const mode = gameMode.value;
        if (selectedAnimalImg) {
            selectedAnimalImg.classList.remove("spinning");
            switch (mode) {
                case "spin":
                    selectedAnimalImg.classList.add("spinning");
                    setTimeout(() => selectedAnimalImg.classList.remove("spinning"), 3000);
                    break;
            }
        }
    });
    updateProgressBars();
});
