const got = require('@/utils/got');


module.exports = async(cts) => {
    let url = 'https://tokeninsight.com/apiv2/research/newsList'
    // console.log("GG")
    const {data} = await got.post(url, {
        json: 
        {"current":1,
        "language":"cn",
        "pageSize":10,
        "tagId":"",
        "startDate":"",
        "endDate":""}
    }).json();

    let itemList = data.list.map((item, _) => {
        return {
            title: item.title,
            description: item.html,
            link: 'https://tokeninsight.com/zh/news',
        }
    })

    // console.log(itemList)


    cts.state.data = {
        title: "TokenInsight",
        link: "https://tokeninsight.com/zh/news",
        item: itemList
    };

}