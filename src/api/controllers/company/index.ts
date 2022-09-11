import { Company } from '../../../db/models'
import { CompanyInput } from '../../../db/models/Company'
import * as service from '../../../db/services/CompanyService'

export const create = async (payload: CompanyInput): Promise<Company> => {
    return service.create(payload)
}

export const update = async (id: string, payload: CompanyInput): Promise<Company | null| undefined> => {
    const company = await service.getById(id);
    if (!company) return;
    return service.update(company, payload)
}

export const getById = async (id: string): Promise<Company| null| undefined> => {
    const company = service.getById(id)
    if (!company) return
    return company;
}

export const deleteById = (id: string): Promise<boolean> => {
    return service.deleteById(id)
}

export const getAll = async (): Promise<Company[]> => {
    const employees = await service.getAll()
    return employees
}