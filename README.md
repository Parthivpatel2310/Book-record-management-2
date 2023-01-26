# book-record-management

This is an application called book-record-managemnet/API 

## Endpoints
-------------------------------------------------------------------------------------------------------------------------------------------------
## routes
## users 
POST: Create a new user
GET: Get all list of users

## users/{id} 
GET: Get a user by thier ID
PUT: Update a user by ID
DELETE: Delete a user by thier ID (Check if the user still has an issued book && is there any fine to be collected from the user)

## users/subscription-details/{id}
GET: Get user subscription details
1. Date of Subscription
2. Valid till 
3. Fine if any 

## books
POST: Add a new book
GET: Get all books

## books/{id}
GET: Get a book by id
PUT: Update a book by id

## books/issued
GET: Get all issued books here

-------------------------------------------------------------------------------------------------------------------------------------------------
## /books/issued/withFine
GET: Get all issued books with fine

## Subscription Typs
Basic (2 months)
Standard (5  months)
Premium (12 months)


If user has an issued book and the issued book is to be returned at 10-01-2023
If user missed the date to return, then user gets a fine of Rs. 30/-

If user has an issued book and the issued book is to be returned at 10-01-2023
If user missed the date to return, and the users subscription also got expired, then user need to pay a fine of 130/- (100+30)
-------------------------------------------------------------------------------------------------------------------------------------------------
 const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 130
          : 30
        : 0,
  };
