// ================= PINNED STACKED-PANEL SCROLL =================
// Each section freezes in place at the top of the screen while the next
// one slides up and covers it — so scrolling reads like flipping through
// panels instead of a normal continuous scroll.
//
// Only sections that fit within one screen are pinned. A section taller
// than the viewport (like the Projects list) is left to scroll normally,
// so none of its content ever gets stuck off-screen — it still gets slid
// over by whatever section comes after it, so the stacking feel carries
// through the whole page.
//
// Registered first and independently of everything below, so that if any
// other script on the page (AOS, Typed.js, etc.) fails to load, this
// effect still runs.
// ================= PINNED FADE STACK SCROLL =================

// ================= APPLE STYLE PINNED SCROLL =================

window.addEventListener("load", () => {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        console.error("GSAP or ScrollTrigger not loaded");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray("body > section[id]");

    sections.forEach((section, index) => {

        const nextSection = sections[index + 1];

        if (!nextSection) return;

        // Skip very tall sections
        if (section.offsetHeight > window.innerHeight * 1.1) return;

        gsap.set(section, {
            position: "relative",
            zIndex: index + 1,
            transformOrigin: "center center"
        });

        /*
         * PIN CURRENT SECTION
         */
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            endTrigger: nextSection,
            end: "top top",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1
        });

        /*
         * CURRENT SECTION GOES BACK
         */
        gsap.to(section, {
            scale: 0.88,
            opacity: 0.25,
            filter: "blur(8px)",
            y: -40,
            ease: "none",

            scrollTrigger: {
                trigger: nextSection,
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        });

        /*
         * NEXT SECTION COMES FORWARD
         */
        gsap.fromTo(
            nextSection,

            {
                scale: 1.08,
                opacity: 0.7,
                y: 80,
                filter: "blur(6px)"
            },

            {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                ease: "none",

                scrollTrigger: {
                    trigger: nextSection,
                    start: "top bottom",
                    end: "top top",
                    scrub: true
                }
            }
        );

    });

    ScrollTrigger.refresh();

});

if (typeof AOS !== "undefined") {
    AOS.init({
        duration:1000
    });
}


const navbar=document.getElementById("navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.style.padding="12px 8%";

        navbar.style.background="#08111f";

    }

    else{

        navbar.style.padding="18px 8%";

        navbar.style.background="rgba(7,17,31,.6)";

    }

});

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 80;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target + "+";

                }

            };

            update();

            observer.unobserve(counter);

        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));


window.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1800);

});

const cards = document.querySelectorAll(".project-card");

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const centerX = rect.width/2;

        const centerY = rect.height/2;

        const rotateY = (x-centerX)/18;

        const rotateX = -(y-centerY)/18;

        card.style.transform=`
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
        `;

        card.style.setProperty("--x",`${x}px`);
        card.style.setProperty("--y",`${y}px`);

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=`
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
        `;

    });

});