CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS auth_key (
  id          TEXT PRIMARY KEY NOT NULL,
  permissions TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auth_key_access (
  time        TIMESTAMPTZ DEFAULT now() NOT NULL,
  auth_key_id TEXT REFERENCES auth_key(id) NOT NULL,
  method      TEXT NOT NULL,
  path        TEXT NOT NULL,
  ip          TEXT NOT NULL,
  PRIMARY KEY (time, auth_key_id)
);

CREATE TABLE IF NOT EXISTS device (
  id          TEXT PRIMARY KEY,
  description TEXT,
  last_ip     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS device_heartbeat (
  time      TIMESTAMPTZ DEFAULT now() NOT NULL,
  device_id TEXT REFERENCES device(id) NOT NULL,
  ip        TEXT DEFAULT 'N/A' NOT NULL,
  PRIMARY KEY (time, device_id)
);

CREATE OR REPLACE FUNCTION update_device_last_ip()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the last_ip of the device with the ip from the new row in device_heartbeat
  UPDATE device
  SET last_ip = NEW.ip,
      updated_at = now() -- Update the updated_at timestamp as well
  WHERE id = NEW.device_id;

  -- Return the new row
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_last_ip_trigger
AFTER INSERT ON device_heartbeat
FOR EACH ROW
EXECUTE FUNCTION update_device_last_ip();

SELECT create_hypertable('device_heartbeat','time');
SELECT create_hypertable('auth_key_access','time');

ALTER TABLE device_heartbeat SET (timescaledb.compress,
   timescaledb.compress_orderby = 'time DESC',
   timescaledb.compress_segmentby = 'device_id'
);

ALTER TABLE auth_key_access SET (timescaledb.compress,
   timescaledb.compress_orderby = 'time DESC',
   timescaledb.compress_segmentby = 'auth_key_id'
);

SELECT add_compression_policy('device_heartbeat', compress_after => INTERVAL '60d');
SELECT add_retention_policy('device_heartbeat', INTERVAL '6 months');
SELECT add_compression_policy('auth_key_access', compress_after => INTERVAL '60d');
SELECT add_retention_policy('auth_key_access', INTERVAL '6 months');

CREATE INDEX IF NOT EXISTS idx_device_heartbeat_device_id ON device_heartbeat (device_id, time DESC);
CREATE INDEX IF NOT EXISTS idx_auth_key_access_auth_key_id ON auth_key_access (auth_key_id, time DESC);

