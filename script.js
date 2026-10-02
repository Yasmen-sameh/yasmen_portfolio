/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});


/* =========================
   NEURAL NETWORK CANVAS
========================= */

const canvas = document.getElementById("neuralCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width;
let height;

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* Create particles */

const particleCount =
    window.innerWidth < 700 ? 35 : 65;


for (let i = 0; i < particleCount; i++) {

    particles.push({

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        radius: Math.random() * 1.8 + 0.5,

        speedX: (Math.random() - 0.5) * 0.25,

        speedY: (Math.random() - 0.5) * 0.25

    });

}


/* Draw neural network */

function drawNetwork() {

    ctx.clearRect(0, 0, width, height);


    particles.forEach(p => {

        p.x += p.speedX;
        p.y += p.speedY;


        if (p.x < 0 || p.x > width) {
            p.speedX *= -1;
        }


        if (p.y < 0 || p.y > height) {
            p.speedY *= -1;
        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(194,58,100,0.65)";

        ctx.fill();

    });


    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );


            if (distance < 120) {

                const opacity =
                    1 - distance / 120;


                ctx.beginPath();

                ctx.moveTo(
                    p1.x,
                    p1.y
                );

                ctx.lineTo(
                    p2.x,
                    p2.y
                );

                ctx.strokeStyle =
                    `rgba(155,28,69,${opacity * 0.18})`;

                ctx.lineWidth = 0.6;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(drawNetwork);

}


drawNetwork();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .skill-card, .project-card, .timeline-item, .contact-box"
);


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================
   PROJECT CARD MOUSE EFFECT
========================= */

const cards = document.querySelectorAll(".project-card");


cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            (y - centerY) / 35;

        const rotateY =
            (centerX - x) / 35;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-7px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});