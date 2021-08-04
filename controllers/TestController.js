exports.protected = (req, res, next) => {
  //   console.log(token);
  return res.json({
    message: "this is a protected route",
    payload: req.payload,
  });
};
