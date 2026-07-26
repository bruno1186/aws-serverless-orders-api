const { mockClient } = require('aws-sdk-client-mock');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../src/lib/dynamoClient');
const { handler } = require('../src/handlers/createOrder');

const ddbMock = mockClient(docClient);

beforeEach(() => {
  ddbMock.reset();
});

describe('createOrder handler', () => {
  it('deve retornar 400 quando customerId estiver ausente', async () => {
    const event = { body: JSON.stringify({ items: [{ sku: 'ABC', qty: 1 }] }) };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
  });

  it('deve criar um pedido com sucesso e retornar 201', async () => {
    ddbMock.on(PutCommand).resolves({});

    const event = {
      body: JSON.stringify({
        customerId: 'cliente-123',
        items: [{ sku: 'ABC', qty: 2 }],
      }),
    };

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(201);
    expect(body.customerId).toBe('cliente-123');
    expect(body.status).toBe('CREATED');
    expect(body.orderId).toBeDefined();
  });
});
