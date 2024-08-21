Forkify Project

Forkify is a web application that allows users to search for recipes, view recipe details, and save their favorite recipes. This project was inspired by Jonas Schmedtmann's JavaScript course, and it demonstrates the application of modern JavaScript, ES6+, and other web development best practices.

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

## Features

Search recipes by name or ingredients.
View detailed information about each recipe, including ingredients and cooking instructions.
Adjust the number of servings and automatically recalculate ingredient quantities.
Bookmark favorite recipes to local storage.
Upload and add your own custom recipes.

## Live Demo

You can check out the live demo of the project here.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/forkify.git

   ```

2. **Navigate to the project directory**:

```bash
cd forkify
```

Install dependencies:
This project uses Node.js and npm for dependency management. Make sure you have Node.js installed on your machine, then run:

```bash
npm install
```

Usage
After completing the installation, you can start the development server with:

```bash
npm start
```

This will open the application in your default web browser at http://localhost:1234.

Building for Production
To create a production build, use the following command:

```bash
npm run build
```

The optimized and minified files will be available in the dist/ directory, ready for deployment.

## Technologies Used

**JavaScript (ES6+)**: The primary language used for developing the application.
**Parcel**: A fast, zero-configuration web application bundler.
**HTML5 & CSS3**: For structuring and styling the web pages.
**Babel**: Used to transpile modern JavaScript to ensure compatibility across browsers.
**Forkify API**: The application fetches recipe data from an external Forkify API.

## Project Structure

├── dist/ # Production build
├── src/ # Source files
│ ├── css/ # CSS styles
│ ├── img/ # Images and icons
│ ├── js/ # JavaScript files
│ │ ├── model.js # Handles application data
│ │ ├── views/ # View classes for UI components
│ │ ├── controller.js # Handles application logic
│ ├── index.html # Main HTML file
│ ├── index.js # Entry point of the application
├── .babelrc # Babel configuration
├── .gitignore # Files and directories to be ignored by Git
├── package.json # Node.js dependencies and scripts
└── README.md # Project documentation (this file)

```

```
