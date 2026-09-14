# 設備技研 採用LP｜SECTION 01〜12 静的HTML教材

## 最初に開くファイル
ZIPを解凍して、`tenohira-lp-training/index.html` をブラウザで開いてください。
SECTION 01〜12は同じ`index.html`の中に連結されています。Supabase / CMSはまだ未実装です。

## 現在の構成
- `index.html`：SECTION 01〜12の本文・見出し。文字は画像ではなくHTMLです。
- `css/style.css`：全体共通設定。
- `css/sections/section-01.css`〜`section-08.css`：各セクション専用CSS。
- `js/main.js`：SECTION 06のカルーセルを実装。SECTION 07・08は追加JavaScript不要です。
- `assets/section-*/`：Webで実際に読み込む写真・透過PNGアイコン。
- `source-assets/section-*/`：編集用の元素材。
- `docs/reference-section-*.jpg`：元デザイン比較用。LP表示には使いません。
- `docs/content-map.json`：将来Supabaseへ移す文字項目の対応表。
- `docs/asset-manifest.json`：素材一覧。
- `docs/TEST-REPORT.json`：ローカル参照・透過PNGなどの検証結果。

## SECTION 07｜求人情報詳細
職種、雇用形態、給与、勤務時間、応募条件、休日休暇、勤務地、待遇・福利厚生をHTMLテキスト＋カードUIとして実装しています。
カード用アイコンは個別の背景透過PNGです。

## SECTION 08｜会社の歩み
「34年間、ずっと沖縄と一緒に。」のコピー、1992〜2026年の沿革をHTMLテキストとして実装しています。
会社建物＋沖縄の海の写真は独立画像にし、`Since 1992`はHTML/CSS側の装飾文字です。

## 文章と画像の変更
文章は`index.html`の該当テキストを書き換えます。`data-content-key`は後のSupabase連携で使う目印です。
画像は同名ファイルを差し替えるか、HTMLの`src`を変更します。

## 次の授業
現状は静的HTMLです。次に「HTMLへ直接書いた本文・見出しをSupabaseへ移し、DBから読み込む」実装へ進み、その後CMS編集画面を構築する想定です。

## 未実装
Supabase接続、SQL、CMS、ログイン、保存、セクション自動追加、GitHubへのアップロード・公開は未実装です。

- SECTION 09｜代表・専務メッセージ
- SECTION 10｜こんな先輩が働いています

- SECTION 11｜FAQ / 設備技研のホンネ
- SECTION 12｜エントリー（採用情報）＋フッター
