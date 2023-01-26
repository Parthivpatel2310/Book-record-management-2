const express = require("express");
const { users } = require("../data/users.json");

const router = express.Router();

// http://localhost:2310/users/users

//get all user
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

//get user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  } 
   return res.status(200).json({
      success: true,
      data: user,
    });
  
});

//add operation
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User alreadry exist",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(200).json({
    success: true,
    data: users,
  });
});

//update operation
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User Not Found" });

  const UpdatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedUser,
  });
});

//delete operation
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User to be deleted is not found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({ success: true, data: users });
});

//subscription-datail
  router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();                                     //current date
    } else {
      date = new Date(data);                                 //getting date basis on varaible
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 60;
    } else if (user.subscriptionType === "Standard") {
      date = date + 150;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // subscription calculation
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    daysAfterExpiration:
      subscriptionExpiration >= currentDate
        ? 0
        : currentDate - subscriptionExpiration,
    
     fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 130
          : 30
        : 0,
    
  }
  return res.status(200).json({ success: true, data });
});


module.exports = router;
