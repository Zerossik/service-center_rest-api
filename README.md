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
___

## Contacts
____
### `GET https://service-center-6fck.onrender.com/api/contacts - get all contacts`
Необхідно передати в headers поле `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
Для пагінації необхідно передати параметри **page** та **limit**. 
Наприклад: `https://service-center-6fck.onrender.com/api/contacts?page=1&limit=10`.  
Якщо не передати параметри пагінації, то сервер поверне 100 контактів за замовчуванням.
___
### `GET https://service-center-6fck.onrender.com/api/contacts/:id - get contact by ID`
Необхідно передати в headers поле `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
Необхідно передати параметр **id**. Отримаємо контакт за його ID. 
___
### `POST https://service-center-6fck.onrender.com/api/contacts - create new contact`
Необхідно передати в headers поле `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
Отримує body, обов'язкові поля: **type, manufacturer, model, customerName, phoneNumber, failure**.  
Необов'язкові поля: **deviceID, price, status, masterName, endDate, description**.  
example:
```json
{
"type": "Phone",
"manufacturer": "Samsung",
"model": "S21 ULTRA",
"customerName": "customerName",
"phoneNumber": "customerPhoneNumber",
"failure": "failure description",
"deviceID": "device IMAI or SN",
"price": 200,
"status": "repairStatus",
"masterName": "who made the repairs",
"endDate": "end repair date",
"description": "Your description"
}
```
___
### `PATCH https://service-center-6fck.onrender.com/api/contacts/:id - update contact by id`
Необхідно передати в headers поле `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
Необхідно передати параметр **id**.  
Отримує body, передаємо лише ті поля, які ми хочемо оновити.  
example:
```json
"description": "Your description"
```
Оновлює контакт за його ID.
___
### `DELETE https://service-center-6fck.onrender.com/api/contacts/:id - delete contact by id`
Необхідно передати в headers поле `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
Необхідно передати параметр **id**. Body не отримує.  
Видаляє контакт за його ID
___
