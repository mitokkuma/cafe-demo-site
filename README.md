# 〇〇 COFFEE & BAKERY — 店舗案内デモサイト

カナダ・バンクーバーのカフェ文化と広島の素材を合わせたカフェの、1ページ構成のランディングページ（デモ）です。
HTML / CSS / JavaScript だけで作っているため、ビルド作業は必要ありません。

> このサイトはデモです。店舗・住所・地図・Instagram投稿欄はデモ用の内容です。
> 商品価格、注文機能、予約機能、SNSの実データ取得は含んでいません。

---

## ローカルでの確認方法

ターミナルで次のコマンドを実行します（macOSに最初から入っている Python を使います）。

```bash
cd ~/Desktop/AI/Claude/サンプルサイト_カフェ
python3 -m http.server 8080 --bind 127.0.0.1
```

ブラウザで **http://localhost:8080** を開くと確認できます。
止めるときは、ターミナルで `Ctrl + C` を押します。

※ `index.html` をダブルクリックして開いても、ほぼ同じように表示されます。

---

## ファイル構成

```
サンプルサイト_カフェ/
├── index.html          … ページ本体（文章・メニュー・リンクはここ）
├── css/style.css       … デザイン（色・文字・レイアウト・アニメーション）
├── js/main.js          … 動き（メニュー開閉、メニューのタブ切り替え、スクロール演出など）
├── images/             … ロゴマーク（仮）・背景の質感
│   └── illustrations/  … 以前のオリジナルイラスト（未使用の予備。手元のみでGitHubには含めていません）
├── .claude/launch.json … Claude のプレビュー用設定（手元のみ）
├── .gitignore          … GitHubに含めないファイルの指定
└── README.md           … このファイル
```

---

## 写真について

写真はすべて **Unsplash**（無料の写真素材サイト）の写真を使っています。
いずれも有料の「Unsplash+」ではなく、無料の Unsplash ライセンスの写真であることを確認済みです。

- 写真ファイルはダウンロードしておらず、Unsplash のサーバーから直接読み込んでいます（インターネット接続が必要です）。
- Unsplash ライセンスでは商用利用も可能で、クレジット表記は必須ではありませんが、フッターに「写真：Unsplash」と記載しています。
- 「広島オレンジ エスプレッソ」の写真は、オレンジ色の層とエスプレッソが重なったドリンクの**イメージ写真**です（実際の商品写真ではありません）。

| 使われている場所 | 写真の内容 | 撮影者（Unsplash） |
|---|---|---|
| メインビジュアル | ラテアートのカフェラテとクロワッサン | [Yuliia Huzenko](https://unsplash.com/photos/MV5NQ8oV5LU) |
| Our Story（左） | バンクーバーの街並みと山々 | [Luke Lawreszuk](https://unsplash.com/photos/rEDvog99iro) |
| Our Story（右） | 宮島の大鳥居 | [Björn](https://unsplash.com/photos/9u3DQImppb8) |
| Signature ／ ヘッダー下の小カード | オレンジとエスプレッソの2層ドリンク（イメージ） | [Felix Cha](https://unsplash.com/photos/PXDxKz3uPqY) |
| Menu：Espresso & Coffee | ラテアートのコーヒー | [tabitha turner](https://unsplash.com/photos/3n3mPoGko8g) |
| Menu：Tea & Specialty Drinks | 抹茶ラテ | [Jason Leung](https://unsplash.com/photos/Z-hvocTfR_s) |
| Menu：Bakery & Pastry | クロワッサンとパン・オ・ショコラ | [Nicholas Doyle](https://unsplash.com/photos/t7jTtJ9iyUE) |
| Menu：Bagel & Sandwiches | サーモンのベーグルサンド | [Girl with red hat](https://unsplash.com/photos/LZW4V8FVH1w) |
| Instagram欄 1 | ラテアート | [Lex Sirikiat](https://unsplash.com/photos/1tEkissU8dY) |
| Instagram欄 2 | 並んだクロワッサン | [Kavita Joshi Rai](https://unsplash.com/photos/lE5O9DktAQY) |
| Instagram欄 3 | 2層のアイスドリンク | [Max Nayman](https://unsplash.com/photos/ZLhJiLWg74E) |
| Instagram欄 4 | カフェのカウンター | [Mario Gogh](https://unsplash.com/photos/CAuabHlbEn4) |
| Instagram欄 5 | 抹茶ラテ | [Alana Harris](https://unsplash.com/photos/C63YZ33DdvY) |
| Instagram欄 6 | コーヒーとクロワッサン | [David Dvořáček](https://unsplash.com/photos/12z0NP3X3LI) |

### 写真を差し替える方法

`index.html` の各写真には `<!-- 写真: Unsplash / 撮影者名 -->` というコメントを付けています。
その下の `<img>` の `src` と `srcset` を、新しい写真のURL（または `images/` フォルダに入れた写真のパス）に書き換えてください。

- 例：自分で撮った写真を使う場合 → `images/hero.jpg` を置き、`src="images/hero.jpg"` にして `srcset` と `sizes` の行を削除
- 写真は枠に合わせて自動で切り抜かれます。被写体は中央付近にあると安心です。
- `alt="..."`（画像の説明文）も写真の内容に合わせて書き換えてください。

| 場所 | 枠の縦横比 | 推奨サイズの目安 |
|---|---|---|
| メインビジュアル、Our Story | 4:5（縦長） | 1200×1500px |
| Signature | 1:1（スマホでは 4:3） | 1200×1200px |
| Menu の各カテゴリー | パソコンでは縦長、スマホでは横長 | 1200×1500px |
| Instagram欄 | 1:1 | 800×800px |

---

## 地図について

Googleマップを埋め込み、**広島市中区周辺のエリア**を表示しています（APIキー不要の埋め込み方式）。
Googleマップには実在の場所しか表示できないため、特定のお店を指さない「中区」のエリア表示にし、「DEMO MAP」と注記を入れています。
実際の店舗が決まったら、Googleマップでお店を検索 →「共有」→「地図を埋め込む」で出てくるコードの `src` に差し替えてください。

---

## デモ用の要素と、本番公開時にやること

| 項目 | 現在（デモ） | 本番公開時 |
|---|---|---|
| 店舗名「〇〇」 | 仮の名前 | 正式な店名に置き換え（`index.html` 内を「〇〇」で検索） |
| 住所 | 「広島県広島市中区〇〇」＋「デモ用の架空住所」表示 | 正式な住所に置き換え、デモ表示を削除 |
| 地図 | Googleマップで広島市中区周辺を表示＋「DEMO MAP」表示 | 店舗の埋め込みコードに差し替え、デモ表示を削除 |
| Instagram投稿欄 | 投稿が並ぶイメージ（Unsplashの写真）＋「DEMO」表示 | 公式の埋め込み、または実際の投稿画像に差し替え |
| フッターの注記 | 「このサイトはデモ用に制作したサンプルです…写真：Unsplash」 | デモの文言を削除（写真のクレジットは任意） |
| 検索エンジン | `noindex` 設定で検索結果に出ないようにしている | `<meta name="robots" ...>` の行を削除 |
| ロゴ | 仮のロゴマーク（山並み＋柑橘の太陽） | 正式なロゴに差し替え |

---

## メニューについての補足

- 掲載内容は、いただいた原稿のとおりです（価格は掲載していません）。
- 次の6品は原稿に説明文がなかったため、**AIが作成した仮案**の説明文を入れています（`index.html` 内に「仮案」とコメントあり）。公開前に内容をご確認ください。
  - カフェラテ / カプチーノ：なめらかなミルクのカフェラテと、ふんわりとした泡のカプチーノ。お好みでどうぞ。
  - バニララテ / キャラメルラテ：バニラやキャラメルのやさしい甘さを重ねた、ほっとする味わいのラテ。
  - 自家製クラフトレモネード：お店で仕込むシロップでつくる、すっきり爽やかなレモネード。
  - 本日のマフィン：日替わりで焼き上げるマフィン。その日の味は店頭でお確かめください。
  - アボカド＆エッグ トースト：香ばしく焼いたトーストに、アボカドとたまごをのせたブランチの定番。
  - B.L.T. クロワッサンサンド：ベーコン・レタス・トマトをクロワッサンではさんだ、食べごたえのあるサンド。

---

## 使用している技術など

- HTML / CSS / JavaScript（ライブラリなし）
- 写真：Unsplash（直接読み込み）／地図：Googleマップ埋め込み
- フォント：Google Fonts（Fraunces、Shippori Mincho、Zen Kaku Gothic New、Caveat）
  - インターネットに接続していないときは、パソコンに入っている代わりのフォントで表示されます。
- 対応：スマートフォン・タブレット・パソコン。動きを減らす設定（視差効果を減らす）をしている端末では、アニメーションを控えめにします。
