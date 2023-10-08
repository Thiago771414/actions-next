/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
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
  ]);
};
