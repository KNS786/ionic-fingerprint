import {Redirect, Route} from "react-router-dom"
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonContent,
	IonTabBar,
	IonTabButton,
	IonTabs,
	useIonAlert,
	IonButton,
	setupIonicReact,
} from "@ionic/react"
import {IonReactRouter} from "@ionic/react-router"
import {ellipse, square, triangle} from "ionicons/icons"
import Tab1 from "./pages/Tab1"
import Tab2 from "./pages/Tab2"
import Tab3 from "./pages/Tab3"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"

//fingerprint
import {NativeBiometric} from "capacitor-native-biometric"
import React, {useState, useEffect} from "react"

setupIonicReact()

const App: React.FC = () => {
	const [data, setData] = useState("")
	const [presentAlert] = useIonAlert()
	const [handlerMessage, setHandlerMessage] = useState("")
	const [roleMessage, setRoleMessage] = useState("")
	const fingerPrint = async () => {
		const result: any = await NativeBiometric.isAvailable()
		const verified = await NativeBiometric.verifyIdentity({
			reason: "For easy log in",
			title: "Log in",
			subtitle: "Maybe add subtitle here?",
			description: "Maybe a description too?",
		})
			.then(() => true)
			.catch(() => false)

		console.log("result :: ", result)
		alert(result.biometryType)
		alert(verified)
	}

	useEffect(() => {
		fingerPrint()
	}, [])

	return (
		<IonApp>
			<>
				<IonButton
					onClick={() =>
						presentAlert({
							header: "Alert!",
							buttons: [
								{
									text: "Cancel",
									role: "cancel",
									handler: () => {
										setHandlerMessage("Alert canceled")
									},
								},
								{
									text: "OK",
									role: "confirm",
									handler: () => {
										setHandlerMessage(data)
									},
								},
							],
							onDidDismiss: (e: CustomEvent) =>
								setRoleMessage(`Dismissed with role: ${e.detail.role}`),
						})
					}>
					Click Me
				</IonButton>
				<p>{handlerMessage}</p>
				<p>{roleMessage}</p>
			</>
		</IonApp>
	)
}

export default App
