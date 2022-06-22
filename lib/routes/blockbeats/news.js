const cheerio = require('cheerio');
const got = require('@/utils/got');


module.exports = async(cts) => {
    const res = await got({
        method: 'get',
        url: "https://www.theblockbeats.info/newsflash"
    });
    const data = res.body;
    const $ = cheerio.load(data); // 使用 cheerio 加载返回的 HTML
    const list =  $("div.flash-list");


    cts.state.data = {
        title: "BlockBeatsTest",
        link: "https://www.theblockbeats.info/newsflash",
        item: list && list.map((_, item) => {
            item = $(item);
            const title = item.find("a.flash-item-title").text();
            const content = item.find("div.flash-item-content").text();
            const link = item.find("div.flash-item-content a").attr("href");
            return {
                title,
                description: content,
                link
            };
        }).get(),
    };

    // console.log(cts.state.data)
};