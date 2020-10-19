import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Orphanage from "../models/Orphanage";
import OrphanageView from "../views/OrphanagesView";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().required().max(300),
  instructions: Yup.string().required(),
  openingHours: Yup.string().required(),
  openOnWeekends: Yup.boolean().required(),
  images: Yup.array(
    Yup.object().shape({
      path: Yup.string().required(),
    }),
  ),
});

const OrphanagesController = {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return response.json(OrphanageView.renderMany(orphanages));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(OrphanageView.render(orphanages));
  },
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      openingHours,
      openOnWeekends,
    } = request.body;

    // eslint-disable-next-line no-undef
    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => ({ path: image.filename }));

    const orphanagesRepository = getRepository(Orphanage);

    const orphanageToCreate = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      openingHours,
      openOnWeekends,
      images,
    };

    await schema.validate(orphanageToCreate, { abortEarly: false });
    const orphanage = orphanagesRepository.create(orphanageToCreate);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};

export default OrphanagesController;
