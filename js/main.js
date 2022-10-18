const slider = document.querySelector("#slider");
const ul = slider.querySelector("ul");
const lis = ul.querySelectorAll("li");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

let len = lis.length;

let enableClick = true;


init();


next.addEventListener("click",(e)=>{
    e.preventDefault();

    if(enableClick){
        enableClick = false;
         nextSlide();
    }
   
})

prev.addEventListener("click",(e)=>{
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        prevSlide();
    }
    
})

//초기화 함수
function init(){
    ul.style.left = "-100%";
    ul.prepend(ul.lastElementChild); 
    ul.style.width = `${100 * len}%`;
    lis.forEach((el)=>{
        el.style.width = `${100 / len}%`;
    })
}


function nextSlide(){
    new Anim(ul,{
        prop : "left",
        value : "-200%",
        duration : 1000,
        callback : ()=>{
            ul.style.left = "-100%";
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    })
}

function prevSlide(){
    new Anim(ul,{
        prop : 'left',
        value : "0%",
        duration : 1000,
        callback : ()=>{
            ul.style.left = "-100%";
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    })
}

btnCall.onclick = function(e){
    //링크이동금지
    e.preventDefault();

    //btnCall에 on이 있으면 제거하고, 없으면 추가
    btnCall.classList.toggle("on");
    //menuMo에 on이 있으면 제거하고, 없으면 추가
    menuMo.classList.toggle('on');
}