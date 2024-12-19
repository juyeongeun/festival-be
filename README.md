# **🎉🎪 Festival**
> 전국 축제를 한눈에! 편리하게 즐기는 축제 플랫폼

[📄 팀 협업 노션 링크](https://bubble-city-3ac.notion.site/45d0984c93d146ebad41f9d4c835a0eb?v=d38586371d5d47e8bba3ee1ec029b278&pvs=4)

# **👥 Festival_BE**
### **👨‍👩‍👧 팀원 구성**
<div align="center">
  <table height="250px" width="100%">
    <tbody>
      <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/377290ba-16b8-4a5b-b70f-4527ec8a6edc" width="150px;" height=180px" alt="김민수"/><br />
          <b>BE 팀원: 김민수</b><br />
          <sub><a href="https://github.com/Minsugar98">GitHub 프로필</a></sub>
        </td>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/ddbd4893-8917-46bd-b4f1-44bfd2c7ac9c" width="150px;" height="180px;" alt="주영은"/><br />
          <b>BE 팀원: 주영은</b><br />
          <sub><a href="https://github.com/juyeongeun">GitHub 프로필</a></sub>
        </td>
      </tr>
    </tbody>
  </table>
</div>

---

# **🌟 프로젝트 소개**

>전국의 다채로운 축제 정보를 한눈에 볼 수 있는 원스톱 축제 플랫폼입니다.
>
>축제를 즐기고 싶은 사람들이 긴 대기 시간 없이 손쉽게 부스를 예약하고, 효율적으로 축제를 즐길 수 있도록 도와드립니다.
>
>지역 축제의 활성화와 방문객들의 편의성 향상을 위해 개발하였습니다.

이 웹 서비스는 다음과 같은 기능을 제공합니다:

- 부스 탐색: 먹거리, 체험, 굿즈 등 다양한 부스를 간편하게 검색 가능.
- 간편 결제: 빠르고 쉬운 예약 및 주문으로 긴 대기 시간을 없앰.
- 리뷰 및 게시판: 축제 경험을 공유하고 다른 사용자와 소통할 수 있는 커뮤니티 제공.
- 실시간 알림: 축제 정보, 이벤트, 부스 현황에 대한 알림을 즉시 수신 가능.
Festival Companion과 함께 기다림 없는 축제와 다양한 정보를 경험하세요! 🎊

### **🗓 프로젝트 기간**

📅 2024.10.30 ~ 2024.12.22

---

## **⚙ 기술 스택**

### Backend

<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/PrismaORM-2D3748?style=for-the-badge&logo=Prisma&logoColor=white">

### Database

<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white">

### ETC

<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"> <img src="https://img.shields.io/badge/awsS3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

---

## **🧑‍💻 백엔드 팀원별 구현 기능 상세**
- 김민수
  - Festival
  - Review
  - Notification
  - Menu
  - Botice
  - Board
- 주영은
  - Wishlist
  - Participation
  - Pay
  - Comment
  - Booth
  - User
  - Socket.io
 
## **🚀 주요 기능**
- 부스 탐색 기능
  - 축제의 다양한 부스를 쉽고 빠르게 탐색

- 간편 결제 시스템
  - 몇 번의 클릭만으로 먹거리 부스 예약 및 결제가 가능

- 커뮤니티 소통
  - 리뷰를 남기고 게시판을 통해 분실물 찾기 또는 축제 경험을 공유

- 실시간 정보 알림
  - 이벤트 소식, 게시글 댓글 알림 등 해당 축제의 정보를 실시간으로 확인
 
## **📂 프로젝트 구조**
<details>
  <summary>폴더 구조 보기</summary>
<pre>
📦festival-be
 ┣ 📂config
 ┃ ┣ 📜cookieConfig.js
 ┃ ┗ 📜passportConfig.js
 ┣ 📂controllers
 ┃ ┣ 📜boardController.js
 ┃ ┣ 📜boothController.js
 ┃ ┣ 📜commentController.js
 ┃ ┣ 📜festivalController.js
 ┃ ┣ 📜menuController.js
 ┃ ┣ 📜noticeController.js
 ┃ ┣ 📜notificationController.js
 ┃ ┣ 📜participationController.js
 ┃ ┣ 📜payController.js
 ┃ ┣ 📜reviewController.js
 ┃ ┣ 📜userController.js
 ┃ ┗ 📜wishlistController.js
 ┣ 📂middleware
 ┃ ┣ 📂booth
 ┃ ┃ ┗ 📜boothValidation.js
 ┃ ┣ 📂error
 ┃ ┃ ┣ 📜asyncHandler.js
 ┃ ┃ ┗ 📜errorHandler.js
 ┃ ┗ 📂passport
 ┃ ┃ ┗ 📜jwtToken.js
 ┣ 📂prisma
 ┃ ┣ 📂migrations
 ┃ ┃ ┣ 📂20241210120852_review
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┗ 📜migration_lock.toml
 ┃ ┣ 📜schema.prisma
 ┃ ┗ 📜seed.js
 ┣ 📂repositorys
 ┃ ┣ 📜boardRepository.js
 ┃ ┣ 📜boothRepository.js
 ┃ ┣ 📜commentRepository.js
 ┃ ┣ 📜festivalRepository.js
 ┃ ┣ 📜menuRepository.js
 ┃ ┣ 📜noticeRepository.js
 ┃ ┣ 📜notificationRepository.js
 ┃ ┣ 📜participationRepository.js
 ┃ ┣ 📜payRepository.js
 ┃ ┣ 📜reviewRepository.js
 ┃ ┣ 📜userRepository.js
 ┃ ┗ 📜wishlistRepository.js
 ┣ 📂router
 ┃ ┣ 📜boardRouter.js
 ┃ ┣ 📜boothRouter.js
 ┃ ┣ 📜commentRouter.js
 ┃ ┣ 📜festivalRouter.js
 ┃ ┣ 📜menuRouter.js
 ┃ ┣ 📜noticeRouter.js
 ┃ ┣ 📜notificationRouter.js
 ┃ ┣ 📜participationRouter.js
 ┃ ┣ 📜payRouter.js
 ┃ ┣ 📜reviewRouter.js
 ┃ ┣ 📜userRouter.js
 ┃ ┗ 📜wishlistRouter.js
 ┣ 📂scheduler
 ┃ ┗ 📜festivalCreate.js
 ┣ 📂services
 ┃ ┣ 📜boardService.js
 ┃ ┣ 📜boothService.js
 ┃ ┣ 📜commentService.js
 ┃ ┣ 📜festivalService.js
 ┃ ┣ 📜menuService.js
 ┃ ┣ 📜noticeService.js
 ┃ ┣ 📜notificationService.js
 ┃ ┣ 📜participationService.js
 ┃ ┣ 📜payService.js
 ┃ ┣ 📜reviewService.js
 ┃ ┣ 📜userService.js
 ┃ ┗ 📜wishlistService.js
 ┣ 📂utils
 ┃ ┣ 📜checkUser.js
 ┃ ┗ 📜prismaClient.js
 ┣ 📜README.md
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┣ 📜package.json  
</pre>
</details>

## **🔗 링크**
- [📄 시연 링크](곧 공개 예정)
- [GitHub Repositiory](https://github.com/festival-infomation)
