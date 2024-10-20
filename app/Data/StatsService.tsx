import { db } from './db';

export const getCategoryBreakdown = (username: string, startDate: string, endDate: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT category, SUM(nominal) AS category_total FROM userexpenses WHERE username = ? AND date BETWEEN ? AND ? GROUP BY category',
        [username, startDate, endDate],
        (_, { rows }) => {
          const breakdown = [];
          for (let i = 0; i < rows.length; i++) {
            breakdown.push(rows.item(i));
          }
          resolve(breakdown);
        },
        (tx, error) => reject(`Error fetching category breakdown: ${error.message || error}`)
      );
    });
  });
};

export const getAdminStats = (startDate: string, endDate: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT category, SUM(nominal) AS category_total FROM userexpenses WHERE date BETWEEN ? AND ? GROUP BY category',
        [startDate, endDate],
        (_, { rows }) => {
          const breakdown = [];
          for (let i = 0; i < rows.length; i++) {
            breakdown.push(rows.item(i));
          }
          resolve(breakdown);
        },
        (tx, error) => reject(`Error fetching admin stats: ${error.message || error}`)
      );
    });
  });
};
