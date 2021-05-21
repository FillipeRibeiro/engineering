const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribe')

router.get('/', async (request, response) => {
    try {
        const subscribers = await Subscriber.find()
        response.json(subscribers)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})

router.get('/:id', getSubscriber, (request, response) => {
    response.json(response.subscriber)
})

router.post('/', async (request, response) => {
    const subscriberObject = new Subscriber({
        name: request.body.name,
        subscribedToChannel: request.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriberObject.save()
        response.status(201).json(newSubscriber)
    } catch (error) {
        response.status(400).json({ massage: error.message })
    }
})

router.patch('/:id', getSubscriber, async (request, response) => {
    response.subscriber.name = request.body.name || response.subscriber.name
    response.subscriber.subscribedToChannel = request.body.subscribedToChannel || response.subscriber.subscribedToChannel

    try {
        const updatedSubscribed = await response.subscriber.save()
        response.json(updatedSubscribed)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})

router.delete('/:id', getSubscriber, async (request, response) => {
    try {
        await response.subscriber.remove()
        response.json({ message: "Subscriber deleted succesfully."})
    } catch (err) {
        response.status(500).json({ message: err.message })
    }
})

async function getSubscriber(request, response, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(request.params.id)
        if (subscriber == null) {
            return response.status(404).json({ message: "Subscriber not found." })
        }
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }

    response.subscriber = subscriber
    next()
}

module.exports = router