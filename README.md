# User Management Dashboard — Tacnique Frontend Assignment

A simple React web app that lets you view, add, edit, delete, search, filter, and sort users using the JSONPlaceholder free REST API.

---

## What This App Does

- Shows a list of users in a table
- You can search users by name or email
- Filter users by department using a popup
- Sort users by clicking any column header
- Add a new user using a form
- Edit an existing user
- Delete a user (with a confirmation step)
- Shows page numbers at the bottom (pagination)
- Works on mobile, tablet, and desktop screens

---

## Tech Stack

- **React.js** — for building the UI
- **Vite** — for running the project fast
- **Axios** — for making API requests
- **Lucide React** — for icons
- **Vanilla CSS** — for styling

---

## API Used

- URL: `https://jsonplaceholder.typicode.com/users`
- This is a free fake REST API — great for practice projects

---

## How to Run This Project

### Step 1 — Install Node.js
Download from https://nodejs.org (version 18 or above)

### Step 2 — Open the project in VS Code
Open the terminal with **Ctrl + `**

### Step 3 — Install all packages
```bash
npm install
```

### Step 4 — Start the app
```bash
npm run dev
```

### Step 5 — Open in browser
Go to **http://localhost:5173**

---

## Project Folder Structure

```
src/
├── api/
│   └── userService.js      → all API calls (GET, POST, PUT, DELETE)
├── components/
│   ├── UserTable.jsx        → shows the users table
│   ├── UserFormModal.jsx    → add/edit user form popup
│   ├── FilterPopup.jsx      → filter sidebar
│   ├── DeleteConfirmModal.jsx → delete warning popup
│   ├── Pagination.jsx       → page numbers at bottom
│   ├── StatsCards.jsx       → stats at top (total users etc.)
│   ├── ThemeToggle.jsx      → dark/light mode button
│   └── Toast.jsx            → success/error popup messages
├── utils/
│   └── validation.js        → form input checks
├── App.jsx                  → main file — holds all logic
├── index.css                → all the CSS styles
└── main.jsx                 → entry point
```
### Implemented Functionalities
## User Management
Display all users
Add new user
Edit user details
Delete user

## Search
Search is performed in real time using:

First Name
Last Name
Email
Department

## Filter
Users can be filtered using:

First Name
Last Name
Email

## Department
Sorting
Sorting is available for:

First Name
Last Name
Email
Department
Both Ascending and Descending order are supported.

## Pagination
Available page sizes:

10
25
50
100

## Form Validation
The application validates:

First Name
Last Name
Email format
Department
Unique Email

## Local Storage
User data is stored in Local Storage.

Whenever a user is:

Added
Updated
Deleted
the Local Storage is updated automatically.

On application startup, data is loaded from Local Storage if available.

## Data Mapping Notes

The JSONPlaceholder API gives each user a single `name` field like `"Leanne Graham"`. Since the assignment requires separate First Name and Last Name columns, I split the name by the first space:

```js
// "Leanne Graham" → firstName: "Leanne", lastName: "Graham"
const nameParts = user.name.split(' ');
const firstName = nameParts[0];
const lastName = nameParts.slice(1).join(' ');
```

The API also does not have a `department` field. So I assigned departments automatically based on user ID:

```js
const departments = ['Engineering', 'Product', 'Sales', 'Marketing', 'Finance', 'HR', 'Support'];
const department = departments[user.id % departments.length];
```

---

## Challenges I Faced

**Problem:** JSONPlaceholder does not actually save new or edited data — it just pretends to.

**Solution:** After every API call (add/edit/delete), I update the local React state array manually. This makes the UI show the correct data even though the server didn't really save it.

---

## Features I Would Add in the Future

- Connect to a real backend (Node.js + MongoDB or PostgreSQL)
- Add login/signup with authentication
- Export users list to CSV file
- Role-based access (admin vs viewer)

## Author
# Boosi Naresh

B.Tech - Computer Science Engineering 

Nalla Malla Reddy College of Engineering

Email: nareshpandhilla@gmail.com
