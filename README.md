# Fitness Tracker API
**TO BE UPDATED**
#

## Introduction

This is a simple API for a fitness tracker.

You will get to know my users and workout API after working with this project and reading this documentation.
#
### MongoDB connection string

> mongodb+srv://duricmitar:12345kyh@cluster0.u0p0rie.mongodb.net/
#
 ## Users
 The users API has a few functions and here I will explain them.

 #### GET
 We can do a simple GET request to get all users.
 >Example: GET http://localhost:3000/API/users
 ``` 
 [
    {
        "_id": "661e8b4deab5230c94b3080d",
        "name": "Maria Silva",
        "dailyActiveCaloriesGoal": 800
    },
    {
        "_id": "661e8b4deab5230c94b30812",
        "name": "Chen Wei",
        "dailyActiveCaloriesGoal": 1100
    }... rest of users
 ] 
 ```

We can also do a GET for a specific user with their user id.
>Example: GET http://localhost:3000/API/users/6621d4c08eba0d0cadb45b2f
```
{
    "_id": "6621d4c08eba0d0cadb45b2f",
    "name": "Mikozzz",
    "dailyActiveCaloriesGoal": 1200,
    "__v": 0
}
```

We can even do a search for a name in our GET request.
>Example: GET http://localhost:3000/api/users?name=Björn%20Jönsson keep in mind to search for an exact match otherwise the API will return an empty array.
```
[
    {
        "_id": "6626a2fe768c4484dae0a3df",
        "name": "Björn Jönsson",
        "dailyActiveCaloriesGoal": 1400,
        "__v": 0
    }
]
```

 #### POST
 We can post users but keep in mind to include name and goal otherwise we will get an error.
 >Example: POST http://localhost:3000/API/users/
 ```
 Example body to include:
  {
        "name": "Miko",
        "dailyActiveCaloriesGoal": 1200
  } 

  Or something like
      {
        "name": "Cooper Howard ",
        "dailyActiveCaloriesGoal": 1500
      } 
 ```
 it's up to you if you want a first name and last name or just a nickname.
 #### PUT
 We can update our users and to do that we need to provide the id we want to update.
 >Example: PUT http://localhost:3000/API/users/661e8b4deab5230c94b3080d

 ```
 Body example for that user: 
 {
        "_id": "661e8b4deab5230c94b3080d",
        "name": "Maria Silva",
        "dailyActiveCaloriesGoal": 800
} Here we can change name or goal if wanted. 
 ```
 When doing a PUT for a user the body won't return the updated user. If you do a GET request for that user or all users and look for it you will see that it's updated.

 #### DELETE
 We can also delete an user if thats's wanted, don't forget to include the user ID you want to delete.
 > Example: DELETE http://localhost:3000/API/users/662ae2612001a3f0463bd1d4
 
```
And we will get a response in body with:
 {
    "message": "User has been deleted!"
 }
```


#### CONNECTION
In our users API we have a function where we are connected to the database always unless we request a disconnect. 
> GET http://localhost:3000/api/users?disconnect=true

This would lead to not being able to retrieve the users from the API.
By doing any other request the database will automatically reconnect.

> GET http://localhost:3000/api/users?disconnect=false will also work to turn the database connection back online.

