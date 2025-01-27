# Vega

Vega is a modern web application built with React, TypeScript, and Tailwind CSS, designed to provide a fast, responsive, and visually engaging interface for managing a user's financial portfolio. With Vite as the build tool and react-router-dom for seamless routing, the application offers key features such as a Portfolio Donut Chart, Positions Table, and Historical Chart to help users visualize and interact with their financial data. The project also integrates Jest for testing, ESLint for linting, and TypeScript for type safety, ensuring a smooth and maintainable development process.

## Tech Stack

- **React**: For building a dynamic and responsive user interface.
- **TypeScript**: Provides type safety for better code quality and developer experience.
- **Tailwind CSS**: Utility-first CSS framework for streamlined styling and responsiveness.
- **Vite**: Modern build tool for fast development and optimized production builds.
- **Jest**: Used for unit and integration testing to ensure high-quality, bug-free code.
- **Recharts**: Used for visualizing the user's financial data through interactive and dynamic charts.
- **ESLint**: Enforces consistent code style and best practices across the project.

## Key Features

- **Public Login Page**: Simple local storage credentials for easy authentication.
- **Portfolio Donut Chart**: Visualizes the user's balance by asset class or individual asset, with the ability to toggle between views.
- **Positions Table**: Displays the same data as the donut chart in a tabular format for easier analysis.
- **Historical Chart**: Tracks the performance or total value of the portfolio over time, giving users insights into their investment growth.

## Installation and Setup

To get started with Vega, follow these steps:

### 1. Clone the repository:
```bash
git clone git@github.com:kanishkbadola12/Vega.git
cd vega
```

2. Set up the backend:
```bash
cd backend
npm install
node server.js
```

You should see the message: "Server running on http://localhost:3000"

3. In a new terminal, set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

This will start the development server, and you can access the app at http://localhost:5173.

4. To run the tests and ensure everything is working as expected, run the following command:
```bash
npm run test
```

## Usage

When you open the app, you'll be greeted with a **login page**. To access the secure section of the app, use the following credentials:

- **Email**: admin@vega.com
- **Password**: vega123

These credentials are automatically stored in the browser's localStorage when the app loads. The login page also handles basic **client-side error validation**, such as checking for empty fields, invalid credentials, and ensuring the email is in the proper format. Once logged in, you will have access to the core features of the application.

## Architecture

### Frontend

The frontend of the Vega application is designed using **React** for building the user interface and **TypeScript** for static typing, ensuring type safety and a better development experience. The UI is built to be responsive, providing a seamless experience across different devices, and offers a user-friendly interface with easy navigation.

### Key Features

1. **Recharts**: The application uses **Recharts** for visualizing the user's financial data through interactive and dynamic charts, such as the **Portfolio Donut Chart** and **Historical Chart**.
2. **Tailwind CSS**: The app leverages **Tailwind CSS** for styling, ensuring a utility-first approach to CSS.
3. **Error Handling**: The frontend includes robust **error handling** for API calls, ensuring that users are notified in case of issues while fetching data.
4. **Responsive Design**: The application is fully responsive, offering an optimized experience on both desktop and mobile devices.

### Modular Project Structure

The frontend follows a modular and organized project structure, making it easy to maintain and extend:

- **`utils/`**: This folder contains utility functions and helpers used throughout the application.
- **`pages/`**: Components responsible for routing, defining different views or pages in the application.
- **`components/`**: Contains various sections of the app:
  - **`layout/`**: Components for managing layout, such as headers, footers, and containers.
  - **`ui/`**: Reusable UI components like buttons, inputs, and form elements.
  - **`components/`**: Components related to the main features of the app, such as **PortfolioDonutChart**, **PositionsTable**, and **HistoricalChart**.
- **`hooks/`**: Contains custom hooks like **`useFetch`** for making API calls and handling data fetching.

This modular structure enhances reusability and maintainability, allowing developers to work on different parts of the app independently while maintaining consistency.

### Backend

The backend of the Vega application uses a local server to simulate API responses. It serves mock data from JSON files stored in the `vega/backend/mocks` directory. The logic for serving this data is handled in the `server.js` file located in `vega/backend`.

### API Endpoints

1. **`/assets`**: Provides data related to the user's assets, including asset classes and individual assets within the portfolio.
  
2. **`/portfolios`**: Serves data related to the user's financial portfolio, including overall portfolio value and asset distribution.

These endpoints utilize mock data to simulate real-world API responses, enabling the frontend to interact with data in a way that mimics a live backend without requiring an actual server. The data is served through a simple Express server setup in `server.js`.

