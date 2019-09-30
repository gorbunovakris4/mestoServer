const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.find({ _id: req.params.userId })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'нет пользователя с таким id' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .catch(() => res.send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
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
    .catch(() => res.send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
};
