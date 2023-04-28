const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const firebase = require("../firebase_connection");
const refreshTokens = [];

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWTPRIVATEKEY, { expiresIn: '1d' })
  }
function generateRefreshToken (user) {
    return jwt.sign(user, process.env.JWTPRIVATEKEY, { expiresIn: '15d' });
};

module.exports.authenticateToken = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err)
            res.status(403).json("Token is not valid!");
        else
            res.status(200).json({user: user, message: "authenticated!"});
        });
    } else {
        res.status(401).json({status: 401, message: "You are not authenticated!"});
    }
};

module.exports.gettoken_get= async (req, res) =>{
    const refreshToken = req.body.token
    if (refreshToken == null || !refreshTokens.includes(refreshToken)) return res.status(403).json("Session is not found");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Session is expired");
    const accessToken = generateAccessToken({ name: user.name })
        res.status(201).json({ accessToken: accessToken })
    })
  }

module.exports.signup_post = async (req, res) => {
    try {
        const usersRef = firebase.database().ref('/Users');
        usersRef.once('value', (snapshot) => {
            const user = Object.values(snapshot.val()).find((userData) => userData.user_name === req.body.user_name);

            if (user!==undefined)
                res.status(401).json({ message: "!This User Is Already Exist" });
            else
                usersRef.push({
                    "user_name": req.body.user_name,
                    "password": crypto.createHash('sha256').update(req.body.password).digest('hex'),
                    "role": "User"
                })
                .then(() => res.status(201).json({accessToken: generateAccessToken(req.body.user_name), message: "User created successfully" }));
        });
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}

module.exports.signup_get = async(req, res) => {
    const rootRef = firebase.database().ref('/Users');
    rootRef.once('value', (snapshot) => {
    }, (error) => {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    });
    res.status(201).json({users: snapshot.val(), message: "Tasks are gotten successfully" });
}

module.exports.login_post = async (req, res) => {
    try {
        const userRef = firebase.database().ref('/Users');
        userRef.once('value', (snapshot) => {
            const user = Object.values(snapshot.val()).find((userData) => userData.user_name === req.body.user_name);
            const hashPass = crypto.createHash('sha256').update(req.body.password).digest('hex');
            
            if (user!=null && hashPass===user.password){
                const accessToken = generateAccessToken(user.name);
                const refreshToken = generateRefreshToken(user.name);
                refreshTokens.push(refreshToken);
                res.status(200).json({ user_name: user.user_name, accessToken: accessToken, message: "logged in successfully" });
            }
            else
                res.status(401).json({ message: "!Invalid Email or Password" });
        }, (error) => {console.error(error);});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error\n",error });
    }
}

module.exports.logout_get = async (req, res) => {
    req.session.destroy((error) => {
        if(error)
            return res.status(500).json({ message: "Internal Server Error\n",error });
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.status(201).json({ message: "Successfully Logout" });
    });
}