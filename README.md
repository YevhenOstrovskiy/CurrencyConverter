Working example: https://currency-converter-1-ivory.vercel.app/

The USENSE Currency Converter is a web application designed to provide users with real-time currency conversion. The application allows users to select different currencies, input an amount, and receive the equivalent amount in another selected currency. It also displays current exchange rates for USD and EUR to UAH on the header.

Architecture
The project is built using Angular, a powerful front-end framework that allows for the development of dynamic web applications. The architecture follows a modular design, which ensures that the application is scalable, maintainable, and easy to understand.

Core Concepts
Components: The UI is divided into reusable components such as the currency selector, header, footer, and tooltip. Each component has its own styles, logic, and template, ensuring a clear separation of concerns.

Services: Services are used to handle business logic, data fetching, and data sharing between components. The application uses several services to interact with currency APIs and store exchange rates.

Models: Data models are used to define the structure of the data being managed by the application. This ensures type safety and consistency throughout the app.

Environment Configuration: The project uses environment files to manage different configurations (e.g., API keys) for different environments (development, production).

Key Directories
components/: Contains all UI components like currency-selector, header, footer, and tooltip.
models/: Contains TypeScript interfaces and classes that define the data structures used in the application.
services/: Contains the business logic and data handling, including API calls and data management.
environments/: Manages different environment variables, such as API keys for development and production.

Key Features
Real-Time Currency Conversion: Fetches current exchange rates from an API and calculates conversions between selected currencies.
Dynamic UI: Responsive and user-friendly interface with currency selectors, input fields, and real-time data display.
Modular Design: The application is built using a component-based architecture, ensuring that it is scalable and maintainable.
Installation
Clone the Repository:

Clone the Repository

Install Dependencies:
npm install

Run the Application:
npm start

Build for Production:
npm run build

Usage
After starting the application, open a web browser and navigate to http://localhost:4200 (or the appropriate port if changed). The application allows you to select currencies and input amounts to see the converted value. The header displays the current exchange rates of USD and EUR to UAH.

Technologies Used
Angular: A front-end framework used for building dynamic web applications.
TypeScript: A superset of JavaScript that adds static typing to the language.
SCSS: A CSS preprocessor that allows the use of variables, nested rules, and more for styling the application.
HTML: The standard markup language used to create web pages.
Node.js & NPM: Used to manage the project's dependencies and run development scripts.
License
© 2024 USENSE Currency Converter. All rights reserved.
