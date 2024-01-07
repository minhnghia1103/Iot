import { user } from "../config/connectDB";
import e, { Request, Response } from "express";
// import jwt from "jsonwebtoken";
export const createUser = async (req: Request, res: Response) => {
  const { username, password, gmail } = req.body;
  try {
    const entry = user.doc();
    const peopleObject = {
      id: entry.id,
      username,
      password,
      gmail,
    };
    const querySnapshot = await user.where("gmail", "==", peopleObject.gmail).get();
    if (querySnapshot.size != 0) {
      res.send("Account's gmail already exits, please change different username !");
    } else {
      await entry.set(peopleObject);
      res.status(200).send({
        status: "success",
        message: "Account added, register successfully !",
        data: peopleObject,
      });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const gmail: string = req.body.gmail;
  const password: string = req.body.password;
  let all_match: any;

  user
    .where("gmail", "==", gmail)
    .where("password", "==", password)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        all_match = doc.data();
      });
      if (querySnapshot.size != 0) {
        // const token = jwt.sign(all_match.id, "SUPER_SERRECT_KEY");
        // res.cookie("token", token);
        // res.header("Authorization", "Bearer " + token);
        res.status(200).send({
          message: "Login successfully !",
          // token: token,
          data: {
            gmail: all_match.gmail,
            username: all_match.username,
          },
        });
        console.log("Login successfully");
      } else {
        res.send("Account not exist, please register or login again !");
        console.log("Login fail !");
      }
    })
    .catch((error: any) => {
      console.log("Error getting documents: ", error);
      res.status(500).send(error);
    });
};
