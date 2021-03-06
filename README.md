## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## Working with Docker

### `docker build [OPTIONS] PATH | URL | -`

Build an image from a Dockerfile with our project. For example, run this command `$ docker build . -t mixchat --build-arg API_URL=rocketchat1.mixapp.io/api` to build an image with tag "mixchat and arg API_URL with rocketchat1.mixapp.io/api as a params.


### `docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]`

The docker run command must specify an IMAGE to derive the container from. For example, run this command `$ docker run -p 3000:80 mixchat` to run image with tag "mixchat" on local port 3000. And you can test project on local machine.
