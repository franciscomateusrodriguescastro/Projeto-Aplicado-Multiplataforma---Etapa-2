// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// SQLite DB
const db = new sqlite3.Database('./usuarios.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Banco conectado!');
});

// Cria tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
)`);

// Rota de registro
app.post('/api/register', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: 'Dados inválidos' });

  db.run('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha], function (err) {
    if (err) {
      return res.status(400).json({ erro: 'Usuário já existe' });
    }
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  });
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: 'Campos obrigatórios' });

  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
    if (err) return res.status(500).json({ erro: 'Erro no servidor' });

    if (row) {
      res.json({ msg: 'Login bem-sucedido', user: { id: row.id, email: row.email } });
    } else {
      res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }
  });
});
app.post('/api/register', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Por favor, preencha todos os campos.' });
  }

  // Verificar se usuário já existe
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro no servidor. Tente novamente mais tarde.' });
    }
    if (row) {
      return res.status(409).json({ erro: 'Usuário já cadastrado com esse e-mail.' });
    }

    // Inserir usuário novo
    db.run('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha], function (err) {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
      }
      res.status(201).json({ msg: 'Cadastro realizado com sucesso!' });
    });
  });
});


app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
