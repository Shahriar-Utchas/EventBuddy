# 🎟 Event Buddy – Event Booking Platform (Frontend)

## 🌐 Live Site: [Click here](https://event-buddy-by-utchas.vercel.app)


## About the Project

**Event Buddy** is a modern, responsive web application that allows users to browse, book, and manage event seats — and enables admins to create and control events from a custom dashboard. It features role-based access (User/Admin), simulated authentication, and full functionality using fake JSON data.


## Key Features

- **Simulated Authentication/Authorization and private routes** via React Context/localStorage (Admin/User login)
- **Admin Dashboard** to create, edit, delete, and view events
- **User Dashboard** to track personal bookings
- **Event Booking System** with seat selection (1–4 seats per user)
- **Dynamic Event Pages** (past/upcoming split based on date)
- **SweetAlert2 Modals** for all feedback (bookings, errors, etc.)
- **Responsive Design** across mobile, tablet, and desktop
- **Events.json** used as mock backend (loaded from `/public`)

---

## Pages & Functionality

### Home Page
- Gradient hero banner with animated SVG stars and tickets
- Event category cards (Upcoming / Past)
- Fully responsive search bar and layout

### Event Details
- Detailed view with date, time, location, description
- Dynamic seat booking with real-time availability

### Sign In / Sign Up
- Dummy form with role selection (admin/user)
- State saved in localStorage & context

### Booking Page (Protected - User Only)
- Seat selection UI with 1–4 ticket range
- Auto redirect to sign in if not logged in

### Admin Dashboard (Protected)
- View, delete, and link to edit events
- Responsive table with CRUD controls
- Create Event page with form validation

### Edit Event Page (Protected)
- Pre-filled form with existing event details
- Ability to update fields or change image

### Create Event Page (Protected)
- Admin-only form with category, description, image, etc.
- Read-only role check with route protection

---

## 🛠️ Technologies Used

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React Icons**
- **SweetAlert2**
- **React Context + localStorage**
- **Figma (UI Prototype)**

## 🧪 Simulated Roles & Auth
Use the following credentials to log in to the application for testing purposes:
### User login
- Email: ```alif@gmail.com```
- Password: ```alif123```
### Admin login 
- Email: ```admin@gmail.com```
- Password: ```admin123```
  
---

## 🧩 How to Install & Run Locally

Follow these steps to run the project on your local machine:

### 1. Clone the Repository

```sh
git clone git@github.com:Shahriar-Utchas/EventBuddy.git
```
2. Go to the project folder ```cd EventBuddy```
3. Install Project Dependencies
```sh
npm install
```
4. Start the development server ```npm run dev```
5. Open your browser and visit: http://localhost:3000

