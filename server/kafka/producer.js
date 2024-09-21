const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "resumeProducer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const produceResumeData = async (resumeData,userId) => {
  await producer.connect();
  await producer.send({
    topic: "resume-topic",
    messages: [
      {
        key: userId, // Use userId as the key
        value: JSON.stringify({ resumeData, userId }), 
      },
    ],
  });
  await producer.disconnect();
};

module.exports = { produceResumeData };
