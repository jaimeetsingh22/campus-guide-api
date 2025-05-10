import { client } from "../config/NilePostgresConfig.js";

const getClubFollowers = async (req, res) => {
  const u_email = req.query.u_email;
  console.log(u_email);
  try {
    const result = await client.query(`
       select c.name, cf.* from clubs as c, clubfollowers as cf where c.id = cf.club_id and cf.u_email='${u_email}'
        `);

    return res.json(result.rows, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

const followClub = async (req, res) => {
  try {
    const { clubId, u_email } = req.body;
    console.log(clubId, u_email);

    const result = await client.query(`
                insert into clubfollowers values(DEFAULT,'${clubId}','${u_email}')
                `);

    return res.json(result, { status: 201 });
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

const unfollowClub = async (req, res) => {
  const u_email = req.query.u_email;
  const club_id = req.query.club_id;
  console.log(u_email, club_id);
  try {
    const result = await client.query(`
      DELETE FROM clubfollowers WHERE club_id = '${club_id}'  AND u_email = '${u_email}'
        `);

    return res.json(result, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

export { getClubFollowers, followClub, unfollowClub };
