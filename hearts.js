let currentEmoji = "💘";
let isFinalState = false;

// --- ÜZENETEK A MÉGSE GOMBHOZ ---
const messages = [
    "Fejezd be",
    "Nem szeretsz?",
    "Felrúglak",
    "ELÉG",
    "Nigga fr?",
    "Vicces vagy",
    "Kys"
];

// --- SZÍVEK GENERÁLÁSA ---
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    const innerHeart = document.createElement("span");
    innerHeart.innerHTML = currentEmoji;
    heart.appendChild(innerHeart);

    heart.style.left = Math.random() * 100 + "vw";
    const duration = (5 + Math.random() * 5);
    heart.style.animationDuration = duration + "s";
    heart.style.fontSize = (25 + Math.random() * 30) + "px";

    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, duration * 1000);
}
setInterval(createHeart, 300);

// --- EGÉR ELŐL MENEKÜLŐ SZÍVEK ---
document.addEventListener("mousemove", (e) => {
    const heartSpans = document.querySelectorAll(".heart span");
    heartSpans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const heartX = rect.left + rect.width / 2;
        const heartY = rect.top + rect.height / 2;
        const dx = e.clientX - heartX;
        const dy = e.clientY - heartY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const force = (100 - distance) / 100;
            const moveX = (dx / distance) * force * -80;
            const moveY = (dy / distance) * force * -80;
            span.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            span.style.transform = `translate(0, 0)`;
        }
    });
});

// ... (A szívek generálása és az egér elől menekülésük marad ugyanaz) ...

// --- GOMBOK KEZELÉSE ---
const primaryBtn = document.querySelector(".btn-primary");
const secondaryBtn = document.querySelector(".btn-secondary");
const card = document.querySelector(".card");

function moveNoButton() {
    if(isFinalState) return;

    // 1. Véletlenszerű üzenet kiválasztása a listából
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    secondaryBtn.innerText = randomMessage;
    
    // Stílus finomítás, hogy ne csússzon szét a gomb
    secondaryBtn.style.fontSize = "12px";
    secondaryBtn.style.padding = "10px 15px";
    secondaryBtn.style.whiteSpace = "nowrap";

    // 2. Kártya határainak lekérése
    const cardRect = card.getBoundingClientRect();
    const btnRect = secondaryBtn.getBoundingClientRect();

    // Kiszámoljuk a szabad helyet a kártyán belül
    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    // 3. A gomb elmozgatása (csak a Mégse gomb válik absolute pozíciójúvá)
    secondaryBtn.style.position = "absolute";
    secondaryBtn.style.left = randomX + "px";
    secondaryBtn.style.top = randomY + "px";
    secondaryBtn.style.margin = "0";
}

// "Mégse" interakciók
secondaryBtn.addEventListener("mouseover", moveNoButton);
secondaryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
});

// "NYILVÁN" gomb - Ez marad a helyén és aktiválja a sikert
primaryBtn.addEventListener("click", () => {
    if(isFinalState) return;
    isFinalState = true;
    currentEmoji = "🎉"; 
    document.querySelectorAll(".heart span").forEach(span => span.innerHTML = currentEmoji);

    card.innerHTML = `
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R1aTZtbXlrNGh6dzk4eGdsYTBwNWZwdzB1ZzdvZnFjcXNxYXJvMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rjkJD1v80CjYs/giphy.gif">
        <h2 style="color: #fc04db; margin: 10px 0; font-family: sans-serif;">LETSGOOO 🎉</h2>
        <p style="font-family: sans-serif; margin-bottom: 20px;">Mertél volna másra nyomni</p>
    `;
});