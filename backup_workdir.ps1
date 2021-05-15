#環境に応じて変数を設定してください. OSの環境によるパス表記に注意。
#バックアップ対象
[string]$from_dir = "/Users/kaito/Desktop/test_from"
#バックアップ保存先
[string]$to_dir = "/Users/kaito/Desktop/test_to"
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
    Remove-item $backup_dir -Recurse
}else {
    Write-Host "パス不正です"
}

Write-Host "処理が終了いたしました"