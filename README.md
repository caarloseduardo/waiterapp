![Cover image](./.github/cover.svg)

<h1 align="center">👨🏻‍🍳 WAITERAPP</h1>

## 📄 Overview

Waiterapp is a app to waiters, where they have access to orders placed by customers, the status of that order, the total amount of the bill in real time, and also the function to send that order directly to the kitchen.

## 🏭 Technologies

### React Native

React Native is a Javascript library created by Facebook. It is used to develop apps for Android and iOS systems natively. (Source: React Native)

[Official website](https://reactnative.dev/)

### Expo

Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React. (Source: Expo)

[Official website](https://expo.dev/)

### React.js

React is an open source JavaScript front-end library focused on creating user interfaces on web pages. (Source: React.js)

[Official website](https://react.dev)

### Styled Components

Styled-components is CSS in JS library that is used to style React applications. (Source: Styled Components)

[Official website](https://styled-components.com)

### MongoDB

MongoDB is open-source NoSQL Database, cross-platform document-oriented database software written in the C++ language. (Source: Socket.io)

[Official website](https://www.mongodb.com/)

### Node.js

Node.js is an open-source, cross-platform JavaScript runtime environment. (Source: Node.js)

[Official website](https://nodejs.org/)

### Socket.IO

Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server. (Source: Socket.io)

[Official website](https://socket.io)

### Docker

Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. (Source: Docker)

[Official website](https://docker.com)

## 💻 Usage

You can run this project in you local machine by following the [Installation](#construction_worker-installation) guide.

## :construction_worker: Installation

- Run API
```bash
# Access API's folder
$ cd api
# Run mongo container
$ docker run -p 27017:27017 -d mongo
# Install dependencies
$ yarn
# Run server
$ yarn dev
```

You can access Back-end API from [`localhost:3001`](http://localhost:3001) url.

- Run Front-end

```bash
# Access front-end's folder
$ cd frontend
# Install dependencies
$ yarn
# Run project
$ yarn dev
```

You can access Front-end [`localhost:5173`](http://localhost:5173) from your browser.

- Run Mobile App

```bash
# Access mobile's folder
$ cd mobile
# Install dependencies
$ yarn
# Run project
$ yarn start
```

You can access Mobile App from a mobile device emulator, or download expo on your mobile device and scan the given QR Code on the terminal. 