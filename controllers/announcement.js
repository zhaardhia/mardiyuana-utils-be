const response = require("../components/response")
const { db, announcement } = require("../components/database");
const moment = require("moment");
const { getListAnnouncement, totalCountListAnnouncement, getDetailAnnouncement } = require("./query/announcement")

exports.getLatest3Announcements = async (req, res, next) => {
  const getAllAnnouncementData = await announcement.findAll({
    raw: true,
    order:[["createdDate", "DESC"]]
  })
  return response.res200(res, "000", "success get all announcement data.", getAllAnnouncementData || []);
}

exports.getListAnnouncementPagination = async (req, res, next) => {
  const { page, pageSize, titleName } = req.query

  if (!page || !pageSize) return response.res400(res, "page & pageSize is required.")
  try {
    const getAnnouncements = await getListAnnouncement({ page, pageSize, titleName })
    console.log({getAnnouncements})
    // if (getAnnouncements.length < 1) return response.res200(res, "001", "Belum ada data pengumuman yang tersedia", [])
    const totalCount = await totalCountListAnnouncement({ titleName })
    const totalPages = Math.ceil(totalCount / pageSize);
    const nextPage = getAnnouncements.length > pageSize ? page + 1 : null
    // console.log({dataStudent})
    if (getAnnouncements.length > pageSize) dataStudent.pop();

    const responseData = {
      announcements: [...getAnnouncements],
      totalData: totalCount,
      totalPages,
      nextPage
    }
    return response.res200(res, "000", "Sukses mendapatkan data pengumuman", responseData)
  } catch (error) {
    console.error(error)
    return response.res200(res, "001", "Interaksi gagal.")
  }
}

exports.getAnnouncementDetail = async (req, res, next) => {
  const { id } = req.query

  if (!id) return response.res400(res, "id is required.")
  try {
    const getAnnouncement = await getDetailAnnouncement({ id })
    if (!getAnnouncement) return response.res200(res, "001", "no announcement data with ths id")

    return response.res200(res, "000", "Sukses mendapatkan data pengumuman", getAnnouncement)
  } catch (error) {
    console.error(error)
    return response.res200(res, "001", "Interaksi gagal.")
  }
}
