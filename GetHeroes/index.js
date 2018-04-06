var MongoClient = require('mongodb').MongoClient;

// updated for funcpack

module.exports = function(context, req) {
  MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
    let send = response(client, context);

    if (err) send(500, err.message);

    let db = client.db('admin');

    db
      .collection('heros')
      .find({})
      .toArray((err, result) => {
        if (err) send(500, err.message);

        send(200, JSON.parse(JSON.stringify(result)));
      });
  });
};

function response(client, context) {
  return function(status, body) {
    context.res = {
      status: status,
      body: body
    };

    client.close();
    context.done();
  };
}
