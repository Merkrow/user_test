const { User } = require('../db/models');
const { USERS } = require('../constants');

const usersRoutes = (app) => {
  app.post('/init', async (req, res) => {
    try {
      await User.insertMany(USERS);

      res.send({
        status: 'ok'
      });
    } catch (err) {
      console.log(err, 'Something wrong during init users');
      res.status(500).send('Something went wront during init users');
    }
  });

  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});

      res.send({
        users
      });
    } catch (err) {
      console.log(err, 'Something wrong during getting users');
      res.status(500).send('Something wrong during getting users');
    }
  })

  app.post('/users', async (req, res) => {
    const { body } = req;

    try {
      const user = new User(body);
      await user.save();

      res.send({ user });
    } catch (err) {
      console.log(err, 'Something wrong during user create');
      res.status(500).send('Something wrong during user create');
    }
  });
}

module.exports = usersRoutes;
