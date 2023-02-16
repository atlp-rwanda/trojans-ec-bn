const notFound = (req, res) => {
  res.status(404).json({ status: 404, message: "404 Page Not Found" });
};

export default notFound;
