require('dotenv').config()

import { Employee, Company } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all(
  [
    Company.sync({ alter: isDev || isTest }).then((model) => {
      Employee.sync({ alter: isDev || isTest })
    })
  ]
)

export default dbInit 
