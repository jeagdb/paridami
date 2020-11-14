const airtable = require('airtable');
const base = airtable.base('appwAhu6cnMa7UAJY');

//const userTable = base("User");
//const dealTable = base("Deal");
//const userDealTable = base("UserDeal");

// USERS
const getUsers = () => {
    const userTable = base("User");
    const allUsers = userTable.select({ view: "userView" });
    return allUsers;
}

const findUserByUserName = async (userName) => {
  const userTable = base("User");
  const res = await userTable.select({
    view: "userView",
  }).all()
    .catch(err => {
      console.log("findUserByUserName: userTableselection [err] : ", err);
  });
  let found = res.find(record => record.fields.Name === userName);
  return found;
}

const addUser = async (name, password) => {
  const userTable = base("User");
  await userTable.create([
    {
      "fields": {
      "Name": name,
      "Password": password,
      }
    }])
    .catch(err => {
      console.log("airtable: addUser [err]: ", err);
    });
  return true;
};

// DEALS
const getDealByDealId = (dealId) => {
    const dealTable = base("Deal");
    const allDeals = dealTable.select({ view: "dealView "});
    return allDeals.firstPage((err, records) => {
        const res = records.find(record => record.get("Id") === dealId);
        return res;
    })
};

const findDealByDealName = (dealName) => {
    const dealTable = base("Deal");
    const allDeals = dealTable.select({ view: "dealView "});
    return allDeals.firstPage((err, records) => {
        const res = records.find(record => record.get("Name") === dealName);
        return res;
    })
};

// PARTICIPANTS
const getParticipantsByDealId = (dealId) => {
    const userDealTable = base("UserDeal");
    const allParticipants = userDealTable.select({ view: "userDealView "});
    return allParticipants.firstPage((err, records) => {
        const res = records.find(record => record.get("DealId") === dealId);
        return res;
    });
}

/*
const getDealsByUserId = (userId) => {
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
};*/

/*

.eachPage(function page(records, fetchNextPage) {
      const found = records.find((record) => {
        return record.fields.Name === userName;
      });
      if (found !== undefined) {
        return found;
      }
      fetchNextPage();

  }, function done(err, res) {
      if (err) { console.error(err); return null; }
      console.log("RES: ", res);
    }
  );

*/

module.exports = { 
    getUsers,
    findUserByUserName,
    addUser,
    getDealByDealId, 
    findDealByDealName, 
    getParticipantsByDealId 
};