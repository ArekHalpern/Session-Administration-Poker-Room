instead of adding players to table we will adjust thunks so that sessions are added to the table.

when a session is added to the table a player foreign key will also be created in the player data and attributed to the session data. 

when you click remove, the session will end.


Routes to be updated:
AddPlayer => AddSessionToTable
RemovePlayer => RemoveSessionFromTable


Files to be updated:
SingleTable
AddPlayer (change to AddSessionToTable)

