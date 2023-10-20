import Ffmpeg from 'fluent-ffmpeg';
import { Readable, Stream } from 'stream';
import fs from 'fs';
export default function mp3toHLS (file, songName) {
    let command = Ffmpeg();

    const bufferStream = new Stream.PassThrough()
    let readable = new Readable.from(file)
    const stream = fs.createWriteStream(songName)
    command
        .input(readable)
        .addOutputOption('-f segment')
        .addOutputOption('-segment_format mpegts')
        .addOutputOption('-segment_time 10')
        .addOutputOption(`-segment_list output.m3u8`)
        .addOutputOption(`-hls_segment_filename '${songName}_segment%03d.ts'`)
        .toFormat('hls')
        .on('progress', function(progress) {
            console.log('Processing: ' + progress.percentage + '% done')
          })
        .on('error', (err) =>{
            console.log(err)
        })
        .save(stream)
    const buffers = []

    bufferStream.on('data', (buf) =>{
        buffers.push(buf)
    })

    // return new Promise((resolve, reject) => {
    //     bufferStream.on('end', () =>{
    //         const outputBuffer = Buffer.concat(buffers)
    //         console.log(bufferStream);
    //         resolve(outputBuffer)
    //     })
    // })
    
}