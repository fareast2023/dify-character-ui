# リラくん：リライズテニスクラブ

ゆっくり揺れるキャラクターと、Difyにつながるチャット画面です。動きはCSSの揺れで、口の動き・音声機能はありません。

## 1. GitHubにアップロード
1. ZIPを右クリック →「すべて展開」。
2. 展開した rira-tennis-bot フォルダーを開きます。
3. GitHubの fareast2023/rira-tennis-bot → Add file → Upload files。
4. 中の public、netlify、netlify.toml、README.md をまとめてドラッグ。ZIP自体や外側のフォルダーではありません。
5. Commit changes を押します。既存READMEはこの説明に更新します。

## 2. Netlifyと接続
1. Netlifyで新しいプロジェクトを追加し、既存リポジトリのインポート → GitHubを選択。
2. rira-tennis-bot を選びます。見つからない場合はNetlifyのGitHub連携にこのリポジトリへのアクセスを許可。
3. 公開ブランチ main、Build commandは空欄、Publish directoryは public。設定はnetlify.tomlにも含まれています。
4. 既存のI-GAサイト timely-choux-22c6c5 とは別のプロジェクトにします。

## 3. Dify APIキーを設定
1. Difyの「リラくん」→ APIへのアクセス → APIキーをコピー。
2. Netlifyのこのプロジェクトの設定 → Environment variables（環境変数）→ 変数追加。
3. Keyに DIFY_API_KEY、Valueにコピーしたキーを貼り付けて保存。
4. 適用先が表示される場合はProduction、スコープを選べる場合はFunctionsを含めます。All scopesでも構いません。
5. Deploys画面から再デプロイ。キー変更後も再デプロイが必要です。
キーはGeminiのキーではなく、このDifyアプリのキーです。GitHub・HTML・チャットに貼らないでください。

## 4. 公開後の確認
公開URLで「練習はどこで、いつ？」を送信し、続けて「参加人数は？」を試します。スマートフォンでも確認してください。
- DIFY_API_KEY未設定：登録したプロジェクト、変数名、適用先、再デプロイを確認。
- 利用上限：Google側の無料枠やDify側の利用状況を確認。無料APIは無制限ではありません。
- 接続エラー：Difyの公開状態、アプリのAPIキー、モデル設定を確認。
- 会話エラー：「新しい会話」を押して再試行。

## 更新方法と留意点
GitHub上のファイルを変更・コミットすると、NetlifyのGit連携で再公開されます。静的ファイルのドロップ公開だけではなく、Git連携でFunctionsも配信します。
会話は画面内だけで保持し、再読込でリセット。ブラウザーの画面ごとに別の利用者IDを作成します。
質問はNetlify経由でDifyと設定済みモデルに送信されます。個人情報は入力しないでください。
GitHubがPrivateでも、公開したサイトはURLを知る人が利用できます。会員限定の認証・厳密な回数制限は未実装です。まず少人数で試してください。
最新日程やLINE・調整さんの読み取り、出欠登録機能はありません。
ローカルのファイルを直接開くだけではDify接続は動きません。Netlify公開後に確認します。
APIキーを使用した実接続テストは未実施です。
