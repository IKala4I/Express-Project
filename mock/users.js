export let users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'mysecretpassword',
        age: 30,
        address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            country: 'USA'
        },
        createdAt: '2023-05-06T08:12:34.567Z',
        tags: ['Sales', 'Marketing']
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janesmith@example.com',
        password: 'anotherpassword',
        age: 25,
        address: {
            street: '456 Oak St',
            city: 'Sometown',
            state: 'NY',
            zip: '67890',
            country: 'USA'
        },
        createdAt: '2023-05-07T09:24:45.678Z',
        tags: ['Engineering', 'Product']
    },
    {
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alexjohnson@example.com',
        password: 'securepassword123',
        age: 28,
        address: {
            street: '789 Pine St',
            city: 'Othercity',
            state: 'TX',
            zip: '54321',
            country: 'USA'
        },
        createdAt: '2023-05-08T10:36:56.789Z',
        tags: ['Development', 'Design']
    },
    {
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'emilywilliams@example.com',
        password: 'password456',
        age: 22,
        address: {
            street: '101 Elm St',
            city: 'Newville',
            state: 'FL',
            zip: '98765',
            country: 'USA'
        },
        createdAt: '2023-05-09T11:48:07.890Z',
        tags: ['Research', 'Analytics']
    },
    {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michaelbrown@example.com',
        password: 'brownie123',
        age: 35,
        address: {
            street: '222 Maple St',
            city: 'Maplewood',
            state: 'NJ',
            zip: '45678',
            country: 'USA'
        },
        createdAt: '2023-05-10T12:59:18.901Z',
        tags: ['Management', 'Leadership']
    },
]

export const updateUsers = (email) => {
    users = users.filter(user => user.email !== email)
    return users
}