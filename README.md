# vite-calcite-mapapp-ts

[Create a mapping app](https://developers.arcgis.com/calcite-design-system/tutorials/create-a-mapping-app/) のチュートリアルを、ArcGIS SDK for JavaScript  と Calcite components での「ESM」モジュールでのTypeScript を使ったアプリケーションの作成例です。

フロントエンドのビルドツールは、[vite js app](https://github.com/kataya/vite-jsapp) と同様に、Vite（ヴィート）を使ってVite のアプリ テンプレートで最初のひな形を作成し、[Create a mapping app] のコードをTypeScript でのビルドエラーにならないように、一部を書き換えしています。
また、`assets` のコピーには、rollup-plugin-copy を使っています (vite.config.ts に設定を記載してあります)。