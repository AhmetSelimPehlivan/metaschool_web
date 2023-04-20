const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fireabase = require('firebase')
const refreshTokens = [];

const generateAccessToken = () => { 
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};
const generateRefreshToken = () => {
    return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
};

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err)
            return res.status(403).json("Token is not valid!");
        else{
            req.user = user;
            next();
        }
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

module.exports.signup_post = async (req, res) => {
    try {
        if(await User.findOne({ user_name: req.body.user_name }))
            return res.status(409).json({ message: "!User with given User Name already Exist" });
        else{
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            await new User({...req.body, password: hashPassword}).save();
            res.status(201).json({ message: "User created successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}

module.exports.signup_get = async(req, res) => {
    const db = fireabase.firestore();
    const peopleRef = db.collection('Users').doc('associates')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }
    return res.sendStatus(201)
}

module.exports.login_post = async (req, res) => {
    try {
        console.log("login_post")
        const user = await User.findOne({ user_name: req.body.user_name });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!user || !validPassword)
            return res.status(401).json({ message: "!Invalid Email or Password" });
        else{
            const accessToken = generateAccessToken();
            const refreshToken = generateRefreshToken();
            refreshTokens.push(refreshToken);
            res.status(200).json({ user_name: user.user_name, accessToken: accessToken, refreshToken: refreshToken, message: "logged in successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error\n",error });
    }
}

module.exports.logout_get = async (req, res) => {
    req.session.destroy((error) => {
        if(error)
            return res.status(500).json({ message: "Internal Server Error\n",error });
        res.clearCookie(process.env.COOKIE_NAME)
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.status(201).json({ message: "Successfully Logout" });
    });
}