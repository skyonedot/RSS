const cheerio = require('cheerio');
const got = require('@/utils/got');


module.exports = async(cts) => {
    const res = await got({
        method: 'get',
        url: "https://www.panewslab.com/zh/news/index.html"
    });
    const data = res.body;
    const $ = cheerio.load(data); // 使用 cheerio 加载返回的 HTML
    const list =  $("div.content")


    cts.state.data = {
        title: "PANEWS",
        link: "https://www.panewslab.com/zh/news/index.html",
        item: list && list.map((_, item) => {
            item = $(item);
            const title = item.find("a.n-title").text();
            const content = item.find("p").text();
            const link = "https://www.panewslab.com/zh/news/index.html";
            return {
                title,
                description: content,
                link
            };
        }).get(),
    };

};