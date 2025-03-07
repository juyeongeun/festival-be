# **🎉🎪 잇잇(itEat)**
> 전국 축제를 한눈에! 편리하게 즐기는 축제 플랫폼

[📄 팀 협업 노션 링크](https://bubble-city-3ac.notion.site/45d0984c93d146ebad41f9d4c835a0eb?v=d38586371d5d47e8bba3ee1ec029b278&pvs=4)

# **👥 Festival_BE**
### **👨‍👩‍👧 팀원 구성**
<div align="center">
  <table height="250px" width="100%">
    <tbody>
      <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/bce92c0f-1948-42bf-b5ea-de410b250d3e" width="150px;" height=180px" alt="김민수"/><br />
          <b>BE 팀원: 김민수</b><br />
          <sub><a href="https://github.com/Minsugar98">GitHub 프로필</a></sub>
        </td>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/d891e028-511f-4d7e-a08b-d11a63e9826b" width="150px;" height="180px;" alt="주영은"/><br />
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

<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

---

## **🧑‍💻 구현 기능 상세**
    
- Wishlist CRUD
    - 하나의 부스만 결제될 수 있도록 장바구니에 상점id를 기준으로 여러 부스의 메뉴가 담기는 것을 방지
    - 로그인 한 사용자 중 해당 축제에 참여중인 사용자만 이용 가능하게 확인하는 로직 추가
    - 해당 부스의 메뉴들을 병렬 처리하기 위해 promise.all() 사용
- Participation CRUD
    - 해당 축제에 참여중인 사용자를 추가하기 위한 로직 구현
- Pay CRUD
    - 클라이언트에서 결제 완료 후 주문 번호 랜덤 부여
    - 부스 조회하기 편하게 정렬, 페이징, 카테고리 기능 제공
    - 선택적 결제가 가능하도록 promise.all()을 사용하여 결제 여부 수정
- Comment CRUD
    - 커뮤니티 탭에서 댓글 사용을 위한 CRUD 생성
    - 댓글을 달면 해당 게시글 작성자에게 실시간 알림 발송
    - 댓글 작성자만 댓글을 수정 및 삭제 할 수 있게 권한 체크
- Booth CRUD
    - 해당 축제에 부스를 등록 권한 요청시 대기하는 로직 생성
    - 관리자가 해당 축제의 상점 조회 시, 카테고리 별로 확인할 수 있게 쿼리 작성
    - 관리자가 권한을 요청한 상점을 확인 후 반려, 승인 부여
    - 사용자에게는 승인된 부스만 조회 가능하게 필터링
- User CRUD
    - 일반 사용자는 접근성이 편리한 SNS 로그인 도입 (Naver, Kakao, Google)
    - 로그인 시 AccessToken과 RefreshToken 생성하여 권한 부여 → 토큰에는 사용자 기본 정보 포함
    - Token 검증하는 미들웨어 구현
    - 관리자는 공공데이터 API로 추가한 축제가 생성될 때 축제 고유 번호와 지정 PW 지급
    - 관리자가 지급받은 PW 수정하기 위한 endPoint 제공
    - 모든 사용자의 정보와 관련되어 민감한 정보를 빼고 리스폰 전달
- [Socket.io](http://socket.io/)
    - 프론트엔드 url과 연결하여 Socket 통신
    - 댓글, 공지사항 작성시 축제에 참여하는 사용자 및 소유자에게 실시간 알림 발송
 
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
