import smtplib, ssl, datetime
from email.mime.text import MIMEText

today = datetime.datetime.today()
year = today.year
month = today.month
date = today.day

# メール送信クラス
class SendGmail:
    
    def send_work_mail(self, body, work_place):
        # メール設定
        self.gmail_account = 'XXXXXX@gmail.com'
        self.gamil_password = 'PASSWORD'
        self.mail_to = 'xxxxx@xxx.jp'
        self.subject = '【LRI】{0}-{1}-{2}-{3}-予'.format(year, month, date, work_place)
        self.body = body

        msg = MIMEText(self.body)
        msg["Subject"] = self.subject
        msg["To"] = self.mail_to
        msg["From"] = self.gmail_account

        # メール作成
        sever = smtplib.SMTP_SSL("smtp.gmail.com", 465, context=ssl.create_default_context())
        sever.login(self.gmail_account, self.gamil_password)
        sever.send_message(msg, msg["From"], msg["To"])
        sever.close()
