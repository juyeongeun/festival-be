import prisma from "../utils/prismaClient.js";

const deleteReview = async (reviewId) => {
  const data = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
  return data;
};

const createReview = async (userId, boothId, content, score) => {
  const data = await prisma.review.create({
    data: {
      userId: userId,
      boothId: boothId,
      content: content,
      score: score,
    },
  });
  return data;
};

const getReview = async (boothId, page, pageSize, orderBy, keyword) => {
  const data = await prisma.review.findMany({
    where: {
      boothId: boothId,
      OR: [
        {
          user: {
            nickname: { contains: keyword },
          },
        },
        {
          user: {
            userName: { contains: keyword },
          },
        },
      ],
    },
    include: {
      user: {
        select: {
          userName: true,
          nickname: true,
        },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: orderBy === "recent" ? "desc" : "asc",
    },
  });
  return data;
};

export default { createReview, getReview, deleteReview };
