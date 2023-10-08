const knex = require('knex');
const database = require('../../../routes/apiRouterV1');

describe('Testes do Knex com Jest', () => {
    it('Deve retornar um array vazio ao chamar getAllUsers', async () => {
        const result = database.get;
        expect(result).toEqual([]);
    });
});
