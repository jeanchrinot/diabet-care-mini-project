const { Pool } = require("pg")

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://postgres:postgres@db:5432/mydb",
})

async function seed() {
  // Insert patients and get their IDs
  const insertPatients = `
  INSERT INTO patients (
    name, email, phone, tc_number, birth_date,
    gender, address, medical_notes, created_at, updated_at
  ) VALUES
    (
      'Ayşe Yılmaz', 'ayse.yilmaz@example.com', '0532-123-4567', '12345678901',
      '1980-06-15', 'Female', 'Atatürk Mah. 12. Sok. No:5, Kadıköy, İstanbul', 'Allerjik rinit',
      NOW(), NOW()
    ),
    (
      'Mehmet Demir', 'mehmet.demir@example.com', '0505-987-6543', '23456789012',
      '1975-09-20', 'Male', 'Cumhuriyet Cad. No:23 Daire:4, Konak, İzmir', 'Tip 2 diyabet',
      NOW(), NOW()
    ),
    (
      'Elif Kaya', 'elif.kaya@example.com', '0544-321-9876', '34567890123',
      '1990-02-10', 'Female', 'İnönü Mah. Gül Sk. No:18, Nilüfer, Bursa', 'Hipertansiyon',
      NOW(), NOW()
    )
  RETURNING id;
`

  const res = await pool.query(insertPatients)
  const patientIds = res.rows.map((row) => row.id)

  // For each patient, insert 10 sugar values spaced 1 hour apart
  const now = new Date()

  for (const patientId of patientIds) {
    for (let i = 0; i < 10; i++) {
      const measuredAt = new Date(now.getTime() - i * 60 * 60 * 1000)
      const sugarValue = 90 + Math.floor(Math.random() * 60)

      await pool.query(
        `INSERT INTO sugar_levels (patient_id, measured_at, sugar_value)
         VALUES ($1, $2, $3)`,
        [patientId, measuredAt.toISOString(), sugarValue]
      )
    }
  }

  console.log("Seed data inserted.")
  await pool.end()
}

seed().catch((err) => {
  console.error("Error seeding data:", err)
  pool.end()
})
