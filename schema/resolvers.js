const { UserList } = require('../FakeData');

//DB calls should goes here
const resolvers = {
  Query: {
    //users is the name used in type-defs file type Query
    users() {
      return UserList;
    },
  },
};

module.exports = { resolvers };
