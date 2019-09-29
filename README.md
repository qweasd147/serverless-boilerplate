# serverless-boilerplate

serverless-boilerplate with sequelize

# 1. Serverless

서버 자원을 전혀 고려하지 않아도 된다는 취지로 만들어 졌지만 aws를 기준으로 성능을 위해서라면 memory용량을 늘리고 memory 용량을 늘려야 cpu 성능이 좋아져, 이러한 점도 신경써야 한다는 안타까운 점이 존재.
(aws만 그런지 다른 서비스도 그런지는 모르겠음)

안타까운점이 있지만 일정시간 이상 람다 트리거가 발동하지 않으면 `idle`상태로 빠지고 이러한 점 때문인지 일반적으로 `ec2`로 인스턴스를 올리는것보다 비용이 싸게 먹힌다고 한다.
단, 람다는 요청 단위로 과금이 결정되서 비교가 힘들긴 하지만 요청이 많으면 `ec2`보다 훨씬 비싸다고 한다.

## 1.1 연관 플러그인
개발하면서 발견한 유용한 플러그인 등을 소개
### 1.1.1 환경변수를 관리하고 싶을때
-> `serverless-dotenv-plugin`을 사용한다.
    각 서비스 환경(dev, staging, product 등)별 환경변수를 관리하고 사용하고 싶을때 매우 유용하게 써먹을수 있다.

### 1.1.2 요청에 대한 전처리 등이 필요할때
-> `aws-serverless-koa`또는 `aws-serverless-express`를 사용한다.

처음엔 그냥 람다 만들고 `API Gateway`로 연결해서 쓰면 됬지 뭐하라 사용하나 싶었는데 일단 이런 프레임워크를 쓰니까 `middleware`처리나 `router`를 활용할 수 있어서 편하다. 또 프레임 워크(`koa` or `express`)를 사용하지 않고 개발하다보면 파라미터 파싱하기도 귀찮고 lambda에 의존되는 코드(파라미터 가져오기, 응답값 내보내기 등)가 생기는데 이러한 부분을 프레임워크를 써서 처리해주니까 순수 nodejs만 개발한 사람은 lambda 레퍼런스 보는 시간이 줄어 든거 같다.

### 1.1.3 로그를 남기고 싶을때
일반적으로 `Lambda`는 `console.log`같은걸 쓰면 알아서 `cloudwatch logs`에 남긴다. 근데 이게 개발하면서 디버깅용 로그를 사용할때가 분명 많을 것이다. 하지만 일단 `console.log`를 사용하면 무조건 `cloudwatch logs`에 남는다. 그렇다고 개발 이후에 로그를 남긴 소스를 주석처리하기도 쫌 그렇다... 테스트는 안해봤지만 info, warn, error 등도 남을 것이고, debug는 모르겠다. 아무튼 각 로그 레벨 설정에 따른 로그를 남기고 싶을땐 예전 nodejs로 개발할때는 `winston`을 사용했었는데 `serverless` 플러그인 중에도 `winston-cloudwatch`가 있었다.

하지만 뭔가 셋팅이 점점 늘어나, serverless framework를 쓰면서 특정 모듈별 간편하게 개발하는 기분이 들지 않아서 사용해보진 않았다. 규모가 쫌 커지면 그때 사용을 고려해볼 예정이다.

### 1.1.4 이진 데이터 지원(파일)
기본적으로 multipart로 파일을 보내면 `API Gateway`에서 지원을 하지 않아서 처리가 불가능하다. 별도로 `API Gateway`에 들어가서 파일을 이진 데이터 형태로 지원하게끔 설정할 수도 있지만 이를 plugin을 설치 & 셋팅해서 배포하면서 그냥 한번에 셋팅 되도록 할 수도 있다. `serverless-apigw-binary` 검색


### 1.1.5 include modules
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

## 1.2 주의사항

### 1.2.1 cold star & warm start
앞서 설명한대로 일정시간 함수가 실행되지 않으면 컨테이너가 종료된 상태로 유지된다. 그러면서 생긴 문제점은 이렇게 종료된 상태에서 함수 트리거가 발동되면 다시 컨테이너를 올리는것부터 시작된다. 이떄의 start를 `cold start`라고 한다. 반대로 주기적으로 실행되면서 컨테이너 시작부터가 아닌 그냥 함수를 바로 시행하는 start를 `warm start`라고 한다.

만약 `cold start`를 하게되면 당연히 시간이 오래걸리게 된다. 프로그램마다 다 다르겠지만 그래도 1~3초 정도 더 추가적으로 걸린다고 한다. 이러한 시간을 낭비하려면 어쩔수없이 주기적으로 함수를 실행시켜 컨테이너가 종료되는 것을 막는것 밖에 없다고 한다(`aws`에서도 따로 가이드가 없다고 함). health check api를 만들어 주기적으로 만들던가 `cloud watch`를 통해 이벤트 트리거를 주기적으로 발동 시키는게 그나마 최선이라고 한다. `2019 kakao developer` 세미나에서 자신들이 테스트해본 결과 300초 이하로 주기적으로 발동시키면 `warm start`가 발동 되지 않는다고 하고, 혹시 몰라서 60초정도로 주기적으로 함수를 발동시킨다고 하였다.

### 1.2.2 Concurrency
함수가 실행되는 동시 개수를 제한한다. 이는 계정별로 제한이 있으니까, 중요한 함수와 널널한 함수를 나누어서 각각 따로 제한을 두는게 좋다. 말이 좋아 서버리스지 알면 알수록 성능 튜닝 요소 & 제한이 은근히 있다(물론 서버를 직접 구축하는것 보단 훨씬 적지만).

### 1.2.3 API Gateway를 통한 제한
트리거를 API Gateway를 통해 제한 할 수도 있다. cors를 제한해서 허용된 host만 처리한다던지, API를 발급 & import해서 인증된 request만 함수를 발동하도록 실행 제한이 가능하다.

### 1.2.4 함수 실행시간
람다 실행당 최대 15분 까지만 실행된다. 오래된 문서나 `overflow` 보면 3분? 5분?이라고 나와있는데 늘어났다. 아무튼 그 이상 걸리는 작업은 다른 서비스(`aws batch`)등을 써야한다.

# 2. Sequelize
공부할 맘 없었는데 어쩌다 보니까 하게됨 ... 다른 `orm`(`jpa`)을 먼저 써보니 고만고만하게 느껴져서, 개인적으로 느낀 중요한 차이점만 작성해볼 예정

### 2.1 연관관계 정의

항상 메소드를 기준으로 왼쪽이 `soruce`, 오른쪽이 `target`. 이점을 생각하면 헤깔릴일이 많이 줄어든다.

Article.js
```javascript
this.hasMany(models.Comment, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false
        , name : 'articleIdx'  //target의 foreign key
    }
    , sourceKey : 'idx'     //source의 key값
})
```
`this`(article)가 source, `comment`가 target

Comment.js
```javascript
this.belongsTo(models.Article, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false
        , name : 'articleIdx'
    }
    , targetKey : 'idx'   //fk는 article의 idx를 본다.
})
```

`this`(comment)가 source, `article`이 target