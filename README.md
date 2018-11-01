# Blog API

This project is an open API for create a blog application.
It's part of the frontend mastermind program.

You can build your web application using this API. :tada:

## Dependencies

To run this project you need this tools:

> Node >= 10
> Yarn

## Running

Run:
```bash
yarn start
```

## Testing

Run:
```bash
yarn test
```

## Documentation

We use [Swagger](https://swagger.io/) to build a live documentation.
You can use two ways:

- Running the project:
  1. Run the project
  2. Access http://localhost:4000/documentation

- Swagger Hub:
  1. Access [the project swagger hub](https://app.swaggerhub.com/apis-docs/valter/blog-api/0.0.1-oas3)

## API

- [Login](#Login)
- Post
  - [Create a post](#Create-a-post)
  - [List all posts](#List-all-posts)
  - [Get a post info](#Get-a-post-info)
  - [Remove a post](#Remove-a-post)

### Users
First of all, you has to be authenticated to manage your blog.
So you can use our two standard users to do this.

```json
email: 'john@foobar.com',
password: '1234',

email: 'jane@foobar.com',
password: '1234',
```

### Login

This method authenticates a user and return an access token.

#### Request

To authenticate send use `POST` method to `localhost:4200/login` with this

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

Success:

```json
{
  "id": "string",
  "name": "string",
  "username": "string",
  "token": "string"
}
```

Failure:

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Invalid email or password"
}
```

### Protected endpoints

You need to use the token you get at `login` on some endpoints.

In enpoints with this icon (:lock:) you will need to send an `authorization` header on your request.
```header
authorization: 'token'
```

### Create a post :lock:


This method creates a new post. Use a `POST` method on `localhost:4200/posts`.

#### Request
```json
{
  "title": "string",
  "content": "string"
}
```
#### Response
```json
{
  "id": "string",
  "title": "string",
  "content": "string"
}
```

### List all posts :lock:

This method list all created post. Use a `GET` method on `localhost:4200/posts`.

#### Response
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "content": "string"
    }
  ]
}
```

### Get a post info :lock:

This method get a post info. Use a `GET` method passing the post **ID** on
`localhost:4200/posts`.

Ex: `localhost:4200/posts/0dea83b0-604b-4e7c-9e1d-1eccef189946`

#### Response
```json
{
  "id": "string",
  "title": "string",
  "content": "string"
}
```

### Remove a post :lock:

This method removes a post. This method get a post info. Use a `GET` method passing the post **ID** on
`localhost:4200/posts`.

Ex: `localhost:4200/posts/0dea83b0-604b-4e7c-9e1d-1eccef189946`


#### Response

If was success you will receive a [no-content](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/204) response.
