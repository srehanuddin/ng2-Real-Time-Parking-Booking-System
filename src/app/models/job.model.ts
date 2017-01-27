export const JobType = {
    Company : "Part Time",
    Student : "Full Time"
}

interface JobModel {
    uid : String,
    Company : String
    JobTitle : String,
    JobDescription : String,
    Salary : String,
    JobType : String,    
}
export default JobModel;