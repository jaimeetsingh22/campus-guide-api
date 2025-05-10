import { client } from "../config/NilePostgresConfig.js";

const getEvents = async (req, res) => {
  const email = req.query.email;
  try {
    const result = await client.query(
      `select events.* ,users.name as username from events 
          inner join users on events.createdby = users.email 
          inner join event_registration on events.id = event_registration.event_id where event_registration.user_email='${email}' order by event_registration.id desc`
    );

    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

const registerEvent = async (req, res) => {
  const { eventId, userEmail } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO event_registration VALUES(
          DEFAULT,
          ${eventId}
          , '${userEmail}' ,
          DEFAULT
          )`
    );

    return res.json(result);
  } catch (error) {
    console.log(error.message);
    return res.json(
      {
        message: "Error creating post",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

const unregisterEvent = async (req, res) => {
  const eventId = req.query.eventId;
  const userEmail = req.query.userEmail;
  try {
    const result = await client.query(
      `DELETE FROM event_registration WHERE event_id = ${eventId} AND user_email = '${userEmail}'`
    );
    return res.json(result);
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

export { getEvents, registerEvent, unregisterEvent };
