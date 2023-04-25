const firebase = require("../firebase_connection");
module.exports.addTask_post = async (req, res) => {
    try {
        const taskRef = firebase.database().ref('/Tasks');
        taskRef.push({
            "game_id": req.body.game_id,
            "game_name": req.body.game_name,
            "game_result": req.body.game_result
        })
        res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}

module.exports.updateTask_post = async (req, res) => {
    /*try {
        if(await Task.updateOne({game_id: req.body.game_id}, { $set: { finished_level: req.body.finished_level } }) != null )   
            res.status(201).json({ message: "UserStack is Full" });
        else
            res.status(409).json({ message: "Task is not found" });
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }*/
}

module.exports.getTasks_get = async (req, res) => {
    try {
        const rootRef = firebase.database().ref('/Tasks');
        rootRef.once('value', (snapshot) => {
            res.status(201).json({tasks: snapshot.val(), message: "Tasks are gotten successfully" });
        }, (error) => {console.error(error);});
     } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}
module.exports.removeTask_post = async (req, res) => {
    /*
    try {
        await Task.findOneAndRemove({ game_id: req.body.game_id})
        res.status(201).json({ message: "Task is finished successfully" });
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }*/
}