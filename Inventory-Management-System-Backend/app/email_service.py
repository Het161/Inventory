import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from .config import settings


def send_welcome_email(to_email: str, user_name: str):
    """Send a welcome email to newly registered users.
    Silently fails if SMTP is not configured."""

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        print(f"[EMAIL] SMTP not configured. Skipping welcome email for {to_email}")
        return False

    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Segoe UI', sans-serif; background: #f3f4f6; margin: 0; padding: 0; }}
                .container {{ max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }}
                .header {{ background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 30px; text-align: center; }}
                .header h1 {{ color: white; margin: 0; font-size: 28px; }}
                .header p {{ color: #e0e7ff; margin-top: 8px; font-size: 14px; }}
                .body {{ padding: 40px 30px; }}
                .body h2 {{ color: #1f2937; margin-top: 0; }}
                .body p {{ color: #6b7280; line-height: 1.8; }}
                .features {{ background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0; }}
                .features li {{ color: #4b5563; margin: 8px 0; }}
                .cta {{ display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }}
                .footer {{ text-align: center; padding: 20px 30px; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Welcome to OM Marketing Solutions!</h1>
                    <p>Inventory Management System</p>
                </div>
                <div class="body">
                    <h2>Hi {user_name}! 👋</h2>
                    <p>Thank you for joining <strong>OM Marketing Solutions</strong>. Your account has been successfully created and you're all set to manage your inventory like a pro!</p>

                    <div class="features">
                        <strong>What you can do:</strong>
                        <ul>
                            <li>📦 Manage Products & Stock</li>
                            <li>📊 View Analytics & Reports</li>
                            <li>👥 Manage Customers & Staff</li>
                            <li>🏭 Track Warehouses & Outlets</li>
                            <li>💰 Create Sales Memos</li>
                        </ul>
                    </div>

                    <p>Get started by logging in and exploring your dashboard.</p>
                    <a href="https://stockpilot-lake.vercel.app/login" class="cta">Go to Dashboard →</a>
                </div>
                <div class="footer">
                    <p>© 2026 OM Marketing Solutions | Inventory Management System</p>
                    <p>support@ommarketingsolutions.in | +91 98252 47312</p>
                </div>
            </div>
        </body>
        </html>
        """

        msg = MIMEMultipart("alternative")
        msg["Subject"] = "🎉 Welcome to OM Marketing Solutions!"
        msg["From"] = settings.SMTP_USER
        msg["To"] = to_email
        msg.attach(MIMEText(html_content, "html"))

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_USER, to_email, msg.as_string())

        print(f"[EMAIL] Welcome email sent to {to_email}")
        return True

    except Exception as e:
        print(f"[EMAIL] Failed to send welcome email to {to_email}: {e}")
        return False


def send_login_email(to_email: str, user_name: str):
    """Send a welcome-back email when a user logs in.
    Silently fails if SMTP is not configured."""

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        print(f"[EMAIL] SMTP not configured. Skipping login email for {to_email}")
        return False

    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Segoe UI', sans-serif; background: #f3f4f6; margin: 0; padding: 0; }}
                .container {{ max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }}
                .header {{ background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 30px; text-align: center; }}
                .header h1 {{ color: white; margin: 0; font-size: 28px; }}
                .header p {{ color: #e0e7ff; margin-top: 8px; font-size: 14px; }}
                .body {{ padding: 40px 30px; }}
                .body h2 {{ color: #1f2937; margin-top: 0; }}
                .body p {{ color: #6b7280; line-height: 1.8; }}
                .info-box {{ background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #6366f1; }}
                .info-box p {{ margin: 4px 0; color: #4b5563; font-size: 14px; }}
                .cta {{ display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }}
                .footer {{ text-align: center; padding: 20px 30px; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; }}
                .security {{ background: #fef3c7; border-radius: 8px; padding: 12px 16px; margin: 16px 0; font-size: 13px; color: #92400e; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>👋 Welcome Back!</h1>
                    <p>OM Marketing Solutions - Inventory Management</p>
                </div>
                <div class="body">
                    <h2>Hi {user_name}!</h2>
                    <p>You've successfully signed in to your <strong>OM Marketing Solutions</strong> account.</p>

                    <div class="info-box">
                        <strong>🔐 Login Details:</strong>
                        <p>📧 Email: {to_email}</p>
                        <p>🕐 Time: Just now</p>
                    </div>

                    <div class="security">
                        ⚠️ If this wasn't you, please change your password immediately or contact support.
                    </div>

                    <p>Continue managing your inventory from where you left off.</p>
                    <a href="https://stockpilot-lake.vercel.app/login" class="cta">Go to Dashboard →</a>
                </div>
                <div class="footer">
                    <p>© 2026 OM Marketing Solutions | Inventory Management System</p>
                    <p>support@ommarketingsolutions.in | +91 98252 47312</p>
                </div>
            </div>
        </body>
        </html>
        """

        msg = MIMEMultipart("alternative")
        msg["Subject"] = "👋 Welcome Back to OM Marketing Solutions!"
        msg["From"] = settings.SMTP_USER
        msg["To"] = to_email
        msg.attach(MIMEText(html_content, "html"))

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_USER, to_email, msg.as_string())

        print(f"[EMAIL] Login email sent to {to_email}")
        return True

    except Exception as e:
        print(f"[EMAIL] Failed to send login email to {to_email}: {e}")
        return False
