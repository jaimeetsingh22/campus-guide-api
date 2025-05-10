import { client } from "../config/NilePostgresConfig.js";

const getUser = async (req, res) => {
  const email = req.query.email;
  try {
    const result = await client.query(
      `select * from users where email='${email}'`
    );

    return res.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json("something went wrong", { status: 500 });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, image } = req.body;

    const result = await client.query(
      `INSERT INTO USERS VALUES(DEFAULT, '${name}', '${email}', '${image}')`
    );

    return res.json(
      {
        result,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.json("something went wrong", {
      status: 500,
    });
  }
};

export { getUser, createUser };
