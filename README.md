# service-center_rest-api
____
## AUTHORIZATION
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
## Reset_password
___
### `POST https://service-center-6fck.onrender.com/api/auth/resetpassword - resetPassword first step`
Перший запит на скидання паролю. Приймає body з полем `email`
```json
"email": "example_email"
```
Якщо ви все зробили вірно, то на email користувача буде відправлений лист з подальшою інструкцією.
___
### `POST https://service-center-6fck.onrender.com/api/auth/resetpassword/verify - resetPassword second step`
Це другий крок, але він не обов'язковий. Цей крок необхідний, якщо ви хочете відображати компонент за умовою, наприклад, якщо токен валідний, то показуйте користувачу форму для введення нового паролю, якщо не валідний, то покажіть помилку! Отримує body з полями `token, id` - token та id вам були відправлені в посиланні на пошту в першому запиті. 
```json
"token": "your_token",
"id": "your_id"
```
Якщо ви все зробили вірно, то ви отримаєте відповідь з успіхом або помилкою.
___
### `POST https://service-center-6fck.onrender.com/api/auth/resetpassword/:token - resetPassword third step`
В параметрах запроса приймає `token`, а в body приймає `password, id`.
```json
"password": "your new password",
"id": "your id"
```
Якщо ви все зробили вірно, то пароль успішно буде замінено на новий, а користувач отримає на пошту email. 
___   
## CONTACTS
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
Якщо не передати параметри пагінації, то сервер поверне 20 контактів за замовчуванням.   

Для фільтрування за типом, необхідно передати параметр **type**      
Наприклад: `https://service-center-6fck.onrender.com/api/contacts?type=phone`    
Сервер поверне всі записи з типом `phone`.    
Для пошуку за ключовим словом, необхідно передати параметр **filter**    
Наприклад: `https://service-center-6fck.onrender.com/api/contacts?filter=samsung`    
Сервер поверне всі документи, які відповідають ключовому запиту.
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
### USER
Всі запити на адресу USER отримують `'Authorization': 'Bearer token'`
```js
headers{
"authorization": "Bearer token"
}
```
___
### `POST https://service-center-6fck.onrender.com/api/user/changeTheme - changeTheme`
Запит на зміну теми. Отримує body з полем `theme`
```json
"theme": "light or dark"
```
Повертає нову тему!
___
### `POST https://service-center-6fck.onrender.com/api/user/addMaster - add the name master to the database`
Запит на додавання майстра в базу. Отримує body з полем `firstName lastName`
```json
"firstName": "your firstName",
"lastName": "your lastName"
```
Якщо все успішно, сервер поверне 201 код та об'єкт з доданим майстром! Інакше поверне помилку.
___
### `DELETE https://service-center-6fck.onrender.com/api/user/deleteMaster - delete master from the database`
Запит на видалення майстра з бази. Отримує body з полем `id`
```json
"id": "example_id"
```
Якщо все успішно, сервер поверне 200 код та об'єкт з видаленим майстром! Інакше поверне помилку.
___
### `GET https://service-center-6fck.onrender.com/api/user/deviceSettings - get deviceTypes and Manufacturers`
ГЕТ запит за списком `deviceTypes та Manufacturers`
___
### `POST https://service-center-6fck.onrender.com/api/user/deviceSettingsType - add deviceType`
ПОСТ запит для додавання `deviceType`, body отримує поле `type`. 
```json
"type": "your deviceType: String"
```
Якщо все успішно, сервер поверне останній доданий deviceType.
___
### `POST https://service-center-6fck.onrender.com/api/user/deviceSettingsManufacturer - add deviceManufacturer` 
ПОСТ запит для додавання `deviceManufacturer`, body отримує поле `manufacturer`. 
```json
"manufacturer": "your manufacturer: String"
```
Якщо все успішно, сервер поверне останній доданий deviceManufacturer.
___
### `PATCH https://service-center-6fck.onrender.com/api/user/deviceTypeUpdate - update deviceType`
Запит на оновлення типу техніки, отримує body с полями `oldType, newType`   
```json
"oldType": "The type you want to update: String",
"newType": "The new type: String"
```
При успішному оновленні сервер поверне оновлений тип техніки.
___
### `PATCH https://service-center-6fck.onrender.com/api/user/deviceManufacturerUpdate - update manufacturer`
Запит на оновлення виробника, отримує body с полями `oldManufacturer, newManufacturer`   
```json
"oldManufacturer": "The manufacturer you want to update: String",
"newManufacturer": "The new manufacturer: String"
```
При успішному оновленні сервер поверне оновленого виробника.
___
### `DELETE https://service-center-6fck.onrender.com/api/user/deviceType - delete deviceType`
Запит на видалення типу техніки. body отримує поле `type`.
```json
"type": "your type: String"
```
Якщо тип був успішно видалений, то сервер відправе успішну відповідь, інакше - помилку.
___
### `DELETE https://service-center-6fck.onrender.com/api/user/deviceManufacturer - delete deviceManufacturer`
Запит на видалення виробника. body отримує поле `manufacturer`.
```json
"manufacturer": "your manufacturer: String"
```
Якщо виробник був успішно видалений, то сервер відправе успішну відповідь, інакше - помилку.
___
