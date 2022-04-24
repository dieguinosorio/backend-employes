const { response } = require("express")

const Employes = require('../models/employes')

const emailDistinct = async(email) => {
    let exist = true,
        i = 1,
        [nameMail, domainMail] = email.split('@'),
        newEmail = null
    while (exist === true) {
        newEmail = `${nameMail}${i}@${domainMail}`
        const existMail = await Employes.findOne({ email: newEmail })
        if (!existMail) {
            exist = false;
        }
        i++
    }
    return newEmail
}

const validateEmail = async(req, res = response, next) => {
    const { email } = req.body;
    const employedDb = await Employes.findOne({ email })
    if (employedDb) {
        newEmail = await emailDistinct(email)
        req.body.email = newEmail
    }
    next();
}

const validateId = async(req, res = response, next) => {
    const { type_id, nro_id } = req.body;
    const employedDb = await Employes.findOne({ type_id, nro_id })
    console.log(employedDb)
    if (employedDb) {
        return res.status(400).json({
            ok: false,
            errors: [`Ya existe un empleado con Tipo ${type_id} y ID ${nro_id}`]
        });
    }
    next();
}

const validateIdEdit = async(req, res = response, next) => {
    const { type_id, nro_id } = req.body;
    const { id } = req.params
    const employedDb = await Employes.find({ type_id, nro_id, id: { $ne: id } })
    const filterId = employedDb.filter(el => el.id !== id)
    if (filterId && filterId.length > 0) {
        return res.status(400).json({
            ok: false,
            errors: [`Ya existe un empleado ${ filterId[0].first_name } con Tipo ${type_id} y ID ${nro_id}`]
        });
    }
    next();
}

module.exports = {
    validateEmail,
    validateId,
    validateIdEdit
}