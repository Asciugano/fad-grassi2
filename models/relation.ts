import User from "./user.model";
import Course from "./course.model";
import HomeWork from "./homeWork.model";
import Submission from "./submission.model";
import News from "./news.model";

User.hasMany(Course, { as: "teachingCourses", foreignKey: "teacherID" });
User.belongsToMany(Course, { through: "courseStudents", as: "enrolledCourses" });
User.hasMany(Submission, { as: "assignaments", foreignKey: "studentID" });
User.hasMany(News, { as: "annuncements", foreignKey: "authorID" });

Course.belongsTo(User, { as: "teacher", foreignKey: "teacherID" });
Course.belongsToMany(User, { through: "courseStudents", as: "students" });
Course.hasMany(HomeWork, { as: "assignaments", foreignKey: "courseID" });
Course.hasMany(News, { as: "annuncements", foreignKey: "courseID" });

HomeWork.belongsTo(Course, { as: "course", foreignKey: "courseID" });
HomeWork.hasMany(Submission, { as: "entries", foreignKey: "homeworkID" });

Submission.belongsTo(HomeWork, { as: "exercise", foreignKey: "homeworkID" });
Submission.belongsTo(User, { as: "student", foreignKey: "studentID" });

News.belongsTo(User, { as: "author", foreignKey: "authorID" });
News.belongsTo(Course, { as: "class", foreignKey: "courseID" });

export { User, Course, HomeWork, Submission, News };
