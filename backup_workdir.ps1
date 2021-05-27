#環境に応じて変数を設定してください. OSの環境によるパス表記に注意。
#バックアップ対象
[string]$from_dir = ""
#バックアップ保存先
[string]$to_dir = ""
#保存フォルダ名形式
[string]$save_name = Get-Date -Format "yyyy-MM-dd"
#保存期間
#[int]$hold_date = 5


#バックアップファイル名.フルパス
[string]$backup_dir = Join-Path $to_dir $save_name

#バックアップ実行.zipファイルのみ残す
if((Test-Path $from_dir) -and (Test-Path $to_dir)){
    Copy-Item $from_dir $backup_dir -Recurse
    Compress-Archive -Path $backup_dir -DestinationPath "${backup_dir}.zip"
    #コピー削除
    Remove-item $backup_dir -Recurse -Force
}else {
    Write-Host "パス不正です"
}

Delete_overdue_back

Write-Host "処理が終了いたしました"

#<#
カレントフォルダのzipファイルで、保有期間($hold_date)を過ぎたファイルを削除
#>
function Delete_overdue_back {
    $today = Get-Date -DisplayHint Date
    $zip_name_arr = Get-ChildItem  $to_dir -Include *zip -Name

    # zipファイルの日付で、保有期間を過ぎていれば削除
    foreach($zipname_i in $zip_name_arr){
        $zip_day = [datetime]$zipname_i.Substring(0, 10)
        $day_diff = ($today - $zip_day).Days

        if($day_diff -gt $hold_date){
            Remove-Item (Join-Path $to_dir $zipname_i)
        }
    }
}