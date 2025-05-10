import { client } from "../config/NilePostgresConfig.js";

const getPosts = async (req, res) => {
  const club = req.query.club;
  const orderField = req.query.orderField;
  try {
    const result = await client.query(
      `select *,post.id as post_id from post inner join users on post.createdby = users.email  where club in (${club}) ORDER BY ${orderField} desc`
    );

    return res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message }).status(500);
  }
};

const addPost = async (req, res) => {
  const { content, imageUrl, visibleIn, email } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO post VALUES(DEFAULT,'${content}','${
        imageUrl ? imageUrl : "No Image"
      }',DEFAULT,'${email}','${visibleIn}')`
    );

    return res
      .json({
        result,
      })
      .status(201);
  } catch (error) {
    return res
      .json({
        message: "Error creating post",
        error: error.message,
      })
      .status(500);
  }
};

export { getPosts, addPost };
