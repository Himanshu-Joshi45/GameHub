# GameHub

GameHub is an interactive gaming platform that leverages the RAWG API to provide users with comprehensive information about various games. The application features user authentication, personalized game libraries, and an interactive  interface.

🔗 **Live Demo:** [GameHub on Vercel](https://game-hub-ashy-alpha.vercel.app/)

## ✨ Features

- **Game Discovery** - Browse and search through thousands of games using the RAWG API
- **User Authentication** - Secure login and registration powered by Clerk
- **Personalized Collections** - Save favorite games to your profile (requires authentication)
- **Responsive Design** - Optimized for both desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend**:
  - React.js
  - Redux Toolkit (state management)
  - CSS (styling)

- **Authentication**:
  - Clerk (user authentication)

- **APIs**:
  - RAWG API (game data)

- **Deployment**:
  - Vercel

## 🚀 Getting Started

### Prerequisites

- npm or yarn
- RAWG API key
- Clerk account and API keys

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Himanshu-Joshi45/GameHub.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_RAWG_KEY=your_rawg_api_key
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## 🔒 Authentication Flow

1. Users can browse games without signing in
2. Authentication is required to:
   - Add games to favorites
   - Access the favorites page
   - View personalized content
3. Sign up/in options are provided through Clerk's secure authentication

## 💡 Future Enhancements

- Game reviews and ratings
- Social features (friends, game recommendations)
- Game purchasing integration
- Advanced filtering and sorting options
- Personal game collections beyond favorites

## 👨‍💻 Developer

Himanshu Joshi
- [GitHub](https://github.com/Himanshu-Joshi45)


## 🙏 Acknowledgements

- [RAWG API](https://rawg.io/apidocs) for providing comprehensive game data
- [Clerk](https://clerk.dev/) for authentication services
