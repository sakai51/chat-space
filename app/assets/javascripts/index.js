$(document).on('turbolinks:load', function(){
  $(function() {
  
    var search_list = $("#user-search-result");
  
    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                  </div>`;
        search_list.append(html);
    }
  
    function appendNoUser(user){
      var html = `<div class='chat-group-user clearfix'>${ user }</div>`
      search_list.append(html);
    }
  
    var member_list = $("#chat-group-users");
  
    function addUser(userId,userName) {
    var html = `<div id='chat-group-users'>
                  <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                    <input name='group[user_ids][]' type='hidden' value='${userId}'>
                      <p class='chat-group-user__name'>${userName}</p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    member_list.append(html);
      }
  
      $('#user-search-field').on('keyup', function(e){
        var input = $("#user-search-field").val();

        $.ajax({
            type: 'GET',                // HTTPメソッドはGETで
            url:  '/users',             // /usersのURLに (これによりusersコントローラのindexアクションが起動)
            data: { keyword: input},    // keyword: inputを送信する
            dataType: 'json'            // サーバから値を返す際はjsonである
        })

        .done(function(users){                // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる

            if (input.length === 0) {         // フォームの文字列長さが0であれば、インクリメンタルサーチ結果を表示しないようにする
                $('#user-search-result').empty();
              }

            else if (input.length !== 0){     // 値が等しくないもしくは型が等しくなければtrueを返す。
                $('#user-search-result').empty();
                users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
                    appendUser(user)
                });
            }

            else {
                $('#user-search-result').empty(); // ユーザーが見つからなければ「見つからない」を返す。
                appendErrMsgToHTML("一致するユーザーが見つかりません");
            }
        })

        .fail(function() {
            alert('ユーザー検索に失敗しました');
        });
    });
      $(document).on("click", ".user-search-add", function () {
      $('#chat-group-users').val();
        var userId = $(this).data('user-id');
        var userName = $(this).data('user-name');
        addUser(userId,userName);
        $(this).parent().remove();
      });
  
      $(document).on("click", ".user-search-remove", function () {
        $(this).parent().remove();
      });
    });
  });