CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(100) UNIQUE,
  tc_number VARCHAR(100) UNIQUE,
  birth_date DATE,
  gender VARCHAR(10) NOT NULL,
  address TEXT,
  medical_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sugar_levels (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  measured_at TIMESTAMP,
  sugar_value INTEGER
);
