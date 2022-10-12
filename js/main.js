const slider = document.querySelector("#slider");
const ul = slider.querySelector("ul");
const lis = ul.querySelectorAll("li");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

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
    ul.style.left = "-100%"; //ul의 초기 위치값을 지정하는것
    ul.prepend(ul.lastElementChild); //로딩후 1번첫번째 li가 frame에 보일수 있도록 마지막 li를 앞에 붙임으로써 1번이 첫번째가 아닌 두번째에 위치시킨다.
    ul.style.width = `${100 * len}%`; //ul너비값 li갯수를 맞춰서 자동계산해주는 것
    lis.forEach((el)=>{
        el.style.width = `${100 / len}%`; //각 li의 너비값을 자동으로 계산해준다.
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
            enableClick = true; //모션이 끝나고 enableClilk을 true로 변경
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