const sequelize = require("../utils/connection");
require("../models");
require("../models/Actor");
require("../models/Director");
require("../models/Genre");
require("../models/Movie");

const main = async () => {
	try {
		await sequelize.sync({ force: true });

		process.exit();
	} catch (error) {
		console.log(error);
	}
};

main();
