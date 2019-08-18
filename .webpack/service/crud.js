(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./crud.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config sync recursive ^\\.\\/env\\..*$":
/*!***********************************!*\
  !*** ./config sync ^\.\/env\..*$ ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./env.development": "./config/env.development.js",
	"./env.development.js": "./config/env.development.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./config sync recursive ^\\.\\/env\\..*$";

/***/ }),

/***/ "./config/env.development.js":
/*!***********************************!*\
  !*** ./config/env.development.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const secret = {
  db: {
    host: "192.168.169.129",
    port: 3306 //, dialect : "mysql" //db 종류
    ,
    dialect: "mariadb",
    name: "joo" //데이터베이스 이름(스키마)
    ,
    userId: "joohyung",
    password: "joo123"
  }
};
module.exports = secret;

/***/ }),

/***/ "./config/index.js":
/*!*************************!*\
  !*** ./config/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (env) {
  return __webpack_require__("./config sync recursive ^\\.\\/env\\..*$")(`./env.${env}`);
}("development" || false);

/***/ }),

/***/ "./crud.js":
/*!*****************!*\
  !*** ./crud.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _models = __webpack_require__(/*! ./models */ "./models/index.js");

const {
  Article,
  Comment
} = _models.models;

const create = async () => {
  /*
  const article = await Article.findOne({
      where: { idx: 1 }
  });
  */
  //const article = await Article.findByPk(1);
  const article = await Article.create({
    subject: 'article subject',
    contents: 'article content'
  });
  const comment = Comment.build({
    subject: 'Comment subject...',
    contents: 'Comment contents'
  }); //article.instanceMethod();
  //Article.staticMethod();

  await article.addComments();
};

const createPost = async () => {
  const article = await Article.create({
    subject: 'subject...',
    contents: 'contents...'
  });
};

exports.create = create;

/***/ }),

/***/ "./models/crud/Article.js":
/*!********************************!*\
  !*** ./models/crud/Article.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(/*! sequelize */ "sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Article extends _sequelize2.default.Model {
  static init(sequelize) {
    return super.init({
      idx: {
        type: _sequelize2.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subject: {
        type: _sequelize2.default.STRING,
        allowNull: false
      },
      contents: {
        type: _sequelize2.default.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'article'
    });
  }

  static associate(models) {
    this.hasMany(models.Comment, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: 'articleIdx' //target의 foreign key

      },
      sourceKey: 'idx' //source의 key값
      ,
      as: 'Comments'
    });
  }

  instanceMethod() {
    console.log(this.subject, this.contents);
  }

  async addComments() {
    const Comment = this.sequelize.models.Comment;
    await Comment.create({
      subject: 'create from article. subject',
      contents: 'create from article. contents',
      articleIdx: this.idx
    });
  }

  static staticMethod() {
    console.log('static method!');
  }

}

exports.default = Article;

/***/ }),

/***/ "./models/crud/Comment.js":
/*!********************************!*\
  !*** ./models/crud/Comment.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(/*! sequelize */ "sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Comment extends _sequelize2.default.Model {
  static init(sequelize) {
    let options = {};
    return super.init({
      idx: {
        type: _sequelize2.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subject: {
        type: _sequelize2.default.STRING,
        allowNull: false
      },
      contents: {
        type: _sequelize2.default.TEXT,
        allowNull: false
      },
      articleIdx: {
        type: _sequelize2.default.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'comment'
    });
  }

  static associate(models) {
    this.belongsTo(models.Article, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: 'articleIdx'
      },
      targetKey: 'idx' //fk는 article의 idx를 본다.

    });
  }

}

exports.default = Comment;

/***/ }),

/***/ "./models/crud/index.js":
/*!******************************!*\
  !*** ./models/crud/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = exports.Article = undefined;

var _Article = __webpack_require__(/*! ./Article */ "./models/crud/Article.js");

var _Article2 = _interopRequireDefault(_Article);

var _Comment = __webpack_require__(/*! ./Comment */ "./models/crud/Comment.js");

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Article = _Article2.default;
exports.Comment = _Comment2.default;

/***/ }),

/***/ "./models/db/index.js":
/*!****************************!*\
  !*** ./models/db/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(/*! sequelize */ "sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = __webpack_require__(/*! ../../config */ "./config/index.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  host,
  port,
  dialect,
  name,
  userId,
  password
} = process.env;
const sequelizeConn = new _sequelize2.default(name, userId, password, {
  host: host,
  port: port,
  dialect: dialect //db 종류
  ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000 // 연결하는데 최대 30초 걸리도록 설정
    ,
    idle: 10000 // 10초동안 요청 없으면 연결 끊어놓음

  },
  operatorsAliases: false,
  logging: false,
  define: {
    freezeTableName: true //테이블 이름이 복수 형태(ex. tableNames) 막기
    ,
    timestamps: false //모든 테이블에 createAt, updateAt 추가되는거 막기
    ,
    underscored: true //기본 snake_case로 변경

  },
  logging: console.log
});
exports.default = sequelizeConn;

/***/ }),

/***/ "./models/index.js":
/*!*************************!*\
  !*** ./models/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = exports.models = undefined;

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _db = __webpack_require__(/*! ./db */ "./models/db/index.js");

var _db2 = _interopRequireDefault(_db);

var _crud = __webpack_require__(/*! ./crud */ "./models/crud/index.js");

var crudModels = _interopRequireWildcard(_crud);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Database {
  constructor() {
    this._sequelize = _db2.default;
    this._models = {}; // Load each model file

    /*
    const models = Object.assign({}, ...fs.readdirSync(__dirname)
      .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
      .filter(filePath => !fs.statSync(path.join(__dirname,filePath)).isDirectory())  //디렉토리 제거
      .map((file) => {
        const model = require(path.join(__dirname, file)).default
        
        return {
          [model.name]: model.init(this._sequelize),
        }
      })
    )
    */

    const models = Object.assign({}, ...Object.keys(crudModels).map(modelKey => crudModels[modelKey]).map(model => {
      return {
        [model.name]: model.init(this._sequelize)
      };
    })); // Load model associations

    for (const model of Object.keys(models)) {
      typeof models[model].associate === 'function' && models[model].associate(models);
    }

    this._models = models;
  }

  get sequelize() {
    return this._sequelize;
  }

  get models() {
    return this._models;
  }

}

const database = new Database();
const models = exports.models = database.models;
const sequelize = exports.sequelize = database.sequelize;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })

/******/ })));
//# sourceMappingURL=crud.js.map