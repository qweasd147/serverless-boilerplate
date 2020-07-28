const errors = Object.freeze({
  UsernameExistsException: {
    status: 400,
    message: "중복된 이메일이 존재",
  },
  NotAuthorizedException: {
    status: 404,
    message: "인증 정보를 찾을 수 없음",
  },
  UserNotFoundException: {
    status: 404,
    message: "사용자를 찾을 수 없음",
  },
});

export default errors;
