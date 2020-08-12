chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var itemlist = [];

  // アイテム情報のリンクの一覧を取得
  $('a[href^="https://rotool.gungho.jp/monster/item.php?item="]').each(
    function () {
      var url = $(this).attr("href");
      itemlist.push(url);
    }
  );

  // background.jsに渡す
  // ※ 外部サイトのアクセス等はbackgroundからじゃないと実行できない
  chrome.runtime.sendMessage({ itemlist: itemlist });
});
