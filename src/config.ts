// 定数の定義をconfigにまとめる
const BASEMAPS = Object.freeze({
    ja_street_vector_id : "accf3eff22254ed69e23afeb094a4881", //"street-vector"の日本語版
    ja_canvasgray_id : "fb73573b374c47078fdf5a4498a7566a", //キャンバス（ダークグレー）"canvasgray-vector"の日本語版
    ja_canvaslightgray_id : "5197e41ded62497b835a7b82bbde8826", //キャンバス（ライトグレー）
    ja_topo_vector_id : "9e74c6647b6e41538fb3b2a4b7e90784", //"地形図"
    ja_topo_contour_vector_id : "4fa74006fda749d48e6bb33a8b249c5f", //"地形図(等高線)"
    //"bbf95c5b8bea4299bad94bc27f0d2c10", //ラベル付き衛星画像（非推奨）
    ja_hybrid : "c876a8e4c26b4909b897afde5e81dddf", //衛星画像ハイブリット
});

export {
    BASEMAPS,
}