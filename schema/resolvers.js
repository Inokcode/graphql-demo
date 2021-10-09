const { UserList, MovieList } = require('../FakeData');
const _ = require('lodash');

//DB calls should goes here
const resolvers = {
  Query: {
    //users is the name used in type-defs file type Query
    // users() {
    //   return UserList;
    // },
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) }); //convert string into number
      return user;
    },
    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
};

module.exports = { resolvers };
