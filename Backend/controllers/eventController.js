const eventModel = require('../models/eventModel');

exports.create = (req, res) => {
  const { title, description, location, date } = req.body;
  const user_id = req.userId;

  eventModel.createEvent({ title, description, location, date, user_id }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao criar evento' });
    res.status(201).json({ message: 'Evento criado com sucesso' });
  });
};

exports.list = (req, res) => {
  const filters = {
    date: req.query.date,
    location: req.query.location
  };

  eventModel.getEvents(filters, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar eventos' });
    res.json(results);
  });
};

exports.report = (req, res) => {
  const eventModel = require('../models/eventModel')

  eventModel.getEvents({}, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao gerar relatório' })

    const report = {
      generatedAt: new Date().toISOString(),
      total: results.length,
      events: results
    }

    res.json(report)
  })
}
