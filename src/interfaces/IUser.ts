export default interface IUser {
    id: number,
    email: string,
    password: string,
    username: string,
    token: string,
    first_access?: boolean,
};