const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDService");

const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUsers: results });
};

const getHoidanit = (req, res) => {
  res.render("sample.ejs");
};

const postCreateUser = async (req, res) => {
  let { email, name, city } = req.body;
  const [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city) VALUES (?,?,?)`,
    [email, name, city]
  );

  res.send(" Create user succeed !");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;

  let user = await getUserById(userId);

  res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let { email, name, city, userId } = req.body;

  await updateUserById(email, name, city, userId);

  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  // const [results, fields] = await connection.query(
  //   `DELETE FROM Users WHERE id = ?`,
  //   [userId]
  // );

  // res.send(" Delete user succeed !");
  res.render("delete.ejs", { userDelete: user });
};

const postHandleRemoveUser = async (req, res) => {
  const userId = req.body.userId;

  await deleteUserById(userId);

  res.redirect("/");
};

module.exports = {
  getHomepage,
  getHoidanit,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
