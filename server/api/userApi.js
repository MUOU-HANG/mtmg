var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
}
/* 公共模块： 
 *
 */
router.post('/getCollege', (req, res) => {
  var sql = $sql.public.college
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
});
router.post('/getMajor', (req, res) => {
  var sql = $sql.public.major
  var params=req.body
  conn.query(sql,[params.college], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
});
router.post('/getClass', (req, res) => {
  var sql = $sql.public.class
  var params=req.body
  conn.query(sql,[params.major], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
});
/**管理员管理
 * 
 */
router.post('/alladminList', (req, res) => {
  var sql = $sql.admin.allList
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/adminList', (req, res) => {
  var sql = $sql.admin.allList;
  var params = req.body
  if (params.userId == '' || !params.userId) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where userId LIKE '%" + params.userId + "%'" + " limit " + params.begin + "," + params.end
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/statusUpdate', (req, res) => {
  var sql = $sql.admin.update;
  var params = req.body
  conn.query(sql,[params.status,params.userId],function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/adminUpdate', (req, res) => {
  var sql = $sql.admin.infoUpdate;
  var params = req.body;
  if (params.userId) {
    sql += " userName = '" + params.userName +
      "',userPass = '" + params.userPass +
      "',userPhone = '" + params.userPhone +
      "',userEmail = '" + params.userEmail +
      "',userType = '" + params.userType +
      "' where userId ='" + params.userId + "'";
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/adminAdd', (req, res) => {
  var sql = $sql.admin.add
  var params = req.body
  conn.query(sql, [params.userId, params.userName, params.userPass, params.userPhone, params.userEmail, params.userType, params.status], function (err, result) {

    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }

  })
})
router.post('/adminDel', (req, res) => {
  var sql = $sql.admin.del
  var params = req.body
  if (params.userId) {

  }
  conn.query(sql, [params.userId], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/adminCount', (req, res) => {
  var sql = $sql.admin.allList;
  var params = req.body
  if (params.userId == '' || !params.userId) {
    sql = sql

  } else {
    sql = sql + "where userId LIKE '%" + params.userId + "%'"

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
/* 登录模块： 
 *
 */
router.post('/login', (req, res) => {
  var sql = $sql.login.user
  var params = req.body
  conn.query(sql, [params.userName], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
});
/*用户中心*/
router.post('/userUpdate', (req, res) => {
  var sql = $sql.userInfo.update;
  var params = req.body;
  if (params.userName) {
    sql += " userPhone = '" + params.userPhone +
      "',userEmail = '" + params.userEmail +
      "' where userName ='" + params.userName + "'";
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/passUpdate', (req, res) => {
  var sql = $sql.userInfo.update;
  var params = req.body;
  console.log(params.userName)
  console.log(params.userPass)
  if (params.userName) {
    sql += " userPass = '" + params.userPass +
      "' where userName ='" + params.userName + "'";
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
/*  学生模块：包括了数据的增删改查，以及学生人数的获取
 * /stuUpdate:学生更新
 * /stuAdd:增加学生信息  
 * /stuDel:删除学生信息
 * /stuList:获取学生列表 
 * /stuCount:获取学生总数*/
router.post('/stuList', (req, res) => {
  var sql = $sql.student.query;
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql + "limit " + params.begin + "," + params.end

  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'" + " limit " + params.begin + "," + params.end
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allStuList', (req, res) => {
  var sql = $sql.student.allList;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
});
router.post('/stuUpdate', (req, res) => {
  var sql = $sql.student.update;
  var params = req.body;
  if (params.number) {
    sql += " name = '" + params.name +
      "',sex = '" + params.sex +
      "',college = '" + params.college +
      "',class = '" + params.class +
      "',phone = '" + params.phone +
      "',teacher = '" + params.teacher +
      "',cloths = '" + params.cloths +
      "',shoes = '" + params.shoes +
      "',reason = '" + params.reason +
      "' where number ='" + params.number + "'";
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/stuAdd', (req, res) => {
  var sql = $sql.student.add
  var params = req.body
  conn.query(sql, [params.number, params.name, params.sex, params.college, params.class, params.phone, params.teacher], function (err, result) {

    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }

  })
})
router.post('/stuDel', (req, res) => {
  var sql = $sql.student.del
  var params = req.body
  if (params.number) {

  }
  conn.query(sql, [params.number], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/count', (req, res) => {
  var sql = $sql.student.query;
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql

  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
/* 教师模块：包括了数据的增删改查，以及教师人数的获取
 * /teaUpdate:教师更新
 * /teaAdd:增加教师信息  
 * /teaDel:删除教师信息
 * /teaList:获取教师列表
 * /teaCount:获取教师总数
 * */
router.post('/teaList', (req, res) => {
  var sql = $sql.teacher.query;
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allTeaList', (req, res) => {
  var sql = $sql.teacher.query;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
});
router.post('/teaUpdate', (req, res) => {
  var sql = $sql.teacher.update;
  var params = req.body;
  if (params.number) {
    sql += " name = '" + params.name +
      "',college = '" + params.college +
      "',major = '" + params.major +
      "',class = '" + params.class +
      "',phone = '" + params.phone +
      "',master = '" + params.master +
      "' where number ='" + params.number + "'";

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/teaAdd', (req, res) => {
  var sql = $sql.teacher.add
  var params = req.body
  conn.query(sql, [params.tcNumber, params.name, params.college, params.major, params.class, params.phone, params.master], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/teaDel', (req, res) => {
  var sql = $sql.teacher.del
  var params = req.body
  if (params.number) {

  }
  conn.query(sql, [params.number], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/teaCount', (req, res) => {
  var sql = $sql.teacher.query
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql

  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
/* 教官模块：包括了数据的增删改查，以及教官人数的获取
 * /masterUpdate:教官更新
 * /masterAdd:增加教官信息  
 * /masterDel:删除教官信息
 * /masterList:获取教官列表
 * /masterCount:获取教官总数
 * */
router.post('/masterList', (req, res) => {
  var sql = $sql.master.query;
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allMasterList', (req, res) => {
  var sql = $sql.master.query;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/masterUpdate', (req, res) => {
  var sql = $sql.master.update;
  var params = req.body;
  if (params.number) {
    sql += " name = '" + params.name +
      "',college = '" + params.college +
      "',major = '" + params.major +
      "',class = '" + params.class +
      "',phone = '" + params.phone +
      "',teacher = '" + params.teacher +
      "' where number ='" + params.number + "'";

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/masterAdd', (req, res) => {
  var sql = $sql.master.add
  var params = req.body
  conn.query(sql, [params.number, params.name, params.college, params.major, params.class, params.phone, params.teacher], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/masterDel', (req, res) => {
  var sql = $sql.master.del
  var params = req.body
  if (params.number) {

  }
  conn.query(sql, [params.number], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/masterCount', (req, res) => {
  var sql = $sql.master.query
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql

  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
/* 连排模块：包括了数据的增删改查，以及教官人数的获取
 * /companyUpdate:教官连排
 * /companyAdd:增加连排信息  
 * /companyDel:删除连排信息
 * /companyList:获取连排列表
 * /companyCount:获取连排总数
 * */
router.post('/companyList', (req, res) => {
  var sql = $sql.company.query;
  var params = req.body
  if (params.clName == '' || !params.clName) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where clName LIKE '%" + params.clName + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allCompanyList', (req, res) => {
  var sql = $sql.company.query;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/companyUpdate', (req, res) => {
  var sql = $sql.company.update;
  var params = req.body;
  if (params.clCode) {
    sql += "clGrade = '" + params.clGrade +
      "',clName = '" + params.clName +
      "',diName = '" + params.diName +
      "',clRowName = '" + params.clRowName +
      "',tcName = '" + params.tcName +
      "',maName = '" + params.maName +
      "',clMaxCount = '" + params.clMaxCount +
      "' where clCode ='" + params.clCode + "'";
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/companyAdd', (req, res) => {
  var sql = $sql.company.add
  var params = req.body
  conn.query(sql, [params.clCode, params.clGrade, params.clName, params.diName, params.clRowName, params.tcName, params.maName, params.clMaxCount], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/companyDel', (req, res) => {
  var sql = $sql.company.del
  var params = req.body
  conn.query(sql, [params.clCode], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/companyCount', (req, res) => {
  var sql = $sql.company.query;
  var params = req.body;
  if (params.clName == "" || !params.clName) {
    sql = sql;;
  } else {
    sql = sql + "where clName LIKE '%" + params.clName + "%'";
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
/* 日记模块：包括了数据的增删改查，以及日记记录的获取
 * /diaryUpdate:教官连排
 * /diaryAdd:增加连排信息  
 * /diaryDel:删除连排信息
 * /diaryList:获取连排列表
 * /diaryCount:获取连排总数
 * */
router.post('/diaryList', (req, res) => {
  var sql = $sql.diary.query;
  var params = req.body
  if (params.diaryAuthor == '' || !params.diaryAuthor) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where diaryAuthor LIKE '%" + params.diaryAuthor + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allDiaryList', (req, res) => {
  var sql = $sql.diary.query;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/diaryUpdate', (req, res) => {
  var sql = $sql.diary.update;
  var params = req.body;
  if (params.clCode) {
    sql += "clGrade = '" + params.clGrade +
      "',clName = '" + params.clName +
      "',diName = '" + params.diName +
      "',clRowName = '" + params.clRowName +
      "',tcName = '" + params.tcName +
      "',maName = '" + params.maName +
      "',clMaxCount = '" + params.clMaxCount +
      "' where clCode ='" + params.clCode + "'";

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/diaryAdd', (req, res) => {
  var sql = $sql.diary.add
  var params = req.body
  conn.query(sql, [params.diaryNumber, params.diaryTitle, params.diaryAuthor, params.diaryContent, params.diaryDate], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/diaryDel', (req, res) => {
  var sql = $sql.diary.del
  var params = req.body
  conn.query(sql, [params.diaryId], function (err, result) {

    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/diaryCount', (req, res) => {
  var sql = $sql.diary.query
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql

  } else {
    sql = sql + "where diaryAuthor LIKE '%" + params.diaryAuthor + "%'"

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
/* 教师评价模块：包括了数据的增删改查，以及教师记录的获取
 * /tcMarkUpdate:教官连排
 * /tcMarkAdd:增加教师评价信息  
 * /tcMarkDel:删除教师评价信息
 * /tcMarkList:获取教师评价列表
 * /tcMarkCount:获取教师评价总数
 * */
router.post('/tcMarkList', (req, res) => {
  var sql = $sql.tcMark.query;
  var params = req.body
  if (params.tcNumber == '' || !params.tcNumber) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where tcNumber LIKE '%" + params.tcNumber + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allTcMarkList', (req, res) => {
  var sql = $sql.tcMark.query
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/tcMarkUpdate', (req, res) => {
  var sql = $sql.tcMark.update;
  console.log("111");
  var params = req.body;
  if (params.tcNumber) {
    sql += "tcName = '" + params.tcName +
      "',clName = '" + params.clName +
      "',satisfied = '" + params.sctisfied +
      "',good = '" + params.good +
      "',common = '" + params.common +
      "',worse = '" + params.worse +
      "' where tcNumber ='" + params.tcNumber + "'";

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/tcMarkAdd', (req, res) => {
  var sql = $sql.tcMark.add
  var params = req.body
  conn.query(sql,
    [params.tcNumber,
      params.tcName,
      params.issueId,
      params.satisfied,
      params.good,
      params.common,
      params.worse
    ],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
})
router.post('/tcMarkDel', (req, res) => {
  var sql = $sql.tcMark.del
  var params = req.body
  conn.query(sql, [params.tcNumber], function (err, result) {

    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/tcMarkCount', (req, res) => {
  var sql = $sql.tcMark.query
  var params = req.body
  if (params.tcNumber == '' || !params.tcNumber) {
    sql = sql
  } else {
    sql = sql + "where tcNumber LIKE '%" + params.tcNumber + "%'"
    console.log("count:" + sql)
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
router.post('/issueList_tc', (req, res) => {
  var sql = $sql.tcMark.issue;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    jsonWrite(res, result)
  })
})
router.post('/issueAnswer_tc', (req, res) => {
  var sql = $sql.tcMark.answer;
  var params = req.body
  conn.query(sql, [params.tcName], function (err, result) {
    if (err) {
      console.log(err);
    }
    jsonWrite(res, result)
  })
})
router.post('/tcMarkDetailsAdd', (req, res) => {
  var sql = $sql.tcMark.addDetails
  console.log(sql);
  var params = req.body
  conn.query(sql,
    [ params.tcName,
      params.issueId,
      params.satisfied,
      params.good,
      params.common,
      params.worse
    ],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
})
router.post('/tcMarkDetailsUpdate', (req, res) => {
  var sql = $sql.tcMark.updateDetails
  console.log(sql);
  var params = req.body
  conn.query(sql,
    [  
      params.satisfied,
      params.good,
      params.common,
      params.worse,
      params.tcName,
      params.issueId
    ],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
})
router.post('/tcCheck', (req, res) => {
  console.log(res);
  var sql = $sql.tcMark.check
  var params = req.body
  conn.query(sql,
    [ params.tcName,
      params.issueId,
    ],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
})

/* 教官评分模块：包括了数据的增删改查，以及教官评价总数的获取
 * /maMarkUpdate:教官评价更新
 * /maMarkAdd:增加教官评价信息  
 * /maMarkDel:删除教官评价信息
 * /maMarkList:获取教官评价列表
 * /maMarkCount:获取教官评价总数
 * */
router.post('/maMarkList', (req, res) => {
  var sql = $sql.maMark.query;
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allMaMarkList', (req, res) => {
  var sql = $sql.maMark.query
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/maMarkUpdate', (req, res) => {
  var sql = $sql.maMark.update;
  var params = req.body;
  if (params.clCode) {
    sql += "clGrade = '" + params.clGrade +
      "',clName = '" + params.clName +
      "',diName = '" + params.diName +
      "',clRowName = '" + params.clRowName +
      "',tcName = '" + params.tcName +
      "',maName = '" + params.maName +
      "',clMaxCount = '" + params.clMaxCount +
      "' where clCode ='" + params.clCode + "'";

  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/maMarkAdd', (req, res) => {
  var sql = $sql.maMark.add

  var params = req.body
  conn.query(sql, [params.clCode, params.clGrade, params.clName, params.diName, params.clRowName, params.tcName, params.maName, params.clMaxCount], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/maMarkDel', (req, res) => {
  var sql = $sql.maMark.del
  var params = req.body
  conn.query(sql, [params.number], function (err, result) {

    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/maMarkCount', (req, res) => {
  var sql = $sql.maMark.query
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql
  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
router.post('/issueList_ma', (req, res) => {
  var sql = $sql.maMark.issue;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    jsonWrite(res, result)
  })
})
router.post('/issueAnswer_ma', (req, res) => {
  var sql = $sql.maMark.answer;
  var params = req.body
  conn.query(sql, [params.number], function (err, result) {
    if (err) {
      console.log(err);
    }
    jsonWrite(res, result)
  })
})
/*结业考核模块 
 * */
router.post('/assessList', (req, res) => {
  var sql = $sql.assess.query;
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql + "limit " + params.begin + "," + params.end
  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/allAssessList', (req, res) => {
  var sql = $sql.assess.query
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
});
router.post('/assessCount', (req, res) => {
  var sql = $sql.assess.query
  var params = req.body
  if (params.number == '' || !params.number) {
    sql = sql
  } else {
    sql = sql + "where number LIKE '%" + params.number + "%'"
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var count = 0;
      for (var i in result) {
        count++;
      }
      jsonWrite(res, count)
    }
  })
})
router.post('/assessUpdate', (req, res) => {
  var sql = $sql.assess.update;
  var params = req.body;
  if (params.number) {
    sql += " name = '" + params.name +
      "',sex = '" + params.sex +
      "',teacher = '" + params.teacher +
      "',train = '" + params.train +
      "',interior = '" + params.interior +
      "',assess = '" + params.assess +
      "' where number ='" + params.number + "'";
  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/assessAdd', (req, res) => {
  var sql = $sql.assess.add
  var params = req.body
  conn.query(sql, [
      params.number,
      params.name,
      params.sex,
      params.teacher,
      params.train,
      params.interior,
      params.assess
    ],
    function (err, result) {

      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result)
      }

    })
})
router.post('/assessDel', (req, res) => {
  var sql = $sql.assess.del
  var params = req.body
  conn.query(sql, [params.number], function (err, result) {

    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
/** 前端api*/
router.post('/stuInfoUpdate', (req, res) => {
  var sql = $sql.front.stuInfoUpdate;
  var params = req.body;
  if (params.number) {
    if (params.train == "是") {
      sql += " name = '" + params.name +
        "',college = '" + params.college +
        "',class = '" + params.class +
        "',train = '" + params.train +
        "',cloths = '" + params.cloths +
        "',shoes = '" + params.shoes +
        "',reason = '无' where number ='" + params.number + "'";
    } else {
      sql += " name = '" + params.name +
        "',college = '" + params.college +
        "',class = '" + params.class +
        "',train = '" + params.train +
        "',cloths = '/',shoes = '/',reason = '" + params.reason +
        "' where number ='" + params.number + "'";
    }


  }
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      jsonWrite(res, result)
    }
  })
})
router.post('/getTrainTime', (req, res) => {
  var sql = $sql.front.getTrainTime;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router;
