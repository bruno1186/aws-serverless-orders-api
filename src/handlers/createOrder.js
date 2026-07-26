const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
const { docClient } = require('../lib/dynamoClient');

const TABLE_NAME = process.env.ORDERS_TABLE || 'Orders';

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    if (!body.customerId || !Array.isArray(body.items) || body.items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'customerId e items sao obrigatorios' }),
      };
    }

    const order = {
      orderId: uuidv4(),
      customerId: body.customerId,
      items: body.items,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: order,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(order),
    };
  } catch (error) {
    console.error('Erro ao criar pedido', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno ao criar pedido' }),
    };
  }
};
