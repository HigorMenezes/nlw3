import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

const OrphanagesController = {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return response.json(orphanages);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(orphanages);
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

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      openingHours,
      openOnWeekends,
      images,
    });

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};

export default OrphanagesController;
