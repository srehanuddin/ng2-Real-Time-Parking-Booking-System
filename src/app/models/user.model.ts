export const UserType = {
    User : "User",
    Admin : "Admin"
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
    AccountType : String
}
export default UserModel;
