chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var itemlist = [];

  // アイテム情報のリンクの一覧を取得
  $('a[href^="https://rotool.gungho.jp/monster/item.php?item="]').each(
    function () {
      var url = $(this).attr("href");
      itemlist.push(url);
    }
  );

  if(itemlist.length > 0) {
    // background.jsに渡す
    // ※ 外部サイトのアクセス等はbackgroundからじゃないと実行できない
    chrome.runtime.sendMessage({ itemlist: itemlist });
  }

  // 下記の処理は何もしないがエラーが出るため呼び出す。
  // ※ 参考 https://qiita.com/noenture/items/3978f638f2ffb8ff0995
  sendResponse(itemlist);
  return;
});
