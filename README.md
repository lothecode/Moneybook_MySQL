# 我的記帳本(sequelize版)
這是一個線上記帳本, 讓使用者記錄支出之外還能由類別, 時間及金額大小來做篩選，透過帳號管理自己的記帳紀錄，可自行新增、修改及刪除。

## 說明
### 登入及註冊
- 登入首頁進行帳號密碼登入。
- 可採用Facebook帳號登入。
- 若尚未註冊，可到註冊網頁申請帳號。
### 登入後使用
- 首頁顯示所有支出清單列表及總金額。
- 提供支出紀錄的類別/日期時間/金額大小篩選功能。
- 使用者可新增一筆支出，輸入相關資訊。
- 使用者可編輯支出，編輯完成後回到清單列表。
- 使用者可刪除任一項支出資訊。

### 安裝流程
- Clone or download 此專案至本機電腦
- git clone https://github.com/lothecode/Moneybook_MySQL.git
- 安裝 npm 套件，根據package.json內紀錄之套件進行安裝。
- 待terminal將資料新增至資料庫後啟動專案，並監聽伺服器, 在終端機用npm run start 指令啟動專案
- 開啟瀏覽器，輸入http://localhost:3000 ，即可使用線上記帳本網站。

### 環境配置
- Express
- MySQL

### 資料庫設定
- 在MySQL Workbench 建立moneybook_sql資料庫
```
drop database if exists moneybook_sql;
create database moneybook_sql;
use moneybook_sql;
```
- 在終端機中輸入下方指令，建立Users及Todos資料表
```
npx sequelize db:migrate
```

### 環境套件
- Nodemon
- express
- express-handlebars
- handlebars
- body-parser
- method-override
- mysql2
- sequelize
- sequelize-cli
- bcryptjs
- express-session
- passport
- passport-local
- passport-facebook
- dotenv
- connect-flash
