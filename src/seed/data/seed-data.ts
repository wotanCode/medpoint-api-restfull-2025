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
            password: 'AdminPass123!',
            role: [ValidRoles.admin],
            fullName: 'Alice Admin',
            dateOfBirth: '1985-04-20',
            phone: '1111111111',
            email: 'alice.admin@example.com',
            address: 'Calle Falsa 123, Santiago',
            isActive: true,
        },
        {
            password: 'DocBob456!',
            role: [ValidRoles.doctor],
            fullName: 'Bob Doctor',
            dateOfBirth: '1978-11-02',
            email: 'bob.doctor@example.com',
            isActive: true,
        },
        {
            email: 'charlie@mymail.com',
            password: 'Patient789!',
            role: [ValidRoles.patient],
            fullName: 'Charlie Patient',
            dateOfBirth: '1995-07-10',
            phone: '2222222222',
            address: 'Avenida Libertador 456, Buenos Aires',
            isActive: true,
        },
        {
            email: 'diana.rivera@example.com',
            password: 'Diana123!',
            role: [ValidRoles.patient],
            fullName: 'Diana Rivera',
            dateOfBirth: '1992-03-15',
            phone: '3333333333',
            address: 'Calle 10 Sur, Medellín',
            isActive: true,
        },
        {
            email: 'elias.torres@example.com',
            password: 'Elias456!',
            role: [ValidRoles.patient],
            fullName: 'Elías Torres',
            dateOfBirth: '2000-06-22',
            phone: '4444444444',
            address: 'Av. Reforma 500, Ciudad de México',
            isActive: true,
        },
        {
            email: 'fatima.gonzalez@example.com',
            password: 'Fatima789!',
            role: [ValidRoles.patient],
            fullName: 'Fátima González',
            dateOfBirth: '1988-12-05',
            phone: '5555555555',
            address: 'Rua das Flores 77, São Paulo',
            isActive: true,
        }
    ]
};
