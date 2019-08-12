# serverless-boilerplate
serverless-boilerplate with sequelize


# 1. Serverless

# 2. Sequelize
공부할 맘 없었는데 어쩌다 보니까 하게됨 ...

### 2.1 연관관계 정의

항상 메소드를 기준으로 왼쪽이 `soruce`, 오른쪽이 `target`. 이점을 생각하면 헤깔릴일이 많이 줄어든다.

Article.js
```javascript
this.hasMany(models.Comment, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false
        , name : 'article_idx'  //target의 foreign key
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
        , name : 'article_idx'
    }
    , targetKey : 'idx'   //fk는 article의 idx를 본다.
})
```

`this`(comment)가 source, `article`이 target