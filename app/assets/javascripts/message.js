$(function(){
  function buildHTML(message){
    if ( message.image ) {
                var html = //変数htmlの定義
                ` <div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
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
    } else {
            var html =
             `<div class="message" data-message-id=${message.id}>
                <div class="message__info">
                  <div class="message__info__user-name">
                    ${message.user_name}
                  </div>
                  <div class="message__info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__text">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                </div>
              </div>`
            return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    .done(function(data){ //非同期通信の結果として返ってくるデータが引数(data)に入る
      var html = buildHTML(data); //return文の戻り先で、完成したHTMLを受け取る
      $('.right-body').append(html);
      $("form")[0].reset(); //form内を空にする記述
      $('.right-body').animate({ scrollTop:$('.right-body')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});