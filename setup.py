# Following recommendations from https://docs.python.org/3/library/sqlite3.html

import sqlite3
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

hostName = "localhost"
serverPort = 8089


# Trying to create database
try:
    connection = sqlite3.connect("tocino.db")
    cursor = connection.cursor()
    cursor.execute('''CREATE TABLE lugares (name text, location text, type text, score tinyint, visited bool)''')
    connection.commit()
except sqlite3.OperationalError as e:
    # Expected :: sqlite3.OperationalError: table lugares already exists
    if(str(e) != "table lugares already exists"):
        raise Exception(e)
except Exception as e:
    print("There's been an error creating the database")
    print(e)
finally:
    connection.close()

# Following recommendations from https://pythonbasics.org/webserver/
class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        places = []
        try:
            connection = sqlite3.connect("tocino.db")
            cursor = connection.cursor()
            for line in cursor.execute('''SELECT * FROM lugares'''):
                a1, a2, a3, a4, a5 = line
                places.append({"name": a1, "location": a2, "type": a3, "score": a4, "visited": True if str(a5) == "1" else False})
        finally:
            connection.close()

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(bytes(json.dumps(places), "utf-8"))
    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = json.loads(self.rfile.read(content_length).decode("utf-8"))

        if post_data["action"] == "ADD":
            print("yes")
            print(post_data["name"])
            try:
                connection = sqlite3.connect("tocino.db")
                cursor = connection.cursor()
                cursor.execute('''INSERT INTO lugares (name, location, type, score, visited) VALUES ('{}', '{}', '{}', {}, {})'''.format(
                    post_data["name"],
                    post_data["location"],
                    post_data["type"],
                    post_data["score"],
                    "1" if post_data["visited"] else "0"
                ))
                connection.commit()
            except Exception as e:
                print("Ups!")
                print(e)
            finally:
                connection.close()
        
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(bytes(str({"answer" : json.dumps(post_data)}), "utf-8"))
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(bytes(str({"answer" : "yes"}), "utf-8"))
    def send_response(self, *args, **kwargs):
        BaseHTTPRequestHandler.send_response(self, *args, **kwargs)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS, HEAD, GET')

    

webServer = HTTPServer((hostName, serverPort), MyServer)
print("Server started http://%s:%s" % (hostName, serverPort))

try:
    webServer.serve_forever()
except KeyboardInterrupt:
    pass

webServer.server_close()
print("Server stopped.")