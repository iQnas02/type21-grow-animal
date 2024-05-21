
document.addEventListener("DOMContentLoaded", () => {
    const animals = document.querySelectorAll<HTMLImageElement>(".img150, .specialDiv");
    const startButton = document.querySelector(".nextPageButton") as HTMLButtonElement;
    const backButton = document.querySelector(".backToPickAnimal") as HTMLButtonElement;

    let selectedAnimal: string | null = null;

    const specialDiv=document.querySelector(".specialDiv") as HTMLDivElement;
    let pos= 0
    setInterval( ()=> {
        specialDiv.style.backgroundPosition=`-${pos}px 0`
        pos += 62
        if(pos >= 125){
            pos=0
        }
    }, 1000 )



    animals.forEach(animal => {
        animal.addEventListener("click", () => {
            selectedAnimal = animal.classList.contains('specialDiv') ? 'special' : animal.src;
            animals.forEach(a => a.classList.remove('selected'));
            animal.classList.add('selected');
        });
    });

    if (startButton) {
        startButton.addEventListener("click", () => {
            if (selectedAnimal) {
                localStorage.setItem("selectedAnimal", selectedAnimal);
                window.location.href = "second.html";
            } else {
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
    const selectedAnimalSrc = localStorage.getItem("selectedAnimal");
    const gameElement = document.querySelector("#game") as HTMLElement;
    const mainElement = document.querySelector(".main") as HTMLElement;
    const healthBar = document.getElementById("health") as HTMLProgressElement;
    const hungerBar = document.getElementById("hunger") as HTMLProgressElement;
    const funBar = document.getElementById("fun") as HTMLProgressElement;
    const feedButton = document.getElementById("feedButton") as HTMLButtonElement;
    const funButton = document.getElementById("funButton") as HTMLButtonElement;
    const gameMode = document.getElementById("gameMode") as HTMLSelectElement;
    const activateGameModeButton = document.getElementById("activateGameModeButton") as HTMLButtonElement;
    const levelDisplay = document.getElementById("levelDisplay") as HTMLElement;

    const healthPercent = document.getElementById("healthPercent") as HTMLElement;
    const hungerPercent = document.getElementById("hungerPercent") as HTMLElement;
    const funPercent = document.getElementById("funPercent") as HTMLElement;

    function updateProgressBars() {
        healthPercent.textContent = `${healthBar.value}%`;
        hungerPercent.textContent = `${hungerBar.value}%`;
        funPercent.textContent = `${funBar.value}%`;
    }
    let level = 1;
    let animalSize = 150; // Initial size of the animal image

    function updateLevelAndSize() {
        level += 1;
        levelDisplay.textContent = `Level: ${level}`;

        animalSize += 1;
        const selectedAnimalImg = document.getElementById("selectedAnimalImg") as HTMLImageElement;
        if (selectedAnimalImg) {
            selectedAnimalImg.style.width = `${animalSize}px`;
            selectedAnimalImg.style.height = `${animalSize}px`;
        }
    }

    setInterval(updateLevelAndSize, 3000);

    if (selectedAnimalSrc) {
        const selectedAnimalImg = document.createElement("img");
        if (selectedAnimalSrc === 'special') {
            selectedAnimalImg.src = "https://t3.ftcdn.net/jpg/02/22/70/10/360_F_222701056_y9el4PKXN793mIaXs6EKmR5J46rjlbPa.jpg"; // or any representative image for the special div
        } else {
            selectedAnimalImg.src = selectedAnimalSrc;
        }
        selectedAnimalImg.classList.add("img150");
        selectedAnimalImg.id = "selectedAnimalImg";
        document.getElementById("selectedAnimal")?.appendChild(selectedAnimalImg);
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

    feedButton?.addEventListener("click", () => {
        hunger = Math.min(100, hunger + 5);
        hungerBar.value = hunger;
        updateProgressBars();
    });

    funButton?.addEventListener("click", () => {
        fun = Math.min(100, fun + 5);
        funBar.value = fun;
        updateProgressBars();
    });
    function increaseHealth() {
        health = Math.min(100, health + 5);
        healthBar.value = health;
        updateProgressBars();
    }

    activateGameModeButton?.addEventListener("click", () => {
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
        increaseHealth();
    });

    updateProgressBars();
});