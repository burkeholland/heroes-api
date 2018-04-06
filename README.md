# Heroes API

A sample Serverless Mongo DB API that runs on Azure Functions.

## Prereqs

[Azure Functions CLI](https://github.com/Azure/azure-functions-core-tools)

## Setup

Make sure you have the Azure Functions CLI installed. Add a `local.settings.json` file and the following settings. Note that this project assumes you have a Cosmos DB database called "admin" with a collection called "heros".

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "CosmosDBConnectionString":
      "<YOUR-COSMOSDB-CONNECTION-STRING"
  }
}
