/* eslint-disable no-console */
import { VideoHandlers } from "../interface";
import prisma from "../../../../prisma/client";
import busboy from "busboy";
import { PassThrough, Stream } from "stream";
import uploadToS3 from "../../../utils/uploadToMinio";

const createVideo: VideoHandlers["create"] = async (req, res) => {
  try {
    const bb = busboy({ headers: req.headers });
    const formaDataFields = {
      categoryId: "",
      description: "",
      teaserUrl: "",
      thumbnailUrl: "",
      title: "",
    };

    bb.on("field", (fieldname: keyof typeof formaDataFields, val: string) => {
      formaDataFields[fieldname] = val;
    });

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

        await uploadToS3(passThrough, `/videos/${fileData.filename}`, metadata);

        const videoToCreate = await prisma.video.create({
          data: {
            ...formaDataFields,
            display: true,
            isPublic: true,
            duration: 0,
            videoUrl: `https://${process.env.MINIO_ENDPOINT}/origin/videos/${fileData.filename}`,
          },
        });

        res.status(200).json(videoToCreate);
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
