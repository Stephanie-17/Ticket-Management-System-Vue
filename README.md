
# FlowDesk - Ticket Management System

FlowDesk is a comprehensive ticket management system designed to help teams manage customer support requests efficiently. It features automated ticket routing, unified communication, analytics dashboards, and a user-friendly interface built with **Vue 3**, **Tailwind CSS**, and **Vite**.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication & Stores](#authentication--stores)
- [Deployment](#deployment)
- [License](#license)

---

## Demo

Insert your live demo URL here, for example:

```

[https://flowdesk.vercel.app](https://flowdesk.vercel.app)

```

---

## Features

- **Automated Ticket Routing** – Automatically assigns tickets to the right team or agent.
- **Unified Communication Hub** – All conversations (email, chat, internal notes) in one place.
- **Actionable Analytics** – Track performance, response times, and trends.
- **User Authentication** – Signup, login, and session management.
- **Ticket Management** – Create, edit, update status, and delete tickets.

---

## Technologies Used

- **Frontend:** Vue 3 (with Vue Router & Pinia), React (for reusable components)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** Vue Router (history mode)
- **State Management:** Pinia (Vue), React Context API
- **Deployment:** Vercel

---

## Project Structure

```

Ticket-Management-System/
├─ src/
│  ├─ assets/             # Images, icons, and other static assets
│  ├─ components/         # Reusable UI components
│  ├─ views/              # Page components (Dashboard, LandingPage, TicketManagement)
│  ├─ router/             # Vue Router setup
│  ├─ stores/             # Pinia stores (authStore, ticketStore)
│  └─ main.js             # App entry point
├─ public/                # Public assets accessible at runtime
├─ index.html             # HTML template
├─ package.json           # Project dependencies & scripts
├─ vite.config.js         # Vite configuration
├─ tailwind.config.js     # Tailwind CSS config
├─ vercel.json            # Vercel rewrite rules for SPA routing
└─ README.md              # This file

````

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Stephanie-17/Ticket-Management-System-Vue.git
cd flowdesk
````

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

* Navigate through the **Landing Page**.
* Sign up or log in to access the **Dashboard**.
* Create, edit, and manage tickets.
* View analytics and ticket counts by status.
* Log out when finished.

---

## Authentication & Stores

* **Pinia** manages the user authentication state and ticket data in Vue.
* **React Context API** is used for shared components that also use React.
* Authentication guards prevent unauthorized access to protected routes (`/dashboard`, `/tickets`).


---

## Author

FlowDesk Developed by Stephanie
📧 [emenikesteph@gmail.com]
