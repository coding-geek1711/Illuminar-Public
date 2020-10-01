const { Sequelize, Op } = require("sequelize");
const sequelize = require("./dbConfig");
const { user, tokens } = require("./Models");
const bcrypt = require("bcryptjs");

const TIMELIMIT = 1800000;

async function doesUserExist(email, univId) {
  return await user.findAll({
    where: {
      [Op.or]: [{ univId }, { email }],
    },
  });
}

async function doesUserExist2(email, univId) {
  return await user.findAll({
    where: {
      univId,
      email,
    },
  });
}

// async function insertToken(univId, token) {
//   // Insert only when user exists
//   const response = await doesUserExist("", univId);
//   console.log(response);
//   if (response.length > 0) {
//     const doesTokenExist = await tokens.findAll({
//       where: {
//         univId: univId,
//       },
//     });
//     if (doesTokenExist.length > 0) {
//       // delete token and add new one
//       await tokens.update({ token }, { where: { univId: univId } });
//     } else {
//       // add new token
//       await tokens.create({
//         univId,
//         token,
//         token_genesis: Date.now(),
//         token_expiry: Date.now() + TIMELIMIT,
//       });
//     }
//     return "Added Token";
//   } else {
//     return "No User";
//   }
// }

async function insertUserToUsers(name, email, univId, password) {
  const response = await doesUserExist(email, univId);
  if (response.length > 0) {
    // User Exists
    return "User Exists";
  } else {
    await user.create({
      name,
      email,
      univId,
      password,
    });
    return "Registered";
  }
}

// async function deleteToken(token) {
//   const tokenExistence = await tokens.findAll({
//     where: {
//       token,
//     },
//   });
//   // Delete all tokens who are beyond expiry
//   await sequelize.query(
//     `
//   DELETE FROM tokens WHERE token_genesis < $1;
//   `,
//     {
//       bind: [Date.now() - TIMELIMIT],
//     }
//   );

//   // Custom token deletion
//   if (tokenExistence.length > 0) {
//     // Token exists and can be deleted
//     await tokens.destroy({
//       where: {
//         token,
//       },
//     });
//     return "Token Deleted Successfully";
//   } else {
//     return "Token doesnt Exist to delete";
//   }
// }

async function updatePassword(password, univId) {
  await user.update(
    { password: password },
    {
      where: { univId },
    }
  );

  // await tokens.destroy({
  //   where: {
  //     univId,
  //   },
  // });
}

// async function validateOTP(token) {
//   return await sequelize.query(
//     `
//   SELECT * FROM tokens WHERE $1 >= $2 - token_genesis AND token = $3;
//   `,
//     {
//       bind: [TIMELIMIT, Date.now(), token],
//     }
//   );
// }

module.exports = {
  doesUserExist,
  doesUserExist2,
  insertUserToUsers,
  updatePassword,
};

// doesUserExist("maheDVSDVm@gmail.com", "FIT19EE0001").then((response) => {
//   console.log(response);
//   //   console.log(Object.keys(response[0].dataValues).length);
// });

// async function starter() {
//   // console.log(await deleteToken("AAAAA"));
//   const response = await insertToken("FIT19EE029", "BBBBB");
//   console.log(response);
//   // await updatePassword("Hello", "FIT19EE029");
//   // const response = await insertUserToUsers(
//   //   "Maheswaran",
//   //   "email",
//   //   "FIT19EE001",
//   //   "password"
//   // );
//   // console.log(response);
//   // const response = await validateOTP(
//   //   "dsvsdvvejqbvjas@$!@#@Rvsdvse535355svsdvds"
//   // );
//   // // console.log(response);
//   // if (response[0].length > 0) {
//   //   console.log("YES");
//   // } else {
//   //   console.log("No");
//   // }
//   // await deleteTokenOnExpiry();
//   // const response = await updatePassword("1234567", "FIT19EE029");
//   // const response = await user.findAll({
//   //   where: {
//   //     univId: "FIT19EE29",
//   //   },
//   // });
//   // console.log(response.length);
// }

// starter();
