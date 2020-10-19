import anime from 'animejs';

const skills = document.querySelectorAll('.skills__item');

skills.forEach(skill => {
    function scrollChaek() {
        if (screen.height > skill.getBoundingClientRect().top) {
            const number = parseInt(skill.querySelector('.skills__percent').textContent);
            const up = { number1: 0 };
            
            anime({
                targets: up,
                number1: number,
                round: 10,
                duration: 2500,
                easing: 'easeInOutExpo',
                update() {
                    skill.querySelector('.skills__progress').style.width = up.number1 + '%';
                },
                complete() {
                    const percent = skill.querySelector('.skills__percent');
                    percent.classList.add('skills__percent--visible');
                    const bar = skill.querySelector('.skills__bar');
                    bar.classList.add('skills__bar--finished');
                }
            });
            
            window.removeEventListener('scroll', scrollChaek);
        }
    }
    
    window.addEventListener('scroll', scrollChaek);
});
