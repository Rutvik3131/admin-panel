module.exports = (sequelize, Sequelize) => {
	const users = sequelize.define('users', {
	  name: {
		type: Sequelize.STRING
	  },
	  email: {
		type: Sequelize.STRING
	  },
	  password: {
		type: Sequelize.STRING
	  },
	  re_password: {
		type: Sequelize.STRING
	  }
	});
	
	return users;
}