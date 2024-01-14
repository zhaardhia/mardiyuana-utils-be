const response = require("../components/response")
const { db, event, event_vote, student } = require("../components/database");
const { nanoid } = require("nanoid")
const { getActiveEnrollmentStudent } = require("./query/enrollment_student")
const { getLatestReminderCourse } = require("./query/reminderCourse")

exports.getEventNonVoteDetail = async (req, res, next) => {
  const { id } = req.query
  if (!id) return response.res400(res, "id is required.")
  try {
    const getEventDetail = await event.findOne({
      raw: true,
      where: {
        id,
        eventVoteType: "NO_VOTE"
      }
    })
    
    if (!getEventDetail) return response.res200(res, "001", "there is no event with this id")
    return response.res200(res, "000", "success get all dashboard data.", getEventDetail);
  } catch (error) {
    console.error(error)
    return response.res200(res, "001", "Gagal mendapatkan data.")
  }
}

exports.getEventVoteDetail = async (req, res, next) => {
  const { id } = req.query
  if (!id) return response.res400(res, "id is required.")
  try {
    const eventVoteAssociate = event.hasMany(event_vote, { foreignKey: "eventId", sourceKey: "id" })
    let getEventDetail = await event.findOne({
      include: [
        {
          association: eventVoteAssociate,
          attributes: { exclude: ["createdDate", "updatedDate"] }
        }
      ],
      where: {
        id,
        eventVoteType: "VOTE"
      },
      attributes: { exclude: ["updatedDate"] }
    })

    if (!getEventDetail) return response.res200(res, "001", "there is no event with this id")
    const getEventDetailJSON = getEventDetail ? getEventDetail.toJSON() : null;

    const filterAgree = getEventDetailJSON.event_votes.filter(vote => vote.isAgree === "YES") || []

    const totalAgree = filterAgree.length
    const totalDisagree = getEventDetailJSON.event_votes.length - totalAgree

    const countStudentActive = await student.count({
      where: { status: "ACTIVE" }
    })
    console.log({countStudentActive})
    return response.res200(res, "000", "success get all dashboard data.", {
      ...getEventDetailJSON,
      totalAgree,
      totalDisagree,
      percentageAgree: `${(totalAgree / countStudentActive * 100).toFixed(0)}%`,
      percentageDisagree: `${(totalDisagree / countStudentActive * 100).toFixed(0)}%`,
      totalStudent: countStudentActive
    });
  } catch (error) {
    console.error(error)
    return response.res200(res, "001", "Gagal mendapatkan data.")
  }
}

exports.voteUnvoteEvent = async (req, res, next) => {
  const { user } = req
  const isAgree = req.body.isAgree
  const eventId = req.body.eventId

  if (!eventId) return response.res400(res, "eventId is required")
  if (!isAgree || !["YES", "NO"].includes(isAgree)) return response.res400(res, "isAgree is required")

  try {
    const checkCurrentVote = await event_vote.findOne({
      raw: true,
      where: {
        eventId,
        parentId: user.userId
      }
    })
    if (!checkCurrentVote) {
      await event_vote.create({
        id: nanoid(36),
        eventId,
        isAgree,
        parentId: user.userId,
        createdDate: new Date,
        updatedDate: new Date()
      })
    } else {
      await event_vote.update(
        {
          isAgree,
          updatedDate: new Date()
        },
        {
          where: {
            eventId,
            parentId: user.userId
          }
        }
      )
    }
    
    return response.res200(res, "000", "Sukses melakukan voting pada event ini.")
  } catch (error) {
    console.log({error})
    return response.res200(res, "001", "Interaksi gagal.")
  }
}