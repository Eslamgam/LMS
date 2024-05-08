const asyncWrapper = require("../middelware/asyncWrapper");

const appError = require("../utils/appError");

const httpStatusText = require('../utils/httpStatusText');
const { v4: uuid } = require('uuid')
const validatorMiddelware = require("../middelware/validatorMiddelware");
const Lecture = require("../models/lecture.model");
const LectureFile = require("../models/lectureFile.model");

exports. getAllLectureFiles = asyncWrapper(
    async (req, res, next) => {
        const lecturefile = await LectureFile.findAll({
            where:{lecture_ID:req.params.lectureId},
                include: [{
                    model: Lecture,
                    attributes:['lecture_title' , 'lecture_type']
                }],
            }
           
        );
        if(lecturefile.length==[0]){
            return next(appError.create('lecture id does not exist', 404, httpStatusText.FAIL))
                
        }
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { lecturefile } })
    }
)


exports. addLectureFile = asyncWrapper(
    async (req, res, next) => {
        const {   lecture_ID  ,file_path   ,lecture_file_name} = req.body
        console.log('req=========', req.file);

        validatorMiddelware
        const lecturefile = await LectureFile.findOne({
            where: { lecture_file_name }
        });
        if (lecturefile) {
            return next(appError.create('lecturefile already exist', 401, httpStatusText.FAIL))
        }

        const newlecturefile = new LectureFile({
            lecture_file_ID:uuid(),
            lecture_ID,
            file_path :req.file.filename,
            lecture_file_name
        })
        await newlecturefile.save()

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newlecturefile } })
    }
)

// exports. addLectureFileToLectue = asyncWrapper(
//     async (req, res, next) => {
//         const { lecture_file_ID,  lecture_ID  ,file_path,lecture_file_name  } = req.body
//         console.log('req=========', req.file);
//         const id = req.params.lectureId
//         validatorMiddelware
//         const lecture = await Lecture.findOne({
//             where: { lecture_ID:id }
//         });
//         if (!lecture) {
//             return next(appError.create('lecture already exist', 401, httpStatusText.FAIL))
//         }

//         const newlecturefile = new LectureFile({
//             lecture_file_ID,
//             lecture_ID:id,
//             file_path :req.file.filename,
//             lecture_file_name
           
//         })
//         await newlecturefile.save()

//         return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newlecturefile } })
//     }
// )



exports. getLectureFile= asyncWrapper(
    async (req, res, next) => {
        const id = req.params.lectureFileId
        const lecturefile = await LectureFile.findOne({
            where: { lecture_file_ID: id },
            include: [{
                model: Lecture,
                attributes:['lecture_title' , 'lecture_type']
            }],
        });
        if (!lecturefile) {
            return next(appError.create('lecturefile does not exist', 404, httpStatusText.FAIL))
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { lecturefile } })
    }
)



exports. updateLectureFile = asyncWrapper(
    async (req, res, next) => {
        const {  file_path   ,lecture_file_name} = req.body
        validatorMiddelware
        const id = req.params.lectureFileId;
        const lecturefile = await LectureFile.findOne({
            where: { lecture_file_ID: id }
        })
        if (!lecturefile) {
            return next(appError.create('lecturefile does not exist', 401, httpStatusText.FAIL))
        }

        const updatedLectureFile = await LectureFile.update(
            { file_path: file_path, lecture_file_name: lecture_file_name, updatedAt: Date }, { where: { lecture_file_ID: id } }

        )
        if (updatedLectureFile > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `lecturefile with ID ${id} updated successfully` })
        } else {
            return next(appError.create('lecturefile does not exist', 401, httpStatusText.FAIL))
        }

    }
)


exports. deleteLectureFile = asyncWrapper(
    async (req, res, next) => {

        const id = req.params.lectureFileId;
        const lecturefile = await LectureFile.findOne({
            where: { lecture_file_ID: id }
        })
        if (!lecturefile) {
            return next(appError.create('lecturefile does not exist', 401, httpStatusText.FAIL))
        }

        const deletedLectureFile = await LectureFile.destroy(
            { where: { lecture_file_ID: id } }

        )

        if (deletedLectureFile > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `lecturefile with ID ${id} deleted successfully` })
        } else {
            return next(appError.create('lecturefile does not exist', 401, httpStatusText.FAIL))
        }

    }
)

