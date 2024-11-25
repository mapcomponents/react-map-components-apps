# Project description

The idea is a demo application that includes the use of a service worker for communication between two browser tabs in an application. This idea originates from the proof of concept that was developed as part of the DPDHL project.

**The aim of this demo application:**

The data displayed on a map is to be displayed in a second browser tab in the form of a table. Both views (both the map and the table) can interact with each other dynamically and in different ways.

**Examples of the interaction:**
- When zooming in and out, only the data that can be seen in the browser window section is displayed in the table
- Data that is selected in the map is highlighted in the table; data that is selected in the table is highlighted in the map
- Different layers can be displayed in the table (via selection menu in a single table or by activating multiple tables)


**Functionality of this application:**

A **service worker** is registered and then implemented. Service workers enable background synchronization and also the offline use of applications. For our demo application, we need the service worker so that different browser tabs can interact with each other. Service workers react to events.

We also use **React Router**, which enables “client side routing”. The advantage of this is a faster user experience, as the app can update and render the current user interface instead of having to make a new request to the server.
In this demo application, the “App” and the “DataTable” are added to the router.

Using **React Query or TanStack Query** makes it possible to efficiently query and cache data so that it persists when switching between tabs.

# MapComponents + vite + react + typescript

This template is based on the vite ts-react template, and adds all 
required basic components for a MapComponents application.

## Start the development server

```bash
yarn dev
```

## Build for production

```bash
yarn build
```

## Create a new app from this template

```bash
npx degit mapcomponents/template my-new-app
```