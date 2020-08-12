// アイテム情報をセットする
function setItemInfo(text) {
  parser = new DOMParser();
  doc = parser.parseFromString(text, "text/html");
  itemname = doc.querySelector(
    "#main > div > div.result_item > div > p.itemname"
  ).textContent;
  itemexp = doc.querySelector("#main > div > div.result_item > div > p.itemexp")
    .innerHTML;

  itemdata[itemname] = itemexp;
}

var itemdata = {};

// contents.jsから受信
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  itemdata = {};

  for (var i = 0; i < request.itemlist.length; i++) {
    url = request.itemlist[i];

    // アイテム情報の取得
    fetch(url)
      .then((response) => response.text())
      .then((text) => setItemInfo(text));
  }

  // 新しいタブを開いて表示する
  chrome.tabs.create({ url: "item.html" });

  return true;
});
