import { client } from "../config/NilePostgresConfig.js";

const getEventAllEvents = async (req, res) => {
  try {
    const result = await client.query(`
              select  events.*, users.name as username from events inner join
              users on events.createdby = users.email order by id desc
              `);

    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

const addEvent = async (req, res) => {
  try {
    const {
      eventName,
      bannerUrl,
      location,
      link,
      eventDate,
      eventTime,
      email,
    } = req.body;

    const result = await client.query(`
        insert into events values(
        DEFAULT,
        '${eventName}',
        '${location}',
        '${link}',
        '${bannerUrl}',
        '${eventDate}',
        '${eventTime}',
        '${email}',
        DEFAULT
        )
        `);

    return res.json(result);
  } catch (error) {
    console.error(error.message);
    return res.json({ error: "Error" }, { status: 500 });
  }
};

export { getEventAllEvents, addEvent };
