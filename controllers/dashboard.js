const response = require("../components/response")
const { db, announcement, event, reminder_course } = require("../components/database");
const moment = require("moment");
const { getActiveEnrollmentStudent } = require("./query/enrollment_student")
const { getLatestReminderCourse } = require("./query/reminderCourse")

exports.getDashboardStudentData = async (req, res, next) => {
  const { user } = req
  try {
    const studentId = user.isParent ? user.studentId : user.userId

    const getAllEventData = await event.findAll({
      raw: true,
      attributes: ["id", "name", "description", "eventVoteType", "eventDate", "imageUrl"],
      order: [["createdDate", "DESC"]],
      where: {
        eventVoteType: "NO_VOTE"
      },
      limit: 5
    })
    const getAllEventVoteData = await event.findAll({
      raw: true,
      attributes: ["id", "name", "description", "eventVoteType", "eventDate", "imageUrl"],
      order: [["createdDate", "DESC"]],
      where: {
        eventVoteType: "VOTE"
      },
      limit: 5
    })
    const getAllAnnouncementData = await announcement.findAll({
      raw: true,
      attributes: ["id", "title", "body"],
      order: [["createdDate", "DESC"]],
      limit: 5
    })

    let getAllLatestReminder = []

    const getActiveEnrollment = await getActiveEnrollmentStudent({ studentId })
    if (getActiveEnrollment) {
      const latestReminder = await getLatestReminderCourse({
        academicYearId: getActiveEnrollment.academicYearId, 
        classId: getActiveEnrollment.classId
      })

      getAllLatestReminder = [...latestReminder]
    }
    
  
    return response.res200(res, "000", "success get all dashboard data.", {
      eventNormal: [...getAllEventData],
      eventVote: [...getAllEventVoteData],
      announcement: [...getAllAnnouncementData],
      reminder: getAllLatestReminder
    });
  } catch (error) {
    console.error(error)
    return response.res200(res, "001", "Gagal mendapatkan data.")
  }
}

exports.getDashboardTeacherData = async (req, res, next) => {
  try {
    const getAllEventData = await event.findAll({
      raw: true,
      attributes: ["id", "name", "description", "eventVoteType", "eventDate", "imageUrl"],
      order: [["createdDate", "DESC"]],
      where: {
        eventVoteType: "NO_VOTE"
      },
      limit: 5
    })
    const getAllEventVoteData = await event.findAll({
      raw: true,
      attributes: ["id", "name", "description", "eventVoteType", "eventDate", "imageUrl"],
      order: [["createdDate", "DESC"]],
      where: {
        eventVoteType: "VOTE"
      },
      limit: 5
    })
    const getAllAnnouncementData = await announcement.findAll({
      raw: true,
      attributes: ["id", "title", "body"],
      order: [["createdDate", "DESC"]],
      limit: 5
    })
    
  
    return response.res200(res, "000", "success get all dashboard data.", {
      eventNormal: [...getAllEventData],
      eventVote: [...getAllEventVoteData],
      announcement: [...getAllAnnouncementData],
    });
  } catch (error) {
    console.error(error)
    return response.res200(res, "001", "Gagal mendapatkan data.")
  }
}