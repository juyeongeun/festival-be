const boothValidation = async (req, res, next) => {
  try {
    const { name, content, boothType, typeCategory, accountNumber, bankName } =
      req.body;
    if (!name || !content || !boothType || !accountNumber || !bankName) {
      return res.status(400).send({ message: "필수 필드를 채워주세요." });
    }

    if (name.length > 15) {
      return res
        .status(400)
        .send({ message: "부스 이름은 15자 이하로 입력하세요." });
    }

    if (content.length < 10 || content.length > 30) {
      return res
        .status(400)
        .send({ message: "부스 설명은 10자 이상 30자 이하로 입력하세요." });
    }
    const validBoothTypes = ["EAT", "PLAY", "ETC"];
    if (!validBoothTypes.includes(boothType)) {
      return res
        .status(400)
        .send({ message: "부스 타입을 EAT, PLAY, ETC 중에서 선택하세요." });
    }

    if (typeCategory.length > 10) {
      return res
        .status(400)
        .send({ message: "부스타입의 카테고리는 10자 이하로 입력하세요." });
    }
  } catch (error) {
    next(error);
  }
};

export default boothValidation;
