import { Platform } from "react-native";

export default {
  bold:
    Platform.OS == "ios" ? "SchnebelSansME-Bold" : "Schnebel Sans ME Bold",
  med:
    Platform.OS == "ios" ? "SchnebelSansME-Medium" : "Schnebel Sans ME Medium",
  light:
    Platform.OS == "ios" ? "SchnebelSansME-Light" : "Schnebel Sans ME Light",
  reg:
    Platform.OS == "ios" ? "SchnebelSansME-Regular" : "Schnebel Sans ME",
};

// Schnebel Sans ME
//    SchnebelSansME-Regular
//    SchnebelSansME-Light
// 2022-03-24 14:26:15.455247+0500 VisitDubai[2362:3121380]   SchnebelSansME-Medium
// 2022-03-24 14:26:15.455374+0500 VisitDubai[2362:3121380]   SchnebelSansME-Bold
