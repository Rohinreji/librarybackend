const tutorAddToCartSchema  = require("./tutorAddToCartSchema")
const tutorCart =async (req,res) =>
{
  try {
    let cart = new tutorAddToCartSchema({
        tutorId:req.body.tutorId,
        booksId:req.body.booksId
          })
    const result = await cart.save()
    res.status(200).json({
        data:result,
        msg:"Book added to cart"
    })
  } catch (error) {
    res.status(400).json({
        err:error,
        msg:"error"
    })
  }

}

const viewTutorCart =async (req,res) =>
{
  try {
    const result = await tutorAddToCartSchema.find({tutorId:req.body.tutorId})
    .populate("booksId")
    res.status(200).json({
      data:result,
        msg:"data retrieved"
    })
  } catch (error) {
    res.status(400).json({
        err:error
    })
  }
}

const removeFromCart = async (req,res) =>
{
  try {
    const result = await tutorAddToCartSchema.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({
      data:result,
      msg:"book removed from cart"
    })
  } catch (error) {
    res.status(400).json({
      err:error,
     msg:error
    })
  }
}

module.exports ={tutorCart,viewTutorCart,removeFromCart}