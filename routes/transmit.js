var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3'); // ★追加
var db = new sqlite3.Database('mydb.sqlite3'); // ★追加

// transmit 
router.get('/', (req, res, next) => {
  var data = {
      title: '配信予約リスト',
      link: {href:'/', text:'ログアウト'},
      link_application: {href:'/application', text:'アプリ一覧'},
      link_transmit: {href:'/transmit', text:'配信予約リスト'},
      link_transmit_done: {href:'/transmit/done', text:'配信済みリスト'},
      link_transmit_web: {href:'/transmit/web', text:'新規配信登録'},
      link_transmit_db: {href:'/transmit/db' , text:'データベース'},
      link_transmit_reservation: {href:'/transmit/reservation', text:'編集'},
  };    
           
  res.render('transmit', data);
});

// transmit/reservation
router.get('/reservation', (req, res, next) => {
  var data = {
      title: '配信内容の編集',
      link: {href:'/', text:'ログアウト'},
      link_application: {href:'/application', text:'アプリ一覧'},
      link_transmit: {href:'/transmit', text:'配信予約リスト'},
      link_transmit_done: {href:'/transmit/done', text:'配信済みリスト'},
      link_transmit_web: {href:'/transmit/web', text:'新規配信登録'},
      link_transmit_back: {href:'/transmit', text:'配信リストへ戻る'},
  };    
           
  res.render('transmit/reservation', data);
});

// transmit/done
router.get('/done', (req, res, next) => {
  var data = {
      title: '配信済みリスト',
      link: {href:'/', text:'ログアウト'},
      link_application: {href:'/application', text:'アプリ一覧'},
      link_transmit: {href:'/transmit', text:'配信予約リスト'},
      link_transmit_done: {href:'/transmit/done', text:'配信済みリスト'},
      link_transmit_web: {href:'/transmit/web', text:'新規配信登録'},
      link_transmit_confirm: {href:'/transmit/confirm', text:'確認'}
  };    
           
  res.render('transmit/done', data);
});

// transmit/confirm
router.get('/confirm', (req, res, next) => {
  var data = {
      title: '配信内容の確認',
      link: {href:'/', text:'ログアウト'},
      link_application: {href:'/application', text:'アプリ一覧'},
      link_transmit: {href:'/transmit', text:'配信予約リスト'},
      link_transmit_done: {href:'/transmit/done', text:'配信済みリスト'},
      link_transmit_web: {href:'/transmit/web', text:'新規配信登録'},
      link_transmit_back: {href:'/transmit', text:'配信リストへ戻る'},
  };    
           
  res.render('transmit/confirm', data);
});

// transmit/web
router.get('/web', (req, res, next) => {
  var data = {
      title: '新規配信登録',
      link: {href:'/', text:'ログアウト'},
      link_application: {href:'/application', text:'アプリ一覧'},
      link_transmit: {href:'/transmit', text:'配信予約リスト'},
      link_transmit_done: {href:'/transmit/done', text:'配信済みリスト'},
      link_transmit_web: {href:'/transmit/web', text:'新規配信登録'},
  };    
           
  res.render('transmit/web', data);
});

// transmit/db
router.get('/db',(req, res, next) => {
    // データベースのシリアライズ
    db.serialize(() => {
        //レコードをすべて取り出す
        db.all("select * from mydata",(err, rows) => {
            // データベースアクセス完了時の処理
            if (!err) {
                    var data = {
                        title: 'mydb.sqlite3のdummyのDBを表示する',
                        content: rows, // ★取得したレコードデータ
                        link_transmit_back: {href:'/transmit', text:'配信リストへ戻る'},
                    };
                    res.render('transmit/db', data);
            }   
        }); 
    }); 
});

module.exports = router;