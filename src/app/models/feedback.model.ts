
interface FeedbackReplyModel {
    uid : String,
    FirstName : String,
    LastName : String,
    Text : String
}

interface FeedbackModel {
    uid : String,
    FirstName : String,
    LastName : String,
    Title : String,
    Description : String,
    Reply? : FeedbackReplyModel[]
}
export default FeedbackModel;