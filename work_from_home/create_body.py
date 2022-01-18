import  datetime, os

today = datetime.datetime.today()
year = today.year
month = today.month
date = today.day

class Create_body:

    def __init__(self, work_place, fin_hour, fin_min):
        self.work_place = work_place
        self.fin_hour = fin_hour
        self.fin_min = fin_min
    
    # 在宅か出社の場合で出力する実績メールを選択
    def mail_body(self):
        # 作業ディレクトリ移動
        os.chdir('c:/Users/work_from_home')

        if self.work_place == '家' or self.work_place == '在':
            f = open('home.txt', 'r', encoding = 'utf_8')

        elif self.work_place == '通':
            f = open('attendance.txt', 'r', encoding = 'utf_8')
        else:
            print('勤務形態にエラーの可能性')

        text = f.read()

        # {o}:年、{1}:月、{2}:日、{3}:入力時間、{4}:入力分
        text = text.format(year, month, date, self.fin_hour, self.fin_min)
        f.close()

        return text

    # 共通の予定メール
    def common_mail(self):
        os.chdir('c:/Users/work_from_home')
        f = open('schedule.txt', 'r', encoding = 'utf_8')
        text = f.read()
        text = text.format(year, month, date, self.fin_hour, self.fin_min)
        f.close()
        return text
