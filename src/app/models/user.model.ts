export const UserType = {
    Company : "Company",
    Student : "Student"
}

let tmpArr = [];
for(var key in UserType){
    tmpArr.push(UserType[key])
}
export const UserTypeArr = tmpArr;

interface UserModel {
    uid : String,
    FirstName : String,
    LastName : String,
    Email : String,
    Gender? : String,
    AccountType : String,
    Company : String
}
export default UserModel;
