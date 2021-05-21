const { Kafka } = require('kafkajs')

async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "myapp",
      "brokers": ["frs-pc:9092"]
    })

    const consumer = kafka.consumer({ "groupId": "Group1" })
    await consumer.connect()
    await consumer.subscribe({
      "topic": "users",
      "fromBeginning": true
    })
    await consumer.run({
      "eachMessage": async result => {
        console.log(`Received msg: ${result.message.value}. Partition: ${result.partition}`)
      }
    })

    // await consumer.disconnect()
  } catch (error) {
    console.log(`Error: ${error}`)
  } finally {
    // process.exit(0)
  }
}

run()