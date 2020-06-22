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
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
    var last_message_id = $('.message:last').data("message-id");
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
    .done(function(data){ 
      if (messages.length !== 0) {
//追加するHTMLの入れ物を作る
var insertHTML = '';
//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
$.each(messages, function(i, message) {
  insertHTML += buildHTML(message)
});
//メッセージが入ったHTMLに、入れ物ごと追加
$('.messages').append(insertHTML);
$('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
  })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
