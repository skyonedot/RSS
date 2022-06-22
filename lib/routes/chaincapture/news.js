// Odaily
const got = require('@/utils/got');

module.exports = async(cts) => {
    const res = await got({
        method: 'get',
        url: "https://www.chaincatcher.com/news"
    });
    const data = res.body;
    const itemList = [];
    const re = /{"id":(\d*),"tit":"(.*?)",(.*?),"des":"(.*?)",(.*?)/g;


    while (true) {
        const result = re.exec(data);
        if (result == null) {
            break;
        }
        itemList.push({
            title: eval("'" + RegExp.$2 + "'"),
            description: eval("'" + RegExp.$4 + "'"),
            link: "https://www.chaincatcher.com/news"
        });
    }

    cts.state.data = {
        title: "ChainCatcher",
        link: "https://www.chaincatcher.com/news",
        item: itemList
    };
};