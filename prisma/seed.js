import prisma from "../utils/prismaClient.js";

const user = [
  {
    userName: "admin",
    password: "12341234",
    nickname: "admin",
    provider: "NAVER",
    role: "ADMIN",
    refreshToken: "refreshToken",
  },
  {
    userName: "user",
    nickname: "user",
    provider: "KAKAO",
    role: "USER",
    refreshToken: "refreshToken",
  },
  {
    userName: "seller",
    nickname: "seller",
    provider: "GOOGLE",
    role: "SELLER",
    refreshToken: "refreshToken",
  },
];

const booth = [
  {
    festivalId: 1,
    userId: 2,
    name: "교촌",
    content: "교촌",
    boothType: "EAT",
    accept: "WAITING",
    accountNumber: "1234-1234-1234-1234",
    bankName: "KB",
  },
  {
    festivalId: 1,
    userId: 3,
    name: "기영이숯불두마리",
    content: "기영이숯불두마리",
    boothType: "EAT",
    accept: "WAITING",
    accountNumber: "4132-1234-1234-1234",
    bankName: "KB",
  },
  {
    festivalId: 2,
    userId: 2,
    name: "화룡치킨",
    content: "화룡치킨",
    boothType: "EAT",
    accept: "WAITING",
    accountNumber: "4132-1234-1234-1234",
    bankName: "KB",
  },
  {
    festivalId: 2,
    userId: 3,
    name: "불로만치킨바베큐",
    content: "불로만치킨바베큐",
    boothType: "EAT",
    accept: "WAITING",
    accountNumber: "4132-1234-1234-1234",
    bankName: "KB",
  },
];

const menu = [
  {
    boothId: 2,
    name: "순살 반반",
    price: 19000,
    soldOut: false,
  },
  {
    boothId: 2,
    name: "두마리",
    price: 21000,
    soldOut: false,
  },
  {
    boothId: 2,
    name: "앙념",
    price: 22000,
    soldOut: false,
  },
  {
    boothId: 2,
    name: "꿀조합",
    price: 23000,
    soldOut: false,
  },
  {
    boothId: 4,
    name: "한식바베큐",
    price: 17000,
    soldOut: false,
  },
  {
    boothId: 4,
    name: "양식바베큐",
    price: 17000,
    soldOut: false,
  },
  {
    boothId: 4,
    name: "한식반 + 소금반",
    price: 19000,
    soldOut: false,
  },
  {
    boothId: 4,
    name: "한식반 + 양식반",
    price: 19000,
    soldOut: false,
  },
];

const wishList = [
  {
    menuId: 1,
    userId: 2,
    boothId: 2,
    cnt: 1,
    price: 19000,
  },
  {
    menuId: 4,
    userId: 2,
    boothId: 2,
    cnt: 1,
    price: 23000,
  },
  {
    menuId: 7,
    userId: 2,
    boothId: 2,
    cnt: 1,
    price: 19000,
  },
  {
    menuId: 8,
    userId: 2,
    boothId: 2,
    cnt: 1,
    price: 19000,
  },
];

const festival = [
  {
    festivalCode: 1234,
  },
  {
    festivalCode: 1235,
  },
];

const participation = [
  {
    userId: 1,
    festivalId: 1,
  },
  {
    userId: 2,
    festivalId: 1,
  },
  {
    userId: 3,
    festivalId: 1,
  },
  {
    userId: 1,
    festivalId: 2,
  },
  {
    userId: 2,
    festivalId: 2,
  },
  {
    userId: 3,
    festivalId: 2,
  },
];

const notification = [
  {
    participationId: 1,
    userId: 1,
    content: "Hello",
    read: true,
  },
  {
    participationId: 2,
    userId: 2,
    content: "World",
    read: false,
  },
  {
    participationId: 3,
    userId: 3,
    content: "Festival is coming!",
    read: false,
  },
  {
    participationId: 4,
    userId: 1,
    content: "Festival is over!",
    read: false,
  },
  {
    participationId: 5,
    userId: 2,
    content: "Festival is going on!",
    read: true,
  },
  {
    participationId: 6,
    userId: 3,
    content: "Festival is going on!",
    read: true,
  },
];

const board = [
  {
    userId: 1,
    festivalId: 1,
    title: "Festival Board 1",
    images: ["asdfds", "fdsasdf"],
    content: "Hello, this is board 1",
    boardType: "BOARD",
    lossType: "NULL",
  },
  {
    userId: 2,
    festivalId: 1,
    title: "Festival Board 2",
    content: "Hello, this is board 2",
    boardType: "LOSS",
    lossType: "LOSS",
  },
  {
    userId: 3,
    festivalId: 1,
    title: "Festival Board 3",
    content: "Hello, this is board 3",
    boardType: "LOSS",
    lossType: "GET",
  },
  {
    userId: 1,
    festivalId: 2,
    title: "Festival Board 4",
    content: "Hello, this is board 4",
    boardType: "LOSS",
    lossType: "GET",
  },
  {
    userId: 2,
    festivalId: 2,
    title: "Festival Board 5",
    images: ["asdfds", "fdsasdf"],
    content: "Hello, this is board 5",
    boardType: "BOARD",
    lossType: "NULL",
  },
  {
    userId: 3,
    festivalId: 2,
    title: "Festival Board 6",
    content: "Hello, this is board 6",
    images: ["asdfds", "fdsasdf"],
    boardType: "LOSS",
    lossType: "LOSS",
  },
];

const comment = [
  {
    userId: 1,
    boardId: 1,
    content: "This is comment 1",
  },
  {
    userId: 2,
    boardId: 1,
    content: "This is comment 2",
  },
  {
    userId: 3,
    boardId: 2,
    content: "This is comment 3",
  },
  {
    userId: 1,
    boardId: 2,
    content: "This is comment 4",
  },
  {
    userId: 2,
    boardId: 2,
    content: "This is comment 5",
  },
  {
    userId: 3,
    boardId: 3,
    content: "This is comment 6",
  },
  {
    userId: 1,
    boardId: 3,
    content: "This is comment 7",
  },
  {
    userId: 2,
    boardId: 4,
    content: "This is comment 8",
  },
  {
    userId: 3,
    boardId: 5,
    content: "This is comment 9",
  },
];

const notice = [
  {
    adminId: 1,
    festivalId: 1,
    content: "Admin notice 1",
  },
  {
    adminId: 1,
    festivalId: 1,
    content: "Admin notice 2",
  },
  {
    adminId: 1,
    festivalId: 1,
    content: "Admin notice 3",
  },
  {
    adminId: 1,
    festivalId: 2,
    content: "Admin notice 4",
  },
  {
    adminId: 1,
    festivalId: 2,
    content: "Admin notice 5",
  },
];

const review = [
  {
    userId: 2,
    boothId: 2,
    content: "Festival review 1",
    score: 4,
  },
  {
    userId: 2,
    boothId: 4,
    content: "Festival review 2",
    score: 3,
  },
  {
    userId: 3,
    boothId: 2,
    content: "Festival review 3",
    score: 5,
  },
  {
    userId: 3,
    boothId: 4,
    content: "Festival review 4",
    score: 5,
  },
];

async function main() {
  try {
    await prisma.notification.deleteMany();
    await prisma.notice.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.board.deleteMany();
    await prisma.review.deleteMany();
    await prisma.wishList.deleteMany();
    await prisma.menu.deleteMany();
    await prisma.booth.deleteMany();
    await prisma.participation.deleteMany();
    await prisma.pay.deleteMany();
    await prisma.user.deleteMany();
    await prisma.festival.deleteMany();

    await prisma.festival.createMany({ data: festival });
    await prisma.user.createMany({ data: user });
    await prisma.participation.createMany({ data: participation });
    await prisma.booth.createMany({ data: booth });
    await prisma.menu.createMany({ data: menu });
    await prisma.wishList.createMany({ data: wishList });
    await prisma.review.createMany({ data: review });
    await prisma.board.createMany({ data: board });
    await prisma.comment.createMany({ data: comment });
    await prisma.notice.createMany({ data: notice });
    await prisma.notification.createMany({ data: notification });
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

main();
