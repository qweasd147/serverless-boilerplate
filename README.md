# serverless-boilerplate

serverless-boilerplate with sequelize

# 1. Serverless

서버 자원을 전혀 고려하지 않아도 된다는 취지로 만들어 졌지만 aws를 기준으로 성능을 위해서라면 memory용량을 늘리고 memory 용량을 늘려야 cpu 성능이 좋아져, 이러한 점도 신경써야 한다는 안타까운 점이 존재.
(aws만 그런지 다른 서비스도 그런지는 모르겠음)

안타까운점이 있지만 일정시간 이상 람다 트리거가 발동하지 않으면 `idle`상태로 빠지고 이러한 점 때문인지 일반적으로 `ec2`로 인스턴스를 올리는것보다 비용이 싸게 먹힌다고 한다.
단, 람다는 요청 단위로 과금이 결정되서 비교가 힘들긴 하지만 요청이 많으면 `ec2`보다 훨씬 비싸다고 한다.

## 1.1 연관 플러그인

개발하면서 발견한 유용한 플러그인 등을 소개
[유용했던 플러그인](https://github.com/qweasd147/serverless-boilerplate/blob/master/document/plugin.md)

## 1.2 주의사항

[주의사항](https://github.com/qweasd147/serverless-boilerplate/blob/master/document/caution.md)

## 1.3 기타 명령어

[명령어](https://github.com/qweasd147/serverless-boilerplate/blob/master/document/command.md)

# 2. Sequelize

공부할 맘 없었는데 어쩌다 보니까 하게됨 ... 다른 `orm`(`jpa`)을 먼저 써보니 고만고만하게 느껴져서, 개인적으로 느낀 중요한 차이점만 작성해볼 예정

### 2.1 연관관계 정의

항상 메소드를 기준으로 왼쪽이 `soruce`, 오른쪽이 `target`. 이점을 생각하면 헤깔릴일이 많이 줄어든다.

Article.js

```javascript
this.hasMany(models.Comment, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "articleIdx", //target의 foreign key
  },
  sourceKey: "idx", //source의 key값
});
```

`this`(article)가 source, `comment`가 target

Comment.js

```javascript
this.belongsTo(models.Article, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "articleIdx",
  },
  targetKey: "idx", //fk는 article의 idx를 본다.
});
```

`this`(comment)가 source, `article`이 target
