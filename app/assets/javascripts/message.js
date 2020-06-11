$(function(){

  function buildHTML(message){
    image = ( message.image ) ? `<img class="lower-message__image" src=${message.image} >` : ""; 
                var html = //変数htmlの定義
                ` <div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
          return html; //return文
      };
    }
  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
       })  
       .done(function(data){ //非同期通信の結果として返ってくるデータが引数(data)に入る
         var html = buildHTML(data); //return文の戻り先で、完成したHTMLを受け取る
       })
     })
  };
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("form")[0].reset(); //form内を空にする記述
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('input').prop('disabled', false);
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });