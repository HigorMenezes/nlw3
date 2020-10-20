import React, { useEffect, useState } from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";
import MapMarker from "../../assets/map-marker.svg";
import appConfig from "../../configs/appConfig";

import "./styles.css";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap(): React.ReactElement {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response?.data ?? []);
    });
  }, []);
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

        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
