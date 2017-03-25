var faker = require('faker');
var _ = require('lodash'); 

function generateEmployees(){
    var employees = [];

    function employee(){
      var id = faker.random.uuid();
      var randomName = faker.name.findName(); // Caitlyn Kerluke
		  var randomEmail = faker.internet.email(); // Rusty@arne.info
		  var randomCard = faker.helpers.createCard(); // random contact card containing many properties

      // employees.push({
      //   // "id": id,
      //   // "name": randomName,
      //   // "email": randomEmail,
      //   "card": randomCard
      // });

      employees.push(randomCard);
    }

    _.times(15, employee);

    return {"employees" : employees}

}

module.exports = generateEmployees;