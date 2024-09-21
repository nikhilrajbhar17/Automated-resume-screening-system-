const { Kafka } = require("kafkajs");
const User = require("./../models/User");
const { analyzeResume } = require("../services/analyze");

const kafka = new Kafka({
  clientId: "resumeConsumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "resumeGroup" });

const consumeResumeData = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "resume-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { resumeData, userId } = JSON.parse(message.value.toString());
      const score = analyzeResume(resumeData, [
        "JavaScript",
        "Node.js",
        "Kafka",
      ]);
      console.log(`Resume Score: ${score} and id: ${userId}`);
      const user = await User.findById(userId); // Assuming you have User model imported
      if (user) {
        user.resumeScore = score;
        await user.save();
        console.log(`Updated score for user ${userId}: ${score}`);
      }
    },
  });
};

module.exports = { consumeResumeData };
