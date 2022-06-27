# NUS Orbital Project 2022 (N.I.P)

This repo contains our
National University of Singapore CP2106: Independent Software Development Project

## N.I.P Member

Gareth Ong (Computer Science and Quantitative Finance)
Owen Li (Mechanical Engineering and Innovation and Design)

# Collate

Collate aims to benefit users by creating a free to use all-in-one communication platform that captures all the interactions (chat messages, images, videos) received across various social media and messaging apps.

# Deployment
https://collate-nus.herokuapp.com/landing
As of 27/6/2022, Google has yet to verify our application. 
Users will not be able to sync their own gmail account.
Please use the following gmail account to test out the features:
Username: collatenustest@gmail.com
Password: Collatetestaccount12345

# Installing the dependencies
```
npm install
cd client
npm install
```
# .env file set up
Create a .env file
Generate your own JWT_SECRET 
```
PORT = 5000
MONGO_URL = <YOUR OWN DATABASE URL>
JWT_SECRET = <INSERT YOUR OWN JWT_SECRET>
JWT_LIFETIME = 1d

```

# Running the code
Run using concurrently, server running on http://localhost:5001 and client on http://localhost:3000
```
npm start
```
# Motivation

With almost every single app that we use these days having a chat function, it is almost certain that an individual might miss out on a message or an email. 
We are also prone to forgetting to reply to people because of the large number of chatting apps we use. 
Furthermore, when using chatting apps to communicate about work or send important messages, it is a hassle to toggle between different platforms in order to forward or send messages across them. 
Personally, we are very close friends that send each other funny videos and messages often, on various platforms like Instagram, Telegram & Whatsapp. However, due to our busy schedules, we often forget to open these apps to check for messages, especially apps like whatsapp that are less often used for work amongst university students. 
So, we often reply late to each other and miss out on funny moments amongst friends. 
With our “all-in-one” communication solution, you can simply take a single glance to see the messages from people across various apps on our web application, Collate.

# Aim

Collate aims to benefit users by creating a free to use all-in-one communication platform that captures all the interactions (chat messages, images, videos) received across various social media and messaging apps. 
With this solution, we aim to benefit the following users in these ways: 
● We aim to benefit businesses that operate via social media as they can easily check queries received across various social platforms to ensure that they do not miss out on sales leads or customer service tasks 
● We aim to benefit individuals by cutting their time wasted checking each app individually for important messages, and help organise their social media lifestyle 

# User Stories

As a student applying for an internship, I can use Collate to collect & organise the messages from my LinkedIn and gmail accounts. I can then select the companies I am applying to and check the responses I have received from a single glance. 
As a recruiter, I can filter the applicants by name and check if I had received their CV in my email and also reply to their queries on LinkedIn without the need of toggling between screens/platforms. 
As a small business owner marketing on Instagram, Tiktok and Facebook, I can see the queries received across the various platforms (via private message) from a single glance. Furthermore, it allows me to draw comparisons on the effectiveness of marketing on the different social media platforms. 
As an individual that is trying to cut his social media usage without losing regular communication with my friends, I can use Collate to respond to the various videos, pictures and posts my friends send me at the end of day across the various apps. This ensures that I do not need to open every app and be stuck scrolling through the endless amounts of posts to find the ones my friends have sent, and I can also avoid missing out or forgetting to check my messaging apps.

# Scope of Project

A web-based messaging platform to manage all message notifications from the user’s social media accounts.

Core Features:

## Home page
If users are signing in for the first time, there will be no messages displayed as user has not synced any of their social media accounts.
Upon syncing, messages will be fetched directly from Gmail API, Telegram API and Instagram API and displayed clearly on the screen in an alphabetic order. 
In each message container,
you will have:
- Message content
- Contact
- Form of Contact (i.e from Gmail/ from Telegram)
- Reply button that will open your conversation in that specific app in a new tab

## Profile page
Update form whereby user can update the information behind their page. Also users can sync their social media accounts.

## Contacts page
Where users can add contacts and group them according to work, social group or school.

# Timeline
16/5 - 22/5: Figma design + Learning MERN Stack
23/5 - 29/5: Fullstack Landing + Registration page built
30/5 - 5/6: Linking with social meida API (i.e Graph API by Meta) to queury messages
6/6 - 12/6: Implement thorough security improvements 
13/6 - 19/6: Completion of home page with search and filter function
20/6 - 26/6: Refinement of search, filter and sort functions
27/6 - 10/7: Additional functionality for user to customise notifications
11/7 - 17/7: Polishing up UI and features
18/7 - 24/7: Refinement

# Proposed Tech Stack
1. mongoDB as our database
2. Node.js used with Express framework to do the heavy lifting
3. React.js for a dynamic UI

## Additional:
1. Styled Components used in frontend development
2. bcrypt used to hash passwords immediately 
3. JSON Web Tokens used to authenticate users
4. POSTMAN used for testing backend
5. Axios (promise based HTTP client) used to link frontend to backend

## Schema Diagram
![alt text](https://github.com/GarethOng/Collate/blob/68ad5557a0f9df5c7ff889575a8d99f7e8832c79/IMG_0457.jpg)

## Component Diagram
![alt text](https://github.com/GarethOng/Collate/blob/a61cf5bcad98fdea9f782c7dd23e325b7f075642/IMG_0456.jpg)

