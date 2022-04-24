const { response } = require("express")
const { validationResult } = require("express-validator")
const Employes = require('../models/employes')

const validateFields = async(req, res = response, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    const createEmail = () => {
        const { first_name, surname, country } = req.body
        let newSurname = surname.replace(' ', '')
        return `${first_name.toLocaleLowerCase()}.${newSurname.toLocaleLowerCase()}@cidenet.com.${country ==='COL' ? 'co' : 'eu'}`
    }

    req.body.email = createEmail()
    next();
}

module.exports = {
    validateFields,
}