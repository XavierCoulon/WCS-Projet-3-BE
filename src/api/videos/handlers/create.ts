/* eslint-disable no-console */
import { VideoHandlers } from "../interface";
import prisma from "../../../../prisma/client";
import busboy from "busboy";
import { PassThrough, Stream } from "stream";
import uploadToS3 from "../../../utils/uploadToMinio";
import durationParser from "../../../utils/durationParser";

const createVideo: VideoHandlers["create"] = async (req, res) => {
  try {
    const bb = busboy({ headers: req.headers });
    const formaDataFields = {
      categoryId: "",
      description: "",
      teaserUrl: "",
      thumbnailUrl: "",
      title: "",
      duration: "",
    };

    bb.on("field", (fieldname: keyof typeof formaDataFields, val: string) => {
      formaDataFields[fieldname] = val;
    });

    let thumbnailUrl = "";
    let teaserUrl = "";
    bb.on(
      "file",
      async (
        fieldname: string,
        file: Stream,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fileData: Record<string, any>
      ) => {
        if (fieldname !== "files") {
          return res
            .status(400)
            .send({ message: "Invalid fieldname. Try with [files] instead" });
        }

        console.log("Upload started");

        const passThrough = new PassThrough();
        file.pipe(passThrough);

        const metadata = {
          "Content-type": fileData.mimeType,
        };
        if (fileData.filename.substring(0, 2) === "tn") {
          await uploadToS3(
            passThrough,
            `/thumbnails/${fileData.filename}`,
            metadata
          );
          thumbnailUrl = `https://${process.env.MINIO_ENDPOINT}/origin/thumbnails/${fileData.filename}`;
        }
        if (fileData.filename.substring(0, 2) === "te") {
          await uploadToS3(
            passThrough,
            `/teasers/${fileData.filename}`,
            metadata
          );
          teaserUrl = `https://${process.env.MINIO_ENDPOINT}/origin/teasers/${fileData.filename}`;
        }
        if (fileData.filename.substring(0, 2) === "vi") {
          await uploadToS3(
            passThrough,
            `/videos/${fileData.filename}`,
            metadata
          );
          console.log(formaDataFields);
          const videoToCreate = await prisma.video.create({
            data: {
              ...formaDataFields,
              display: true,
              isPublic: true,
              duration: durationParser(formaDataFields.duration),
              videoUrl: `https://${process.env.MINIO_ENDPOINT}/origin/videos/${fileData.filename}`,
              thumbnailUrl: thumbnailUrl,
              teaserUrl: teaserUrl,
            },
          });

          res.status(200).json(videoToCreate);
        }
      }
    );

    bb.on("finish", () => {
      console.log("FINISHED");
    });

    return req.pipe(bb);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createVideo;
