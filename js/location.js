let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
const t_on = document.querySelectorAll(".traffic li")[0];
const t_off = document.querySelectorAll(".traffic li")[1];
const branch_btns = document.querySelectorAll(".branch li");

let zoom = true;


var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.507025, 126.7563481), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

var markerOptions =[
    {
        title:"본점",
        latlag: new kakao.maps.LatLng(37.507025, 126.7563481),
        imgSrc : "img/marker1.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 69)},
        button : branch_btns[0]
    },
    {
        title:"지점1",
        latlag: new kakao.maps.LatLng(37.5116828, 127.059151),
        imgSrc : "img/marker2.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 69)},
        button : branch_btns[1]
    },
    {
        title:"지점2",
        latlag: new kakao.maps.LatLng(37.5258975, 126.9284261),
        imgSrc : "img/marker3.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 69)},
        button : branch_btns[2]
    }
]

for(let i=0; i<markerOptions.length; i++){
    new kakao.maps.Marker({
        map : map,
        position : markerOptions[i].latlag,
        title : markerOptions[i].title,
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc,markerOptions[i].imgSize,markerOptions[i].imgPos)
    })

    markerOptions[i].button.addEventListener("click",e=>{
        e.preventDefault();

        // 모든 버튼을 반복을 돌면서 모두 제거하고
        for(let k=0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove("on");
        }
        //내가 선택한 곳에 on을 붙여주는것
        markerOptions[i].button.classList.add('on');
        moveTo(markerOptions[i].latlag);
    })
}

t_on.addEventListener("click",e=>{
    e.preventDefault();
    if(t_on.classList.contains("on")) return;
    //t_on은 교통정보를 보여주는 버튼인데 현재 교통정보 버튼에 on일경우 또다시 이벤트가 발생하지 않토록 on을 contains로 물어봐서 현재상태가 on이 있는 경우 아무일도 발생하지 않게 return으로 반환하고, 없다면 해당 조건문은 무시
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.add("on");
    t_off.classList.remove("on");
})

t_off.addEventListener("click",e=>{
    e.preventDefault();
    if(t_off.classList.contains("on")) return;
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
    t_off.classList.add("on");
    t_on.classList.remove("on");
})

//브라우저 리사이즈시 현재 활성화되어있는 버튼의 data-index를 구해서 setCenter의 매개변수로 사용
//data-index를 사용하는 이유는 카카오맵의 함수를 사용하는데 nth-if-type등의 순서는 인수로 보낼수 없기 때문이다
//window.addEventListener("resize",()=>{})
window.onresize =()=>{
    let active_btn = document.querySelector(".branch li.on");
    let active_index = active_btn.getAttribute("data-index");

    map.setCenter(markerOptions[active_index].latlag);
}







function moveTo(target){
    var moveLatlon = target;
    map.setCenter(moveLatlon);
}



//지도의 컨트롤 보이지
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);



// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();

setZoomable(zoom);
function setZoomable(zoom){
    map.setZoomable(zoom)
}
