import axios from "axios";
import dotenv from "dotenv";
import prisma from "../utils/prismaClient.js";
import userService from "../services/userService.js";
dotenv.config();

const createFestival = async () => {
  try {
    const response = await axios.get(process.env.DATA_SERVICE_URL);
    const festivalData = response.data.response.body.items.item;

    for (const festival of festivalData) {
      const { contentid, firstimage } = festival;
      const festivalCode = parseInt(contentid);
      const festivalData = await prisma.festival.upsert({
        where: { festivalCode },
        update: {
          mapImage: firstimage,
        },
        create: {
          festivalCode,
          mapImage: firstimage,
        },
      });

      await userService.createNormalUser({
        userName: contentid,
        password: process.env.COMMON_PASSWORD,
        festivalId: festivalData.id,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

createFestival();
