// sql语句
var sqlMap = {
  // 公共模块
  public:{
    class: 'select distinct college, major, class from class',
    college: 'select distinct college from class',
    major: 'select distinct major from class where college = ?',
    class: 'select distinct class from class where major = ?'
  },
  // 前台模块
  front:{
    stuInfoUpdate: 'update student set',
    getTrainTime: 'select * from traintime'
  },
  // 登录模块
  login:{
    user: 'select * from admin where userName = ?'
  },
  // 管理员管理
  admin:{
    allList: 'select * from admin ',
    update: 'update admin set status = ? where userId = ?',
    del: 'delete from admin where userId = ?',
    infoUpdate: 'update admin set ',
    count:'select count(userId) from admin',
    add: 'insert into admin(userId, userName, userPass, userPhone, userEmail, userType, status) values(?, ?, ?, ?, ?, ?, ?)',
  },
  // 用户信息操作
  userInfo:{
    update: 'update admin set',
  },
  // 学生模块
  student: {
    query: 'select * from student ',
    update: 'update student set ',
    add: 'insert into student(number, name, sex, college, class, phone, teacher) values(?, ?, ?, ?, ?, ?, ?)',
    del: 'delete from student where number = ?',
    count: 'select count(number) from student',
    allList: 'select * from student'
  },
  // 教师模块
  teacher: {
    query: 'select * from teacher ',
    update: 'update teacher set ',
    add: 'insert into teacher(number, name, college, major, class, phone, master) values(?, ?, ?, ?, ?, ?, ?)',
    del: 'delete from teacher where number = ?',
    count: 'select count(number) from teacher'
  },
  // 教官模块
  master: {
    query: 'select * from master ',
    update: 'update master set ',
    add: 'insert into master(number, name, college, major, class, phone, teacher) values(?, ?, ?, ?, ?, ?, ?)',
    del: 'delete from master where number = ?',
    count: 'select count(number) from master'
  },
  // 连排模块
  company: {
    query: 'select * from company ',
    update: 'update company set ',
    add: 'insert into company(clCode, clGrade, clName, diName, clRowName, tcName, maName, clMaxCount) values(?, ?, ?, ?, ?, ?, ?, ?)',
    del: 'delete from company where clCode = ?',
    count: 'select count(clCode) from company'
  },
  // 日记模块
  diary: {
    query: 'select * from diary ',
    update: 'update diary set ',
    add: 'insert into diary(stuId, diaryAuthor, diaryTitle, diaryContent, diaryDate) values( ?, ?, ?, ?, ?)',
    del: 'delete from diary where diaryId = ?',
    count: 'select count(diaryId) from diary'
  },
   // 教师评价模块
   tcMark: {
    query: 'select * from tcMarkSum ',
    update: 'update tcMarkSum set ',
    add: 'insert into tcMarkSum(tcNumber, tcName, clName, sctisfied, good, common, worse) values(?, ?, ?, ?, ?, ?,?)',
    addDetails: 'insert into tcmarkdetails(tcName, issueId,satisfiedMark, goodMark, commonMark, worseMark) values(?,?,?,?,?,?)',
   updateDetails: 'update tcmarkdetails set satisfiedMark = ?, goodMark = ? , commonMark = ?, worseMark = ? where tcName = ? and issueId = ?',
    del: 'delete from tcMarkSum where tcNumber = ?',
    count: 'select count(tcNumber) from tcMarkSum',
    issue: 'select * from tcIssue',
    check: 'select * from tcmarkdetails where tcName = ? and issueId = ?',
    answer: 'select issueId, satisfiedMark, goodMark, commonMark, worseMark  from tcmarkdetails where tcName = ? order by issueId'
  },
  // 教官
  maMark: {
    query: 'select * from maMarkSum ',
    update: 'update maMarkSum set ',
    add: 'insert into maMarkSum(tcNumber, tcName, clName, sctisfied, good, common, worse) values(?, ?, ?, ?, ?, ?,?)',
    del: 'delete from maMarkSum where number = ?',
    count: 'select count(tcNumber) from maMark',
    issue: 'select * from maIssue',
    answer: 'select issueId, satisfiedMark, goodMark, commonMark, worseMark  from mamarkdetails where number = ?'
  },
  // 结业考核
  assess:{
    query: 'select * from assess ',
    update: 'update assess set ',
    add: 'insert into assess(number, name, sex, teacher, train, interior, assess) values(?, ?, ?, ?, ?, ?, ?)',
    del:'delete from assess where number = ?'
  }
}

module.exports = sqlMap;