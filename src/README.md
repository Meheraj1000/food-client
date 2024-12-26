## Food Sharing Website
## Project Purpose
<!-- The Food Sharing Website is a platform designed to connect individuals and communities to reduce food waste by sharing surplus food. Users can donate, request, and manage food items securely and efficiently while maintaining user-friendly interactions. -->
## Key Features
1.  CRUD Functionality: Add, view, update, and delete food items.
2. Authentication: Email/password-based login and registration with Google authentication.
3. Private Routes: Secured routes accessible only by logged-in users.
4.  Responsive Design: Optimized for mobile, tablet, and desktop devices.
## Food Management:
1. Add new food donations with relevant details.
2. Manage foods added by the logged-in user.
3. Request available food items.
4. View food request history.
## Dynamic Layout: Toggle between 3-column and 2-column layouts on the "Available Foods" page.
1. Search & Sorting: Search food items by name and sort by expiration date.
2. Toast Notifications: Feedback for user actions like login, registration, and CRUD operations.
3. Secure Environment: Firebase and MongoDB credentials secured with environment variables.

## Project Structure
1. Navbar: Links for navigation (Home, Available Foods, Add Food, Manage My Foods, My Food Requests, Login, and Signup).
## Home Page:
1. Banner/Slider: Catchy design to attract users.
2. Featured Foods: Highlights the top 6 foods with the highest quantity.
3. Extra sections to enhance the user experience.
## Available Foods Page:
Displays all foods with "Available" status.
Implements search, sorting, and layout toggle.
## Food Details Page:
1. Displays food details with a request option.
2. Updates food status to "Requested" on request.
3. Add Food Page: Private form for adding food details.
4. Manage My Foods: Private page to update or delete the user’s added foods.
5. My Food Requests: Private page showing the user’s food requests.

## Tech Stack
1. Frontend: React.js, Tailwind CSS, Chakra UI
2. Backend: Node.js, Express.js
3. Database: MongoDB
4. Authentication: Firebase Authentication
5. Deployment: Vercel (Client), Render (Server)
