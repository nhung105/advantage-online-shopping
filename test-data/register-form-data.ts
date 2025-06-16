// const dataTest = [
//     {
//         "name": "only filled required fields with valid value",
//         "username": "cloneggaah1",
//         "email": "sadadas@gmail.com",
//         "password": "N124hhhg@12",
//         "confirmPassword": "N124hhhg@12",
//         "agreeToTerm": true
//     },
//     {
//         "name": "fill all fields with valid value",
//         "username": "clone123sa11",
//         "email": "sdsdd@gmail.com",
//         "password": "N124hhhg@",
//         "confirmPassword": "N124hhhg@",
//         "agreeToTerm": true
//     },
//     {
//         "name": "register with existing username",
//         "username": "clone123sa",
//         "email": "sdsdd@gmail.com",
//         "password": "N124hhhg@",
//         "confirmPassword": "N124hhhg@",
//         "agreeToTerm": true
//     },

//     {
//         "name": "register with existing username and add space before username",
//         "username": "clone123sa",
//         "email": "sdsdd@gmail.com",
//         "password": "N124hhhg@",
//         "confirmPassword": "N124hhhg@",
//         "agreeToTerm": true
//     }
// ]


export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;

    firstName?: string;
    lastName?: string;
    phoneNumber?: string;

    country?: string;
    city?: string;
    address?: string;
    state?: string
    postalCode?: string;

    agreeToTerm: boolean;
};