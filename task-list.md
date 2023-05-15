## This tasks list contains in order which this project is developed.

1. Project setup and basic server in NodeJS
    * Set VS Code
    * Set Node Version to 16.13.2

2. Create routes folder and create CRUD calls for Posts
    * Get all posts
    * Get single post: will take an ID in request params
    * Create a post: will take post in request body
    * Update a post: will take an ID in request params and a body
    * Delete a post: will take an ID in request params

3. API response structure will hold following common values:

```json
{
    "message": "<string> success or failure indication",
    "data": "<array|object> response data",
    "error": "<string|undefined> if failed then error message"
}
```