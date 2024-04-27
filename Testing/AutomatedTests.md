## AUTOMATED TESTING
#### This is a collection of the automated tests for this project.
#
## 1.  Status Code 200 Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.
- #### Steps:
1. Send a GET request to: `http://localhost:3000/API/users` 
2. Send a GET request to: `http://localhost:3000/API/workouts`
``` 
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

```
- #### Expected:
- Status: 200 OK 
- #### Result:
- Status: 200 OK

### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  01. Status 200  
**Purpose**  
This test confirms that the API endpoints are operational and accessible.
#
## 2. Verify that the API returns the expected data format (e.g., JSON, XML) in the response.
- #### Steps:
1. Send a GET request to: `http://localhost:3000/API/users`
2. Send a GET request to: `http://localhost:3000/API/workouts`
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
### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  02. Expected data  
**Purpose**  
This test ensures that the API returns data in a JSON format.
#
# 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid requests.
- #### Steps:
- Send a GET request to: `http://localhost:3000/API/kyh`

- #### Expected:
 - Status: 404 Not Found 
- #### Result: 
 - Status 404 Not Found

 ### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  03. Bad request  
**Purpose**  
This test ensures that the API responds to invalid endpoints with Status 404 Not Found.

#
## 4. Create an automated test that sends a request with specific filters or search criteria and checks if the API returns the correct data.
- #### Steps:
 - Send a GET request to: `http://localhost:3000/api/workouts?type=Hiking`
- #### Expected:
- To return only workouts with the workout type "Hiking"
- #### Result:
 - Returned workouts with the type "Hiking"

 ### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  04. Specific query  
**Purpose**  
This test verifies the API ability to filter data based on specific query parameters and  
ensures it returns the requested workouts.

#
## 5. Write an automated test to verify that the API returns paginated results when a large number of records are requested

- #### Steps:
  Send a GET request to: `http://localhost:3000/api/workouts?page=2&limit=10`
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
### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  05. Paginate & limit  
**Purpose**  
This test ensures that the API implements pagination and returns specified data.

#
## 6. Test if the API handles special characters and non-English text correctly in input data and returned responses using an automated testing tool.

- #### Steps:
- Send a GET request to: `http://localhost:3000/api/users?name=Björn Jönsson`

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
### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  06. Special characters  
**Purpose**  
This test ensures that the API can process and respond to a request containing special characters.

#
## 7. Develop an automated test that sends concurrent requests to the API to ensure that it can handle multiple users and maintain data consistency.

- #### Steps:
```
 The following GET and POST request with 5 iterations and 0 ms delay.
```
1. Send a GET request to: `http://localhost:3000/API/users`
2. Send a GET request to: `http://localhost:3000/API/workouts`
3. Send a GET request to: `http://localhost:3000/API/kyh`
4. Send a GET request to: `http://localhost:3000/api/workouts?type=Hiking`
5. Send a POST request to: `http://localhost:3000/API/workouts/`
6. Send a POST request to: `http://localhost:3000/API/users`
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
### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  07. Multiple requests  
**Purpose**  
To ensure that the API can handle concurrent request while maintaining data consistency under load.  
**Other information**  
Did a functional test instead of a performance test due to it showing many errors,  
because there is a rate limit of 300.  


#
## 8. Create an automated test and test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

- #### Steps:
1. Send a GET request to: `http://localhost:3000/API/users/`
2. Send a POST request to: `http://localhost:3000/API/workouts/`
3. Send a PUT request to: `http://localhost:3000/API/workouts/66291e20c13e4c39a807938a`
4. Send a DELETE request to: `http://localhost:3000/API/workouts/66291e20c13e4c39a807938a`
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
### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  08. Different HTTP methods  
**Purpose**  
This test ensures the correct status codes and messages for various HTTP methods.
#
## 9. Write an automated test to check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.
 
- #### Steps:
1. Send a GET request for specific workout: `http://localhost:3000/API/workouts/66292046c13e4c39a807939a`
2. Send a PUT request for that workout: `http://localhost:3000/API/workouts/66292046c13e4c39a807939a`
3. Send a new GET request to check update. `http://localhost:3000/API/workouts/66292046c13e4c39a807939a`
- #### Expected:
- Status 200 OK
- Status 200 OK
- Status 200 OK
- #### Result:
- 200 OK shows us the workout we wanted.
- 200 OK updated the workout and even shows the updated workout in body.
- 200 OK just to confirm that it's correctly updated which it is.
### Test Details
**Location**   
 Fitness Tracker API > Automated tests >  09. Update correctly  
**Purpose**  
This test verifies that the API accurately updates and correctly applies the changes.

#
## 10. Design an automated performance test that simulates a large number of users making requests simultaneously to check the API’s performance under heavy load.

- #### Steps:
```
5 different GET request with 50 iterations.
```
1. Send a GET request to: `http://localhost:3000/API/users`
2. Send a GET request to: `http://localhost:3000/API/workouts`
3. Send a GET request to: `http://localhost:3000/API/users/661e8b4deab5230c94b30812`
4. Send a GET request to: `http://localhost:3000/API/workouts/6621b9a77ccb9ffd050ccaab`
5. Send a GET request to: `http://localhost:3000/api/workouts?type=Outdoor%20Cycle`
- #### Expected:
- The requests to takes some time to finish.
- #### Result:
- Got the expected results after a total running duration of 20s and 718ms.

### Test Details
**Location**   
 Fitness Tracker API > Automated tests > 10. Simultaneous requests   
**Purpose**  
This test shows that the API can sustain performance and reliability under heavy load.  
**Other information**  
Did a functional test instead of a performance test due to it showing many errors,  
because there is a rate limit of 300.  
But for the sake of it running a performance test with 20 users for a minute would result in 4007 total request sent.


#
## 11. Create an automated test that verifies the API can recover gracefully from failures, such as database connection issues or third-party service outages, without compromising data integrity.

- #### Steps:
1. Send a GET request to: `http://localhost:3000/api/users?disconnect=true` 
2. Send a GET request to: `http://localhost:3000/api/users?disconnect=false`
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

### Test Details
**Location**   
Fitness Tracker API > Automated tests > 11. Connection  
**Purpose**  
This test ensures that the API works as intended after encountering connection issues.

#
## 12. Develop an automated test to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

- #### Steps:
1. Send a GET request to: `http://localhost:3000/api/workouts?type=Sleeping`

- #### Expected:
- Status 404
- No workouts of this type found.
- #### Result:
- Status 404
- No workouts of this type found.

### Test Details
**Location**   
Fitness Tracker API > Automated tests > 12. Missing parameter   
**Purpose**  
This test ensures that the API correctly handles queries for nonexisting workout types.


#
#
## 13. Write an automated test to verify that the API correctly implements any rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

- #### Steps:
```
ran 152 iterations of two GET requests because the limit is at 300.

```
1. Send a GET request to: `http://localhost:3000/API/users`
2. Send a GET request to: `http://localhost:3000/API/workouts`
- #### Expected:
- Status 200 OK for the first 300 requests.
- Status 429 Too Many Requests after 300 requests.
- #### Result:
-  Status 429 Too Many Requests for the last four requests.

### Test Details
**Location**   
Fitness Tracker API > Automated tests > 13. Rate limiting  
**Purpose**  
This test ensures that the API rate limiting functions as intended.
#

