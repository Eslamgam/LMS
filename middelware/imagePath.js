


exports.courseImagePath = (req, res, next) => {
    req.body.image_path = req.file.path
    next()
}


exports.facultyImagePath = (req, res, next) => {
    req.body.Logo_path = req.file.path
    next()
}


exports.lectureFileImagePath = (req, res, next) => {
    req.body.file_path = req.file.path
    next()
}

exports.newFilePath = (req, res, next) => {
    req.body.file_path = req.file.path
    next()
}


exports.taskImagePath = (req, res, next) => {
    req.body.file_path = req.file.path
    next()
}

exports.taskAnswerImagePath = (req, res, next) => {
    req.body.file_path = req.file.path
    next()
}

exports.universityImagePath = (req, res, next) => {
    req.body.Logo_path = req.file.path
    next()
}


exports.userImagePath = (req, res, next) => {
    req.body.image_path = req.file.path
    next()
}


