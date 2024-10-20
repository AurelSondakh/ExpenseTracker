import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'expenses.db', location: 'default' },
  () => {
    console.log('Database opened successfully');
    createUserTable();
  },
  (error) => console.error('Error opening database:', error)
);

const createUserTable = (): void => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM users',
      [],
      () => console.log('User table truncated successfully'),
      (error) => console.error('Error truncating user table:', error)
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, role TEXT)',
      [],
      () => {
        console.log('User table created successfully');
        const users = [
          { username: 'admin', password: 'test123', role: 'admin' },
          { username: 'usersatu', password: 'test123', role: 'user' },
          { username: 'userdua', password: 'test123', role: 'user' },
          { username: 'usertiga', password: 'test123', role: 'user' },
        ];

        users.forEach(user => {
          tx.executeSql(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [user.username, user.password, user.role],
            () => console.log(`User ${user.username} added successfully`),
            (error) => console.error(`Error adding user ${user.username}:`, error)
          );
        });
      },
      (error) => console.error('Error creating user table:', error)
    );
  });
};


export { db, createUserTable };
