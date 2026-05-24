let currentSlide = 0;
let breathIndex = 0;

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');
const routineMessage = document.getElementById('routineMessage');
const breathText = document.getElementById('breathText');

const breathSteps = [
    { text: 'Breathe in', duration: 4000 },
    { text: 'Hold', duration: 2000 },
    { text: 'Breathe out', duration: 6000 }
];

chrome.storage.sync.get({ routine: 'Does opening this site help you right now?' }, function (items) {
    routineMessage.textContent = items.routine || 'Does opening this site help you right now?';
});

function cycleBreathText() {
    breathText.textContent = breathSteps[breathIndex].text;
    const duration = breathSteps[breathIndex].duration;
    breathIndex = (breathIndex + 1) % breathSteps.length;
    setTimeout(cycleBreathText, duration);
}

function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
    });

    backButton.disabled = index === 0;
    nextButton.textContent = index === slides.length - 1 ? 'Finish' : 'Next';
}

backButton.addEventListener('click', function () {
    if (currentSlide > 0) {
        currentSlide -= 1;
        showSlide(currentSlide);
    }
});

nextButton.addEventListener('click', function () {
    if (currentSlide < slides.length - 1) {
        currentSlide += 1;
        showSlide(currentSlide);
    } else {
        window.location.href = 'confirm.html';
    }
});

showSlide(currentSlide);
cycleBreathText();
