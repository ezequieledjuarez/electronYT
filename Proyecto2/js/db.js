const Datastore = require('nedb')

let db = new Datastore({
    filename: 'db/people.db',
    autoload : true
})

exports.addPeople = function(name, surname, mail){
    let people = {
        name :name,
        lastname: lastname,
        mail: mail
    }
    db.insert(persona,function(err, newObject){

    })
}

exports.getPeople = function(operator){
    db.find({},function(err, people){
        if(people){
            operator(people)
        }
    })
}

exports.deletePerson = function(id){
    db.remove({
        _id = id},
        {},
        function(err, nDeletedReg){

        }
    )
}