const Movie = require("./Movie");
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");

Actor.belongsToMany(Movie, { through: "MovieActor" });
Movie.belongsToMany(Actor, { through: "MovieActor" });

Director.belongsToMany(Movie, { through: "MovieDirector" });
Movie.belongsToMany(Director, { through: "MovieDirector" });

Genre.belongsToMany(Movie, { through: "MovieGenre" });
Movie.belongsToMany(Genre, { through: "MovieGenre" });
