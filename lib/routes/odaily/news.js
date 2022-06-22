// Odaily
const got = require('@/utils/got');

module.exports = async(cts) => {
    const res = await got({
        method: 'get',
        url: "https://www.odaily.news/newsflash/"
    });
    const data = res.body;
    const itemList = [];
    const re = /{"id":(\d*),(.*?),"title":"(.*?)",(.*?),"description":"(.*?)",(.*?)/g;

    while (true) {
        const result = re.exec(data);
        if (result == null) {
            break;
        }
        itemList.push({
            title: RegExp.$3,
            description: RegExp.$5.replaceAll('\\n', ' '),
            link: "https://www.odaily.news/newsflash/"
        });
    }

    cts.state.data = {
        title: "OdailyNews",
        link: "https://www.odaily.news/newsflash/",
        item: itemList
    };
};