var MongoClient = require('mongodb').MongoClient;

module.exports = function(context, req) {
  MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
    let send = response(client, context);

    if (err) send(500, err.message);

    let db = client.db('admin');

    let hero = ({ name, saying } = req.body);
    hero.id = parseInt(req.query.id);

    db
      .collection('heros')
      .updateOne(
        { id: hero.id },
        { $set: { name: hero.name, saying: hero.saying } },
        (err, heros) => {
          if (err) send(500, err.message);

          send(200, hero);
        }
      );
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
