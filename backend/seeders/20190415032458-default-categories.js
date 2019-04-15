"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
            "Categories",
            [
				{ 
					name: "Software",
					createdAt: new Date(),
					updatedAt: new Date() 
				},
				{ 
					name: "Computers",
					createdAt: new Date(),
					updatedAt: new Date() 
				},
				{ 
					name: "Televisions",
					createdAt: new Date(),
					updatedAt: new Date() 
				},
				{ 
					name: "Appliances",
					createdAt: new Date(),
					updatedAt: new Date() 
				},
				{ 
					name: "Drones",
					createdAt: new Date(),
					updatedAt: new Date() 
				},
				{ 
					name: "Electronics",
					createdAt: new Date(),
					updatedAt: new Date() 
				},
			]
        );
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    }
};
