## 연관 플러그인

개발하면서 발견한 유용한 플러그인 등을 소개

### 1. 환경변수를 관리하고 싶을때

-> `serverless-dotenv-plugin`을 사용한다.
각 서비스 환경(dev, staging, product 등)별 환경변수를 관리하고 사용하고 싶을때 매우 유용하게 써먹을수 있다.

### 2. 요청에 대한 전처리 등이 필요할때

-> `aws-serverless-koa`또는 `aws-serverless-express`를 사용한다.

처음엔 그냥 람다 만들고 `API Gateway`로 연결해서 쓰면 됬지 뭐하라 사용하나 싶었는데 일단 이런 프레임워크를 쓰니까 `middleware`처리나 `router`를 활용할 수 있어서 편하다. 또 프레임 워크(`koa` or `express`)를 사용하지 않고 개발하다보면 파라미터 파싱하기도 귀찮고 lambda에 의존되는 코드(파라미터 가져오기, 응답값 내보내기 등)가 생기는데 이러한 부분을 프레임워크를 써서 처리해주니까 순수 nodejs만 개발한 사람은 lambda 레퍼런스 보는 시간이 줄어 든거 같다.

### 3. 로그를 남기고 싶을때

일반적으로 `Lambda`는 `console.log`같은걸 쓰면 알아서 `cloudwatch logs`에 남긴다. 근데 이게 개발하면서 디버깅용 로그를 사용할때가 분명 많을 것이다. 하지만 일단 `console.log`를 사용하면 무조건 `cloudwatch logs`에 남는다. 그렇다고 개발 이후에 로그를 남긴 소스를 주석처리하기도 쫌 그렇다... 테스트는 안해봤지만 info, warn, error 등도 남을 것이고, debug는 모르겠다. 아무튼 각 로그 레벨 설정에 따른 로그를 남기고 싶을땐 예전 nodejs로 개발할때는 `winston`을 사용했었는데 `serverless` 플러그인 중에도 `winston-cloudwatch`가 있었다.

하지만 뭔가 셋팅이 점점 늘어나, serverless framework를 쓰면서 특정 모듈별 간편하게 개발하는 기분이 들지 않아서 사용해보진 않았다. 규모가 쫌 커지면 그때 사용을 고려해볼 예정이다.

### 4. 이진 데이터 지원(파일)

기본적으로 multipart로 파일을 보내면 `API Gateway`에서 지원을 하지 않아서 처리가 불가능하다. 별도로 `API Gateway`에 들어가서 파일을 이진 데이터 형태로 지원하게끔 설정할 수도 있지만 이를 plugin을 설치 & 셋팅해서 배포하면서 그냥 한번에 셋팅 되도록 할 수도 있다. `serverless-apigw-binary` 검색

### 5. include modules

작업하면서 로컬환경에서는 잘 작동하는데 aws에 배포하기만 하면 `mysql2` 모듈을 찾을 수 없다고 나온다. 이는 아마도 배포되면서 `Code-Splitting`이 이루어지고, `mysql2` 모듈은 사용하지 않아서 함께 배포가 되지 않는듯 싶다(`mysql2` 모듈은 설정값에 따라 동적으로 불러온다). 이러한 버그를 방지하기 위해서 강제적으로 배포 되도록 설정이 필요하다.

`serverless.yml`

```
custom:
  webpack:
    webpackConfig: ./webpack.config.js
    includeModules:
      forceInclude:
        - mysql2
```
