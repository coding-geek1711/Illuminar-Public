const bcrypt = require("bcryptjs");

async function check() {
  console.log(
    await bcrypt.compare(
      "1234567",
      "$2a$10$n/jHctORed3tNDfCBWE0MeFVoFZXfm7kwW6MVtOciZEUqK4bBrjfe"
    )
  );
}

check();
