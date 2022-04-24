const { response } = require('express')
const Employes = require('../models/employes')
const EmployesController = {

    async getEmployes(req, res = response) {
        try {
            const start = Number(req.query.start) || 0
            const [employes, total] = await Promise.all([
                Employes.find({}).skip(start).limit(5),
                Employes.countDocuments()
            ])

            res.status(200).json({
                ok: true,
                employes,
                total
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                error
            })
        }
    },

    async searchEmployes(req, res = response) {
        try {
            const { criteria, filter } = req.params
            const query = (strCriteria, strFilter) => {
                let objQuery = {};
                switch (strCriteria) {
                    case 'first_name': //user_id: { $regex: /bc/ }
                        objQuery = { first_name: { $regex: strFilter.toUpperCase() } }
                        break;

                    case 'surname':
                        objQuery = { surname: { $regex: strFilter.toUpperCase() } }
                        break;

                    case 'second_surname':
                        objQuery = { second_surname: { $regex: strFilter.toUpperCase() } }
                        break;

                    case 'type_id':
                        objQuery = { type_id: strFilter.toUpperCase() }
                        break;

                    case 'nro_id':
                        objQuery = { nro_id: { $regex: strFilter.toUpperCase() } }
                        break;

                    case 'country':
                        objQuery = { country: { $regex: strFilter.toUpperCase() } }
                        break;

                    case 'email':
                        objQuery = { email: { $regex: strFilter } }
                        break;

                    case 'state':
                        objQuery = { state: true }
                        break;

                    default:
                        objQuery = {}
                }
                return objQuery
            }
            const employes = await Employes.find(query(criteria, filter))

            res.status(200).json({
                ok: true,
                employes,
                total: employes.length
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                error
            })
        }
    },

    async createdEmployed(req, res = response) {
        const newEmployed = new Employes({...req.body })
        newEmployed.date_register = new Date()
        try {
            await newEmployed.save()
            res.status(200).json({
                ok: true,
                msg: `El empleado ${newEmployed.first_name} ${newEmployed.surname}, ha sido creado correctamente`,
                employed: newEmployed
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Ocurrio un error al crear el empleado, revisar logs"
            })
        }
    },

    async updateEmployed(req, res = response) {
        try {
            const { id } = req.params
            const { date_register, ...objEmploye } = req.body;
            const employedUpdate = await Employes.findByIdAndUpdate(id, objEmploye, { new: true });
            res.json({
                ok: true,
                employed: employedUpdate
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado, revisar logs'
            })
        }
    },

    async deleteEmployed(req, res = response) {
        const { id } = req.params
        const employedDb = await Employes.findById(id);
        if (!employedDb) {
            return res.json({
                ok: false,
                msg: "No existe un usuario con el id indicado"
            })
        }
        try {
            const employedDelete = await Employes.findByIdAndDelete(id);
            res.json({
                ok: true,
                employed: employedDelete
            })
        } catch (error) {
            console.log(error)
            res.json({
                ok: false,
                msg: 'Ocurrio un error inesperado, revisar logs'
            })
        }
    }
}



module.exports = EmployesController