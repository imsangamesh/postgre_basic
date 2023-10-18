const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "sanine",
  port: 5432,
});

async function createStudent(name, age, grade) {
  try {
    await client.connect();
    const query =
      "INSERT INTO students (name, age, grade) VALUES ($1, $2, $3) RETURNING id";
    const values = [name, age, grade];
    const result = await client.query(query, values);

    console.log(`Created student with ID: ${result.rows[0].id}`);
  } catch (error) {
    console.error("Error creating a student: ", error);
  } finally {
    await client.end();
  }
}

async function updateStudent(id, newName, newAge, newGrade) {
  try {
    await client.connect();
    const query =
      "UPDATE students SET name = $1, age = $2, grade = $3 WHERE id = $4";
    const values = [newName, newAge, newGrade, id];

    const result = await client.query(query, values);
    console.log(`Updated student with ID: ${id}`);
  } catch (error) {
    console.error("Error updating a student: ", error);
  } finally {
    await client.end();
  }
}

async function getStudents() {
  try {
    await client.connect();
    const query = "SELECT * FROM students";
    const result = await client.query(query);

    console.log("List of Students: ");
    result.rows.forEach((row) => {
      console.log(
        `ID: ${row.id}, Name: ${row.name}, Age: ${row.age}, Grade: ${row.grade}`
      );
    });
  } catch (error) {
    console.error("Error retrieving students: ", error);
  } finally {
    await client.end();
  }
}

// createStudent("Sanine Pink", 20, 85.5);
// updateStudent(1, "Jane Smith", 22, 90.0);
getStudents();
