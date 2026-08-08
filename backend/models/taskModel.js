import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
        set: v => {
            if (!v) return v;
            const str = v.toString().trim();
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
    },
    dueDate:{
        type:Date
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });   
const Task=mongoose.models.Task || mongoose.model('Task',taskSchema);
export default Task;