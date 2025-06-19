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

const invalidPassword = [
    {
        name: "Missing Uppercase",
        password: "aaa1",
        expected: "One upper letter required",
    },
    {
        name: "Missing Lowercase",
        password: "AAA1",
        expected: "One lower letter required",
    },
    {
        name: "Missing Number",
        password: "Aaaa",
        expected: "One number required",
    },
    {
        name: "Only Lowercase Present",
        password: "aaaa",
        expected: "One upper letter required",
    },
    {
        name: "Only Uppercase Present",
        password: "AAAA",
        expected: "One lower letter required",
    },
    {
        name: "Only Number Present",
        password: "1234",
        expected: "One lower letter required",
    },
    {
        name: "input value exceeds length max",
        password: "dsfsdfsdfsdfs",
        expected: "Use maximum 12 character",
    },
    {
        name: "input value under length min",
        password: "dsf",
        expected: "Use 4 character or longer",
    },
];
export default invalidPassword;