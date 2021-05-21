const { Kafka } = require('kafkajs')

const msg = process.argv[2];
const partition = msg[0] < "N" ? 0 : 1;

async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "myapp",
      "brokers": ["frs-pc:9092"]
    })

    const producer = kafka.producer()
    await producer.connect()
    const result = await producer.send({
      "topic": "users",
      "messages": [{
        "value": msg,
        "partition": partition
      }]
    })
    console.log(`Message sended: ${JSON.stringify(result)}`)
    await producer.disconnect()
  } catch (error) {
    console.log(`Error: ${error}`)
  } finally {
    process.exit(0)
  }
}

run()