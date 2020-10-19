import Orphanage from "../models/Orphanage";
import ImagesView from "./ImagesView";

const OrphanagesView = {
  render(orphanage: Orphanage) {
    const {
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
