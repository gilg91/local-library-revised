function findAccountById(accounts, id) {
  return accounts.find((account) => {
    if (account.id === id) {
      return account;
    }
  });
}

function sortAccountsByLastName(accounts) {
  accounts.sort((account1, account2) => account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  if (books.length === 0) {
    return 0;
  }
  for (let i = 0; i < books.length; i+= 1) {
    for (let j = 0; j < books[i].borrows.length; j += 1) {
      if (books[i].borrows[j].id === account.id) {
        count += 1;
      }
    }
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
//   Use .forEach() to solve the same problem
//   let result = [];
//   books.forEach((book) => {
//     if (book.borrows.some((borrow) => borrow.id === account.id && borrow.returned === false)) {
//       result.push(book);
//     }
//   });
//     result.forEach((book) => {
//       book["author"] = authors.find((name) => name.id === book.authorId);
//     });
//   return result;
  
  const results = books.reduce((result, book) => {
    if (book.borrows.some((borrow) => borrow.id === account.id && borrow.returned === false)) {
      book["author"] = authors.find((name) => name.id === book.authorId);
      result.push(book);
    }
    return result;
  }, []);
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};