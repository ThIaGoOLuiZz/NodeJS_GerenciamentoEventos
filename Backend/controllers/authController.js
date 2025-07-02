const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  userModel.createUser({ name, email, password: hashedPassword, role }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
};
