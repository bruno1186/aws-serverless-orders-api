const { GetCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../lib/dynamoClient');

const TABLE_NAME = process.env.ORDERS_TABLE || 'Orders';

exports.handler = async (event) => {
  try {
    const orderId = event.pathParameters && event.pathParameters.orderId;

    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'orderId e obrigatorio' }),
      };
    }

    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { orderId },
      })
    );

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Pedido nao encontrado' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Erro ao buscar pedido', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno ao buscar pedido' }),
    };
  }
};
