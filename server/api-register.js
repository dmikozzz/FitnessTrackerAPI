import users from "./api/users.js";
import workout from './api/workout.js';


export default function (server, mongoose) {

  users(server, mongoose)
  workout(server,mongoose);

}