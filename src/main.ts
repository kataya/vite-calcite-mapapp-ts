
import { setAssetPath } from '@esri/calcite-components/dist/components';
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-icon';
import '@esri/calcite-components/dist/components/calcite-date-picker';
import '@esri/calcite-components/dist/components/calcite-loader';
import '@esri/calcite-components/dist/calcite/calcite.css';
setAssetPath(location.href);

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";

import './style.css'

const loader = document.createElement('calcite-loader');
document.body.appendChild(loader);

const basemap = new Basemap({
  portalItem: {
      id: "accf3eff22254ed69e23afeb094a4881" //"street-vector"の日本語版
  }
});

const map = new Map({
  //basemap: "streets-vector",
  basemap: basemap,
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 8,
  center: [139.715512, 35.678257], // 皇居を中心にした周辺
  padding: { // calcite-action-bar 用にpadding を設定
      left:49
  }
});

view.when(() => {});