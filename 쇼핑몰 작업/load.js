var xmlhttp;
if(window.XMLHttpRequest) {
  xmlhttp = new XMLHttpRequest();

}
else {
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
// xmlhttp 객체 생성

xmlhttp.onreadystatechange = function () { 
 if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
   document.innerHTML = xmlhttp.responseText; 
 }
}
xmlhttp.open("GET","http://www.example.com",true);
xmlhttp.send();
 // onreadystatechange : 비동기 통신시 서버와의 통신이 이루어진후 동작될 함수
// 비동기통신이란? 동시에 수행 X Request를 보내더라도 Response를 언제받아도 상관이없다 
// 동기식 :Request -> Response 요청과 응답 순서 보장 O
// 비동기식 : Request,Request-> Response -> Request -> Response,Respone 요청과 응답의 순서 보장 X
// id = ajax 구현
$(document).ready(function() {
$('#ajax').click(function() {
  $.ajax({
    url : "Ajax.html",
    type : "GET",
    dataType : "xml",
    success : function(data) {
      $('#dictionary').empty();
      $.each($(data).find('entry'),function() {
        let $entry = $(this);
        let html = "<div class='entry'>";
        



      });
      
    }
  })
})
});