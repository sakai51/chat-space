$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
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
                      ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
  return html;
  }

  // 送信後スクロールする関数
  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    // console.log(this)
    var message = new FormData(this); //フォームに入力した値を取得
    var url = $(this).attr('action'); // var url = (window.location.href)でもOK
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      scrollBottom(); //送信後スクロースする関数呼び出し

    })

    .fail(function(data) {
      alert('error');
    })
    .always(function(data) {
      $('.form__submit').prop('disabled', false); //ここで解除している
    })
  })
});
