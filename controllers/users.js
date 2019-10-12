const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res) => {
  const {
    _name, _about, _avatar, _email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: _email,
      password: hash,
      name: _name,
      about: _about,
      avatar: _avatar,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const _id = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', _id, {
        httpOnly: true,
        maxAge: '7d',
      }).end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.find({ _id: req.params.userId })
    .then((user) => {
      if (user.length > 0) res.send({ data: user });
      else res.status(404).send({ message: 'нет пользователя с таким id' });
    })
    .catch(() => res.status(500).send({ message: 'нет пользователя с таким id' }));
};

module.exports.updateProfile = (req, res) => {
  const { newName, newAbout } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: newName, about: newAbout },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Данные не прошли валидацию.' }));
};

module.exports.updateAvatar = (req, res) => {
  const { newAvatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: newAvatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Данные не прошли валидацию.' }));
};
