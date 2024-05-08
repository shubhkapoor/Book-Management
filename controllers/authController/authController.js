const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const config = require('../../config/config');
const util = require('util');

const signToken = id => {
    return jwt.sign({id}, config.secret, {
        expiresIn: config.loginExpire
    });
}

const createSendResponse = (user, status, res) => {

    const token = signToken(user._id);

    res.cookie('jwt', token, {
        maxAge: config.loginExpire,
        httpOnly: true
    });

    user.password = undefined;

    res.status(status).json({
        status: 'success',
        token,
        data: user
    });
}

exports.login = async (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
        res.status(404).json({
            status: 'fail',
            message: 'Please provide correct userName and password for logging in!'
        });

        return;
    }

    const user = await User.findOne({ userName, password });

    if (!user || user == null) {
        res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });

        return;
    }

    // res.status(200).json({
    //     status: 'success',
    //     data : user
    // });
    createSendResponse(user, 200, res);
};


exports.signUp = async (req, res, next) => {
    const newUser = await User.create(req.body);
    createSendResponse(newUser, 201, res);

    // res.status(201).json({
    //     status:'success',
    //     data: newUser
    // });
};


exports.protect = async (req, res, next) => {

    const testToken = req.headers.authorization;
    let token;

    if(testToken && testToken.startsWith('Bearer')) {
        token = testToken.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({
            status: 'fail',
            message: 'User not logged in'
        })

        return;
    }

    const decodedToken = await util.promisify(jwt.verify)(token , config.secret).then().catch(e=>{
        if(e.name === 'JsonWebTokenError') {
            res.status(500).json({
                status: 'error',
                message : 'Invalid Token'
            })
        }

        if(e.name === 'TokenExpiredError') {
            res.status(500).json({
                status : 'error',
                message: 'Token Expired'
            })
        }
    });

    // console.log('decodedToken=> ' , decodedToken);

    const user = await User.findById(decodedToken.id);

    if(!user) {
        res.status(404).json({
            status: 'fail',
            message: 'User with given token doesnot exist'
        })

        return;
    }

    next();
}