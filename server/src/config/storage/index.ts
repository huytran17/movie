import AWS from "aws-sdk";

export default class Storage {
  public static s3: AWS.S3;

  constructor() {
    Storage.s3 = Storage.makeS3();
  }

  static makeS3() {
    AWS.config.update({
      secretAccessKey:
        process.env.S3_SECRET_ACCESS_KEY ||
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      accessKeyId: process.env.S3_ACCESS_KEY_ID || "XXXXXXXXXXXXXXX",
      region: "ap-southeast-1",
      s3ForcePathStyle: true,
      sslEnabled: false,
      signatureVersion: "v4",
    });
    const s3 = new AWS.S3();
    console.log("Successfully connected to S3");

    return s3;
  }

  static getS3() {
    if (Storage.s3) {
      return Storage.s3;
    }
    const storage = new Storage();
    return Storage.s3;
  }

  static getSignedUrl(key: string) {
    if (!key) {
      return "";
    }

    const signed_url = Storage.s3.getSignedUrl("getObject", {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    });
    return signed_url;
  }
}
