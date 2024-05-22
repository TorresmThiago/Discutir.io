import React from "react";
import { matchPath } from "react-router-dom";


const generatePage = page => {
    const component = () => require(`./pages/${page}`).default;
    try {
        return React.createElement(component());
    } catch (error) {
        console.warn(error);
        return React.createElement(() => 404);
    }
};

export default function PageRenderer(page) {
    const {
        params: { page },
    } = matchPath();

    return generatePage(page);
}