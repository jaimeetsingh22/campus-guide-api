import { client } from "../config/NilePostgresConfig.js";

const getTotalLikes = async (req, res) => {
  const postid = req.query.postid;

  const result = await client.query(
    `select * from likes where post_id=${postid}`
  );

  return res.json(result.rows);
};

const likeAndDislike = async (req, res) => {
  const { postId, userEmail } = req.body;
  try {
    const existing = await client.query(
      `select * from likes where post_id=${postId} and user_email='${userEmail}' `
    );
    if (existing.rows.length > 0) {
      const unliked = await client.query(
        `delete from likes where post_id=${postId} and user_email='${userEmail}'`
      );

      return res.json(unliked);
    } else {
      const result = await client.query(`
                insert into likes values(
                    DEFAULT,
                    ${postId},
                    '${userEmail}',
                    DEFAULT
                )
                `);

      return res.json(result).status(201);
    }
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

export { getTotalLikes, likeAndDislike };
