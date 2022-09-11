import { Router, Request, Response } from 'express'
import * as controller from '../controllers/employee'
import { successResponse, errorResponse } from '../../helpers/helpers'
import { DATA_DOES_NOT_EXIST } from '../../helpers/messages'
import validator from '../../middleware/validator'
import { update, getById, create } from '../controllers/employee/schema'

const companysRouter = Router()

companysRouter.get('/', async (req: Request, res: Response) => {
    try {
        const results = await controller.getAll()
        return successResponse(req, res, results);
    } catch (error) {
        return errorResponse(req, res);
    }
})

companysRouter.get('/:id', validator(getById), async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await controller.getById(id)
        if (!result) {
            return errorResponse(req, res, DATA_DOES_NOT_EXIST, 404);
        }
        return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res);
    }
})

companysRouter.put('/:id', validator(update), async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const payload = req.body

        const result = await controller.getById(id)
        if (!result) {
            return errorResponse(req, res, DATA_DOES_NOT_EXIST, 404);
        }

        const updated = await controller.update(id, payload)

        return successResponse(req, res, updated);
    } catch (error) {
        return errorResponse(req, res);
    }
})

companysRouter.delete('/:id', validator(getById), async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await controller.getById(id)
        if (!result) {
            return errorResponse(req, res, DATA_DOES_NOT_EXIST, 404);
        }

        const deleted = await controller.deleteById(id)

        return successResponse(req, res, deleted);

    } catch (error) {
        return errorResponse(req, res);
    }
})

companysRouter.post('/', validator(create), async (req: Request, res: Response) => {
    try {
        const payload = req.body

        const result = await controller.create(payload)
        return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res);
    }
})

export default companysRouter