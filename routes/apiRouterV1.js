var express = require('express');
var apiRouterV1 = express.Router();

var produtos = [
  {"id": 1, "descricao": "camiseta", "marca": "Nike", "preco": 49.99},
  {"id": 2, "descricao": "calça jeans", "marca": "Levi's", "preco": 89.95},
  {"id": 3, "descricao": "tênis esportivo", "marca": "Adidas", "preco": 79.50},
  {"id": 4, "descricao": "vestido floral", "marca": "Zara", "preco": 59.99},
  {"id": 5, "descricao": "moletom com capuz", "marca": "Puma", "preco": 69.75},
  {"id": 6, "descricao": "boné", "marca": "New Era", "preco": 29.99},
  {"id": 7, "descricao": "bolsa de couro", "marca": "Michael Kors", "preco": 149.00},
  {"id": 8, "descricao": "óculos de sol", "marca": "Ray-Ban", "preco": 119.50},
  {"id": 9, "descricao": "shorts jeans", "marca": "Guess", "preco": 54.95},
  {"id": 10, "descricao": "jaqueta de couro", "marca": "Harley Davidson", "preco": 199.99}
]

apiRouterV1.get('/produtos', function(req, res, next) {
    res.json(produtos)
});

apiRouterV1.get('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  if (id) {
    let idInt = Number.parseInt(id)
    let idx = produtos.findIndex(o => o.id === idInt)
    if (idx > -1) {
      res.json(produtos[idx])
    }
    else{
      res.status(404).json({ message: `Produto não encontrado`})
    }
  }
  else{
    res.status(404).json({ message: `Produto não encontrado`})
  }
});

apiRouterV1.post('/produtos', function(req, res, next) {
   let produto = req.body
   let newId = Math.max(...produtos.map(o => o.id)) + 1
   produto.id = newId
   produtos.push (produto)
   res.status(201).json({message: `Produto inserido com sucesso`,
                         data: {id: newId}})
});

apiRouterV1.delete('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  if (id) {
    let idInt = Number.parseInt(id)
    let idx = produtos.findIndex(o => o.id === idInt)
    if (idx > -1) {
      produtos.splice (idx, 1)
      res.status(200).json({message: `Produto excluído com sucesso!`})
    }
    else{
      res.status(404).json({ message: `Produto não encontrado`})
    }
  }
  else{
    res.status(404).json({ message: `Produto não encontrado`})
  }
});

apiRouterV1.put('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  let produto = req.body
  if (id) {
    let idInt = Number.parseInt(id)
    let idx = produtos.findIndex(o => o.id === idInt)
    if (idx > -1) {
      produtos[idx].descricao = produto.descricao
      produtos[idx].marca = produto.marca
      produtos[idx].preco = produto.preco

      res.status(200).json({message: `Produto atualizado com sucesso!`, data: {produto: produtos[idx]}})
    }
    else{
      res.status(404).json({ message: `Produto não encontrado`})
    }
  }
  else{
    res.status(404).json({ message: `Produto não encontrado`})
  }
});

module.exports = apiRouterV1;