import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TextInputProps,
} from "react-native";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database } from "../firebase";
import {
  useFonts,
  LiuJianMaoCao_400Regular,
} from "@expo-google-fonts/liu-jian-mao-cao";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { ref, set } from "firebase/database";
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const font = useFonts({ LiuJianMaoCao_400Regular });

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscibe;
  }, []);

  function writeUserData(email, id) {
    set(ref(database, "users/" + id), {
      username: email,
      name: "",
      best: "",
      worst: "",
      gender: "",
      telegram: "",
    });
  }

  function handleEmail(userEmailInput) {
    setEmail(userEmailInput);
    console.log(email);
  }

  function handlePassword(userPassword) {
    setPassword(userPassword);
  }

  function reset() {
    setEmail("");
    setPassword("");
  }

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        writeUserData(user.email, user.uid);
        console.log(user.email);
      })
      .catch((error) => {
        const message = handleError(error.message);
        alert(message);
      });
    reset();
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        console.log(user.email);
      })
      .catch((error) => {
        const message = handleError(error.message);
        alert(message);
      });
    reset();
  }

  function handleError(error) {
    switch (error) {
      case "Firebase: Error (auth/invalid-email).":
        return "Please enter a valid email address";
      case "Firebase: Error (auth/missing-password).":
        return "Please enter a valid password";
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already in use";
      case "Firebase: Error (auth/invalid-credential).":
        return "Wrong username or password. Please try again";
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return "Your password should be al least 6 characters long.";
      default:
        error;
    }
  }
  return (
    <View style={styles.main}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.subheader}>Ignite Your Love Life with</Text>
          <Text style={styles.title}>Single's Inferno</Text>
        </View>
        <Text></Text>
        <Text style={styles.textInputHeader}>Username</Text>
        <View style={styles.input}>
          <FAIcon name="user" size={25} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            color="#f4f1f1"
            placeholder="e.g. xxx@gmail.com"
            onChangeText={handleEmail}
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
          />
        </View>
        <Text></Text>

        <View style={styles.input}>
          <Text style={styles.textInputHeader2}>Password</Text>
          <FAIcon
            name="lock"
            aria-hidden="true"
            size={25}
            color="#ffffff"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            color="#fffdfd"
            placeholder="e.g. iLoveSinglesInferno"
            onChangeText={handlePassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSignUp} color="#fa6559">
              SIGN UP
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSignIn}>LOGIN</Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 15,
  },
  subheader: {
    fontFamily: "LiuJianMaoCao_400Regular",
    fontSize: 23,
    alignItems: "center",
    color: "#fffbf9",
    paddingBottom: 4,
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
    width: 270,
    flexDirection: "row",
    padding: 8,
    textAlign: "center",
    borderColor: "white",
  },
  main: {
    flex: 1,
    backgroundColor: "#fa6559",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontFamily: "Martel",
    fontSize: 45,
    fontWeight: "bold",
    color: "#ffffff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 6,
    shadowRadius: 0.35,
  },
  textInputHeader: {
    position: "absolute",
    top: 100,
    left: 83,
    zIndex: 100,
    color: "#ffffff",
    backgroundColor: "#fa6559",
    fontFamily: "Sans serif",
    width: 110,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInputHeader2: {
    position: "absolute",
    top: -10,
    left: 19,
    zIndex: 100,
    color: "#ffffff",
    backgroundColor: "#fa6559",
    fontFamily: "Sans serif",
    width: 110,
    textAlign: "center",
    fontWeight: "bold",
  },

  text: {
    padding: 8,
    width: 90,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 3,
  },
  buttonsContainer: {
    marginTop: 30,
    Color: "#000000",
  },
  image: {
    marginTop: 100,
    width: 380,
    height: 380,
  },

  imageContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  contentContainer: {
    alignItems: "center",
    flex: 3,
  },

  textInputContainer: {
    justifyContent: "space-evenly",
  },
  icon: {
    marginLeft: 4,
    marginTop: 3,
  },
});
