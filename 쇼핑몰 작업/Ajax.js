var xmlhttp;
if(window.XMLHttpRequest) {
  xmlhttp = new XMLHttpRequest();
} // 인스턴스 생성
else {
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
// 객체 생성

// Ajax 구현
xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    // 통신 성송
  }
}
xmlhttp.open("GET", "http://www.example.com/", true);
xmlhttp.send();

$(document).ready(function() {
  $('#ajax').click(function() {
    $.ajax({
      url : 'ajax.xml',
      type : 'GET',
      dataType : 'xml',
      success : function(data) {
        $('#dictionary').empty();
        $.each($(data).find('entry'),function() {
          var $entry = $(this);
          var html = '<div class="entry">';
          html += '<h3 class="term">' + $entry.attr('term'); + '</h3>';
          html += '<div class="part">' + $entry.attr('part'); + '</div>';
          html += '<div class="definition">' + $entry.text()  +'</div>';
          html += '</div>'
          $('#dictionary').append(html);

        }); 

      }
    });
    return false;
  });
});
// #ajax함수


$(document).ready(function() {
  $('#get').click(function() {
    $.get('ajax.xml',function(data) {
      $('#dictionary').empty();
      $(data).find('entry').each(function() {
        var $entry = $(this);
        var html = '<div class="entry">';
        html += '<h3 class="term">' + $entry.attr('term'); + '</h3>';
        html += '<div class="part">' + $entry.attr('part'); + '</div>';
        html += '<div class="definition">' + $entry.text()  +'</div>';
        html += '</div>';
        $('#dictionary').append(html);
    
 
      });
    });
    return false;
  });
});
// #get 버튼을 클릭하면 ajax.xml 파일을 읽어서 각각의 요소를 추출하여 출력하도록 구현하시오.

$(document).ready(function() {
  $('#json').click(function() {
    $.getJSON('json.json',function(data) {
     $('#dictionary').empty();
     $(data).find('entry').each(function() {
      var $entry = $(this);
      var html = '<div class="entry">';
      html += '<h3 class="term">' + $entry.attr('term'); + '</h3>';
      html += '<div class="part">' + $entry.attr('part'); + '</div>';
      html += '<div class="definition">' + $entry.text()  +'</div>';
      html += '</div>';
      $('#dictionary').append(html);
     });
    });
    return false;
  });
});
// getJSON 메소드는 서버에서 JSON 형식의 데이터를 받아오는 메소드이다.