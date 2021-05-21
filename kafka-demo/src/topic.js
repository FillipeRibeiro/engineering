const { Kafka } = require('kafkajs')

async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "myapp",
      "brokers": ["frs-pc:9092"]
    })

    console.log('Connecting...')
    const admin = kafka.admin()
    await admin.connect()
    console.log('Connected!')

    await admin.createTopics({
      "topics": [{
        "topic": "users",
        "numPartitions": 2
      }]
    })
    console.log("Done!!! Created Successfully.")
    await admin.disconnect()

  } catch (error) {
    console.log(`Something went wrong: ${error}`)
  } finally {
    process.exit(0)
  }
}

run()