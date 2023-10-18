import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "sanine",
  port: 5432, // Default PostgreSQL port
});

async function createUser(
  username: string,
  metaData: Record<string, any>
): Promise<void> {
  try {
    await client.connect();
    const query =
      "INSERT INTO user_table (username, meta) VALUES ($1, $2) RETURNING id";
    const values = [username, metaData];
    const result = await client.query(query, values);

    console.log(`Created user with ID: ${result.rows[0].id}`);
  } catch (error) {
    console.error("Error creating a user: ", error);
  } finally {
    await client.end();
  }
}

async function getUser(userId: number): Promise<void> {
  try {
    await client.connect();
    const query = "SELECT * FROM user_table WHERE id = $1";
    const values = [userId];

    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      console.log("User not found");
    } else {
      console.log("User data: ");
      console.log(result.rows[0]);
    }
  } catch (error) {
    console.error("Error getting a user: ", error);
  } finally {
    await client.end();
  }
}

async function updateUser(
  userId: number,
  newMetaData: Record<string, any>
): Promise<void> {
  try {
    await client.connect();
    const query = "UPDATE user_table SET meta = $1 WHERE id = $2";
    const values = [newMetaData, userId];

    await client.query(query, values);
    console.log(`Updated user with ID: ${userId}`);
  } catch (error) {
    console.error("Error updating a user: ", error);
  } finally {
    await client.end();
  }
}

async function deleteUser(userId: number): Promise<void> {
  try {
    await client.connect();
    const query = "DELETE FROM user_table WHERE id = $1";
    const values = [userId];

    await client.query(query, values);
    console.log(`Deleted user with ID ${userId}`);
  } catch (error) {
    console.error("Error deleting a user: ", error);
  } finally {
    await client.end();
  }
}

// createUser("Sanine_pink", { age: 30, email: "sanine@example.com" });
getUser(2);
// updateUser(1, { age: 31, email: 'john.updated@example.com' });
// deleteUser(1);
