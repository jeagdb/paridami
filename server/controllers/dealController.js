const { getDealFromUser } = require('../db/airtable');
const { DealModel } = require('../models/dealModel');

export function getUserDeals(userId) {
    const res = getDealsFromUser(userId);

    let deals = new Array();
    res.userDeals.map((record) => {
        let newDeal = new DealModel(record.Id, record.Name, record)
        deals.push(newDeal);
    });
    return deals;
}