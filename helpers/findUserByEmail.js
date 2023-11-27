export const findUserByEmail = (users, email) => {
    return users.find(user => user.email === email)
}