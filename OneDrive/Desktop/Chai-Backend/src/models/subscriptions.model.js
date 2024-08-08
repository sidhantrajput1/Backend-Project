import mongoose, {Schema, Types} from "mongoose";

const subscriptionSchema = new Schema (
    {

        Subcriber : {
            type: Schema.Types.ObjectId,
            ref: "User"
            // one who is subscribing
        },
        channel: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
},
   {
        timestamps: true
   }
)


export const Subscription = mongoose.model("subscription" , subscriptionSchema)