import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_USER = "hetpatelsk@gmail.com"
SMTP_PASSWORD = "congrdyifnhnpgis"
to_email = "hetpatelsk@gmail.com" # send to self to test

msg = MIMEMultipart("alternative")
msg["Subject"] = "Test Email"
msg["From"] = SMTP_USER
msg["To"] = to_email
msg.attach(MIMEText("Test email body", "html"))

try:
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, to_email, msg.as_string())
    print("Success")
except Exception as e:
    print("Error:", e)
