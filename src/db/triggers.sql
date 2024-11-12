-- TRIGGER FUNCTION FOR USER UPDATES
CREATE OR REPLACE FUNCTION notify_user_update() 
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('user_changes', json_build_object(
    'action', TG_OP,
    'id', NEW.id,
    'name', NEW.name
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER FOR USER UPDATES
DROP TRIGGER IF EXISTS user_update_trigger ON "User";
CREATE TRIGGER user_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON "User"
FOR EACH ROW EXECUTE FUNCTION notify_user_update();


-- TRIGGER FUNCTION FOR LOBBY UPDATES
CREATE OR REPLACE FUNCTION notify_lobby_update() 
RETURNS TRIGGER AS $$
DECLARE
  players_data JSONB;
BEGIN
  PERFORM pg_notify('lobby_changes', json_build_object(
    'action', TG_OP,
    'id', NEW.id
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- TRIGGER FOR LOBBY UPDATES
DROP TRIGGER IF EXISTS lobby_update_trigger ON "Lobby";
CREATE TRIGGER lobby_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Lobby"
FOR EACH ROW EXECUTE FUNCTION notify_lobby_update();


-- TRIGGER FUNCTION FOR GAME UPDATES
CREATE OR REPLACE FUNCTION notify_game_update() 
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('game_changes', json_build_object(
    'action', TG_OP,
    'id', NEW.id
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER FOR GAME UPDATES
DROP TRIGGER IF EXISTS game_update_trigger ON "Game";
CREATE TRIGGER game_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Game"
FOR EACH ROW EXECUTE FUNCTION notify_game_update();
