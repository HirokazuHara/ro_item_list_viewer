$(function () {
  $("#btn").click(function () {
    // Contentsにイベントを送信する。
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {}, function (response) {});
    });
  });
});
