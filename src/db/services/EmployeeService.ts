import { Company, Employee } from '../models'
import { EmployeeInput } from '../models/Employee'

export const create = (payload: EmployeeInput): Promise<Employee> => {
    return Employee.create(payload)
}

export const update = (employee: Employee, payload: Partial<EmployeeInput>): Promise<Employee> => {
    return employee.update(payload)
}

export const getById = async (id: string): Promise<Employee | null> => {
    return await Employee.findByPk(id)
}

export const deleteById = async (id: string): Promise<boolean> => {
    const numDeletedEmployees = await Employee.destroy({
        where: { id }
    })

    return !!numDeletedEmployees
}

export const getAll = async (): Promise<Employee[]> => {
    return Employee.findAll({ include: Company });
}