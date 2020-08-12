$(function(){
    var itemlist = [];

    $('a[href^="https://rotool.gungho.jp/monster/item.php?item="]').each(function(){
        var url = $(this).attr('href');
        console.log(url);
        itemlist.push(url);
    });

    chrome.runtime.sendMessage({itemlist: itemlist})
});
