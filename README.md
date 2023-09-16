
![logo](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/87a37867-5751-4840-b492-03b995ac19c4)
# Mini-twitter Clone

This Mini-Twitter Clone project is a social media application that allows users to create accounts, post tweets with images or videos, follow other users, like tweets, and explore posts from different users. It is built using the MERN (MongoDB, Express, React, Node.js) stack and utilizes JWT (JSON Web Tokens) for user authentication. Additionally, it employs Multer to store user profile images in MongoDB and Firebase Cloud Storage to store uploaded images and video files.

## Features

- **User Authentication:** Users can sign up and log in to the application securely using JWT authentication.

- **Post Tweets:** Users can create, post, edit and delete their tweets, which can include either images or videos, along with text messages.

- **Profile Management:** Users can view and edit their profile information, including their profile picture.

- **Follow Other Users:** Users can follow and unfollow other users to see their tweets in their timeline.

- **Like Tweets:** Users can like and unlike tweets posted by others.

- **Explore Posts:** Users can explore and view tweets from other users to discover new content.
## Tech Stack

- **MongoDB:** The application uses MongoDB to store user data, tweets, and profile images.

- **Express.js:** Express.js is used as the backend server framework to handle API requests and routing.

- **React:** The frontend is built using React for a dynamic and interactive user interface.

- **Node.js:** Node.js is used as the runtime environment for the server.

- **JWT Authentication:** JSON Web Tokens are employed for user authentication.

- **Multer:** Multer is used to handle file uploads, allowing users to set profile pictures.

- **Firebase Cloud Storage:** Firebase Cloud Storage is used to store uploaded images and video files.
## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Akshay-Tomar-1135/mini-twitter.git
   ```

2. Install dependencies:

    ```bash
    cd mini-twitter
    cd server
    npm install
    cd ../client
    npm install
    ```
3. Set up environment variables:

Create a .env file in the server root directory and add the following variables:
   ```bash
   MONGO=<your-mongodb-connection-url>
   JWT=<your-secret-key>
   ```
- JWT can be any 32 character long text

4. Set up your MongoDB database and Firebase project. Update the configuration files (client/src/firebase.js) with your credentials.

5. Run the development server:
```bash
npm start
```
6. Change REST api call URLs accordingly


## Usage

- Sign up for an account or log in if you already have one.
- Create tweets with text messages and either images or videos.
- Explore posts from other users to discover new content.
- Follow and unfollow other users to customize your timeline.
- Like and unlike tweets that you find interesting.
- Edit your profile information and set a profile picture.
## Screenshots

### Login and SignUp Page
![image](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/02f90b07-c06e-48f6-8ac0-cdb3d0d04ea6)

### Home Page
![image](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/53e06c19-fbfa-4f99-b696-91eaa323b66d)

### Explore Page
![image](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/337b6e13-d606-4b87-81a1-cc0da5157aa1)

### Profile Page
![image](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/fbc37164-0a7c-4804-8fa7-90767520ff25)

### Edit Profile
![image](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/051939e6-3b5c-48e6-a5fc-a8fbe256a49d)

### Delete Post
![image](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/e56b13d7-f6a4-4a06-949e-8a1de991077b)

### Edit Post
![image](https://github.com/Akshay-Tomar-1135/mini-twitter/assets/75598614/52fc54fe-1623-4d8f-a074-390a4ac152a3)


## Contributing

Contributions are welcome! 

Feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


## Authors

[@Akshay Tomar](https://www.github.com/Akshay-Tomar-1135)

