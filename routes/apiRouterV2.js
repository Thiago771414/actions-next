var express = require('express');
var apiRouterV2 = express.Router();

const knex = require('knex')(require('../knexfile').development)

apiRouterV2.get('/produtos', function (req, res, next) {
  knex('produtos')
    .select('*')
    .then(produtos => {
      res.status(200).json(produtos);
    })
    .catch(err => res.status(500).json({ message: `Erro ao obter produtos: ${err.message}` }))
});

apiRouterV2.get('/produtos/:id', function (req, res, next) {
  let id = req.params.id;
  if (id) {
    let idInt = Number.parseInt(id)
    knex('produtos')
      .select('*')
      .where({ id: idInt })
      .then(produtos => {
        if (!produtos.length) {
          res.status(404).json({ message: `Produto não encontrado` })
          return
        }
        let produto = produtos[0]
        res.status(200).json(produto)
      })
      .catch(err => res.status(500).json({ message: `Erro ao obter produtos: ${err.message}` }))
  }
  else res.status(404).json({ message: `Produto não encontrado` })
});

apiRouterV2.post('/produtos', function (req, res, next) {
  let produto = req.body
  knex('produtos')
    .insert(produto, ['id'])
    .then(produtos => {
      if (!produtos.length) {
        res.status(400).json({ message: `Erro ao inserir produto` })
        return
      }
      else {
        let id = produtos[0].id
        res.status(201).json({ message: `Produto inserido com sucesso`, data: { id } })
      }
    })
    .catch(err => res.status(500).json({ message: `Erro ao inserir produto: ${err.message}` }))
});

apiRouterV2.delete('/produtos/:id', function (req, res, next) {
  let id = req.params.id;
  if (id) {
    let idInt = Number.parseInt(id)
    knex('produtos')
      .where({ id: idInt })
      .del()
      .then(result =>
        res.status(200).json({ message: `Produto excluído com sucesso` })
      )
      .catch(err => res.status(500).json({ message: `Erro ao excluir produto: ${err.message}` }))
  }
  else {
    res.status(404).json({ message: `Produto não encontrado` })
  }
});

apiRouterV2.put('/produtos/:id', function (req, res, next) {
  let id = req.params.id;
  let produto = req.body
  if (id) {
    let idInt = Number.parseInt(id)
    knex('produtos')
      .where({ id: idInt })
      .update(produto)
      .then(result => {
        res.status(200).json({ message: `produto alterado com sucesso`, data: { produto: produtos[idx] } })
      })
      .catch(err => res.status(500).json({ message: `Erro ao excluir produto: ${err.message}` }))
  }
  else {
    res.status(404).json({ message: `Produto não encontrado` })
  }
});

module.exports = apiRouterV2;