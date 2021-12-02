
let item = document.querySelector('.item');
item.classList.add(".item-scale");

const p1 = document.createElement('p'); // <p> 생성
const p2 = document.createElement('b'); // <b> 생성
p1.textContent = 'foo'; // <p>foo</p>
p2.textContent = 'bar'; // <b>bar</b>

const content = document.getElementById('content'); // 부모 요소 생성
content.appendChild(p2); // 첫번째 자식
const firstChild = content.children[0]; // 부모요소의 첫번쨰 자식 선택
content.insertBefore(p1, firstChild); // 첫번쨰 자식 앞에 p1 삽입


let section1s = document.getElementsByClassName('section1');
for(let i=0; i<section1s.length; i++) {
  var section1 = section1s.item(i);

}
const handleMouseEnter = (e) =>  {
  const elMsg = document.getElementById('msg');
  elMsg.textContent = e.type;
}
var card = document.getElementById('card');
card.addEventListener('mouseenter',function(e) {
 handleMouseEnter(e);
},false);

(function() {
  // XHR 인스턴스 생성
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = event => {
    console.log(`state : ${httpRequest.readyState} / status : ${httpRequest.status} / ${responseReady()}`
    );
  };
  const responseReady = () => {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
			// 응답을 정상적으로 받음
          return httpRequest.responseText;
        } else {
          return Error('request에 문제가 있습니다.');
        }
      } else {
        return Error('request의 상태가 complete(4)가 아닙니다.');
      }
    }
    catch( e ) {
      return Error('Caught Exception: ' + e.description);
    }
  }

  httpRequest.open("GET", "/src/data.json");
  httpRequest.send();
}) ();