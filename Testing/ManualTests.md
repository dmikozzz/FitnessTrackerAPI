## MANUAL TESTING
#### This is a collection of the 13 manual tests for this project.
#
**TO BE UPDATED**
#
## 1.  Status Code 200 Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.
- #### Steps:
1. Send a GET request to: http://localhost:3000/API/users
2. Send a GET request to: http://localhost:3000/API/workouts
- #### Expected:
- Status: 200 OK 
- #### Result:
- Status: 200 OK
#

## 2. Check if the API returns the expected data format (e.g., JSON, XML) in the response.
- #### Steps:
1. Send a GET request to: http://localhost:3000/API/users
2. Send a GET request to: http://localhost:3000/API/workouts
- #### Expected:
- Body to contain JSON-format
- #### Result:
- Body contained the correct JSON-format 
``` 
example users: 
[    
    {
        "_id": "6621d4c08eba0d0cadb45b2f",
        "name": "Mikozzz",
        "dailyActiveCaloriesGoal": 1200,
        "__v": 0
    }
]
```
#
# 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.
- #### Steps:
- Send a GET request to: http://localhost:3000/API/kyh

- #### Expected:
 - Status: 404 Not Found 
- #### Result: 
 - Status 404 Not Found


#
## 4. Test if the API returns the correct data when querying with specific filters or search criteria.
- #### Steps:
 - Send a GET request to: http://localhost:3000/api/workouts?type=Hiking
- #### Expected:
- To return only workouts with the workout type "Hiking"
- #### Result:
 - Returned workouts with the type "Hiking"
#
## 5. Verify that the API returns paginated results when a large number of records are requested.

- #### Steps:
- Send a GET request to: http://localhost:3000/api/workouts?page=2&limit=10
- #### Expected:
 - To start on page 2 and return 10 workouts.
- #### Result:
 - Returned the expected workouts
``` 
Example: 
{[{...}]
    "totalDocs": 21,
    "limit": 10,
    "totalPages": 3,
    "page": 2,
    "pagingCounter": 11,
    "hasPrevPage": true,
    "hasNextPage": true,
    "prevPage": 1,
    "nextPage": 3
}
```
#
## 6. Check if the API handles special characters and non-English text correctly in input data and returned responses.

- #### Steps:
- Send a GET request to: http://localhost:3000/api/users?name=Björn%20Jönsson

- #### Expected:
 - To return the requested user
- #### Result:
 - Returned the requested user
 ```
 example:
[
    {
        "_id": "6626a2fe768c4484dae0a3df",
        "name": "Björn Jönsson",
        "dailyActiveCaloriesGoal": 1400,
        "__v": 0
    }
]
```
#
## 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

- #### Steps:
```
 The following GET and POST request with 5 iterations and 0 ms delay.
```
1. Send a GET request to: http://localhost:3000/API/users
2. Send a GET request to: http://localhost:3000/API/workouts
3. Send a GET request to: http://localhost:3000/API/kyh
4. Send a GET request to: http://localhost:3000/api/workouts?type=Hiking
5. Send a POST request to: http://localhost:3000/API/workouts/
6. Send a POST request to: http://localhost:3000/API/users
- #### Expected:
1. Status 200 OK
2. Status 200 OK
3. Status 404 Not Found
4. Status 200 OK
5. Status 201 Created
6. Status 201 Created
- #### Result:
1. Status 200 OK
2. Status 200 OK
3. Status 404 Not Found
4. Status 200 OK
5. Status 201 Created
6. Status 201 Created
```
Got the expected results with a total running duration of 2s and 988ms.
```
#
## 8. Test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

- #### Steps:
1. Send a GET request to: http://localhost:3000/API/users/
2. Send a POST request to: http://localhost:3000/API/workouts/
3. Send a PUT request to: http://localhost:3000/API/workouts/66291e20c13e4c39a807938a
4. Send a DELETE request to: http://localhost:3000/API/workouts/66291e20c13e4c39a807938a
```
example: Workout ID: 66291e20c13e4c39a807938a
The ID I wanted to updated / delete.
```
- #### Expected:
- Status 200 OK
- Status 201 Created
- Status 200 OK with the updated json showing in body
- Status 200 OK
- #### Result:
- Status 200 OK
- Status 201 Created shows the created workout and its ID in body.
- Status 200 OK Body also shows the update we did due to having { new: true } in our PUT route.
- Status 200 with a message in body that says "Workout has been removed!".

#
## 9. Check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.
 
- #### Steps:
1. Send a GET request for specific workout: http://localhost:3000/API/workouts/66292046c13e4c39a807939a
2. Send a PUT request for that workout: http://localhost:3000/API/workouts/66292046c13e4c39a807939a
3. Send a new GET request to check update. http://localhost:3000/API/workouts/66292046c13e4c39a807939a
- #### Expected:
- Status 200 OK
- Status 200 OK
- Status 200 OK
- #### Result:
- 200 OK shows us the workout we wanted.
- 200 OK updated the workout and even shows the updated workout in body.
- 200 OK just to confirm that it's correctly updated which it is.
#
## 10. Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.

- #### Steps:
```
5 different GET request with 50 iterations. 
```
1. Send a GET request to: http://localhost:3000/API/users
2. Send a GET request to: http://localhost:3000/API/workouts
3. Send a GET request to: http://localhost:3000/API/users/661e8b4deab5230c94b30812
4. Send a GET request to: http://localhost:3000/API/workouts/6621b9a77ccb9ffd050ccaab
5. Send a GET request to: http://localhost:3000/api/workouts?type=Outdoor%20Cycle
- #### Expected:
- The requests to takes some time to finish.
- #### Result:
- Got the expected results after a total running duration of 20s and 718ms.
#
## 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.

- #### Steps:
1. Send a GET request to: http://localhost:3000/api/users?disconnect=true 
2. Send a GET request to: http://localhost:3000/api/users?disconnect=false
- #### Expected:
- Status 500 Internal Server Error
- Database connection offline.
- Status 200 OK
- Database connection back online.
- Database back to showing all users.
- #### Result:
- Status 500 Internal Server Error
- Database connection offline.
- Status 200 OK
- Database connection back online.
- Database working as intended showing all users.

#
## 12. Test the API’s ability to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

- #### Steps:
1. Send a GET request to: http://localhost:3000/api/workouts?type=Sleeping

- #### Expected:
- Status 404
- No workouts of this type found.
- #### Result:
- Status 404
- No workouts of this type found.
#
## 13. Verify that the API correctly implements rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

- #### Steps:
```
ran 52 Iterations of two get requests while our limit is at 100.
```
1. Send a GET request to: http://localhost:3000/API/users
2. Send a GET request to: http://localhost:3000/API/workouts
- #### Expected:
-  Status 429 Too Many Requests after 100 requests.
- #### Result:
-  Status 429 Too Many Requests for the last four requests.
  
#