import { StyleSheet } from "react-native";

export default StyleSheet.create({
  searchbar: {
    alignItems: "center",
    padding: 6,
    marginTop: 8,
    marginRight: 16,
    fontSize: 17,
  },
});

export const chatStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  listTitle: {
    fontSize: 22,
    fontFamily: "System",
    color: "#0b2f64",
  },

  listDescription: {
    fontSize: 16,
    fontFamily: "System",
    color: "#0b2f64",
  },
});
