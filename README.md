# aws-serverless-orders-api

API serverless de pedidos construida com **AWS Lambda**, **API Gateway** e **DynamoDB**, definida como Infraestrutura como Codigo via **AWS SAM**.

## Arquitetura

- POST /orders - cria um novo pedido (CreateOrderFunction)
- GET /orders/{orderId} - consulta um pedido pelo ID (GetOrderFunction)
- DynamoDB (Orders) - persistencia serverless com billing on-demand

## Estrutura

- template.yaml - definicao SAM da API, funcoes Lambda e tabela DynamoDB
- src/handlers - handlers das funcoes Lambda
- src/lib - cliente DynamoDB compartilhado
- tests - testes unitarios com Jest e aws-sdk-client-mock

## Rodando localmente

```bash
npm install
npm test
```

```bash
sam build
sam local start-api
```

## CI

Workflow de CI roda npm install e npm test a cada push/PR.

## Stack

AWS Lambda, API Gateway, DynamoDB, AWS SAM, Node.js, Jest
