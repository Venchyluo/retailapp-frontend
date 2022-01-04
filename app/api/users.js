import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);
//userInfo : name, email, password

export default { register };
