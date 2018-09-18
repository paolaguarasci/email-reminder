# Send email by shell
This script gets data from a datasheet and send an email reminder to clients that have not all month's payed. I got the idea from the book [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/) (*Written by Al Sweigart*). But, I swear, I have not looked at the source code 🤓 !!!

What this script does:
- reads the data from an appropriately formatted .xlsx
- look for customers who have not paid every month
- send them a personalized email as a reminder

What this script does not (yet):
- send sms (because the API suggested in the text is free only if you use a real US number to login, I have to find a service that allows me to send text messages even from old dear Europe.)