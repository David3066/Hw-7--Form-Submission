# User Registration App

A simple backend web application that allows users to register with their information and upload a profile picture.

## Project Structure

```
hw-7/
├── app.js                 # Main Express server and routes
├── package.json           # Project dependencies
├── views/
│   ├── register.hbs      # Registration form page
│   └── profile.hbs       # Success/profile display page
├── public/
│   └── uploads/          # Directory for uploaded profile pictures
└── README.md
```

## Features

- **Registration Form** (GET /register)
  - Full Name input
  - Email address input
  - Course Track dropdown (Web Dev, Data Science, UX Design)
  - Profile Picture file upload (.jpg, .jpeg, .png)
  - Tailwind CSS styling

- **Form Processing** (POST /register)
  - Multiparty form parsing
  - File validation (checks for valid image formats)
  - File upload handling with fs module
  - User data validation

- **Profile Display** (profile.hbs)
  - Welcome message with user's name
  - Profile picture display
  - Registration summary (name, email, course)
  - Option to register another user

## Installation & Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000/register
   ```

## How It Works

1. User visits `/register` and sees the registration form
2. User fills in their information and selects a profile picture
3. Form is submitted with `enctype="multipart/form-data"` for file upload
4. Server parses the request using multiparty
5. File is validated (must be JPG, JPEG, or PNG)
6. File is moved from temporary location to `public/uploads/`
7. User is redirected to profile page showing their information and picture

## Technologies Used

- **Express.js** - Web framework
- **Express-Handlebars** - Template engine
- **Multiparty** - Form data and file parsing
- **Node.js fs module** - File system operations
- **Tailwind CSS** - Styling framework
