# mestoServer

## version
version 2.1.1

## About porject
Backend for project mesto.

run: npm start

run with hot-reload: npm run dev


запросы:

POST localhost:3000/signin       

авторизация

POST localhost:3000/signup      

регистрация



GET localhost:3000/users	                         

JSON-список всех пользователей

GET localhost:3000/users/8340d0ec33270a25f2413b69    

JSON-пользователя с переданным после /users идентификатором

PATCH localhost:3000/users/me                        

обновление данных профиля

PATCH localhost:3000/users/me/avatar               

обновление аватара



GET localhost:3000/cards	           

JSON-список всех карточек

POST localhost:3000/cards                 

создаёт карточку

DELETE localhost:3000/cards/:cardId      

удаляет карточку по идентификатору

PUT localhost:3000/cards/:cardId/likes    

поставить лайк карточке

DELETE localhost:3000/cards/:cardId/likes 

убрать лайк карточке
