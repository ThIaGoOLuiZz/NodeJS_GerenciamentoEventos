const db = require('./db');

const createEvent = (event, callback) => {
  const sql = 'INSERT INTO events (title, description, location, date, user_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [event.title, event.description, event.location, event.date, event.user_id], callback);
};

const getEvents = (filters, callback) => {
  let sql = 'SELECT e.*, u.name AS organizer FROM events e JOIN users u ON e.user_id = u.id WHERE 1=1';
  const params = [];

  if (filters.date) {
    sql += ' AND e.date = ?';
    params.push(filters.date);
  }
  if (filters.location) {
    sql += ' AND e.location LIKE ?';
    params.push(`%${filters.location}%`);
  }

  db.query(sql, params, callback);
};

module.exports = { createEvent, getEvents };
