-- Enable the pg_notify extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_notify;

-- TRIGGER FUNCTION FOR USER UPDATES
CREATE OR REPLACE FUNCTION notify_user_update() 
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify("user_changes", json_build_object(
    'action', TG_OP,
    'id', NEW.id
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER FOR USER UPDATES
DROP TRIGGER IF EXISTS user_update_trigger ON user;
CREATE TRIGGER user_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON user
FOR EACH ROW EXECUTE FUNCTION notify_user_update();


-- TRIGGER FUNCTION FOR LOBBY UPDATES
CREATE OR REPLACE FUNCTION notify_lobby_update() 
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify("lobby_changes", json_build_object(
    'action', TG_OP,
    'id', NEW.id
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER FOR LOBBY UPDATES
DROP TRIGGER IF EXISTS lobby_update_trigger ON lobby;
CREATE TRIGGER lobby_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON lobby
FOR EACH ROW EXECUTE FUNCTION notify_lobby_update();


-- TRIGGER FUNCTION FOR GAME UPDATES
CREATE OR REPLACE FUNCTION notify_game_update() 
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify("game_changes", json_build_object(
    'action', TG_OP,
    'id', NEW.id
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER FOR GAME UPDATES
DROP TRIGGER IF EXISTS game_update_trigger ON game;
CREATE TRIGGER game_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON game
FOR EACH ROW EXECUTE FUNCTION notify_game_update();
