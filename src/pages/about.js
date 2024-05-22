import React from "react";
import { uploadPhoto } from "../services/uploadPhoto";

export default function About({ user }) {

    return (
        <form id="upload-form">
            <input type="file" id="photo" accept="image/*" />
            <button type="button" onClick={() => uploadPhoto("photo")}>Upload</button>
        </form>
    );
}