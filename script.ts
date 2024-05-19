document.addEventListener("DOMContentLoaded", () => {
    const animals = document.querySelectorAll<HTMLImageElement>(".img150");
    const startButton = document.querySelector(".nextPageButton") as HTMLButtonElement;
    const backButton = document.querySelector(".backToPickAnimal") as HTMLButtonElement;

    let selectedAnimal: string | null = null;

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

    const healthPercent = document.getElementById("healthPercent") as HTMLElement;
    const hungerPercent = document.getElementById("hungerPercent") as HTMLElement;
    const funPercent = document.getElementById("funPercent") as HTMLElement;

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

    activateGameModeButton?.addEventListener("click", () => {
        const selectedAnimalImg = document.getElementById("selectedAnimalImg");
        const mode = gameMode.value;

        if (selectedAnimalImg) {
            selectedAnimalImg.classList.remove("spinning", "move-crazy", "jumping");

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
