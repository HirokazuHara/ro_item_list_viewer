$(function () {
  // アイテムの情報は非同期で取りに行くためタブ表示時にはまだ取得できていない。
  // そのため一秒ほど待ってから処理を行うようにしている。
  setTimeout(function () {
    setItemInfo();
  }, "1000");
});

function setItemInfo() {
  itemdata = chrome.extension.getBackgroundPage().itemdata;

  var i = 0;

  for (let key in itemdata) {
    info = itemdata[key].split("―――――――――――――");
    condition = "";

    // 装備情報の最後にある装備の種別いった情報を別枠でだすため
    // その部分の情報を取り出す。
    // 判定は「重量 :」という文字列が含まれているかどうかで行っている。
    // ※ 装備以外のアイテムも重量だけ記載されているので
    if (info[info.length - 1].match(/重量 :/)) {
      condition = info[info.length - 1];
      info.pop();
    }

    desc = "";

    // 説明が長い場合は省略して出すようにする。
    if (info.length >= 3) {
      desc = `
                    <div id=mini_desc${i}>
                        ${info[0]}
                        <br/>
                        <label index=${i} class=show><font color="blue">すべてを表示</font></label>
                    </div>
                    <div id=full_desc${i} style="display:none">
                        ${info.join("")}
                        <br/>
                        <label index=${i} class=hide><font color="blue">隠す</font></label>
                    </div>
                `;
    } else {
      desc = info.join("");
    }

    $("table#item tbody").append(
      `<tr><td>${key}</td><td>${desc}</td><td>${condition}</td></tr>`
    );

    i++;
  }

  // 表示・非表示の制御
  $(document).on("click", "label", function () {
    index = $(this).attr("index");
    action = $(this).attr("class");

    if (action == "show") {
      $(`#mini_desc${index}`).hide();
      $(`#full_desc${index}`).show();
    } else if (action == "hide") {
      $(`#full_desc${index}`).hide();
      $(`#mini_desc${index}`).show();
    }
  });
}
