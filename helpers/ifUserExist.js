export const ifUserExist = (users, email) => {
    return users.find(user => user.email === email) !== undefined
}