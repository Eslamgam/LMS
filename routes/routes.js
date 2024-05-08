
const userRoute = require('./user.route')
const loginRoute = require('./auth.route/login.auth.route')
const registerRoute = require('./auth.route/register.auth.route')
const resetPasswordRoute = require('./auth.route/resetPassword.auth.route')
const verfiyCodeRoute = require('./auth.route/verfiyCode.auth.route')
const forgetPasswordRoute = require('./auth.route/forget_password.auth.route')
const universityRoute = require('./univer.route')
const facultyRoute = require('./faculty.route')
const departmentRoute = require('./department.rote')
const studentInformationRoute = require('./studentsInformation.route')
const courseRoute = require('./course.route')
const semesterRoute = require('./semester.route')
const courseSemesterRoute = require('./courseSemester.route')
const newRoute = require('./new.route')
const lectureRoute = require('./lecture.route')
const lectureFileRoute = require('./lecturefile.route')
const studentEnrollmentRoute = require('./studentEnrollment.route')
const taskRoute = require('./task.route')
const taskAnswerRoute = require('./taskAnswer.route')
const quizRoute = require('./quiz.route')
const questionRoute = require('./question.route')
const questionAnswerRoute = require('./questionAnswer.route')
const quizAnswerRoute = require('./quizAnswer.route')
const instructorCourseSemesterRoute = require('./instructorCourseSemester.route')
const updateUserPayRoute = require('./updateUserPaying')








exports.routes = (app)=>{
app.use('/api/lms/user/', userRoute)
app.use('/api/lms/login/', loginRoute)
app.use('/api/lms/register/', registerRoute)
app.use('/api/lms/user/pass', resetPasswordRoute)
app.use('/api/lms/user/verfiy', verfiyCodeRoute)
app.use('/api/lms/user/forget', forgetPasswordRoute)
app.use('/api/lms/university/', universityRoute)
app.use('/api/lms/faculty/', facultyRoute)
app.use('/api/lms/department/', departmentRoute)
app.use('/api/lms/studentInformation/', studentInformationRoute)
app.use('/api/lms/course/', courseRoute)
app.use('/api/lms/semester/', semesterRoute)
app.use('/api/lms/new/', newRoute)
app.use('/api/lms/courseSemester/', courseSemesterRoute)
app.use('/api/lms/lecture/', lectureRoute)
app.use('/api/lms/lectureFile/', lectureFileRoute)
app.use('/api/lms/studentEnrollment/', studentEnrollmentRoute)
app.use('/api/lms/task/', taskRoute)
app.use('/api/lms/taskAnswer/', taskAnswerRoute)
app.use('/api/lms/quiz/', quizRoute)
app.use('/api/lms/question/', questionRoute)
app.use('/api/lms/questionAnswer/', questionAnswerRoute)
app.use('/api/lms/quizAnswer/', quizAnswerRoute)
app.use('/api/lms/updateUserPay/', updateUserPayRoute)

app.use('/api/lms/instructorCourseSemester/', instructorCourseSemesterRoute)

}