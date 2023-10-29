# service-center_rest-api
____
## Authorization
____
### `POST https://service-center-6fck.onrender.com/api/auth/signup - create user!`
Отримує body у форматі (поля name, email, password обов'язкові з валідацією):
```json
{
  "name": "examplename",
  "email": "example@example.com",
  "password": "examplepassword"
}
```
____
### `POST https://service-center-6fck.onrender.com/api/auth/signin - user auth!`
Отримує body у форматі (поля email, password обов'язкові з валідацією)
```json
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```
____
### `GET https://service-center-6fck.onrender.com/api/auth/google -  user auth with google!`
Не отримує body!
___
### `GET https://service-center-6fck.onrender.com/api/auth/current - get current user!`
Необхідно передати в headers поле `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
___
### `POST https://service-center-6fck.onrender.com/api/auth/logout - logout user!`
Необхідно передати в headers поле `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
___
