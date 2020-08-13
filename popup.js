$(function () {
  $("#btn").click(function () {
    // Contentsにイベントを送信する。
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs[0].url.startsWith('https://ragnarokonline.gungho.jp/')) {
        $("body").html(`<font color='red'>このページでは実行できません。</font>`);
        return;
      }
      chrome.tabs.sendMessage(tabs[0].id, {}, function (response) {});
    });
  });
});
