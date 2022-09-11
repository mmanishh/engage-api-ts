import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

export interface CompanyAttributes {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    website?: string
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CompanyInput extends Optional<CompanyAttributes, 'id'> {}

class Company extends Model<CompanyAttributes, CompanyInput> implements CompanyAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public phone!: string;
    public website!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Company.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Company