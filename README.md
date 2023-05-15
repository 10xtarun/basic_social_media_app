# Social Media App - Instagram Clone

Here we are trying to build a backend for social media app using NodeJS, Express and MongoDB.

<img src="./readme_assets/social_media.jpeg" height="200px" alt="Social Media App" />

### Abbreviations user in this document are as:
1. SM - Social Media
2. CRUD - Create, Read, Updae, Delete

## What is Social Media (SM) App?

*Here we will be understanding the app requirements from the perspective of a user*

The User story.

> <img src="./readme_assets/user_story.jpeg" height="100px" alt="User Story" />

> A social media platform is a place where users can share the happenings in their lives with others. The user must login to view or create the post. A user will be able to login only if he or she registers on the SM app. The user will be able to share about themselves in the format of a post, and a post will include an image and some text (a caption). All the users will be able to share any number of posts. The user can like other users posts. A user can follow other users to view their posts. A user can like another user's post and comment on it. The user should be able to message another user and reply.

## What are the functional requirements of a SM App?

*A functional requirement (FR) is a description of the service that the software must offer. It describes a software system or one of its components. A function is nothing but inputs to the software system, its behaviour, and its outputs.*

1. User - 
    * user should be able to CRUD their profile.
2. Authentication - 
    * User should be able to register on the app (invloves creating the user profile).
    * User should be able to login on the app.
    * User should be able to logout from the app.
    * Only authenticated users should be able to perform CRUD on post, follow, like, comment, etc.
3. Post - 
    * User should be able to create a post.
    * A post must have a image, comments, a reply to comment and likes properties.
    * A user should be able to like, comment on a post.
4. Follow -
    * Users should be able to follow each other.
    * Only those posts should be visible to a user of other users he or she follows.
5. Messaging -
    * Users should be able to message with each other.
6. News Feed -
    * User should be able to view other user's posts in a generated news feed.

---

## Define required entities or resources on the server?

Following are ther entities than can be majorly defined on the server:
1. Users
2. Posts
3. Likes
4. Follows
5. Comments
6. Messaging
7. Feeds
8. Activity

## What are the Tables or Schemas we should define for each entities?

### Users Table

|user_id|username|email|password|first_name|last_name|time_stamp|
|---|---|---|---|---|---|---|
|string, primary|string, unique|string, unique|string, hashed|string|string|date_time|

### Posts Table

|user_id|post_id|caption|image_url|time_stamp|
|---|---|---|---|---|
|string|string, primary|string|string|date_time|

### Comments Table

|comment_id|post_id|text|activity_id|reply_text|time_stamp|
|---|---|---|---|---|---|
|string, primary|string,|string|string|string|date_time|

### Likes Table
1. Like active or inactive (deleted)
2. like can be on comment or post (like types)
3. How to find number of likes on a post? 
    * option 1 - 'select count (*) from likes where post_id = "some_value"' --> heavy query operation
    * option 2 - introduce new likes column in Posts of Comments Table --> heavy aggregation operation
    * option 3 - create Activity Table --> store likes count against post_id or comment_id

|like_id|type|active|activity_id|user_id|time_stamp|
|---|---|---|---|---|---|
|string, primary|string, enum [post,comment]|boolean|string|string|date_time|

### Activity Table

|activity_id|likes|type|
|---|---|---|
|string, primary|number|string, enum [post,comment]|

### Follows Table
1. Who follows user?
2. Which users does a User follows?

|uid|follower_id|followee_id|timestamp|
|---|---|---|---|
|string, primary|string|string|date_time|

---

## How are we going to store Images?

We can store images directly to folder on our server but it is inefficient way to do. As the number of files increase or images and it will become difficult to access on the front end side.

We can make use of object storage to store the image files and use it's location URL on front end side. Whenever a user posts a post, we will create a uploader that will take the image file and push it to object storage service.

> What is object storage?
>> Object storage is a technology that stores and manages data in an unstructured format called objects.

What are the different object storage services?
1. Firestore
2. AWS S3
3. Digital Ocean Objet Storage
4. and many more

> Still using a object storage URL for images can be heavy in operation and will cost more. Instead we can use CDN along with object storage, due to the caching of the image we can reduce the heavy lifting of using images on client side and will reduce the cost.

---

## How are we going to Search, Sort and Filter?

> A social media app's search functionality allows users to look for content or other users based on specific keywords, hashtags, or other criteria. Search is an important feature in social media apps because it allows users to discover new content, connect with users who share similar interests, and expand their social network.

Here we are going to rely on database features for searching, sorting and filtering. We can use following implementation:
1. Indexing - we can index the records, hence it will become efficient to search.
2. We can apply 

## How are we going to implement Chat or Messaging?

---

## Architecture Design

* What type of reqeusts will users send?
* API routing?
* News Feed is dependant on to services:
    * Posts service - to retrieve all the posts
    * Follow service - to retrieve posts for which followers
    * getUsersFollowedByUserID --> get posts of those users
    * limit the number of posts in news feed (here 20)
    * pre compute the news feed - so no load is generated
    * Problem statement - as a user, everytime someone from my followers posts a new post then my news feed should be updated
    * After posting, it should notify the news feed service to update the feed list.
    * Cache the news feed (use some optimization like LRU)
    * Poll from clients to pull latest updates from news feed service (we will be not doing this in the project)

## Project

### Setup
1. IDE - VS Code
2. NodeJS Version 16.13.2









