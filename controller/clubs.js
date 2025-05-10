import { client } from "../config/NilePostgresConfig.js";

const getAllClubs = async (req, res) => {
  const result = await client.query("select * from clubs order by name asc");
  return res.json(result.rows);
};

const createClub = async (req, res) => {
  const { clubName, imageUrl, about } = await req.body;
  try {
    const result = await client.query(
      `insert into clubs values(DEFAULT, '${clubName}', '${imageUrl}', '${about}',DEFAULT)`
    );

    return res.json(result);
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

export { getAllClubs, createClub };
