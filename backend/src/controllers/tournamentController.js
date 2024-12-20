const db = require("../database");
const crypto = require("crypto");

async function create(req, res) {
  const pool = await db.connect();

  const { oid } = req.params;
  const { name, startDate, sport } = req.body;

  console.log(name,startDate,sport,oid)

  const org = await pool.query("SELECT FROM organizations WHERE oid = $1", [
    oid,
  ]);

  if (org.rowCount === 0) {
    pool.release();
    return res.json({ error: "Organization not found", statusCode: 7 });
  }

  let id = 0;
  let tournamentWithSameId;
  do {
    id = parseInt(Math.random() * 10 * parseInt(process.env.SIZEOF_ID));

    tournamentWithSameId = await pool.query(
      "SELECT FROM tournaments WHERE tid=$1",
      [id]
    );
  } while (tournamentWithSameId.rowCount != 0);

  await pool.query(
    "INSERT INTO tournaments VALUES ($1, $2, $3, to_timestamp($4), $5)",
    [id, name, oid, startDate, sport]
  );

  pool.release();

  res.json({ msg: "Tournament created", statusCode: 333 });
}

 async function get(req, res) {
   const pool = await db.connect();

   const { tid } = req.params;

   const tournament = await pool.query(
     "SELECT t.tid, t.name as tournamentName, o.oid, o.name as ownerName, t.startDate, s.name as sportName FROM tournaments t JOIN sports s ON t.sport = s.sid JOIN organizations o ON t.owner = o.oid WHERE t.tid = $1",
     [tid]
   );
   const tournamentCompetitors = await pool.query(
     "SELECT o.oid, o.name FROM tournament_competitors tc JOIN organizations o ON tc.oid = o.oid WHERE tc.tid = $1",
     [tid]
   );

   pool.release();

   if (tournament.rowCount === 0)
     return res.json({ error: "Tournament not found", statusCode: 7 });

   let result = {
     tid: tournament.rows[0].tid,
     tournamentName: tournament.rows[0].tournamentname,
     owner: {
       oid: tournament.rows[0].oid,
       name: tournament.rows[0].ownername,
     },
     startDate: tournament.rows[0].startDate,
     sport: tournament.rows[0].sportname,
     competitors: [],
   };

   tournamentCompetitors.rows.forEach((row) => {
     result.competitors.push({
       oid: row.oid,
       name: row.name,
     });
   });

   res.json({ tournament: result, statusCode: 222 });
 }

async function getAll(req, res) {
  const pool = await db.connect();

  const tournament = await pool.query(
    "SELECT t.tid, t.name as tournamentName, o.oid, o.name as ownerName, t.startDate, s.name as sportName FROM tournaments t JOIN sports s ON t.sport = s.sid JOIN organizations o ON t.owner = o.oid"
  );
  const tournamentCompetitors = await pool.query(
    "SELECT o.oid, o.name, tc.tid FROM tournament_competitors tc JOIN organizations o ON tc.oid = o.oid"
  );

  pool.release();

  let result = [];

  tournament.rows.forEach((tournament) => {
    let i = result.push({
      tid: tournament.tid,
      name: tournament.tournamentname,
      owner: {
        oid: tournament.oid,
        name: tournament.ownername,
      },
      startDate: tournament.startDate,
      sport: tournament.sportname,
      competitors: [],
    });

    tournamentCompetitors.rows.forEach((competitor) => {
      if (tournament.tid === competitor.tid) {
        result[i - 1].competitors.push({
          oid: competitor.oid,
          name: competitor.name,
        });
      }
    });
  });

  res.json({ tournaments: result, statusCode: 222 });
}

async function remove(req, res) {
  const pool = await db.connect();

  const { tid } = req.params;

  const tournament = await pool.query(
    "SELECT FROM tournaments WHERE tid = $1",
    [tid]
  );

  if (tournament.rowCount === 0) {
    pool.release();
    return res.json({ error: "Tournament not found", statusCode: 7 });
  }

  await pool.query("DELETE FROM tournaments WHERE tid = $1", [tid]);

  pool.release();

  res.json({ msg: "Tournament deleted", statusCode: 999 });
}

async function addOrg(req, res) {
  const pool = await db.connect();

  const { tid, oid } = req.params;

  const tourAndOrg = await pool.query(
    "SELECT FROM tournaments, organizations WHERE tid = $1 AND oid = $2",
    [tid, oid]
  );

  if (tourAndOrg.rowCount === 0) {
    pool.release();
    return res.json({
      error: "Tournament or organization not found",
      statusCode: 7,
    });
  }

  const conflictedRelations = await pool.query(
    "SELECT FROM tournament_competitors WHERE tid = $1 AND oid = $2",
    [tid, oid]
  );

  if (conflictedRelations.rowCount > 0) {
    pool.release();
    return res.json({
      error: "Organization already added in tournament",
      statusCode: 69,
    });
  }

  await pool.query("INSERT INTO tournament_competitors VALUES ($1, $2)", [
    tid,
    oid,
  ]);

  pool.release();

  res.json({ msg: "Organization added to tournament", statusCode: 666 });
}

async function removeOrg(req, res) {
  const pool = await db.connect();

  const { tid, oid } = req.params;

  const tourAndOrg = await pool.query(
    "SELECT FROM tournament_competitors WHERE tid = $1 AND oid = $2",
    [tid, oid]
  );

  if (tourAndOrg.rowCount === 0) {
    pool.release();
    return res.json({
      error: "Tournament or organization not found",
      statusCode: 7,
    });
  }

  await pool.query(
    "DELETE FROM tournament_competitors WHERE tid = $1 AND oid = $2",
    [tid, oid]
  );

  pool.release();

  res.json({ msg: "Organization removed from tournament", statusCode: 999 });
}

async function random(req, res) {
  const dbClient = await db.connect();
  const id = req.params.id;

  try {
    const aux = await dbClient.query(
      `SELECT o.name AS organization_name
             FROM organizations o
             JOIN tournament_competitors tc ON o.oid = tc.oid
             JOIN tournaments t ON tc.tid = t.tid
             WHERE t.tid = $1;`,
      [id]
    );

    const teams = aux.rows.map((row) => row.organization_name);

    const sortedTeams = teams.sort((a, b) => {
      const hashA = crypto.createHash("sha256").update(a).digest("hex");
      const hashB = crypto.createHash("sha256").update(b).digest("hex");
      return hashA.localeCompare(hashB);
    });

    console.log(sortedTeams);
    return res.status(200).json({ teams: sortedTeams });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  } finally {
    dbClient.release();
  }
}

async function Sports(req, res) {
  const dbClient = await db.connect();

  try {
    const response = await dbClient.query("SELECT * FROM sports");

    dbClient.release();
    if (response.rowCount === 0) {
      return res.status(400).json({ message: "No sports available" });
    } else {
      return res.status(200).json({ data: response.rows });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
}

async function Formats(req, res) {
  const dbClient = await db.connect();

  try {
    const response = await dbClient.query("SELECT * FROM formats");

    dbClient.release();
    if (response.rowCount === 0) {
      return res.status(400).json({ message: "No formats available" });
    } else {
      return res.status(200).json({ data: response.rows });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
}

module.exports = {
  create,
  
  getAll,
  remove,
  addOrg,
  removeOrg,
  random,
  Sports,
  Formats,
};
