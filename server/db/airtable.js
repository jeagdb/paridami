const airtable = require('airtable');
const base = airtable.base('tblsjFlgR7FVpzxL6');

//const userTable = base("User");
//const dealTable = base("Deal");
//const userDealTable = base("UserDeal");

export const getDealsFromUser = (userId) => {
    const userDealTable = base("UserDeal");
    const all = userDealTable.select({ view: "userDealView" });
    const listDealIdByUserId = all.firstPage((err, records) => {
        const res = records.filter(record => record.get("UserId") === userId);
        console.log('getDealFromUser 1: ', res);
        return res;
    })

    const dealTable = base("Deal");
    const deals = dealTable.select({ view: "dealView" });
    const userDeals = deals.firstPage((err, records) => {
        const res = records.filter(record => listDealIdByUserId.find(record.getId));
        console.log('getDealFromUser 2: ', res);
        return res;
    })
    return { userDeals, listDealIdByUserId };
}