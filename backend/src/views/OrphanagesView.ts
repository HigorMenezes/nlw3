import Orphanage from "../models/Orphanage";
import ImagesView from "./ImagesView";

const OrphanagesView = {
  render(orphanage: Orphanage) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      openingHours,
      openOnWeekends,
      images,
    } = orphanage;

    return {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      openingHours,
      openOnWeekends,
      images: ImagesView.renderMany(images),
    };
  },
  renderMany(orphanages: Orphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};

export default OrphanagesView;
