const form = document.forms[ 0 ];
const button = form.querySelector('.button');
const errorMsgConts = document.querySelectorAll('.contact__error');
const loader = document.querySelector('.contact__loader');
const successElem = document.querySelector('.contact__success');

const errorMsg = {
    'name:size': 'Имя должно быть от 2 до 40 символов',
    'name:empty': 'Заполните поле',
    'email:empty': 'Заполните поле',
    'email:email': 'В поле должен быть валидный email адрес',
    'message:empty': 'Заполните поле',
    'message:size': 'Сообщение не должно превышать 2000 символов'
};

button.addEventListener('click', () => {
    const body = new FormData(form);
    
    loader.classList.add('contact__loader--show');
    fetch('https://email-to-me.herokuapp.com/mail', {
        method: 'POST',
        body
    })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                const errorsInfo = data.errors;
                const errors = {};
                for (const err of errorsInfo) {
                    if (!errors[ err.param ]) {
                        errors[ err.param ] = errorMsg[ `${ err.param }:${ err.msg }` ];
                    } else {
                        continue;
                    }
                }
                
                errorMsgConts.forEach(cont => {
                    const field = cont.dataset.field;
                    cont.textContent = errors[ field ];
                });
            } else {
                errorMsgConts.forEach(cont => cont.textContent = '');
                successElem.classList.add('contact__success--show');
                setTimeout(() => successElem.classList.remove('contact__success--show'), 3000)
            }
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            loader.classList.remove('contact__loader--show');
        });
});
