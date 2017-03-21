var faker = require('faker');
var _ = require('lodash'); 

function generateEmployees(){
    var employees = [];

    function employee(){
        var id = faker.random.uuid();
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        var title = faker.name.title();
        var jobDescriptor = faker.name.jobDescriptor();
        var jobArea = faker.name.jobArea();
        var jobType =faker.name.jobType();
        var email = faker.internet.email();
        var img = faker.internet.avatar();

        employees.push({
            "id": id,
            "first_name": firstName,
            "last_name": lastName,
            "title": title,
            "job_descriptor": jobDescriptor,
            "job_area": jobArea,
            "job_type": jobType,
            "email": email,
            "img": img
        });
    }

    _.times(15, employee);

    return {"employees" : employees}

}

module.exports = generateEmployees;