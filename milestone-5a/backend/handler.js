import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

const s3 = new S3Client({ region: process.env.AWS_REGION });

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
}


export const uploadImage = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { fileData, fileName } = body;

    const buffer = Buffer.from(fileData, 'base64');

    const key = `products/${randomUUID()}-${fileName}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: 'image/jpeg',
      })
    );

    const publicUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: publicUrl }),
    };
  } catch (err) {
    console.error('Upload failed', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Upload failed' }),
    };
  }
};
