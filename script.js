"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const animals = document.querySelectorAll(".img150");
    const startButton = document.querySelector(".nextPageButton");
    const backButton = document.querySelector(".backToPickAnimal");
    let selectedAnimal = null;
    animals.forEach(animal => {
        animal.addEventListener("click", () => {
            selectedAnimal = animal.src;
            animals.forEach(a => a.classList.remove('selected')); // Remove the red border from all animals
            animal.classList.add('selected'); // Add the red border to the clicked animal
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
    if (selectedAnimalSrc) {
        const selectedAnimalImg = document.createElement("img");
        selectedAnimalImg.src = selectedAnimalSrc;
        selectedAnimalImg.classList.add("img150");
        selectedAnimalImg.id = "selectedAnimalImg"; // Add an ID for the selected animal image
        (_a = document.getElementById("selectedAnimal")) === null || _a === void 0 ? void 0 : _a.appendChild(selectedAnimalImg);
        gameElement.style.display = "block";
        if (mainElement) {
            mainElement.style.display = "none";
        }
    }
    let hunger = 100;
    let health = 100;
    let fun = 100;
    setInterval(() => {
        hunger = Math.max(0, hunger - 1);
        if (hunger <= 95) {
            health = Math.max(0, health - 1);
        }
        hungerBar.value = hunger;
        healthBar.value = health;
    }, 10000); // 1 minute
    feedButton === null || feedButton === void 0 ? void 0 : feedButton.addEventListener("click", () => {
        hunger = Math.min(100, hunger + 20);
        hungerBar.value = hunger;
    });
    funButton === null || funButton === void 0 ? void 0 : funButton.addEventListener("click", () => {
        health = Math.min(100, health + 5);
        healthBar.value = health;
        const selectedAnimalImg = document.getElementById("selectedAnimalImg");
        if (selectedAnimalImg) {
            selectedAnimalImg.classList.add("spinning");
            // Remove the spinning class after the animation ends to allow re-triggering
            setTimeout(() => {
                selectedAnimalImg.classList.remove("spinning");
            }, 10000); // 2 seconds, same as the animation duration
        }
    });
});
