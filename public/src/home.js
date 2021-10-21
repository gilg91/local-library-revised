function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {
//     without using helper function
//     if(!book.borrows[0].returned) {
//       count += 1;
//     }
    helper(book);
  });
  return count;

  function helper(book) {
    if(!book.borrows[0].returned) {
      count += 1;
    }
  }
}


function getMostCommonGenres(books) {
  let result = [];
  let obj = {};
  books.forEach((book) => {
    obj[book.genre] ? obj[book.genre] += 1 : obj[book.genre] = 1;
  });
  const key = Object.keys(obj);
  const value = Object.values(obj);
  for (let i = 0; i < key.length; i++) {
    result.push({name: key[i], count: value[i]});
  }
  result.sort((g1, g2) => (g1.count > g2.count ? -1 : 1));
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  let result = [];
  books.forEach((book) => {
    result.push({name: book.title, count: book.borrows.length});
  });
  result.sort((b1, b2) => (b1.count > b2.count ? -1 : 1));
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
//   Use .forEach() to solve the same problem
//   let bookArr = [];
//   books.forEach((book) => {
//     bookArr.push({id: book.authorId, count: book.borrows.length});
//   });
  
  const bookArr = books.map((book) => {
    return {id: book.authorId, count: book.borrows.length};
  });
  
  let obj = {};
  authors.forEach((author) => {
    for (let i = 0; i < bookArr.length; i ++) {
      if (author.id === bookArr[i].id) {
        const name = author.name.first + " " + author.name.last;
        if (!obj[name]) {
          obj[name] = bookArr[i].count;
        } else {
          obj[name] += bookArr[i].count;
        }
      }
    }
  });
  
  const key = Object.keys(obj);
  const value = Object.values(obj);
  for (let i = 0; i < key.length; i++) {
    result.push({name: key[i], count: value[i]});
  }
  result.sort((b1, b2) => (b1.count > b2.count ? -1 : 1));
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};