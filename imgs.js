var faker = require('faker');
var _ = require('lodash'); 

function generateEmployees(){
    var employees = [];

    function employee(){
        var img = faker.internet.avatar();

        employees.push(img);
    }

    _.times(1500, employee);

    return {"employees" : employees}

}

module.exports = generateEmployees;