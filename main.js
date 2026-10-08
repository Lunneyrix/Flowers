const gift = document.getElementById("gift");
const giftScene = document.getElementById("giftScene");
const giftInstruction = document.getElementById("giftInstruction");
const encouragement = document.getElementById("encouragement");
const messageHint = document.getElementById("messageHint");
const ending = document.getElementById("ending");
const endingLights = document.getElementById("endingLights");
const endingPetals = document.getElementById("endingPetals");

let opened = false;
let messageStep = 0;
let endingStarted = false;

function showMessage(text) {
  encouragement.classList.remove("show");
  void encouragement.offsetWidth;
  encouragement.textContent = text;
  encouragement.classList.add("show");

  messageStep++;

  if (messageStep < 3) {
    setTimeout(() => messageHint.classList.add("show"), 850);
  } else {
    messageHint.classList.remove("show");

    // Setelah pesan terakhir, beri waktu untuk menikmati kalimatnya
    // sebelum masuk ke ending yang lebih tenang.
    setTimeout(startEnding, 3000);
  }
}

function startEnding() {
  if (endingStarted) return;
  endingStarted = true;

  encouragement.classList.add("ending-fade");
  messageHint.classList.remove("show");

  setTimeout(() => {
    encouragement.classList.remove("show", "ending-fade");
    ending.classList.add("show");
    createEndingLights();

    // Kelopak baru muncul SETELAH blur selesai, bersamaan dengan
    // kemunculan pesan ending.
    setTimeout(() => {
      createEndingPetals();
    }, 1700);
  }, 900);
}

function createEndingLights() {
  endingLights.innerHTML = "";

  for (let i = 0; i < 18; i++) {
    const light = document.createElement("span");
    light.className = "ending-light";

    light.style.left = `${10 + Math.random() * 80}%`;
    light.style.bottom = `${8 + Math.random() * 35}%`;
    light.style.animationDelay = `${Math.random() * 2.5}s`;
    light.style.animationDuration = `${3.5 + Math.random() * 2.5}s`;
    light.style.setProperty("--drift", `${-25 + Math.random() * 50}px`);

    endingLights.appendChild(light);
  }
}


function createEndingPetals() {
  endingPetals.innerHTML = "";

  // Campuran kelopak + bunga utuh supaya jatuhannya terasa seperti
  // bunga yang benar-benar berjatuhan, bukan hanya serpihan.
  const petalCount = 56;
  const flowerCount = 42;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "ending-petal";

    petal.style.left = `${-8 + Math.random() * 116}%`;
    petal.style.top = `${-14 - Math.random() * 28}%`;
    petal.style.animationDelay = `${Math.random() * 2.6}s`;
    petal.style.animationDuration = `${5.5 + Math.random() * 4.5}s`;
    petal.style.setProperty("--sway", `${-90 + Math.random() * 180}px`);
    petal.style.setProperty("--rotate", `${180 + Math.random() * 620}deg`);
    petal.style.setProperty("--scale", `${0.55 + Math.random() * 0.8}`);

    endingPetals.appendChild(petal);
  }

  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement("span");
    flower.className = "ending-flower";

    flower.style.left = `${-10 + Math.random() * 120}%`;
    flower.style.top = `${-18 - Math.random() * 24}%`;
    flower.style.animationDelay = `${0.15 + Math.random() * 3.2}s`;
    flower.style.animationDuration = `${6.5 + Math.random() * 4.5}s`;
    flower.style.setProperty("--sway", `${-110 + Math.random() * 220}px`);
    flower.style.setProperty("--rotate", `${-80 + Math.random() * 160}deg`);
    flower.style.setProperty("--size", `${0.55 + Math.random() * 0.7}`);
    flower.style.setProperty("--drift2", `${-60 + Math.random() * 120}px`);

    // Bunga sederhana 5 kelopak + pusat bercahaya.
    for (let p = 0; p < 5; p++) {
      const petalPart = document.createElement("i");
      petalPart.style.setProperty("--p", p);
      flower.appendChild(petalPart);
    }

    const center = document.createElement("b");
    flower.appendChild(center);

    endingPetals.appendChild(flower);
  }
}

function openGift() {
  if (opened) return;
  opened = true;

  giftInstruction.style.opacity = "0";
  gift.classList.add("is-opening");

  // Setelah kado terbuka, jalankan bunga asli milik project.
  setTimeout(() => {
    giftScene.classList.add("gone");
    document.body.classList.remove("container");
  }, 620);

  // Tunggu sedikit agar bunga sempat terlihat tumbuh sebelum pesan pertama.
  setTimeout(() => {
    showMessage("You're special");
  }, 2600);
}

gift.addEventListener("click", (event) => {
  event.stopPropagation();
  openGift();
});

gift.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openGift();
  }
});

// Setelah kado dibuka, klik di mana saja untuk pindah pesan.
document.addEventListener("click", () => {
  if (!opened || endingStarted) return;

  if (messageStep === 1) {
    showMessage("Keep smiling");
  } else if (messageStep === 2) {
    showMessage("You deserve happiness");
  }
});

// Jalankan kado jatuh sejak awal, tetapi tahan animasi bunga asli.
window.addEventListener("load", () => {
  document.body.classList.add("container");
});
