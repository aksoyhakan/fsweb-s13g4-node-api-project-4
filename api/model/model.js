const hash = require("object-hash");

let id = 0;

function getId() {
  return ++id;
}

const initializeUsers = () => {
  let passwordArray = [
    "Deneme+11",
    "FB1903",
    "İstanbul87",
    "hogwarts68",
    "1453maltepe",
  ];

  const hashPasswordArray = passwordArray.map((item) => {
    return hash.MD5(item);
  });

  let fakeUsers = [
    {
      id: getId(),
      kullaniciadi: "aksoyhak",
      sifre: hashPasswordArray[0],
    },
    {
      id: getId(),
      kullaniciadi: "donnydarko",
      sifre: hashPasswordArray[1],
    },
    {
      id: getId(),
      kullaniciadi: "tylerdurden",
      sifre: hashPasswordArray[2],
    },
    {
      id: getId(),
      kullaniciadi: "harrythewizard",
      sifre: hashPasswordArray[3],
    },
    {
      id: getId(),
      kullaniciadi: "tivorluismail",
      sifre: hashPasswordArray[4],
    },
  ];
  return fakeUsers;
};

let users = initializeUsers();
let logUsers = [];

function getUsers() {
  return Promise.resolve(users);
}

function register(newUser) {
  let registeredUser = {
    id: getId(),
    kullaniciadi: newUser.kullaniciadi,
    sifre: hash.MD5(newUser.sifre),
  };
  users.push(registeredUser);
  return Promise.resolve(registeredUser);
}

function getFindUser(user) {
  let searchedUser = users.find(
    (item) =>
      item.kullaniciadi === user.kullaniciadi &&
      item.sifre === hash.MD5(user.sifre)
  );
  return Promise.resolve(searchedUser);
}

function logIn(user) {
  console.log("Nasıl yaa", user);
  !logUsers.includes(user) && logUsers.push(user);
  console.log(logUsers);
}

function logUserFind(user) {
  let logUserAccount = logUsers.find(
    (logUser) =>
      logUser.kullaniciadi === user.kullaniciadi &&
      logUser.sifre &&
      hash.MD5(user.sifre)
  );
  return Promise.resolve(logUserAccount);
}

module.exports = {
  getUsers,
  register,
  getFindUser,
  logIn,
  logUserFind,
};
