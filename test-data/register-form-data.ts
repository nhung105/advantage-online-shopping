// const dataTest = [
//     {
//         "name": "only input required field",
//         "username": "clone123gn1dd",
//         "email": "sadadas@gmail.com",
//         "password": "N124512hhhg1212",
//         "confirmPassword": "N124512hhhg1212",
//         "agreeToTerm": true
//     },
//     {
//         "name": "input all fields",
//         "username": "clone123sad123",
//         "email": "sdsdd@gmail.com",
//         "password": "N124512hhhg1",
//         "confirmPassword": "N124512hhhg1",
//         "agreeToTerm": true
//     }
// ]
// export default dataTest;

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
  state?: string;
  postalCode?: string;

  agreeToTerm: boolean;
};
