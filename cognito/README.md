# AWS-Cognito

각 어플리케이션에서 인증, 권한 부여, 사용자 관리 등을 제공해준다.
써보고 느낀점은 데이터 마이그레이션도 쉽고 구현도 간편하지만 단점으로는 가격이 비싸다(월별 활성 `MAU`를 기준으로 가격 책정). [cognito 요금](https://aws.amazon.com/ko/cognito/pricing/)

이벤트 용도의 프로젝트로 빠르게 오픈하고 다시 내리는 형태로 쓰는게 베스트인거 같다.

---

## 설치 방법

`auth-server` -> `resource-server` 순서로 설치를 진행하면 된다.

기본적으로 `aws credentials`는 셋팅되었고, 소스도 다운로드 받았다는 가정하에 진행

### auth-server 배포

```sh
$ cd auth-server
$ yarn app.deploy
```

### resource-server 배포

resource서버에서 auth서버 측에서 생성한 `cognito` 물리적 주소가 필요하다. 이걸 알아낸 후 `.env`을 수정 후 배포해야한다.
cloud formation 설정에서 export value, import value 잘 쓰면 해결 될꺼 같은데 차후에 작업 예정

1. `aws` 사이트 접근
2. `CloudFormation` 접근
3. 스택 -> `cognito-v1` 클릭 -> 출력 클릭
4. `CognitoUserPoolID` 값을 `.env`파일의 `COGNITO_USER_POOL_ID` 값에 입력
5. `CognitoUserPoolARN` 값을 `.env`파일의 `COGNITO_ARN` 값에 입력

```sh
$ cd resource-server
$ yarn app.deploy
```

### trigger 연결

~~먼저 `serverless.yml` 설정파일을 통해 trigger 연결을 하려고 시도해봤지만 연동이 계속 실패하여서 일단 수동으로 trigger 연결~~
~~`cognito`->`${stage}-auth-user-pool`->`일반 설정`->`트리거`로 이동~~
~~`사용자 마이그레이션` 섹션에서 Lambda 함수 `cognito-${stage}-migration`를 연결~~

연결함

## API

위 스크립트 그대로 사용했으면 `stage`값은 `v1`이 되고, `domain`값은 배포 시 출력 되는 값 확인

### auth-server

- POST /{stage}/api/user -> 회원가입
  - email, name, password 필수
- POST /{stage}/api/user/signin -> 로그인(`access token`, `refresh token`, `id token`값 반환)
  - email, password 필수
- GET /{stage}/api/user/signout -> 로그아웃
  - 요청 해더에 `access token`이 존재해야함
- GET /{stage}/api/user/me -> 내 정보 보기(`jwt 토큰 기반`)
  - 요청 해더에 `access token`이 존재해야함

### resource-server

- GET /{stage}/api/users/me -> 토큰값으로 요청한 사용자 정보를 파싱하여 반환
  - 요청 헤더에 `id token`값이 존재해야함
