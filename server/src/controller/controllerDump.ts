import { Request, Response } from "express";
import { control } from "../config/connectDB";
import { EventEmitter } from "events";

export const eventEmitter = new EventEmitter();

export const updateControl = async (req: Request, res: Response) => {
  const data = req.body;
  console.log("Data from ESP32:", data);
  const updateObject = {
    ledMode: data.ledMode,
    pumpMode: data.pumpMode,
    ledAutoMode: data.ledAutoMode,
    pumpAutoMode: data.pumpAutoMode,
  };

  try {
    await control.doc("control").set(updateObject, { merge: true });
    console.log("Update successful");

    // Emit the event when the update is successful
    eventEmitter.emit("updateSuccess");

    res.status(200).send({
      status: "Update successful",
    });
  } catch (error: any) {
    console.error("Error updating data in Firestore:", error);
    res.status(500).json({
      status: "Error updating data",
      error: error.message,
    });
  }
};

export const getController = async () => {
  try {
    const obj = await control.doc("control");
    const response = await obj.get();

    if (response.exists) {
      const jsonData = response.data();
      console.log("Data from Firestore:", jsonData);
      return jsonData;
    } else {
      console.log("Document does not exist");
      // Xử lý trường hợp không tìm thấy tài liệu
      return null; // hoặc trả về giá trị mặc định khác phù hợp
    }
  } catch (error: any) {
    console.error("Error fetching data from Firestore:", error);
    // Xử lý lỗi nếu cần
    return null; // hoặc trả về giá trị mặc định khác phù hợp
  }
};
