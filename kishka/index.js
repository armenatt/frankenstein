import Fastify from 'fastify';
import { fastifyMultipart } from '@fastify/multipart';
import winston from 'winston';
import fs from 'fs';
import path from 'path';
import  mp3ToHls from './formatChange.js';
import { replaceSpace } from './helpers.js';
import initFirebase from './firebase.js'

const { storage } = initFirebase()

const fastify = Fastify({
    logger: true
})
fastify.register((fastifyMultipart), {
    limits: {
        fileSize: 1024 * 1024 * 10
    },
})
fastify.post('/hls', async function(request, reply) {
    // fs.mkdir(path.join(path.resolve(''), 'files'), (err) =>{
    //     console.log(err)
    // })
    const data = await request.file()
    const buffer = await data.toBuffer()
    const name = replaceSpace(data.filename.split('.mp3')[0])
    const result = await mp3ToHls(buffer, name)
    reply.send(result)
})

fastify.listen({ port: 3000, host: '0.0.0.0'}, (err) => {
    if(err) {
        winston.log(err)
        process.exit(1)
    }
})