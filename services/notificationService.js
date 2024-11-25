import participationRepository from "../repositorys/participationRepository.js";
import notificationRepository from "../repositorys/notificationRepository.js";
import boardRepository from "../repositorys/boardRepository.js";

const getIdNotification = async (userId, notificationId) => {
  const data = await notificationRepository.getIdNotification(
    userId,
    notificationId
  );
  if (!data) {
    throw new Error("알림이 존재하지 않습니다.");
  }
  return data;
};
const getNotification = async (userId) => {
  const data = await notificationRepository.getNotification(userId);
  return data;
};
const patchNotification = async (userId, notificationId) => {
  const data = await notificationRepository.patchNotification(
    userId,
    notificationId
  );
  if (!data) {
    throw new Error("알림이 존재하지 않습니다.");
  }
  return data;
};
// const createNoticeNotification = async (userRole, festivalId, content) => {
//   if (userRole !== "ADMIN") {
//     throw new Error("관리자가 아닙니다.");
//   }
//   const userList = await participationRepository.participationManyCheck(
//     festivalId
//   );

//   const data = await Promise.all(
//     userList.map(async (user) => {
//       await notificationRepository.createNoticeNotification(
//         user.userId,
//         content
//       );
//     })
//   );
//   return data;
// };

// const createCommentNotification = async (
//   userId,
//   festivalId,
//   boardId,
//   nickname
// ) => {
//   const userCheck = await participationRepository.participationCheck(
//     userId,
//     festivalId
//   );
//   if (!userCheck) {
//     throw new Error("참여자가 아닙니다.");
//   }
//   const board = await boardRepository.getIdBoard(boardId);
//   if (!board) {
//     throw new Error("게시글 없습니다.");
//   }

//   const data = await notificationRepository.createCommentNotification(
//     board,
//     nickname
//   );
//   return data;
// };

export default {
  patchNotification,
  getNotification,
  getIdNotification,
};
