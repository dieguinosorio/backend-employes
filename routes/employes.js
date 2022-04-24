const { Router } = require('express');
const router = Router();
//Middlewares
const { validateFields } = require('../middlewares/validate_fields')
const { validateEmail, validateId, validateIdEdit } = require('../middlewares/validate_email')
const { validationDataFiels } = require('../middlewares/validate_fields_data');
const { fieldsCheck } = require('../middlewares/checks')

//Controller
const EmployesController = require('../controllers/employes');


router.get('/', EmployesController.getEmployes)

router.get('/search/:criteria/:filter', EmployesController.searchEmployes)

router.post('/', [
        ...fieldsCheck,
        validateFields,
        validationDataFiels,
        validateEmail,
        validateId,
    ], EmployesController.createdEmployed),

    router.put('/:id', [
        ...fieldsCheck,
        validateFields,
        validationDataFiels,
        validateEmail,
        validateIdEdit,
    ], EmployesController.updateEmployed)

router.delete('/:id', EmployesController.deleteEmployed)

module.exports = router