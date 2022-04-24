const { response } = require("express")
const Employes = require('../models/employes')

const validToUpperCase = (str) => {
    return str === str.toUpperCase()
}

const validCharacters = (str) => {
    return /^[A-Z]+$/i.test(str)
}

const validCharactersId = (str) => {
    return /^[a-zA-Z0-9]+$/i.test(str)
}

const validationDataFiels = (req, res = response, next) => {
    let errors = []
    const { surname, second_surname, first_name, other_name, type_id, nro_id, date_entry } = req.body
    const validSurname = () => {
        if (!validToUpperCase(surname)) errors.push('El primer apellido debe estar en mayusculas')
        if (!validCharacters(surname)) errors.push('El primer apellido no debe contener letras con acentos especiales')
        if (surname.length > 20) errors.push('El primer apellido no debe exceder 20 caracteres')
    }

    const validSecondSurname = () => {
        if (!validToUpperCase(second_surname)) errors.push('El segundo apellido debe estar en mayusculas')
        if (!validCharacters(second_surname)) errors.push('El segundo apellido no debe contener letras con acentos especiales')
        if (second_surname.length > 20) errors.push('El segundo apellido no debe exceder 20 caracteres')
    }

    const validFirstName = () => {
        if (!validToUpperCase(first_name)) errors.push('El primer nombre debe estar en mayusculas')
        if (!validCharacters(first_name)) errors.push('El primer nombre no debe contener letras con acentos especiales')
        if (first_name.length > 20) errors.push('El primer nombre no debe exceder 20 caracteres')
    }

    const validOtherName = () => {
        if (other_name && !validToUpperCase(other_name)) errors.push('Otros nombres debe estar en mayusculas')
        if (other_name && !validCharacters(other_name)) errors.push('Otros nombres no debe contener letras con acentos especiales')
        if (other_name.length > 50) errors.push('Otros nombres no debe exceder 50 caracteres')
    }

    const validNroId = () => {
        if (!validCharactersId(nro_id)) errors.push('El campo de identificación solo puede contener letras sin acentos o numeros')
        if (nro_id.length > 20) errors.push('El campo de identificación no debe exceder 20 caracteres')
    }

    const validDateEntry = () => {
        const currentDate = new Date();
        const dateEntry = new Date(date_entry)
        if (Date.parse(dateEntry) > Date.parse(currentDate)) errors.push(`La fecha de ingreso no puede ser mayor a la actual`)
    }

    validSurname()
    validSecondSurname()
    validFirstName()
    validOtherName()
    validNroId()
    validDateEntry()

    if (errors.length) {
        return res.status(400).json({
            ok: false,
            errors: errors
        });
    }

    next()
}

module.exports = {
    validationDataFiels
}