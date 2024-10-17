const db = require("../database");

async function getTournamentByName(req,res) {
    const dbClient = await db.connect();
    const tournamentName = req.body.tournamentname;
    try{
        const response = await db.query("SELECT * FROM tournament WHERE tournamentname = $1",[tournamentName]);
        if(response.rowCount == 0){
            return res.status(400).json({message:"No tournaments found"});
        }else{
            return res.status(200).json({data: response.rows});
        }
    }catch(error){
        console.log(error);
        return res.status(400).json({error});
    }
}

async function getAllTournament(req,res){
    const dbClient = await db.connect();
    try{
        const response = await db.query("SELECT * FROM tournament");
        if(response.rowCount == 0){
            return res.status(400).json({message: "No tournaments found"});
        }else{
            return res.status(200).json({data: response.rows});
        }
    }catch(error){
        console.log(error);
        return res.status(400).json({error});
    }
}


async function getTournamentById(req, res) {
  const dbClient = await db.connect();
  const id = req.body.id;

  try {
    const response = await db.query("SELECT * FROM tournament WHERE id = $1", [id]);
    console.log(res);
    dbClient.release();
    if (response.rowCount == 0) {
      return res.status(400).json({ message: "ERROR: Tournament not found" });
    } else {
      return res.json({ message: "FOUND", data: response.rows }).status(200);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}

async function create(req, res) {
  const dbClient = await db.connect();
  const tournamentName = req.body.tournamentname;
  const joinDate = req.body.joindate;
  const tournamentDate = req.body.tournamentdate;
  const prize = req.body.prize;
  const format = req.body.format;
  const capacity = req.body.capacity;
  try {
    const response = await db.query(
      "INSERT INTO tournament(tournamentname, joindate, tournamentdate, prize, format, capacity) VALUES ($1,$2,$3,$4,$5,$6);",
      [tournamentName, joinDate, tournamentDate, prize, format, capacity]
    );
    return res.status(200).json({message:"created"});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}

async function deleteByName(req,res) {
    const dbClient = await db.connect();
    const tournamentName = req.body.tournamentname;
    try{
        const response = await db.query(
            "DELETE FROM tournament WHERE tournamentname = $1;"
        ,[tournamentName]);
        if(response.rowCount > 0){
            return res.status(200).json({message:"removed"});
        }else{
            return res.status(400).json({message:"not found"})
        }
        
    }catch(error){
        console.log(error);
        return res.status(400).json({error});
    }
}

module.exports = { getTournamentById ,create ,deleteByName ,getAllTournament,getTournamentByName};