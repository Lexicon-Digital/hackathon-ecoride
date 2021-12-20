import React from "react";
import { Image } from "react-native";
const DummyMap = require("../../resources/images/dummy-map.png")

export const Map: React.VFC = () => {
    return <Image source={DummyMap} />
};