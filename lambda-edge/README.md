# Image Dynamic Resize

Lambda@Edge를 활용해서 요청한 `querystring`에 맞춰 이미지 사이즈를 조절 후 반환한다.

### 기술 스택

- Lambda, Lambda@Edge
- CloudFront
- S3
- Serverless Framework
- js

### 설치법 (mac 기준)

`config.js`파일에서 버킷 정보, `Cloud Front`의 `distribution id` 수정

```sh
$ npm install
$ npm deploy.dev
```
