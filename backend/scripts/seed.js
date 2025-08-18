import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../src/models/category.model.js";
import Question from "../src/models/question.model.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const difficulties = ["Easy", "Medium", "Hard"]; // assign them randomly to the questions 

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB ✅");

    // detele the old data created on mongodb
    await Category.deleteMany({});  
    await Question.deleteMany({});
    console.log("Old data removed");

   
    const res = await fetch("https://test-data-gules.vercel.app/data.json"); 
    const json = await res.json();

    for (const category of json.data) {
      let questionIds = [];

      for (const q of category.ques) {
        const questionDoc = await Question.create({
          title: q.title,
          yt_link: q.yt_link,
          p1_link: q.p1_link,
          p2_link: q.p2_link,
          tags: q.tags ? q.tags.split(",").filter(Boolean) : [],
          difficulty: difficulties[Math.floor(Math.random() * difficulties.length)]
        });

        questionIds.push(questionDoc._id);
      }

      await Category.create({
        title: category.title,
        questions: questionIds,
      });
    }

    console.log("Seeding complete 🌱🌱🌱🌱🌱"); 
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data 😓😓😓😓", err);
    process.exit(1);
  }
}

seedData();
