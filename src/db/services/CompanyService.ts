import { Company } from '../models'
import { CompanyInput } from '../models/Company'

export const create = (payload: CompanyInput): Promise<Company> => {
    return Company.create(payload)
}

export const update = async (company: Company, payload: Partial<CompanyInput>): Promise<Company> => {
    return company.update(payload)
}

export const getById = async (id: string): Promise<Company | null> => {
    return Company.findByPk(id)
}

export const deleteById = async (id: string): Promise<boolean> => {
    const numDeletedCompanys = await Company.destroy({
        where: { id }
    })

    return !!numDeletedCompanys
}

export const getAll = async (): Promise<Company[]> => {
    return Company.findAll()
}