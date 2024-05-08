const asyncWrapper = require("../middelware/asyncWrapper");
const Department = require("../models/department.model");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const New = require("../models/new.model");
const User = require("../models/user.model");
const University = require("../models/univer.model");

exports. getAllNews= asyncWrapper(
    async(req, res, next)=>{
        const news = await New.findAll({
          where:{faculty_ID:req.params.facultyId},
            include: [{
              model: Faculty,
              attributes: ['faculty_name'], 
         
            }],
          });
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {news}})
    }
)

exports. addNew = asyncWrapper(
    async(req, res, next)=>{
        const {content,file_path,user_ID,faculty_ID} = req.body
        validatorMiddelware
        // const news = await New.findOne({
        //     where: {new_ID}
        // });
        // if(news){
        //     return next(appError.create('news already exist', 401, httpStatusText.FAIL))
        //   }

          const newNew = new New({
            new_ID:uuid(),content,file_path:req.file.filename,user_ID,faculty_ID
          })
          await newNew.save()

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {newNew}})
    }
)


exports. getNew = asyncWrapper(
    async(req, res, next)=>{
       const id = req.params.newId
        const news = await New.findOne({
            where: {new_ID:id},
            include: [{
                model: Faculty,
                attributes: ['faculty_name'], 
              }],
        });
        if(!news){
            return next(appError.create('news does not exist', 404, httpStatusText.FAIL))
          }

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {news}})
    }
)



exports. updateNew  = asyncWrapper(
    async(req, res,next)=>{
        const  {content,file_path} = req.body
        validatorMiddelware
        const id = req.params.newId;
        const news = await New.findOne({
            where: {new_ID:id}
        })
        if(!news){
            return next(appError.create('news does not exist', 404, httpStatusText.FAIL))
          }

          const updatednew = await New.update(
           {content: content,file_path:file_path, updatedAt: Date},{where: {new_ID: id}}
        
          )
          if(updatednew>0){
            return res.status(200).json({status: httpStatusText.SUCCESS, message: `news with ID ${id} updated successfully`})
          }else{
            return next(appError.create('news does not exist', 401, httpStatusText.FAIL))
          }

    }
)


exports. deletenew = asyncWrapper(
    async(req, res,next)=>{
      
        const id = req.params.newId;
        const news = await New.findOne({
            where: {new_ID:id}
        })
        if(!news){
            return next(appError.create('news does not exist', 401, httpStatusText.FAIL))
          }

          const deletednew = await New.destroy(
           {where: {new_ID: id}}
        
          )

          if(deletednew>0){
            return res.status(200).json({status: httpStatusText.SUCCESS, message: `news with ID ${id} deleted successfully`})
          }else{
            return next(appError.create('news does not exist', 401, httpStatusText.FAIL))
          }

    }
)

