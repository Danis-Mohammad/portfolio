AOS.init({
    duration:1000
});


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