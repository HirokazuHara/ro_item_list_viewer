function setItemInfo(text, itemdata) {
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  itemdata = {};

  for (var i = 0; i < request.itemlist.length; i++) {
    url = request.itemlist[i];

    fetch(url)
      .then((response) => response.text())
      .then((text) => setItemInfo(text, itemdata));
  }

  chrome.tabs.create({ url: "item.html" });

  return true;
});
