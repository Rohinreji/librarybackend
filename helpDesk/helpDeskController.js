const helpDeskSchema = require("./helpDeskSchema")
const addMessage  = async (req,res) =>
{
    try {
        const sendMessage = new helpDeskSchema ({
            message :req.body.message,
            tutorId :req.body.tutorId,
            value:req.body.value
        })
      const result = await sendMessage.save()
      return res.status(200).json({
        data:result,
        msg:"message sended successfully"
      })

    } catch (error) {
        res.status(400).json({
            err:error,
            msg:"error"
        })
    }
}

const getMessage = async (req,res) =>
{
    try {
    const result = await helpDeskSchema.find({tutorId:req.params.id})
    res.status(200).json({
        data:result,
        msg:"message received"
    })


    } catch (error) {
        res.status(400).json({
            err:error,
            msg:"error"
        })
    }
}


module.exports = {
    addMessage,
    getMessage
}