# Fitness Tracker API

## Introduction

This is a simple API for a fitness tracker.

You will get to know my users and workout API after working with this project and reading this documentation.  


My goal for this assignment is to get the grade **VG**.
#
### MongoDB connection string
```
 mongodb+srv://duricmitar:12345kyh@cluster0.u0p0rie.mongodb.net/
 ```
#

##  Dependencies
```
npm init -y   
```
>For creating a package.json file
```
npm i express mongoose
```
>To install express and mongoose
```
npm install mongoose-paginate-v2
```
>For our pagination
```
npm i express-rate-limit  
```
>Needed for rate-limiting
```
npm install -g nodemon 
```
>Not required but recommended if you do changes often in the js  
instead of having to terminate and start the server.js every time,  
nodemon restarts it automatically for you. 
#
## Postman

**Test collection:** [Fitness Tracker API Public](https://www.postman.com/gold-firefly-601719/workspace/fitness-tracker-api/collection/33841452-12b4de16-0487-4e8e-b7a9-ca13a18f6ecb?action=share&creator=33841452)

**Mock server collection:** [Mock Fitness Tracker API Public](https://www.postman.com/gold-firefly-601719/workspace/fitness-tracker-api/collection/33841452-73042393-7784-49ed-a870-4287c648a960?action=share&creator=33841452)

**Documentation**  
can be found in the [Testing](https://github.com/dmikozzz/FitnessTrackerAPI/tree/dev/Testing) folder.
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
#
## Workout
 The workouts API and its functions.

#### GET
We can do a simple GET for workouts.
>Example: GET http://localhost:3000/API/workouts
```
Response:  
 {
    "docs": [
        other workouts...{
            "_id": "6621b9a77ccb9ffd050ccab3",
            "userId": "661e8b4deab5230c94b30813",
            "workout": "Outdoor Walk",
            "steps": 3000,
            "distance": 2.2,
            "caloriesBurned": 180
        }
    ],
    "totalDocs": 25,
    "limit": 10,
    "totalPages": 3,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
}
Workouts will default to page 1 and a limit of 10 unless we provide page or limit parameters.
```


It's also possible to do a GET for a specific workout id,

>Example: GET http://localhost:3000/API/workouts/6621b9a77ccb9ffd050ccaab
```
Response:
{
    "_id": "6621b9a77ccb9ffd050ccaab",
    "userId": "661e8b4deab5230c94b3080d",
    "workout": "Outdoor Run",
    "steps": 5000,
    "distance": 5,
    "caloriesBurned": 450
}
```


If we want to get let's say page 3 and a limit of 1 workout or request would look like
>Example: GET http://localhost:3000/api/workouts?page=3&limit=1
```
Response:
{
    "docs": [
        {
            "_id": "6621b9a77ccb9ffd050ccaac",
            "userId": "661e8b4deab5230c94b30812",
            "workout": "Hiking",
            "steps": 8000,
            "distance": 6,
            "caloriesBurned": 600
        }
    ],
    "totalDocs": 25,
    "limit": 1,
    "totalPages": 25,
    "page": 3,
    "pagingCounter": 3,
    "hasPrevPage": true,
    "hasNextPage": true,
    "prevPage": 2,
    "nextPage": 4
} 
The paginate updates the total pages according to our requested parameters with what page we are on and pagingCounter is telling us that it's the third workout from our workout API.
```
   ```
    "hasPrevPage": true, a previous page exist if true
    "hasNextPage": true, next page exist if true
    "prevPage": 2, what the previous page would be
    "nextPage": 4 what the next page would be
```

The API can handle if we want to search for a specific workout. Keep in mind that it can only handle an exact match and existing workout.
>Example: GET http://localhost:3000/api/workouts?type=Outdoor%20Cycle

The API would respond with workouts that have the workout type Outdoor Cycle.  
```
Response:
        {
            "_id": "6621b9a77ccb9ffd050ccaad",
            "userId": "661e8b4deab5230c94b30814",
            "workout": "Outdoor Cycle",
            "steps": 0,
            "distance": 15,
            "caloriesBurned": 350
        },
        {
            "_id": "6621b9a77ccb9ffd050ccaba",
            "userId": "661e8b4deab5230c94b3080e",
            "workout": "Outdoor Cycle",
            "steps": 0,
            "distance": 12,
            "caloriesBurned": 300
        }
```
If we search for an workout that doesn't exist or we don't have an exact match we will get an message and a status of 404 Not Found.
> Example: GET http://localhost:3000/api/workouts?type=Sleeping

```
Response:
{
    "message": "No workouts of this type found."
}
```
#### POST

 We can post workouts but keep in mind to follow the structure of a workout.
  ```
  example:
  {
  "userId": "6621d4c08eba0d0cadb45b2f",
  "workout": "Outdoor Run",
  "steps": 5000,
  "distance": 5,
  "caloriesBurned": 450
}
 ```
 >Example: POST http://localhost:3000/API/workouts/
   ```
   The body as raw JSON
   {
  "userId": "6621d4c08eba0d0cadb45b2f",
  "workout": "Outdoor Run",
  "steps": 5000,
  "distance": 5,
  "caloriesBurned": 450
} 
This would create a new workout for the user 6621d4c08eba0d0cadb45b2f
It's not required to provide all these details but that would be a boring workout if there's no information about it or if we make the workout but without userId then we wouldn't know the user behind that amazing workout.

```

#### PUT 
We can also update our workout but we need to provide the id we want to update.
>Example: PUT http://localhost:3000/API/workouts/662c2feb990b891e8609dd9f

```
We follow the already existing structure and update our caloriesBurned to 550.
Body as raw JSON
{
  "userId": "6621d4c08eba0d0cadb45b2f",
  "workout": "Outdoor Run",
  "steps": 5000,
  "distance": 5,
  "caloriesBurned": 550
}

Response: 
{
    "_id": "662c2feb990b891e8609dd9f",
    "userId": "6621d4c08eba0d0cadb45b2f",
    "workout": "Outdoor Run",
    "steps": 5000,
    "distance": 5,
    "caloriesBurned": 550,
    "__v": 0
} Due to having { new: true } in the PUT route in workout.js the response we get is the updated version otherwise we would see the previous version of the workout with "caloriesBurned": 450 instead of 550.

```

#### DELETE
It is possible to delete a workout if we include the id.
> Example: DELETE http://localhost:3000/API/workouts/662c2feb990b891e8609dd9f
```
Response: 
{
    "message": "Workout has been removed!"
}
```
#
## Other information 

#### Rate limit

This project has a rate limit of 300 request every 15 minutes in the server.js  
if that's something you need to change you will find it on row 15 in the server.js file.

What happens if you exceed 300 requests is that simply the API will respond with a message that says
>Too many requests from this IP, please try again in a while.
#
#### Mock data
If you decide to use your own MongoDB connection.  

I will provide the mock data needed for users and workout which you can import in MongoDB compass.  
For example if you go to users and press ADD DATA  
you can paste the provided JSON file after choosing insert document,  
or if you have downloaded the JSON file you can choose to import JSON or CSV file.  
You can find the mock data in the mock_data folder.

If you'd like to make your mock own data I would recommend [Mockaroo](https://www.mockaroo.com/) 

**users** 

Add two fields.

name and a Type like Full Name  
dailyActiveCaloriesGoal with the type Number and a min max of your preference  
 for the goals to be.

**workouts**  

You would add four fields.  

workout with the Type Custom List  
in options you provide what workouts to randomize between.  
Example: Walking, Running, Swimming, Cycling and so on.

steps with the Type Number and min max of your preference.  
distance with the Type Number and min max of your preference.  
caloriesBurned with the Type Number and min max of your preference.

And lastly you choose how many #Rows you want and Format: JSON

 