import mongoose  from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    freelancerToBeApproved:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Freelancer'
        }
    ]
})

const Admin = mongoose.models.Admin||mongoose.model("Admin",adminSchema)
export default Admin