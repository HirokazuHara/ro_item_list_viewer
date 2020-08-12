$(function(){
    itemdata = chrome.extension.getBackgroundPage().itemdata;

    var i = 0;

    for(let key in itemdata) {
        info = itemdata[key].split('―――――――――――――');
        condition = "";

        if(info[info.length - 1].match(/重量 :/)){
            condition = info[info.length - 1];
            info.pop();
        }

        desc = "";
        
        if(info.length >= 3) {
            desc = `
                <div id=mini_desc${i}>
                    ${info[0]}
                    <br/>
                    <label index=${i} class=show><font color="blue">すべてを表示</font></label>
                </div>
                <div id=full_desc${i} style="display:none">
                    ${info.join('')}
                    <br/>
                    <label index=${i} class=hide><font color="blue">隠す</font></label>
                </div>
            `
        } else {
            desc = info.join('')
        }

        $('table#item tbody').append(`<tr><td>${key}</td><td>${desc}</td><td>${condition}</td></tr>`);
            
        i++;
    }

    $(document).on('click', 'label', function(){
        index = $(this).attr('index');
        action = $(this).attr('class');
        
        if(action == "show"){
            $(`#mini_desc${index}`).hide();
            $(`#full_desc${index}`).show();
        } else if(action == "hide") {
            $(`#full_desc${index}`).hide();
            $(`#mini_desc${index}`).show();
        }
    });
})

