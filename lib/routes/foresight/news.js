// Foresight
const got = require('@/utils/got');

module.exports = async(cts) => {
    const res = await got({
        method: 'get',
        url: "https://foresightnews.pro/news"
    });
    const itemList = [];
    const data = res.body;
    const re = /{id:(\d*),title:"(.*?)",brief:"(.*?)",content:"(.*?)",img:(.*?),source_link:"(.*?)",(.*?)}/g;
    while (true) {
        const result = re.exec(data);
        if (result == null) {
            break;
        }
        itemList.push({
            title: RegExp.$2,
            description: RegExp.$3,
            link: (RegExp.$6).replaceAll('\\u002F', '\/')
        });
    }


    cts.state.data = {
        title: "ForesightNews",
        link: "https://foresightnews.pro/news",
        item: itemList
    };
};
