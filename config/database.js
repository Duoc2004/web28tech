const { default: mongoose } = require("mongoose");
module.exports.connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
            console.log("Thanh Cong");
    } catch (error) {
       console.log("That Bai");
    }
}

