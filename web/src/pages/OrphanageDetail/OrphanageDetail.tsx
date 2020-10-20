import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import appConfig from "../../configs/appConfig";
import mapIcon from "../../utils/mapIcon";

import "./styles.css";

interface Image {
  id: number;
  url: string;
}

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  openingHours: string;
  openOnWeekends: boolean;
  images: Image[];
}

interface OrphanageParams {
  id: string;
}

function OrphanageDetail(): React.ReactElement {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const params = useParams<OrphanageParams>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response?.data ?? []);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, imageIndex) => (
              <button
                key={image.id}
                className={activeImageIndex === imageIndex ? "active" : ""}
                type="button"
                onClick={() => setActiveImageIndex(imageIndex)}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                {appConfig.mapboxToken ? (
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${appConfig.mapboxToken}`}
                  />
                ) : (
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                )}
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_bland"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta
                <br />
                {orphanage.openingHours}
              </div>
              {orphanage.openOnWeekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos
                  <br />
                  fim de semana
                </div>
              ) : (
                <div className="do-not-open-on-weekends">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos
                  <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrphanageDetail;
