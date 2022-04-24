const { check } = require('express-validator')
const fieldsCheck = [
    check('surname', 'El primer apellido no puede estar vacio').not().isEmpty(),
    check('second_surname', 'El segundo apellido no puede estar vacio').not().isEmpty(),
    check('first_name', 'El primer nombre no puede estar vacio').not().isEmpty(),
    check('country', 'El pais no puede estar vacio').not().isEmpty(),
    check('type_id', 'El tipo de ID no puede estar vacio').not().isEmpty(),
    check('nro_id', 'El # Identificación no puede estar vacio').not().isEmpty(),
    check('date_entry', 'La fecha de entrada no puede estar vacia').not().isEmpty(),
    check('date_entry', 'La fecha entrada debe ser valida').isISO8601().toDate(),
    check('department', 'El Árena no puede estar vacia').not().isEmpty(),
]

module.exports = {
    fieldsCheck
}