# calendar_js
[github pages](https://raysuke.github.io/calendar_js)

## 概要
webサイトのサイドバー部等にカレンダーを表示させるjQueryプラグインです。

## 使い方
1. htmlにタグを用意します。

```
<div id="calendar01"></div>
```

2. jQueryとcalendar.jsとcalendar.cssを読み込みます

```
<link rel="stylesheet" type="text/css" href="calendar_js/calendar.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script src="calendar_js/calendar.js"></script>
```


3. あとはセレクタを指定するだけです。

```
$(function(){
	$('#calendar01').calendar();
});
```
