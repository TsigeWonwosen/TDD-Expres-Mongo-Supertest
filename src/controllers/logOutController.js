const { Employee } = require("../model/Employee");

const handleLogOut = async (req, res) => {
   
   const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundEmployee = await Employee.findOne({ refreshToken }).exec();
    if (!foundEmployee) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundEmployee.refreshToken = '';
    const result = await foundEmployee.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204).json({message});
 };


 module.exports = handleLogOut