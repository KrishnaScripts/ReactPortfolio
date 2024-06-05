export interface userData {
    id?: number,
    fullName: string,
    mobileNumber: string,
    emailAddress: string,
    address: string
}

export interface crudInitial {
    registeredUsers: object[],
}

export interface patientData { 
    id?: number,
    username: string,
    email:string,
    password: string,
    confirmPassword: string
}

export interface crudPatient {
    registeredPatient: object[],
}