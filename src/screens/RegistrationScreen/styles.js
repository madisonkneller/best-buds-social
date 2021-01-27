import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  logo: {
    flex: 1,
    height: 120,
    width: 180,
    alignSelf: "center",
    marginTop: 30,
    margin: 20,
  },

  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },

  largeinput: {
    height: 100,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },

  button: {
    backgroundColor: "#5271FF",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },

  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },

  footerLink: {
    color: "#5271FF",
    fontWeight: "bold",
    fontSize: 16,
  },

  dropdown: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 4,
    height: 48,
    borderRadius: 5,
    fontSize: 13,
  }
});
