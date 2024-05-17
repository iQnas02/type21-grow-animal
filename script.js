"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".nextPageButton");
    if (startButton) {
        startButton.addEventListener("click", () => {
            window.location.href = "second.html";
        });
    }
});
