function main() {
    let flg; //記録の実施有無によって投稿する内容を判定するために入力値を調べている。
    let inputData = [];
    //idでワークブックを指定
    const spredSheet = SpreadsheetApp.openById('1QvUo2MqCokClEo8UNpKQZkFNyQysU-iqOTg1a3UoqRw');
    //sheet指定
    let recordSheet = spredSheet.getSheetByName('sheet1');
    //総合点取得
    const total = recordSheet.getRange('A14').getValue();
    
    //週の記録に入力
    addToWeekData(spredSheet, total);
  
    //入力チェック
    flg = checkInputdata(recordSheet);
    if(flg){
      console.log('記録投稿処理追加');
    }else{
      console.log('失敗投稿処理追加');
    }
    
    //一日の記録内容をクリア
    clearValue(recordSheet,'B2:B14'); 
  
    //週の記録をクリア。日曜日が0。
    if(checkDayOfTheWeek() == 6){
      recordSheet = spredSheet.getSheetByName('weekData');
      clearValue(recordSheet, 'B1:H4');
      console.log('土曜日なので、週の記録がクリアされました。');
    }
  }
  
  /**
   * 対象シートを指定し、総合点を調べている
   * 
   * @param {object} - シート
   * @return {boolean}
   */
  function checkInputdata(sheet){
    console.log(typeof sheet);
    let flg = true;
    let total = sheet.getRange('A14').getValue(); 
    if (total == 0 || total == ''){
      flg = false;
    }
    return flg;
  }
  
  //改善内容：汎用性を高めるために、引数にrange範囲を加える。
  //入力クリア
  //引数:シートobject, 返り値:なし
  function clearValue(sheet, ra){
    //指定範囲の削除
    sheet.getRange(ra).clearContent();
  }
  
  //日付取得
  function aboutDate(){
    let now = new Date();
    let time = Utilities.formatDate(now, 'Asia/Tokyo', 'MM/dd');
    return time;
  }
  
  //週全体の記録
  //引数:ワークブック, return:void
  function addToWeekData(book, total){
    let sheet = book.getSheetByName('weekData');
    let addDay = aboutDate();
  
    const lpCell = sheet.getLastColumn();
    let addPointCell = sheet.getRange(2,lpCell+1);
    let addDayCell = sheet.getRange(1,lpCell+1);
  
    addPointCell.setValue(total);
    addDayCell.setValue(addDay);
  }
  
  //曜日確認
  function checkDayOfTheWeek(){
    const day = new Date();
    const weekNum = day.getDay();
    return weekNum;
  }
  
  //動作確認用
  function myTest(){
    //idでワークブックを指定
    let spredSheet = SpreadsheetApp.openById('1QvUo2MqCokClEo8UNpKQZkFNyQysU-iqOTg1a3UoqRw');
    //sheet指定
    let recordSheet = spredSheet.getSheetByName('sheet1');
    
    addToWeekData(spredSheet);
  }
  
  
  //以下、学習用コード　自由改変してよい
  //アロー関数
  const getArea = (base, height) => {
    let area = base*height/2;
    return area;
  }
  
  //JSDocコメント　の書き方(ドキュメンテーションコメントの書き方)
  /**
   * @param {string} args1 - 1つ目の引数
   * @param {number} args2 - 2つ目の引数
   * @return {boolean} - 戻り値
   */
  
  