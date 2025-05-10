import { client } from "../config/NilePostgresConfig.js";

const getAllComments = async (req, res) => {
  const postId = req.query.postid;

  try {
    if (!postId) {
      return res.json({ error: "Post ID is required" }, { status: 400 });
    }

    const result = await client.query(
      `select comments.* , users.name as username from comments inner join users on comments.user_email = users.email where post_id =${postId} ORDER by commented_on desc`
    );

    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

const createComment = async (req, res) => {
  const { postId, userEmail, comment } = req.body;
  try {
    if (!postId || !userEmail || !comment) {
      return res.json(
        { error: "Missing postId, userEmail or comment" },
        { status: 400 }
      );
    }

    const result = await client.query(`
      INSERT INTO comments VALUES (
        DEFAULT,
        ${postId},
        '${userEmail}',
        '${comment}',
        DEFAULT
      )
    `);

    return res.json({ message: "Comment added", result });
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

export { getAllComments, createComment };
