import { createConnection, Connection } from "mysql2/promise";

let connection: Connection | null = null;

const connectDatabase = async (): Promise<Connection> => {
  try {
    if (!connection) {
      connection = await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
      });
    }
    return connection;
  } catch (error) {
    console.log("connectDatabase error:", error);
    throw error;
  }
};

const disconnectDatabase = async (): Promise<void> => {
  try {
    if (connection) {
      await connection.end();
    }
  } catch (error) {
    console.log("disconnectDatabase error:", error);
    throw error;
  } finally {
    connection = null;
  }
};

// TODO: Promise any를 적당한 타입으로 바꿔보기
export default async function executeDB(query: string): Promise<any> {
  const connection = await connectDatabase();

  try {
    // 데이터베이스에서 데이터를 가져오는 작업 수행
    const [rows] = await connection.execute(query);

    return rows;
  } catch (error) {
    console.error("executeDB error:", error);
    return error;
  } finally {
    // 작업이 끝나면 데이터베이스 연결 종료
    await disconnectDatabase();
  }
}
