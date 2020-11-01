const db = require('./js/db')

class managePeople {
    constructor(){
        this.formNewRegister = document.getElementById('newRegister')

        this.loadRegistersPeople()
        this.addEventListeners()
    }

    addEventListeners(){
        this.formNewRegister.addEventListener('submit', this.createPersonReg.bind(this))
    }
    createPersonReg(){

    }

    loadRegistersPeople(){
        db. getPeople(function(people))
    }
}