import * as bcrypt from 'bcrypt';
import { ValidRoles } from "src/interfaces";

export interface SeedUser {
    email: string;
    password: string;
    role: ValidRoles[];
    fullName: string;
    dateOfBirth: string;
    phone?: string;
    address?: string;
    isActive: true;
}

export const initialData: { users: SeedUser[] } = {
    users: [
        {
            role: [ValidRoles.admin],
            email: 'admin@admin.com',
            password: bcrypt.hashSync('Admin1234', 10),
            fullName: 'Alice Admin',
            dateOfBirth: '1985-04-20',
            phone: '1111111111',
            address: 'Calle Falsa 123, Santiago',
            isActive: true,
        },
        {
            role: [ValidRoles.doctor],
            email: 'bob.doctor@example.com',
            password: bcrypt.hashSync('Doctor1234', 10),
            fullName: 'Bob Doctor',
            dateOfBirth: '1978-11-02',
            isActive: true,
        },
        {
            role: [ValidRoles.patient],
            email: 'charlie@mymail.com',
            password: bcrypt.hashSync('Abcd1234', 10),
            fullName: 'Charlie Patient',
            dateOfBirth: '1995-07-10',
            phone: '2222222222',
            address: 'Avenida Libertador 456, Buenos Aires',
            isActive: true,
        },
        {
            role: [ValidRoles.patient],
            email: 'diana.rivera@example.com',
            password: bcrypt.hashSync('Abcd1234', 10),
            fullName: 'Diana Rivera',
            dateOfBirth: '1992-03-15',
            phone: '3333333333',
            address: 'Calle 10 Sur, Medellín',
            isActive: true,
        },
        {
            role: [ValidRoles.patient],
            email: 'elias.torres@example.com',
            password: bcrypt.hashSync('Abcd1234', 10),
            fullName: 'Elías Torres',
            dateOfBirth: '2000-06-22',
            phone: '4444444444',
            address: 'Av. Reforma 500, Ciudad de México',
            isActive: true,
        },
        {
            role: [ValidRoles.patient],
            email: 'fatima.gonzalez@example.com',
            password: bcrypt.hashSync('Abcd1234', 10),
            fullName: 'Fátima González',
            dateOfBirth: '1988-12-05',
            phone: '5555555555',
            address: 'Rua das Flores 77, São Paulo',
            isActive: true,
        }
    ]
};
