const { sendErrorResponse } = require("../../helpers/send.error.response");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      console.log(requiredRoles);
      console.log(req.user.roles);
      const userRoles = req.user.roles.map((role) => role.name);
      const hasRole = requiredRoles.some((reqRole)=>
        userRoles.includes(reqRole)
      );
      if(!hasRole){
        return sendErrorResponse({message: "Sizda bunday role yo'q"}, res);
      }
      next();
    } catch (error) {
      sendErrorResponse(error, res); //403
    }
  };
};
