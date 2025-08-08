const express = require("express")
const { Pool } = require("pg")
const { createClient } = require("redis")

const app = express()
const port = 3000

app.use(express.json()) // Parse JSON bodies

// PostgreSQL setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Redis setup
const redis = createClient({ url: `redis://${process.env.REDIS_HOST}:6379` })
redis.connect()

// Root route
app.get("/", async (req, res) => {
  await redis.set("greeting", "Hello from Redis!")
  const message = await redis.get("greeting")

  const db = await pool.query("SELECT NOW()")
  res.send(
    `🟢 Backend running<br>${message}<br>PostgreSQL time: ${db.rows[0].now}`
  )
})

// Create a new patient
app.post("/patients", async (req, res) => {
  try {
    const {
      name,
      birth_date,
      gender,
      tc_number,
      email,
      phone,
      address,
      medical_notes,
    } = req.body
    const result = await pool.query(
      "INSERT INTO patients (name, birth_date, gender, tc_number, email, phone, address, medical_notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        birth_date,
        gender,
        tc_number,
        email,
        phone,
        address,
        medical_notes,
      ]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error("Error creating patient:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all patients (with simple Redis caching)
app.get("/patients", async (req, res) => {
  try {
    const cacheKey = "patients:all"
    const cached = await redis.get(cacheKey)
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    const result = await pool.query("SELECT * FROM patients ORDER BY id")
    await redis.set(cacheKey, JSON.stringify(result.rows), { EX: 60 }) // cache for 60 seconds
    res.json(result.rows)
  } catch (error) {
    console.error("Error fetching patients:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get a patient by ID
app.get("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params
    const cacheKey = "patients:id=" + id
    const cached = await redis.get(cacheKey)
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    const result = await pool.query("SELECT * FROM patients WHERE id = $1", [
      id,
    ])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" })
    }
    await redis.set(cacheKey, JSON.stringify(result.rows[0]), { EX: 60 }) // cache for 60 seconds
    res.json(result.rows[0])
  } catch (error) {
    console.error("Error fetching patient:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update a patient by ID
app.put("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      birth_date,
      gender,
      tc_number,
      email,
      phone,
      address,
      medical_notes,
    } = req.body
    const result = await pool.query(
      "UPDATE patients SET name = $1, birth_date = $2, gender = $3, tc_number = $4, email = $5, phone = $6, address = $7, medical_notes = $8 WHERE id = $9 RETURNING *",
      [
        name,
        birth_date,
        gender,
        tc_number,
        email,
        phone,
        address,
        medical_notes,
        id,
      ]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error("Error updating patient:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete a patient by ID
app.delete("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query("DELETE FROM patients WHERE id = $1", [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Patient not found" })
    }
    res.json({ message: "Patient deleted successfully" })
  } catch (error) {
    console.error("Error deleting patient:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get sugar levels for a patient
app.get("/patients/:id/sugar-levels", async (req, res) => {
  try {
    const { id } = req.params
    const cacheKey = "sugar-levels:patientId=" + id
    const cached = await redis.get(cacheKey)
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    // Optional: verify patient exists first
    const patientResult = await pool.query(
      "SELECT * FROM patients WHERE id = $1",
      [id]
    )
    if (patientResult.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" })
    }

    const sugarResult = await pool.query(
      "SELECT * FROM sugar_levels WHERE patient_id = $1 ORDER BY measured_at DESC",
      [id]
    )
    await redis.set(cacheKey, JSON.stringify(sugarResult.rows), { EX: 60 }) // cache for 60 seconds
    res.json(sugarResult.rows)
  } catch (error) {
    console.error("Error fetching sugar levels:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
