const db = require("../../config/database.")
saveCategorie = (req, res) => {
    const {nom} = req.body
    if(!nom){
        return res.status(400).json({ error: "nom catalogue requis !"});
    }
    db.query(
        "Select * from catalogue where nom = ?",
        [nom],
        async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if( results.lenght === 0 ){
                
            }
        }
    )
}