# Interactive Comments Section

This project is a fully interactive comments section built with **React** and **Vite**, designed to replicate the functionality and appearance of a provided UI design.

## Features

* **Create, Read, Update, and Delete** (CRUD) functionality for comments and replies
* **Nested replies** support with proper indentation
* **Upvote and downvote** individual comments and replies
* **Responsive design** that adapts to mobile and desktop layouts
* **Hover states** for all interactive elements (buttons, icons)
* **Confirmation modal** for deleting comments
* **Persisted state** using `localStorage` so that the comment thread is saved across browser refreshes

## Project Structure

```
public/
  assets/images/avatars/       # User avatar images
src/
  components/
    CommentSection.jsx         # Main component managing all comment data and UI
    Comment.jsx                # Individual comment component
  data.json                    # Initial data for comments and current user
  App.jsx                      # Root app component
  main.jsx                     # Entry point
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interactive-comments-section.git
cd interactive-comments-section
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open your browser and go to `http://localhost:5173` to view the app.

## Data Source

All initial data comes from `src/data.json`. It includes:

* `comments`: An array of comment objects, each with possible nested `replies`
* `currentUser`: The user currently logged in

## Avatar Images

All avatar images are located in `public/assets/images/avatars`.
Make sure the `image.png` paths in `data.json` point to this location. Example:

```json
"image": { "png": "./images/avatars/image-juliusomo.png" }
```

In code, ensure these paths are adjusted like this:

```js
image.png.replace('./images/avatars', '/assets/images/avatars')
```

## Future Improvements

* Implement authentication for multiple users
* Add backend support for real-time syncing
* Integrate rich-text formatting for comments

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React and Tailwind CSS.
