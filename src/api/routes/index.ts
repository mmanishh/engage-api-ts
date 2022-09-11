import { Router } from 'express'
import companiesRouter from './company'
import employeesRouter from './employee'

const router = Router()

router.use('/employees', employeesRouter)
router.use('/companies', companiesRouter)

export default router