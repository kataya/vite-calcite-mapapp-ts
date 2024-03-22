//LocalBasemapsSource を使った Custom BasemapGallery(地理院タイルを含む)
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Basemap from "@arcgis/core/Basemap";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import PortalItem from "@arcgis/core/portal/PortalItem";
import MapView from "@arcgis/core/views/MapView";

import { BASEMAPS } from "./config";

//private function
function createLocalBasemapsSource() {

    // esri japan の basemap
    const esriJaTopoV = new Basemap({
        portalItem: new PortalItem({ id: BASEMAPS.ja_topo_vector_id })
    });
    const esriJaStreetV = new Basemap({
        portalItem: new PortalItem({ id: BASEMAPS.ja_street_vector_id })
    });
    const esriJaCanvasgrayV = new Basemap({
        portalItem: new PortalItem({ id: BASEMAPS.ja_canvasgray_id })
    });
    const esriJaCanvaslightgrayV = new Basemap({
        portalItem: new PortalItem({ id: BASEMAPS.ja_canvaslightgray_id })
    });
    const esriJaTopocontourV = new Basemap({
        portalItem: new PortalItem({ id: BASEMAPS.ja_topo_contour_vector_id })
    });
    const esriJaHybrid = new Basemap({ 
        portalItem: new PortalItem({ id: BASEMAPS.ja_hybrid })
    });

    // 地理院タイル
    // 地理院 - 標準地図 ※今回は使わないが定義だけしておく
    // const stdMap = new Basemap({
    //     baseLayers:[new WebTileLayer({
    //       urlTemplate: "https://cyberjapandata.gsi.go.jp/xyz/std/{level}/{col}/{row}.png",
    //       copyright: "地理院タイル",
    //     })],
    //     title: "地理院タイル - 標準地図",
    //     id: "stdmap",
    //     thumbnailUrl: "https://cyberjapandata.gsi.go.jp/xyz/std/12/3637/1612.png"
    // });
    
    // 地理院 - 淡色地図
    const paleMap = new Basemap({
        baseLayers:[new WebTileLayer({
          urlTemplate: "https://cyberjapandata.gsi.go.jp/xyz/pale/{level}/{col}/{row}.png",
          copyright: "地理院タイル"
        })],
        title: "地理院タイル - 淡色地図",
        id: "palemap",
        thumbnailUrl: "https://cyberjapandata.gsi.go.jp/xyz/pale/12/3637/1612.png"
    });
    
    // 地理院 - 写真
    const seamlessPhoto = new Basemap({
        baseLayers:[new WebTileLayer({
          urlTemplate: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{level}/{col}/{row}.jpg",
          copyright: "地理院タイル"
        })],
        title: "地理院タイル - 写真",
        id: "seamlessphoto",
        thumbnailUrl:"https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/16/58274/25716.jpg"
    });
    
    const localSource = new LocalBasemapsSource({
        basemaps: [
            esriJaTopoV ,esriJaStreetV, esriJaCanvasgrayV,
            esriJaCanvaslightgrayV, esriJaTopocontourV, esriJaHybrid,
            paleMap, seamlessPhoto
        ]
    });
    return localSource;
}

export function initCustomBasemaps( view:MapView ) {
    const basemapGallery = new BasemapGallery({
        view: view,
        container: document.getElementById("basemaps-container") as HTMLElement,
        source: createLocalBasemapsSource() ,
    });
}