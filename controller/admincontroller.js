const admin = require('../model/adminmodel');

const jwt = require('jsonwebtoken');

const Joi = require('joi');

let registerData = async (req, res) => {

        try {
        let email = await admin.findOne({ email: req.body.email });
        if (email) {
            return res.json({ status: 400, msg: 'Authentication token is required ' });
        }
        else {
            let data = await admin.create(req.body);
            if (data) {
                return res.json({ status: 200, msg: 'admin added successfully ' });
            } else {
                return res.json({ status: 400, msg: 'Enter All information' });
            }
        }

    } catch (err) {
        console.log('add admin err : ', err);
    }
    // req.body.role = "Admin";
    // try {
    //     let chackdata = await admin.findOne({ email: req.body.email });
    //     if (chackdata) {
    //         if (chackdata) {
    //             return res.json({ status: 200, msg: "Authentication token is required" })
    //         } else {
    //             await admin.create(req.body)
    //             return res.json({ status: 201, msg: "Data added successfully" })
    //         }
    //     }
    //     else {
            // const schema = Joi.object({
            //     email: Joi.string().email().required(),
            //     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
            //   });
              
            //   // Validate the request body
            //   const { error } = schema.validate(req.body);
            //   if (error) {
            //     return res.status(400).json({ status: 400, msg: error.details[0].message });
            //   }
              
    //         let data = await admin.create(req.body);
    //         if (data) {
    //             return res.json({ status: 201, msg: 'admin added successfully' });
    //         } else {
    //             return res.json({ status: 400, msg: 'Enter All information' });
    //         }
    //     }

    // } catch (err) {
    //     return res.status(500).json({ status: 500, msg: "Internal Server Error" });
    // }
}

let loginData = async (req, res) => {
       // Validate email and password
       const schema = Joi.object({
       email: Joi.string().email().required(),
       password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
    });

      // Validate the request body
    const { error } = schema.validate(req.body);
    if (error) {
    return res.status(400).json({ status: 400, msg: error.details[0].message });
  }

    let chekemail = await admin.findOne({ email: req.body.email });
    if (chekemail) {
    if (chekemail.password == req.body.password) {
      let token = jwt.sign({ data: chekemail }, 'bhavin', { expiresIn: 85200 });
      // console.log(token);
            return res.json({ status: 200, msg: "your token: ", token });
         }
         else {
             return res.json({ status: 300, msg: "increakt password" });
               }
           }
           else {
          return res.json({ status: 300, msg: "email not exsited" });
      }      

        // let chekemail = await admin.find({ 
        //     $or: [
        //         { email: { $regex: '.*' + /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ + '.*', $options: 'i' } },
        //         { password: { $regex: '.*' + /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ + '.*', $options: 'i' } }
        //     ]
        //  });  

}

let addData = async (req, res) => {
    
    // let counter = 1;
    // req.body._id = `custom_id_${counter++}`;

    try {
        var singleimage = '';
        if (req.files.image) {
            singleimage = admin.singlepath + '/' + req.files.image[0].filename;
        }
        req.body.image = singleimage;

        var multimage = [];
        if (req.files.multimage) {
            for (var i = 0; i < req.files.multimage.length; i++) {
                multimage.push(admin.multimage + '/' + req.files.multimage[i].filename)
            }
        }
        req.body.multimage = multimage;
     
        // req.body._id = generateCustomId();
        // function generateCustomId() {
        //     return `custom_id_${Math.floor(Math.random() * 10000)}`;
        // }

        let chackdata = await admin.findOne({ email: req.body.email });
        if (chackdata) {
            return res.json({ status: 200, msg: "Data alredy add" })
        } else {
            await admin.create(req.body)
            return res.json({ status: 500, msg: "Data added successfully" })
        }

    }
    catch {
        return res.json({ status: 500, msg: "Data is not defind" })
    }
}

let getAllData = async (req, res) => {
    let data = await admin.find({});
    return res.json(data);
}

let updateData = async (req, res) => {
    try {
        let data = await admin.findById(req.params.id);
        // console.log(data);
        if (data) {
            let dataupdate = await admin.findByIdAndUpdate(data.id, req.body)
            if (dataupdate) {
                return res.json({ status: 200, msg: "Data is update" })
            } else {
                return res.json({ status: 500, msg: "Data not update" })
            }
        } else {
            return res.json({ status: 500, msg: "Data is not update" })
        }
    }
    catch {
        return res.json({ status: 500, msg: "Data is not defind" })
    }
}

let deletedata = async (req, res) => {
    try {
    let data = await admin.findById(req.params.id);
         if (data) {
            let deletedata = await admin.findByIdAndDelete(data.id)
            if (deletedata) {
                return res.json({ status: 200, msg: "data delete" })
            } else {
                return res.json({ status: 500, msg: "delete" })
            }
        } else {
               return res.json({ status: 500, msg: "Delete operation failed" })
        }
    }
    catch {
        return res.json({ status: 500, msg: "Data is not defind" })
    }
}

let getData = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortField = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';

    const filter = req.query.filter || {};

    const search = req.query.search || '';

    const query = {
        // $and: [{ email: { $regex: search, $options: 'i' } }, filter],
        $and: [{ name: { $regex: search, $options: 'i' } }, filter],    
    };

    const total = await admin.countDocuments(query);

    const Data = await admin.find(query)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit);

    res.json({
        total,
        page,
        limit,
        data: Data,
    });
};

    module.exports = {
        registerData,
        loginData,
        addData,
        getAllData,
        updateData,
        deletedata,
        getData,
};
    