# Student Management System - Python (Flask) backend with MySQL
from flask import Flask, jsonify, request, render_template
import mysql.connector

try:
    from config import DB_PASSWORD  # private file, not uploaded to GitHub
except ImportError:
    DB_PASSWORD = "your_mysql_password"

app = Flask(__name__)

# Change these to match your MySQL installation
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": DB_PASSWORD,
    "database": "student_db",
}


def get_db():
    return mysql.connector.connect(**DB_CONFIG)


@app.route("/")
def index():
    return render_template("index.html")


# READ - list all students
@app.route("/api/students", methods=["GET"])
def list_students():
    db = get_db()
    cur = db.cursor(dictionary=True)
    cur.execute("SELECT * FROM students ORDER BY id")
    rows = cur.fetchall()
    db.close()
    return jsonify(rows)


# CREATE - add a student
@app.route("/api/students", methods=["POST"])
def add_student():
    d = request.get_json()
    db = get_db()
    cur = db.cursor()
    cur.execute(
        "INSERT INTO students (name, email, course, age) VALUES (%s, %s, %s, %s)",
        (d["name"], d["email"], d["course"], d["age"]),
    )
    db.commit()
    new_id = cur.lastrowid
    db.close()
    return jsonify({"id": new_id}), 201


# UPDATE - edit a student
@app.route("/api/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    d = request.get_json()
    db = get_db()
    cur = db.cursor()
    cur.execute(
        "UPDATE students SET name=%s, email=%s, course=%s, age=%s WHERE id=%s",
        (d["name"], d["email"], d["course"], d["age"], student_id),
    )
    db.commit()
    db.close()
    return jsonify({"message": "updated"})


# DELETE - remove a student
@app.route("/api/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    db = get_db()
    cur = db.cursor()
    cur.execute("DELETE FROM students WHERE id=%s", (student_id,))
    db.commit()
    db.close()
    return jsonify({"message": "deleted"})


if __name__ == "__main__":
    app.run(debug=True)
