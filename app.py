from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
# from flask_mail import Mail, Message
import sqlite3
import pygsheets
import pandas as pd
# import os

app = Flask(__name__)
CORS(app)

# Configure Flask-Mail
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = os.getenv('')
# app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
# app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

# mail = Mail(app)

# Connect to Google Sheets
gc = pygsheets.authorize(service_file='grpght-a3da4392ebd5.json')
spreadsheet = gc.open('GRPGHTATENDEES')
worksheet = spreadsheet[0]

# Routes to serve HTML files
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/authors')
def authors():
    return render_template('authors.html')

@app.route('/venue')
def venue():
    return render_template('venue.html')

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.json
        username = data.get('firstName')
        email = data.get('email')

        # Insert into SQLite database
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (username, email) VALUES (?, ?)', (username, email))
        conn.commit()
        conn.close()

        # Append to Google Sheet
        df = pd.DataFrame([[username, email]], columns=['Username', 'Email'])
        worksheet.append_table(values=df.values.tolist())

        # Send verification email
        # msg = Message('Welcome to GRPGHT!', recipients=[email])
        # msg.body = f"Hi {username},\n\nThank you for registering at GRPGHT! We're thrilled to have you on board. A verification code will be sent to confirm your email address.\n\nBest Regards,\nThe GRPGHT Team"
        # mail.send(msg)

        return jsonify({"message": "Data Submitted Successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Routes to serve static files
@app.route('/static/<path:filename>') 
def send_static(filename): 
    return send_from_directory(app.root_path, filename)

if __name__ == '__main__':
    app.run(debug=True)
