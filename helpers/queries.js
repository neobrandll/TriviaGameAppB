const PS = require('pg-promise').PreparedStatement;
let queries = {
        newUser: new PS('new-user', "INSERT INTO USERS ( users_password, users_email) VALUES ($1, $2)"),
        getUser: new PS('get-user', "SELECT * FROM USERS WHERE users_email = $1"),
        newScore: new PS('insert-score', "INSERT INTO SCOREBOARD (users_id, type_game_id, match_score, users_email) VALUES ($1, $2, $3, $4)"),
        getScoreboard: new PS('get-scores', "SELECT * FROM SCOREBOARD WHERE type_game_id = $1 ORDER BY match_score DESC")
}

module.exports = queries;