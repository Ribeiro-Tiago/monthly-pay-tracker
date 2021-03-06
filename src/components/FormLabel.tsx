import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  label: string;
}

export default function ({ label }: Props) {
  return <Text style={styles.label}>{label}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ca5116",
    marginRight: 5,
    marginVertical: 10,
  },
});
