# Taskify

## Overview

Taskify is a client-side JavaScript web application that helps users track their tasks with other BCIT students. The app displays a curated list of hike trails, each with details such as name, location, difficulty, and an image. Users can browse the list and mark their favorite trails for easy access later.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for storing user favorites.

---

## Features

- Pick set groups
- create a task within a set group
- the task can also have a due date

---

## Technologies Used

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Build Tool: [Vite](https://vitejs.dev/)
- Backend: Firebase for hosting
- Database: Firestore

---

## Usage

To run locally:

1. Clone the repository.
2. Install dependencies by running `npm install` in the project root directory.
3. Start the development server by running the command: `npm run dev`.
4. Open your browser and visit the local address shown in your terminal, `http://localhost:5173`.

Once the application is running: 2. Browse the list of set groups when you login/sign up. 3. Click a set and see the tasks in the set. 4. add a task in the set by adding a name and due date.

---

## Shared Navbar and Footer (Web Components)

What this gives you:

- A single source of truth for the navbar and footer
- Same markup reused across all pages with `<site-navbar>` and `<site-footer>`
- Easy customization by editing a single JavaScript file per component

How to use it on any HTML page (e.g., `index.html`, `skeleton.html`):

1. Import the components (in `<head>`):

   ```html
   <script type="module" src="/src/components/site-navbar.js"></script>
   <script type="module" src="/src/components/site-footer.js"></script>
   ```

   Also load global scripts:

   ```html
   <script type="module" src="/src/app.js"></script>
   ```

   Notes:

   - Bootstrap CSS and JS are imported in `src/app.js` via ES modules, so you don’t need extra `<link>` or `<script>` tags in HTML.
   - Vite handles module loading during development with `npm run dev`.

2. Drop the custom elements where you want them to render:

   ```html
   <!-- our own navbar goes here -->
   <site-navbar></site-navbar>

   <!-- Main content goes here -->

   <!-- our own footer goes here -->
   <site-footer></site-footer>
   ```

3. Customize the shared markup once:

   - Edit `src/components/site-navbar.js` to change the navbar (brand, links, etc.)
   - Edit `src/components/site-footer.js` to change the footer

   Every page using `<site-navbar>` and `<site-footer>` will automatically reflect your changes.

## Project Structure

```
1800_202530_BBY18/
├── src/
│   ├── main.js
├── styles/
│   └── style.css
├── .env
├── .firebasesrc
├── .gitignore
├── addgroup.html
├── addtask.html
├── course.html
├──firebase.json
├──fire.store.indexes.json
├──firestore.rules
├──grouppage.html
├── public/
├── images/
├── index.html
├──leaderboard.html
├──login.html
├──package-lock.json
├──package.json
├──profile.html
├──profilesettings.html
├──progress.html
├── package.json
├── README.md
├── skeleton.html
├──taskpage.html
├── vite.config.js

---

## Contributors

- Danielle Laron - BCIT CST Student with a passion for art and learning. Fun fact: I have a lot of siblings!
- Aayush Aggarwal- BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Loves learning new things.
- Evelyn Loosley-Millman - BCIT CST Student with a passion for solving Rubics Cubes.  Fun fact: I can solve a Rubic's Cube within 3 minutes.

---

## Acknowledgments

- Code snippets were adapted from resources such as [w3schools](https://stackoverflow.com/)
- Icons sourced from [Google icons](https://fonts.google.com/icons)

---

## Limitations and Future Work

### Limitations
- pet page has no art work to display


### Future Work
- implement pet page into the website
- have the course in the set display when a set is clicked
- when a course is clicked it redirects to the courses being taken currently in that set, then click a course to add a task in that course
---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
```
