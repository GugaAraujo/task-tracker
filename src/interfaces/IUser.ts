export default interface IUser {
    id: number,
    email: string,
    password: string,
    name: string,
    token: string,
    first_access?: boolean,
};