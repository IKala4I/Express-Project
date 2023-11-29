# Express Application

This is a simple Express application that provides routes for user management, student statistics, and articles.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/IKala4I/Express-Project.git
   cd Express-Project

2. Install dependencies:

    ```bash
    npm install
   
3. Running the Application

    ```bash
   npm start
   
The server will run on http://localhost:3000 by default.

## API Reference

### Users

#### Get all users

```http
  GET /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `Users[]` | `Return array of users` |

#### Get user by email

```http
  GET /api/users/:email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. Email of user to fetch |

#### Delete user by email

```http
  DELETE /api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. Email of user to delete |

#### Create a new user

```http
  POST /api/users
```

| Parameter | Type     | Description                                  |
| :-------- | :------- |:---------------------------------------------|
| `email`   | `string` | **Required**. Email of the new user          |
| `password`| `string` | **Required**. Password of the new user       |
| `age`      | `number` | **Required**. Age of the new user            |
| `firstName`| `string` | First name of the new user (Optional)        |
| `lastName` | `string` | Last name of the new user (Optional)         |
| `address`  | `object` | Address of the new user (Optional)           |
| `tags`     | `string[]` | Tags associated with the new user (Optional) |

#### Update user by email

```http
  PATCH /api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. Email of user to update |
| `password`| `string` | Password of the user (Optional) |
| `firstName`| `string` | First name of the user (Optional) |
| `lastName` | `string` | Last name of the user (Optional) |
| `age`      | `number` | Age of the user (Optional) |
| `address`  | `object` | Address of the user (Optional) |
| `tags`     | `string[]` | Tags associated with the user (Optional) |

### Students

#### Get student statistics

```http
  GET /api/students
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `Students[]` | `Return array of students` |

#### Get student with worst score

```http
  GET /api/students/worst/:type
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`    | `string` | **Required**. Type of score to fetch (homework, quiz, exam) |

### Articles

#### Get all articles

```http
  GET /api/articles
```

| Parameter | Type      | Description                |
| :-------- | :-------- | :------------------------- |
| `none`    | `Articles[]` | `Return array of articles` |

#### Create new article

```http
  POST /api/articles
```

| Parameter   | Type      | Description                     |
| :---------- | :-------- | :------------------------------ |
| `name`      | `string`  | **Required**. Name of the article |
| `type`      | `string`  | **Required**. Type of the article |
| `description`| `string` | Description of the article (Optional) |
| `tags`      | `string[]`| Tags associated with the article (Optional) |

#### Update article tags

```http
  PATCH /api/articles
```

| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `name`    | `string`  | **Required**. Name of the article to update |
| `tags`    | `string[]` | New tags for the article                  |
