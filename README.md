# Student Management System

A web app to add, view, edit and delete student records.

**Technologies:** HTML, CSS, JavaScript (front end), Python/Flask (back end), MySQL (database).

**Live demo:** https://mohammedaarish42-jpg.github.io/student-management-system/ (a browser-only version in `docs/` that saves data in your browser instead of using Flask and MySQL)

## Files
- `templates/index.html` – the page (HTML)
- `static/style.css` – the look (CSS)
- `static/script.js` – the buttons and table (JavaScript)
- `app.py` – the server that talks to the database (Python)
- `schema.sql` – creates the database and table (MySQL)

## How to run it (one-time setup)

1. **Install Python** from https://www.python.org/downloads/ – on the first screen of the installer, tick **"Add Python to PATH"**.
2. **Install MySQL** from https://dev.mysql.com/downloads/installer/ – choose the default setup. It will ask you to set a **root password**: write it down.
3. **Create the database:** open **MySQL Workbench** (installed with MySQL), connect, open `schema.sql` (File > Open SQL Script) and press the lightning-bolt button to run it.
4. **Set your password:** create a file called `config.py` next to `app.py` containing one line: `DB_PASSWORD = "your password here"`. This file stays on your computer and is never uploaded.
5. **Install the Python libraries:** open the `student-management` folder in File Explorer, click the address bar, type `cmd` and press Enter. In the black window type:
   ```
   python -m pip install -r requirements.txt
   ```
6. **Start the app:** in the same window type:
   ```
   python app.py
   ```
7. Open your browser and go to **http://127.0.0.1:5000**

To stop the app, press `Ctrl + C` in the black window. Next time, you only need steps 6 and 7.
