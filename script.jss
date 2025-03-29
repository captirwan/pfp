const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Pilihan elemen
const hairSelect = document.getElementById("hair");
const eyesSelect = document.getElementById("eyes");
const clothesSelect = document.getElementById("clothes");
const hatSelect = document.getElementById("hat");
const glassesSelect = document.getElementById("glasses");

const randomizeBtn = document.getElementById("randomize");
const downloadBtn = document.getElementById("download");

function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function drawLayer(imageSrc) {
        return new Promise((resolve) => {
            if (imageSrc === "none") return resolve();
            const img = new Image();
            img.src = `assets/${imageSrc}`;
            img.onload = () => {
                ctx.drawImage(img, 0, 0, 300, 300);
                resolve();
            };
        });
    }

    Promise.all([
        drawLayer(hairSelect.value),
        drawLayer(eyesSelect.value),
        drawLayer(clothesSelect.value),
        drawLayer(hatSelect.value),
        drawLayer(glassesSelect.value)
    ]).then(() => console.log("Character drawn successfully"));
}

// Fungsi Randomizer
function getRandomOption(selectElement) {
    const options = selectElement.options;
    return options[Math.floor(Math.random() * options.length)].value;
}

function randomizeCharacter() {
    hairSelect.value = getRandomOption(hairSelect);
    eyesSelect.value = getRandomOption(eyesSelect);
    clothesSelect.value = getRandomOption(clothesSelect);
    hatSelect.value = getRandomOption(hatSelect);
    glassesSelect.value = getRandomOption(glassesSelect);

    drawCharacter();
}

// Event Listeners
randomizeBtn.addEventListener("click", randomizeCharacter);
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "custom_pfp.png";
    link.href = canvas.toDataURL();
    link.click();
});

// Generate pertama kali
drawCharacter();
