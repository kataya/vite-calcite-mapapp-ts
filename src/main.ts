// Calcite-components
import '@esri/calcite-components/dist/components/calcite-loader';
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-rating";
// import { CalciteAction } from "@esri/calcite-components/dist/components/calcite-action";
// import { CalcitePanel } from "@esri/calcite-components/dist/components/calcite-panel";
// import { CalciteRating } from "@esri/calcite-components/dist/components/calcite-rating";

import '@esri/calcite-components/dist/calcite/calcite.css';
import { setAssetPath } from '@esri/calcite-components/dist/components';
// Local assets
setAssetPath(location.href);

// ArcGIS Maps SDK for JavaScript
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LayerList from "@arcgis/core//widgets/LayerList";
import Legend from "@arcgis/core//widgets/Legend";
import Print from "@arcgis/core//widgets/Print";

// set style.css
import './style.css'

// import module
import { initCustomBasemaps } from "./basemaps";

async function loadMap() {

    // map app main
    //const webmapId = new URLSearchParams(window.location.search).get("webmap") ?? "210c5b77056846808c7a5ce93920be81";
    const webmapId = new URLSearchParams(window.location.search).get("webmap") ?? "197ed6474b0547b599091a46a8dc1077"; //はじめてのWeb マッピングアプリ開発2021
    const map = new WebMap({
        portalItem: {
            id: webmapId
        }
    });

    const view = new MapView({
        map,
        container: "viewDiv",
        padding: {
        left: 49
        }
    });
    view.ui.move("zoom", "top-left");

    // CustomBasemapGallery を使うように変更
    // const basemaps = new BasemapGallery({
    //     view,
    //     container: "basemaps-container",
    // });
    initCustomBasemaps( view );

    const bookmarks = new Bookmarks({
        view,
        container: "bookmarks-container"
    });

    const layerList = new LayerList({
        view,
        selectionEnabled: true,
        container: "layers-container"
    });

    const legend = new Legend({
        view,
        container: "legend-container"
    });

    const print = new Print({
        view,
        container: "print-container"
    });

    map.when(() => {
        const { title, description, thumbnailUrl, avgRating } = map.portalItem;
        (document.querySelector("#header-title") as HTMLElement).textContent = title;
        (document.querySelector("#item-description") as HTMLElement).innerHTML = description;
        (document.querySelector("#item-thumbnail") as HTMLImageElement).src = thumbnailUrl;
        (document.querySelector("#item-rating") as HTMLCalciteRatingElement).value = avgRating;

        let activeWidget:string ;

        const handleActionBarClick = (event :MouseEvent) => { //({ target }) => {
            const target = event.target as HTMLElement;
            if (target.tagName !== "CALCITE-ACTION") {
                return;
            }

            if (activeWidget) {
                (document.querySelector(`[data-action-id=${activeWidget}]`) as HTMLCalciteActionElement).active = false;
                (document.querySelector(`[data-panel-id=${activeWidget}]`) as HTMLCalcitePanelElement).hidden = true;
            }

            const nextWidget = target.dataset.actionId;
            if (nextWidget !== activeWidget) {
                (document.querySelector(`[data-action-id=${nextWidget}]`) as HTMLCalciteActionElement).active = true;
                (document.querySelector(`[data-panel-id=${nextWidget}]`) as HTMLCalcitePanelElement).hidden = false;
                activeWidget = nextWidget as string;
            } else {
                //activeWidget = null;
                activeWidget = "";
            }
        };

        document.querySelector("calcite-action-bar")!.addEventListener("click", handleActionBarClick);

        let actionBarExpanded = false;
        document.addEventListener("calciteActionBarToggle", () => {
            actionBarExpanded = !actionBarExpanded;
            view.padding = {
                left: actionBarExpanded ? 150 : 49
            };
        });

        document.querySelector("calcite-shell")!.hidden = false;
        
        //document.querySelector("calcite-loader")!.hidden = true;

    });

    //calcite-loader はWebMap 読込終了時に非表示設定に変更
    // map.loadAll()
    //     .then(() => {
    //         document.querySelector("calcite-loader")!.hidden = true;
    //     });
    return map.loadAll().then();

}

// calcite-components-examples - vite を参考にして loader はコードで追加にし、htmlでの定義はコメントアウト
// https://github.com/Esri/calcite-components-examples/blob/master/vite/main.js
const loader = document.createElement('calcite-loader');
document.body.appendChild(loader);
loader.text = "loading ...";

const webmap = await loadMap();

//calcite-loader はWebMap 読込終了時に非表示設定に変更
document.querySelector("calcite-loader")!.hidden = true;
