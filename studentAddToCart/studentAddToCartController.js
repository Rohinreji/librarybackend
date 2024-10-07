const studentAddToCartSchema=require("./studentAddToCartSchema")

const studentAddToCart=async (req,res)=>{
    try {
        let cart=new studentAddToCartSchema({
            studentId:req.body.studentId,
            booksId:req.body.booksId,
            addedQuantity:req.body.addedQuantity
        })
        const result=await cart.save()
        res.status(200).json({
            data:result,
            msg:"Book added to cart"
        })
    } catch (error) {
        res.status(400).json({
            error:error,
            msg:"error"
        })
    }
}
module.exports={studentAddToCart}