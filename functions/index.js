const functions = require('firebase-functions');
const mkdirp = require('mkdirp');
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
const THUMB_PREFIX = 'thumb_';

exports.generateThumbnail = functions.storage
  .object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    const contentType = object.contentType;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const filePathThumb = path.normalize(
      path.join(fileDir, `${THUMB_PREFIX}${fileName}`)
    );
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalThumbFile = path.join(os.tmpdir(), filePathThumb);

    if (!contentType.startsWith('image/')) {
      return console.log('This is not an image.');
    }

    if (fileName.startsWith(THUMB_PREFIX)) {
      return console.log('Already a thumbnail');
    }

    const bucket = admin.storage().bucket(object.bucket);
    const file = bucket.file(filePath);
    const metadata = {
      contentType
    };

    await mkdirp(tempLocalDir);
    await file.download({ destination: tempLocalFile });
    await spawn(
      'convert',
      [
        tempLocalFile,
        '-thumbnail',
        `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`,
        tempLocalThumbFile
      ],
      { capture: ['stdout', 'stderr'] }
    );

    await bucket.upload(tempLocalThumbFile, {
      destination: filePathThumb,
      metadata
    });
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);
  });
