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
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, role TEXT)',
      [],
      () => {
        console.log('User table created successfully');
        tx.executeSql(
          'DELETE FROM users',
          [],
          () => console.log('User table truncated successfully'),
          (error) => console.error('Error truncating user table:', error)
        );
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

const createUserExpenseTable = (): void => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS userexpenses (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, nominal TEXT, category TEXT, date TEXT)',
      [],
      () => {
        console.log('User userexpenses created successfully');

        tx.executeSql(
          'DELETE FROM userexpenses',
          [],
          () => console.log('userexpenses table truncated successfully'),
          (error) => console.error('Error truncating userexpenses table:', error)
        );

        const users = ['usersatu', 'userdua', 'usertiga'];
        const expensesData = {
          usersatu: [
            { nominal: '50000', category: 'Food', date: '2024-10-01' },
            { nominal: '20000', category: 'Transport', date: '2024-10-01' },
            { nominal: '100000', category: 'Entertainment', date: '2024-10-03' },
            { nominal: '150000', category: 'Utilities', date: '2024-10-04' },
            { nominal: '200000', category: 'Rent', date: '2024-10-05' },
            { nominal: '75000', category: 'Food', date: '2024-10-06' },
            { nominal: '30000', category: 'Transport', date: '2024-10-07' },
            { nominal: '90000', category: 'Entertainment', date: '2024-10-08' },
            { nominal: '120000', category: 'Utilities', date: '2024-10-09' },
            { nominal: '250000', category: 'Rent', date: '2024-10-10' },
          ],
          userdua: [
            { nominal: '40000', category: 'Food', date: '2024-10-01' },
            { nominal: '25000', category: 'Transport', date: '2024-10-01' },
            { nominal: '80000', category: 'Entertainment', date: '2024-10-03' },
            { nominal: '120000', category: 'Utilities', date: '2024-10-04' },
            { nominal: '180000', category: 'Rent', date: '2024-10-05' },
            { nominal: '60000', category: 'Food', date: '2024-10-06' },
            { nominal: '35000', category: 'Transport', date: '2024-10-07' },
            { nominal: '85000', category: 'Entertainment', date: '2024-10-08' },
            { nominal: '110000', category: 'Utilities', date: '2024-10-09' },
            { nominal: '220000', category: 'Rent', date: '2024-10-10' },
          ],
          usertiga: [
            { nominal: '30000', category: 'Food', date: '2024-10-01' },
            { nominal: '15000', category: 'Transport', date: '2024-10-02' },
            { nominal: '70000', category: 'Entertainment', date: '2024-10-03' },
            { nominal: '90000', category: 'Utilities', date: '2024-10-04' },
            { nominal: '200000', category: 'Rent', date: '2024-10-05' },
            { nominal: '55000', category: 'Food', date: '2024-10-06' },
            { nominal: '20000', category: 'Transport', date: '2024-10-07' },
            { nominal: '75000', category: 'Entertainment', date: '2024-10-08' },
            { nominal: '100000', category: 'Utilities', date: '2024-10-09' },
            { nominal: '240000', category: 'Rent', date: '2024-10-10' },
          ],
        };
        users.forEach(username => {
          expensesData[username].forEach((expense: { nominal: string; category: any; date: any; }) => {
            tx.executeSql(
              'INSERT INTO userexpenses (username, nominal, category, date) VALUES (?, ?, ?, ?)',
              [username, expense.nominal, expense.category, expense.date],
              () => console.log(`userexpenses for ${username} added successfully: ${expense.nominal}, ${expense.category}, ${expense.date}`),
              (error) => console.error(`Error adding userexpenses for ${username}:`, error)
            );
          });
        });
      },
      (error) => console.error('Error creating userexpenses table:', error)
    );
  });
};


export { db, createUserTable, createUserExpenseTable };
