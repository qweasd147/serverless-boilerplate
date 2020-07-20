# 로컬 셋팅

## 서버리스 프레임워크 설치

```sh
$ yarn global serverless
```

## aws credentials 셋팅

```sh
$ serverless config credentials --provider aws --key aws-access-key --secret aws-secret-key
```

`crentails`는 이미 로컬에 셋팅 되어 있으면 생략 가능

```sh
$ less ~/.aws/credentials
$ less ~/.aws/config
```

리전은 자유롭게(한국은 `ap-northeast-2`), output은 `json`

## 프로젝트 생성

```sh
$ sls create --template aws-nodejs --path service-pull-name
```

sls create --template aws-nodejs-typescript --path test123

혹시나 `ts`를 사용한다면 template을 `aws-nodejs` 대신 `aws-nodejs-typescript`을 써도 괜찮음

## npm init

aws에서 기본 제공해주는 sdk만 사용하면 상관없지만 그 이상의 sdk를 사용하고 싶을때 그냥 npm 사용

```sh
$ cd service-pull-name
$ npm init
```

# 기타 명령어

참고 사항으로 `serverless` 명령어로 타이핑 하기 귀찮으니까 기본적으로 `sls`로 줄여서 해도 상관없음 (`serverless` == `sls`)

## 바닐라로 사용중 특정 함수 사용하고 싶을때(로컬 환경에서 실행)

```sh
$ sls invoke -f 함수명 -l
```
