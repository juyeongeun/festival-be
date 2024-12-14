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

const getReview = async (
  boothId,
  page,
  pageSize,
  orderBy,
  keyword,
  startDate,
  endDate,
  scoreOrder
) => {
  const whereCondition = {
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
  };

  // startDate와 endDate가 모두 있을 때만 날짜 조건 추가
  if (startDate && endDate) {
    // UTC 기준으로 변환
    const start = new Date(startDate);
    start.setUTCHours(0 - 9, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23 - 9, 59, 59, 999);

    whereCondition.createdAt = {
      gte: start,
      lte: end,
    };
  }

  if (boothId) {
    whereCondition.boothId = boothId;
  }

  const data = await prisma.review.findMany({
    where: whereCondition,
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
    orderBy: scoreOrder
      ? {
          score: scoreOrder === "high" ? "desc" : "asc",
        }
      : {
          createdAt: orderBy === "recent" ? "desc" : "asc",
        },
  });

  return data;
};

export default { createReview, getReview, deleteReview };
