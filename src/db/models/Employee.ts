import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Company from './Company';

export interface EmployeeAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface EmployeeInput extends Optional<EmployeeAttributes, 'id'> {}

class Employee extends Model<EmployeeAttributes, EmployeeInput> implements EmployeeAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Employee.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    sequelize: sequelizeConnection,
    paranoid: true,
})

Employee.belongsTo(Company, {
    foreignKey: {
        allowNull: false
    }
})

export default Employee