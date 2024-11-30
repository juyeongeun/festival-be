import axios from "axios";
import dotenv from "dotenv";
import prisma from "../utils/prismaClient.js";
dotenv.config();

const createFestival = async () => {
  try {
    const response = await axios.get(process.env.DATA_SERVICE_URL);
    const festivalData = response.data.response.body.items.item;

    for (const festival of festivalData) {
      const {
        contentid,
        firstimage
      } = festival;
      const festivalCode = parseInt(contentid);
      await prisma.festival.upsert({
        where: { festivalCode },
        update: {
          mapImage: firstimage,
        },
        create: {
          festivalCode,
          mapImage: firstimage,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

createFestival();