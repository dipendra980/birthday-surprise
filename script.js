/* =========================
   Scene Controller
========================= */

let currentScene = 1;

function showScene(number) {

    document.querySelectorAll(".scene").forEach(scene => {
        scene.classList.remove("active");
    });

    const selectedScene = document.getElementById("scene" + number);

    if (selectedScene) {
        selectedScene.classList.add("active");
    }

    currentScene = number;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function nextScene() {

    if (currentScene < 7) {
        showScene(currentScene + 1);
    }
}


/* =========================
   Birthday Cake
========================= */

let candlesLeft = 3;

function blowCandle(flame) {

    if (flame.classList.contains("off")) {
        return;
    }

    flame.classList.add("off");

    candlesLeft--;

    const text = document.getElementById("candleText");
    const button = document.getElementById("wishButton");

    if (candlesLeft === 2) {
        text.innerHTML = "Two more! Keep going! ✨";
    }

    else if (candlesLeft === 1) {
        text.innerHTML = "One more candle! 🕯️💕";
    }

    else {

        text.innerHTML =
            "All candles are out! Your wish is on its way! ✨💗";

        button.disabled = false;

        button.classList.add("ready");

        createSparkles();
    }
}


/* =========================
   Restart
========================= */

function restart() {

    candlesLeft = 3;

    document.querySelectorAll(".flame").forEach(flame => {
        flame.classList.remove("off");
    });

    document.getElementById("candleText").innerHTML =
        "Tap all 3 flames to make your wish! ✨";

    document.getElementById("wishButton").disabled = true;

    showScene(1);
}


/* =========================
   Floating Hearts
========================= */

const heartContainer = document.querySelector(".hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    const hearts = [
        "💗",
        "💕",
        "💖",
        "💘",
        "💓",
        "🌸",
        "✨"
    ];

    heart.innerHTML =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 6) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12000);
}

setInterval(createHeart, 500);


/* =========================
   Sparkles
========================= */

function createSparkles() {

    for (let i = 0; i < 25; i++) {

        const sparkle = document.createElement("div");

        sparkle.innerHTML = "✨";

        sparkle.style.position = "fixed";
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";
        sparkle.style.fontSize =
            (15 + Math.random() * 20) + "px";

        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "100";

        document.body.appendChild(sparkle);

        sparkle.animate(
            [
                {
                    transform: "scale(0) rotate(0deg)",
                    opacity: 0
                },
                {
                    transform: "scale(1.5) rotate(180deg)",
                    opacity: 1
                },
                {
                    transform: "scale(0) rotate(360deg)",
                    opacity: 0
                }
            ],
            {
                duration: 1500,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}


/* =========================
   Keyboard Support
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        nextScene();
    }

    if (event.key === "Escape") {
        showScene(1);
    }

});