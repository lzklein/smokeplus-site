import time
from mega import Mega
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Mega account login credentials
mega_email = os.getenv('MEGA_EMAIL')
mega_password = os.getenv('MEGA_PASSWORD')

# Initialize Mega instance and log in
mega = Mega()
m = mega.login(mega_email, mega_password)

# Set the path to your SQLite backup file
backup_file_path = './mydatabase.db'

# Generate a timestamp
timestamp = time.strftime("%Y%m%d%H%M%S")

# Form a new file name with the timestamp
new_file_name = f"mydatabase_{timestamp}.db"

# Upload the backup file to Mega with the new name
file = m.upload(backup_file_path, dest_filename=new_file_name)

# Print the link to the uploaded file
print(f"File uploaded successfully with timestamp. New name: {new_file_name}")
