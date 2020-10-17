import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer } from "react-leaflet";
import MapMarker from "../../assets/map-marker.svg";
import appConfig from "../../configs/appConfig";

import "./styles.css";
import "leaflet/dist/leaflet.css";

function OrphanagesMap(): React.ReactElement {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
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
      </Map>
      <Link to="/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
