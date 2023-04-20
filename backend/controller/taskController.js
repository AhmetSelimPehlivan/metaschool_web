
module.exports.addTask_post = async (req, res) => {
    try {
        if (await Task.findOne({ game_id: req.body.game_id })){
            return res.status(409).json({ message: "!Task with given id already exist" });
        }
        else{
            await new Task({...req.body}).save();
        }
        res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}

module.exports.updateTask_post = async (req, res) => {
    try {
        if(await Task.updateOne({game_id: req.body.game_id}, { $set: { finished_level: req.body.finished_level } }) != null )   
            res.status(201).json({ message: "UserStack is Full" });
        else
            res.status(409).json({ message: "Task is not found" });
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getTask_post = async (req, res) => {
    try {
        const Tasks = await Task.find({ game_id: req.body.game_id })
        res.status(201).json({tasks: Tasks, message: "Tasks are gotten successfully" });
     } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}
module.exports.removeTask_post = async (req, res) => {
    try {
        await Task.findOneAndRemove({ game_id: req.body.game_id})
        res.status(201).json({ message: "Task is finished successfully" });
    } catch (error) {
        res.status(500).json({ message: "!Internal Server Error\n",error });
    }
}