# Mehdiabad Farming Cooperative Society (MFCS)

A modern web application for managing all aspects of a farming cooperative, including prediction systems, livestock, inventory, and farm chemicals. Built with React and Node.js.

## Features
- **Prediction System:** Suggests suitable crops and fertilizers based on soil and weather data.
- **Livestock Management:** Track and manage livestock details, categories, and records.
- **Inventory Management:** Manage inventory categories and items for the cooperative.
- **Farm Chemicals Management:** Record and monitor farm chemical usage and stock.
- **User Authentication:** Secure sign-up, sign-in, and profile management.
- **Role-based Access:** Private and public routes for different user roles.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd MFCS
   ```
2. Install dependencies:
   ```bash
   cd client
   npm install
   # or
   yarn install
   ```

### Running the App
```bash
npm start
# or
yarn start
```
The app will run locally at [http://localhost:3000](http://localhost:3000).

## Project Structure
```
client/
  src/
    components/      # Reusable UI components
    Pages/           # Main application pages
    Redux/           # State management
    units/           # Utility and helper modules
    assets/          # Images and static assets
  public/            # Static files and logo
```

## Customization
- Update the logo in `client/public/logo192.png` and `logo512.png`.
- Change cooperative details in the Home page and About sections.

## License
This project is for educational and demonstration purposes. 