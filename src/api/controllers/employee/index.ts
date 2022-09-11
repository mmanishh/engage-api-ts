import * as service from '../../../db/services/EmployeeService'
import { EmployeeAttributes, EmployeeInput } from '../../../db/models/Employee'

export const create = async (payload: EmployeeInput): Promise<EmployeeAttributes> => {
    return service.create(payload)
}

export const update = async (id: string, payload: EmployeeInput): Promise<EmployeeAttributes|null> => {
    const employee = await service.getById(id);
    if (!employee) return null;
    return service.update(employee, payload)
}

export const getById = async (id: string): Promise<EmployeeAttributes | null> => {
    return service.getById(id)
}

export const deleteById = (id: string): Promise<boolean> => {
    return service.deleteById(id)
}

export const getAll = async (): Promise<EmployeeAttributes[]> => {
    const employees = await service.getAll()
    return employees
}