const currentDate = new Date();

module.exports = {
    up: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkInsert('Users',
        [{
          name: "Samuel Lucas",
          email: 'Samuellucas@gmail.com',
          password: '123456789',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          name: "Laise Frase",
          email: 'laisefrase@gmail.com',
          password: '123456789',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        ], { timestamps: false });
    },
  
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    },
  };
  