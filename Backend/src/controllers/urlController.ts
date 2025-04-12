import axios from "axios";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

import { fetchedUrl } from "../types/urlType";

import Url from "../models/urlModel.js";

const createUrl = async (req: Request, res: Response) => {

    const userId = req.user.id;
    const orgUrl = req.body.orgUrl;

    console.log(userId + orgUrl);

    const shortId = nanoid(7);

    const url = new Url({
        userId: userId,
        orgUrl: orgUrl,
        clicks: 0,
        location: [],
        device: [],
        shortUrl: shortId
    })

    try {
        await url.save();

        const newUrl = `http://localhost:3000/${shortId}`;

        res.status(201).json({ message: "Url shortened successfully", shortUrl: newUrl, name: req.user.name });

    }
    catch {
        res.status(500).json({ err: 'Error creating url' });
    }
}


const getUrl = async (req: Request, res: Response) => {

    const shortUrl = req.params.url;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    try {

        const savedUrl = await Url.findOne({ shortUrl }) as fetchedUrl | null;

        if (!savedUrl) {
            res.status(404).json({ message: "Invalid Url entered" });
            return;
        } else {

            res.redirect(savedUrl.orgUrl);

            const deviceType = req.useragent?.isMobile
                ? "Mobile"
                : req.useragent?.isTablet
                    ? "Tablet"
                    : "Desktop";

            console.log("====before axios======" + ip);
            //const geo = await axios.get(`http://ip-api.com/json/${ip}`);

            const geo = await axios.get(`http://ip-api.com/json/8.8.8.8`);

            //console.log(geo);
            const place = geo.data.city || geo.data.country_name;
            console.log(place);

            console.log("==========after axios=========");

            const existingLocation = savedUrl.location.find(loc => loc.place === place);

            console.log(existingLocation);

            if (existingLocation) {
                await Url.updateOne(
                    { shortUrl, "location.place": place },
                    { $inc: { "location.$.clicks": 1 } }
                );
            } else{

                console.log("inside loc else");
                await Url.updateOne(
                    { shortUrl },
                    {
                        $push: {
                            location: { place, clicks: 1 },
                        },
                    }
                );
            }

            console.log("location addd");

            const existingDevice = savedUrl.device.find(dev => dev.deviceType === deviceType);

            if (existingDevice) {
                await Url.updateOne(
                    { shortUrl, "device.deviceType": deviceType },
                    { $inc: { "device.$.clicks": 1 } }
                );
            } else {
                console.log("inside device else");
                await Url.updateOne(
                    { shortUrl },
                    {
                        $push: {
                            device: { deviceType, clicks: 1 },
                        },
                    }
                );
            }

            console.log("device addd");
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
}


export default {
    createUrl,
    getUrl
}