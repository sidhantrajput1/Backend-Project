import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
      res.json({
        success : false,
        message : 'Not Authorized Login Again'
      })
    }

    try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = token_decode.id

      next();

    } catch (error) {
      console.log(error)
      // console.log(error.message)
      res.json({ success: false, message: error.message });
    }
};
  
  export default authUser;
  
      // const authHeader = req.headers.authorization;
  
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return res.json({ success: false, message: 'User unauthorized. Login again.' });
    // }
  
    // const token = authHeader.split(" ")[1];
  
    // try {
    //   const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //   req.body.userId = token_decode.id;
    //   next();
    // } catch (error) {
    //   console.log(error);
    //   res.json({ success: false, message: error.message });
    // }