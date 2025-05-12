import { ValidRoles } from "src/interfaces";

export interface SeedUser {
    username: string;
    password: string;
    role: ValidRoles[];
    fullName: string;
    dateOfBirth: string;
    phone?: string;
    email?: string;
    address?: string;
    isActive: true;
}

export const initialData: { users: SeedUser[] } = {
    users: [
        {
            username: 'adminUser01',
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
            username: 'doctorBob',
            password: 'DocBob456!',
            role: [ValidRoles.doctor],
            fullName: 'Bob Doctor',
            dateOfBirth: '1978-11-02',
            email: 'bob.doctor@example.com',
            isActive: true,
        },
        {
            username: 'patientCharlie',
            password: 'Patient789!',
            role: [ValidRoles.patient],
            fullName: 'Charlie Patient',
            dateOfBirth: '1995-07-10',
            phone: '2222222222',
            address: 'Avenida Libertador 456, Buenos Aires',
            isActive: true,
        },
        {
            username: 'patientDiana',
            password: 'Diana123!',
            role: [ValidRoles.patient],
            fullName: 'Diana Rivera',
            dateOfBirth: '1992-03-15',
            phone: '3333333333',
            email: 'diana.rivera@example.com',
            address: 'Calle 10 Sur, Medellín',
            isActive: true,
        },
        {
            username: 'patientElias',
            password: 'Elias456!',
            role: [ValidRoles.patient],
            fullName: 'Elías Torres',
            dateOfBirth: '2000-06-22',
            phone: '4444444444',
            email: 'elias.torres@example.com',
            address: 'Av. Reforma 500, Ciudad de México',
            isActive: true,
        },
        {
            username: 'patientFatima',
            password: 'Fatima789!',
            role: [ValidRoles.patient],
            fullName: 'Fátima González',
            dateOfBirth: '1988-12-05',
            phone: '5555555555',
            email: 'fatima.gonzalez@example.com',
            address: 'Rua das Flores 77, São Paulo',
            isActive: true,
        }
    ]
};
