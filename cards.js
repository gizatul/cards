import { getResourсe } from "../services/services";

function cards() {
    //4. Создание класса для карточек меню
    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {//classes- rest-оператор, т.к неизвестно сколько классов в будущем мб добавлено (вместо .menu__item) 
            this.src = src; //ссылку на картинку
            this.alt = alt; //alt картинки
            this.title = title; //тайтл
            this.descr = descr; // описание
            this.price = price; //цена в гривнах
            this.classes = classes; //классы, вместо menu_item - будет массив
            this.parent = document.querySelector(parentSelector); //вытаскивание родителя элемента
            this.transfer = 36.77; // для конвертации доллара в гривны
            this.changeToUAH(); // вызов ф-ии для получения актуального price
        }
        changeToUAH() { // ф-я конвертации
            this.price = +Math.floor(this.price * this.transfer);
        }
        render() { // ф-я добавления на страницу
            const elementMenu = document.createElement('div'); //создание элемента с тегом div
            if (this.classes.length == 0) { //создаем условие для значения по умолчанию, если длина массива 0(т.е массив пустой, то добавляем .menu__item)
                this.classes = 'menu__item';
                elementMenu.classList.add(this.classes);
            } else {
                this.classes.forEach(className => elementMenu.classList.add(className));
            }//перебор массива, к elementMenu добавляем полученные класссы ч/з add
            elementMenu.innerHTML = ` 
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`; //добавляемый код
            this.parent.append(elementMenu); //добавление ElementMenu в конец родителя parent
        }    
    }

    //Создаем запрос для создания карточек меню
    getResourсe('http://localhost:3000/menu') 
        .then(data => { //data - данные которые придут из localhost:3000
            data.forEach(({img, altimg, title, descr, price}) => {//перебор и {}-деструктуризация объектов в массиве data по частям
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // вызов конструктора Menucard, будет создаваться столько раз сколько объектов в data и сразу рендерится(.render) на страницу
            });
        });
}

export default cards;