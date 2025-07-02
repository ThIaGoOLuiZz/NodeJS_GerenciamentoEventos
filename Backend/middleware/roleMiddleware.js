module.exports = (role) => {
  return (req, res, next) => {
    if (req.userRole !== role) {
      return res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
    }
    next();
  };
};
