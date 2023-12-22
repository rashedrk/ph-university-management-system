import { z } from 'zod';

const userNameSchema = z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
});

const guardianSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

export const studentValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20),
    name: userNameSchema,
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z.string(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;