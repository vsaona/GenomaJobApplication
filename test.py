import sqlite3

post_data = {"name":"Trigomar",
             "location": "Valpo",
             "type": "pizza",
             "score": 4,
             "visited": True}

connection = sqlite3.connect("tocino.db")
cursor = connection.cursor()
cursor.execute('''INSERT INTO lugares (name, location, type, score, visited) VALUES ('{}', '{}', '{}', {}, {})'''.format(
    post_data["name"],
    post_data["location"],
    post_data["type"],
    post_data["score"],
    post_data["visited"]
))
connection.commit()
connection.close()