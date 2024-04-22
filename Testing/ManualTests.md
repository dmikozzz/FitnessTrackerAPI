## Manual testing
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
-  Status: 200 OK
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
3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.
- #### Steps:
- Send a GET request to: http://localhost:3000/API/kyh

- #### Expected:
- Status: 404 Not Found 
- #### Result: 
- Status 404 Not Found


#
## 4. Test if the API returns the correct data when querying with specific filters or search criteria.
- #### Steps:
1. Send a GET request to: http://localhost:3000/api/workouts?type=Hiking
- #### Expected:
- To return only workouts with the workout type "Hiking"
- #### Result:
- Returned workouts with the type "Hiking"
#
## 5. Verify that the API returns paginated results when a large number of records are requested.
#
- #### Steps:
1. Send a GET request to: http://localhost:3000/api/workouts?page=2&limit=10
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

## 6. Check if the API handles special characters and non-English text correctly in input data and returned responses.
#
## 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.
#
## 8. Test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.
#
## 9. Check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.
#
## 10. Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.
#
## 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.
#
## 12. Test the API’s ability to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.
#
## 13. Verify that the API correctly implements rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

- #### Steps:
1. 
2. 
- #### Expected:
- 
- #### Result:
- 