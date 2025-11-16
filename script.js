const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close")
// ==================== Mostrar menu ========================
//  valida se a constate existe
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add("show-menu")
    })
}
// ==================== Menu escondido ========================
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove("show-menu")
    })
}
// ==================== Remover menu mobile ========================
const navLinks = document.querySelectorAll(".nav-link")

function linkAction() {
    const navMenu = document.getElementById("nav-menu")
    //quando clicamos em cada nav link, removemos a classe show menu
    navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener('click', linkAction))
// ==================== Trocar o background header ========================
function scrollHeader() {
    const header = document.getElementById("header")
    //quando o scroll é maior que 80 viewport height, adiciona a classe scroll header para a tag header
    if (this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)
// ==================== Customização de tema/display ========================
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll('.choose-size span');
const colorPalette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

//abre modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}
//fecha modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}
theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);
// ==================== Fontes ========================

// remover a classe ativa dos spans ou font selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}
fontSizes.forEach(size => {
    size.addEventListener('click', () => {

        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');
        if (size.classList.contains('font-size-1')) {
            fontSize = '12px';
        }
        else if (size.classList.contains('font-size-2')) {
            fontSize = '14px';
        }
        else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
        }
        else if (size.classList.contains('font-size-4')) {
            fontSize = '18px';
        }
        //trocar o tamanho da fonte do elemento root html
        document.querySelector('html').style.fontSize = fontSize;
    })
})
// ==================== Cor primaria ========================

//remover a classe ativa da cor
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;

        changeActiveColorClass();

        if (color.classList.contains('color-1')) {
            primaryHue = 252;
        }
        else if (color.classList.contains('color-2')) {
            primaryHue = 52;
        }
        else if (color.classList.contains('color-3')) {
            primaryHue = 352;
        }
        else if (color.classList.contains('color-4')) {
            primaryHue = 152;
        }
        else if (color.classList.contains('color-5')) {
            primaryHue = 202;
        }
        color.classList.add("active");
        root.style.setProperty('--primary-color-hue', primaryHue)
    })
})
// ==================== Tema background ========================
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//trocar a cor do background
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}
Bg1.addEventListener('click', () => {
    // adicionar a classe ativa
    Bg1.classList.add('active');
    //remover a classe ativa dos outros
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    //remover mudanças customizadas do armazenamento local
    window.location.reload();
})
Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // adicionar a classe ativa
    Bg2.classList.add('active');
    //remover a classe ativa dos outros
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
})
Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // adicionar a classe ativa
    Bg3.classList.add('active');
    //remover a classe ativa dos outros
    Bg2.classList.remove('active');
    Bg1.classList.remove('active');
    changeBG();
})
// ==================== Filtro de item do portfolio ========================
const filterContainer = document.querySelector(".portfolio-filter-inner"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalPortfolioItem; k++) {
            if (filterValue === portfolioItems[k].getAttribute("data-category")) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
            else {
                portfolioItems[k].classList.add("hide");
                portfolioItems[k].classList.remove("show");
            }
            if (filterValue === "tudo") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    })
}
// ==================== links ativos das section scroll ========================

// pega todas as sections que tem um id definido
const sections = document.querySelectorAll("section[id]");

//adiciona um event listener para o scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter(){
    //pega a posição atual do scroll
    let scrollY = window.pageYOffset;
    // Agora vai fazer um loop através da sections para pegar o valor da altura, top e id para cada um
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute("id");
        /* - se a nossa posição atual do scroll entra no espaço de uma section atual, adiciona a classe .active para o navigation link correspondente, senão irá remove-lo
        - para saber qual link precisa de uma class .active, usamos a variável sectionId que estamos peganado enquanto fazemos o loop através da sections como um selector
        */
       if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add("active-link")
       }else{
        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove("active-link")
       }
    })
}