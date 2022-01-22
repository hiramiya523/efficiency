import send_gmail
import create_body

# 文字数のみで入力値判定
while True:
    work = input('次のフォーマットで実績を入力。　家(通)1908\n >>  ')
    if len(work) == 5:
        break
    
work_place = work[0:1]
fin_hour = int(work[1:3])
fin_min = work[3:5]

# コマンドプロンプトにメールフォーマットを出力
mail_body = create_body.Create_body(work_place, fin_hour, fin_min)
text = mail_body.mail_body()

print(text)

#予定メール自動送信
text = mail_body.common_mail()
mail = send_gmail.SendGmail()
mail.send_work_mail(text, work_place)