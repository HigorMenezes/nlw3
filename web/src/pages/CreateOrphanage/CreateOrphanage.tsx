/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";
import appConfig from "../../configs/appConfig";
import mapIcon from "../../utils/mapIcon";

import "./styles.css";

interface Position {
  latitude: number;
  longitude: number;
}

interface Image {
  preview: string;
  imageBlob: Blob;
}

function CreateOrphanage(): React.ReactElement {
  const history = useHistory();

  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<Image[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));
    formData.append("about", about);
    formData.append("instructions", instructions);
    formData.append("openingHours", openingHours);
    formData.append("openOnWeekends", String(openOnWeekends));
    images.forEach((image) => {
      formData.append("images", image.imageBlob);
    });

    api.post("orphanages", formData).then(() => {
      // eslint-disable-next-line no-alert
      alert("Cadastro realizado com sucesso!");
      history.push("/app");
    });
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const imageFiles = Array.from(event.target.files);

      setImages(
        imageFiles.map((imageFile) => {
          return {
            preview: URL.createObjectURL(imageFile),
            imageBlob: imageFile,
          };
        }),
      );
    }
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.609179, -48.4698803]}
              zoom={11.05}
              style={{ width: "100%", height: 280 }}
              onClick={handleMapClick}
            >
              {appConfig.mapboxToken ? (
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${appConfig.mapboxToken}`}
                />
              ) : (
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              )}

              {position.latitude !== 0 || position.longitude !== 0 ? (
                <Marker
                  interac
                  tive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              ) : null}
            </Map>

            <div className="input-block">
              <label htmlFor="name">
                Nome
                <input
                  id="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </label>
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
                <textarea
                  id="name"
                  maxLength={300}
                  value={about}
                  onChange={(event) => {
                    setAbout(event.target.value);
                  }}
                />
              </label>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {images.map((image) => {
                  return <img src={image.preview} alt={name} />;
                })}

                <label htmlFor="image[]">
                  <div className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </div>
                  <input
                    multiple
                    onChange={handleSelectImage}
                    type="file"
                    id="image[]"
                  />
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">
                Instruções
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={(event) => {
                    setInstructions(event.target.value);
                  }}
                />
              </label>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">
                Horario de funcionamento
                <input
                  id="opening_hours"
                  value={openingHours}
                  onChange={(event) => {
                    setOpeningHours(event.target.value);
                  }}
                />
              </label>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

export default CreateOrphanage;
