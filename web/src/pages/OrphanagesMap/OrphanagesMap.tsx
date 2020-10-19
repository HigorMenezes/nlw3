import React from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import MapMarker from "../../assets/map-marker.svg";
import appConfig from "../../configs/appConfig";

import "./styles.css";
import "leaflet/dist/leaflet.css";

const mapIcon = Leaflet.icon({
  iconUrl: MapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

function OrphanagesMap(): React.ReactElement {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :&#41;</p>
        </header>

        <footer>
          <strong>Florianópolis</strong>
          <span>Santa Cataria</span>
        </footer>
      </aside>
      <Map
        center={[-27.609179, -48.4698803]}
        zoom={11.05}
        style={{ width: "100%", height: "100%" }}
      >
        {appConfig.mapboxToken ? (
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${appConfig.mapboxToken}`}
          />
        ) : (
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        )}

        <Marker icon={mapIcon} position={[-27.609179, -48.4698803]}>
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            Lar das meninas
            <Link to="">
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
      </Map>
      <Link to="/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
